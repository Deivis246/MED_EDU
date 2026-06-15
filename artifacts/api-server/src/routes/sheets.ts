import { Router } from "express";
import { google } from "googleapis";
import { logger } from "../lib/logger.js";

const router = Router();

const MODULE_IDS = [
  { id: "medicina-interna", label: "M1 Med.Interna" },
  { id: "pediatria", label: "M2 Pediatría" },
  { id: "ginecologia", label: "M3 Ginecología" },
  { id: "cirugia", label: "M4 Cirugía" },
  { id: "emergencias", label: "M5 Emergencias" },
  { id: "salud-publica", label: "M6 Salud Pública" },
  { id: "bioetica", label: "M7 Bioética" },
  { id: "salud-mental", label: "M8 Salud Mental" },
];

interface ModuloResultado {
  pretest: number;
  caso: number;
  juego: number;
  postest: number;
  final: number;
  avance: number;
}

// Inicializar auth de Google
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // Fix para variables de entorno que tienen \n en string
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

router.post("/sheets/submit", async (req, res) => {
  try {
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error("Missing SPREADSHEET_ID environment variable");
    }

    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("Missing Google Service Account credentials");
    }

    const { nombre, cedula, resultados, pretestGeneral, postestGeneral } = req.body as {
      nombre: string;
      cedula: string;
      resultados: Record<string, ModuloResultado>;
      pretestGeneral: number | null;
      postestGeneral: number | null;
    };

    const now = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
    const row: string[] = [now, nombre ?? "", cedula ?? ""];

    for (const mod of MODULE_IDS) {
      const r = resultados?.[mod.id];
      row.push(r ? `${r.pretest}%` : "-");
      row.push(r ? `${r.caso}%` : "-");
      row.push(r ? `${r.juego}%` : "-");
      row.push(r ? `${r.postest}%` : "-");
      row.push(r ? `${r.final}%` : "-");
    }
    row.push(pretestGeneral != null ? `${pretestGeneral}%` : "-");
    row.push(postestGeneral != null ? `${postestGeneral}%` : "-");

    const appendResp = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A1", // Append a la primera fila disponible
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    if (appendResp.status !== 200) {
      logger.error({ err: appendResp.statusText }, "Google Sheets append failed");
      res.status(500).json({ error: "Failed to append to Google Sheets" });
      return;
    }

    logger.info({ nombre, cedula }, "Results submitted to Google Sheets via googleapis");
    res.json({ success: true, spreadsheetId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err: message }, "sheets/submit error");
    res.status(500).json({ error: message });
  }
});

export default router;
