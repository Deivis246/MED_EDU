import { Router } from "express";
import { logger } from "../lib/logger.js";
import { db, insertResultSchema, studentResultsTable } from "@workspace/db";
import { google } from "googleapis";

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

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

interface ModuloResultado {
  pretest: number;
  caso: number;
  juego: number;
  postest: number;
  final: number;
  avance: number;
}

router.post("/results/submit", async (req, res) => {
  try {
    const { nombre, cedula, resultados, pretestGeneral, postestGeneral } = req.body as {
      nombre: string;
      cedula: string;
      resultados: Record<string, ModuloResultado>;
      pretestGeneral: number | null;
      postestGeneral: number | null;
    };

    if (!nombre || !cedula) {
      res.status(400).json({ error: "Faltan datos obligatorios (nombre, cedula)" });
      return;
    }

    const insertedResult = await db.insert(studentResultsTable).values({
      nombre,
      cedula,
      pretestGeneral,
      postestGeneral,
      resultadosModulos: resultados || {},
    }).returning();

    // ======= GOOGLE SHEETS INTEGRATION ========
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (spreadsheetId && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
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
        range: "A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
      });

      if (appendResp.status !== 200) {
        logger.error({ err: appendResp.statusText }, "Google Sheets append failed");
      } else {
        logger.info({ nombre, cedula }, "Results also submitted to Google Sheets");
      }
    } else {
      logger.warn("Google Sheets credentials or SPREADSHEET_ID missing, skipping Sheets integration");
    }
    // ==========================================

    logger.info({ id: insertedResult[0].id, nombre, cedula }, "Results submitted to Database");
    res.json({ success: true, id: insertedResult[0].id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err: message }, "results/submit error");
    res.status(500).json({ error: message });
  }
});

export default router;
