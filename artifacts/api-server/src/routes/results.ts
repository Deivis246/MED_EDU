import { Router } from "express";
import { logger } from "../lib/logger.js";
import { db, studentResultsTable } from "@workspace/db";

const router = Router();

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

    logger.info({ id: insertedResult[0].id, nombre, cedula }, "Results submitted to Database");
    res.json({ success: true, id: insertedResult[0].id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err: message }, "results/submit error");
    res.status(500).json({ error: message });
  }
});

export default router;
