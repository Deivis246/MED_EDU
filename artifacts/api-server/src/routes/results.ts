import { Router } from "express";
import { logger } from "../lib/logger.js";
import { db, insertResultSchema, studentResultsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
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


router.get("/results/:cedula", async (req, res) => {
  try {
    const { cedula } = req.params;
    const results = await db.select()
      .from(studentResultsTable)
      .where(eq(studentResultsTable.cedula, cedula))
      .orderBy(desc(studentResultsTable.id))
      .limit(1);
    
    if (results.length === 0) {
      res.json({ success: true, data: null });
      return;
    }
    
    res.json({ success: true, data: results[0] });
  } catch (err: unknown) {
    logger.error({ err }, "results/get error");
    res.status(500).json({ error: "Error al recuperar el progreso." });
  }
});

router.post("/results/sync", async (req, res) => {
  try {
    const { nombre, cedula, pretestGeneral, postestGeneral, pretestRespuestas, postestRespuestas, resultadosModulos, forceAppendModulos } = req.body;
    if (!cedula) {
       res.status(400).json({ error: "Faltan datos obligatorios (cedula)" });
       return;
    }

    const existing = await db.select()
      .from(studentResultsTable)
      .where(eq(studentResultsTable.cedula, cedula))
      .orderBy(desc(studentResultsTable.id))
      .limit(1);

    if (existing.length > 0) {
      const updated = await db.update(studentResultsTable).set({
        pretestRespuestas: pretestRespuestas || existing[0].pretestRespuestas,
        postestRespuestas: postestRespuestas || existing[0].postestRespuestas,
        pretestGeneral: pretestGeneral !== undefined ? pretestGeneral : existing[0].pretestGeneral,
        postestGeneral: postestGeneral !== undefined ? postestGeneral : existing[0].postestGeneral,
        resultadosModulos: resultadosModulos || existing[0].resultadosModulos,
      }).where(eq(studentResultsTable.id, existing[0].id)).returning();
      // res.json({ success: true, action: "updated", data: updated[0] });
    } else {
      const inserted = await db.insert(studentResultsTable).values({
        nombre: nombre || "",
        cedula,
        pretestGeneral,
        postestGeneral,
        pretestRespuestas: pretestRespuestas || {},
        postestRespuestas: postestRespuestas || {},
        resultadosModulos: resultadosModulos || {}
      }).returning();
      // res.json({ success: true, action: "inserted", data: inserted[0] });
    }

    // ======= GOOGLE SHEETS UPSERT LOGIC ========
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (spreadsheetId && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      const now = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
      
      const upsertSheet = async (sheetName: string, notaFinal: number | null | undefined, respuestas: Record<string, number> | undefined) => {
        if (!respuestas) return; // Only sync if we have responses for this test
        
        try {
          // Get all current rows
          const readResp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A:C` });
          const rows = readResp.data.values || [];
          
          let rowIndex = -1;
          for (let i = 0; i < rows.length; i++) {
            if (rows[i][2] === cedula) {
              rowIndex = i + 1; // 1-indexed
              break;
            }
          }

          let acertadas = 0;
          let total = sheetName === "Postest" ? 249 : 249; // Both have 249
          if (respuestas) {
            acertadas = Object.values(respuestas).filter(v => v === "CORRECTO").length;
          }
          const notaFraction = notaFinal != null ? `${acertadas}/${total} (${notaFinal}%)` : "";

          // Build row data
          const rowData: any[] = [now, nombre || "", cedula, notaFraction];
          
          // Add up to 250 answers to match headers
          for (let i = 0; i < 250; i++) {
             rowData.push(respuestas[i] !== undefined ? respuestas[i].toString() : "");
          }

          if (rowIndex !== -1) {
            // Update existing row
            await sheets.spreadsheets.values.update({
              spreadsheetId,
              range: `${sheetName}!A${rowIndex}`,
              valueInputOption: "USER_ENTERED",
              requestBody: { values: [rowData] }
            });
          } else {
            // Append new row
            await sheets.spreadsheets.values.append({
              spreadsheetId,
              range: `${sheetName}!A1`,
              valueInputOption: "USER_ENTERED",
              requestBody: { values: [rowData] }
            });
          }
        } catch (e) {
          logger.error({ err: String(e), sheetName }, "Failed to upsert to Google Sheets");
          return String(e);
        }
        return null;
      };

      const upsertSheetModulos = async (resModulos: Record<string, any>) => {
        if (!resModulos || Object.keys(resModulos).length === 0) return null;
        try {
          const sheetName = "Módulos";
          const readResp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A:C` });
          const rows = readResp.data.values || [];
          let rowIndex = -1;
          if (!forceAppendModulos) {
            for (let i = 0; i < rows.length; i++) {
              if (rows[i][2] === cedula) {
                rowIndex = i + 1;
                break;
              }
            }
          }
          
          const rowData: any[] = [now, nombre || "", cedula];
          for (const mod of MODULE_IDS) {
            const m = resModulos[mod.id];
            rowData.push(m && m.avance !== undefined ? `${m.avance}%` : "");
          }

          if (rowIndex !== -1) {
            await sheets.spreadsheets.values.update({
              spreadsheetId,
              range: `'${sheetName}'!A${rowIndex}`,
              valueInputOption: "USER_ENTERED",
              requestBody: { values: [rowData] }
            });
          } else {
            await sheets.spreadsheets.values.append({
              spreadsheetId,
              range: `'${sheetName}'!A1`,
              valueInputOption: "USER_ENTERED",
              requestBody: { values: [rowData] }
            });
          }
        } catch (e) {
          logger.error({ err: String(e) }, "Failed to upsert to Módulos Google Sheet");
          return String(e);
        }
        return null;
      };

      const err1 = pretestRespuestas ? await upsertSheet("Pretest", pretestGeneral, pretestRespuestas) : null;
      const err2 = postestRespuestas ? await upsertSheet("Postest", postestGeneral, postestRespuestas) : null;
      const err3 = resultadosModulos ? await upsertSheetModulos(resultadosModulos) : null;
      
      const sheetsError = err1 || err2 || err3;

      res.json({ success: true, action: existing.length > 0 ? "updated" : "inserted", sheetsError });
      return;

    } else {
      logger.warn("Google Sheets credentials or SPREADSHEET_ID missing, skipping Sheets integration");
    }
    // ==========================================

  } catch (err: unknown) {
    logger.error({ err }, "results/sync error");
    res.status(500).json({ error: "Error al sincronizar el progreso." });
  }
});

router.get("/results/admin/setup-sheets", async (req, res) => {
  try {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) throw new Error("Falta SPREADSHEET_ID");

    const addSheetSafe = async (title: string) => {
      try {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{ addSheet: { properties: { title } } }]
          }
        });
      } catch (e) {
        // Ignore if exists
      }
    };

    await addSheetSafe("Pretest");
    await addSheetSafe("Postest");
    await addSheetSafe("Módulos");

    const headers = ["Fecha", "Nombre", "Cédula", "Nota Final"];
    for (let i = 1; i <= 250; i++) headers.push(`Pregunta ${i}`);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Pretest!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] }
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Postest!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] }
    });

    const headersModulos = ["Fecha", "Nombre", "Cédula"];
    for (const mod of MODULE_IDS) {
      headersModulos.push(mod.label);
    }
    
    // Only append headers if we're reasonably sure the sheet is empty to avoid duplicating headers.
    // For simplicity, we just append here. If it's already setup, they will get a second header row.
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "'Módulos'!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [headersModulos] }
      });
    } catch (e) {
      // ignore append error
    }

    res.json({ success: true, message: "Google Sheets configurado correctamente" });
  } catch (err: unknown) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
