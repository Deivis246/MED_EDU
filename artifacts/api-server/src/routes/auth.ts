import { Router } from "express";
import { logger } from "../lib/logger.js";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { nombre, cedula } = req.body as { nombre: string; cedula: string };

    if (!nombre || !cedula) {
      res.status(400).json({ error: "Nombre y cédula son requeridos." });
      return;
    }

    // Optional: Seed the default user if the table is completely empty, to prevent locking out the user
    const usersCount = await db.select().from(usersTable).limit(1);
    if (usersCount.length === 0 && cedula === "1234567890") {
      await db.insert(usersTable).values({ cedula: "1234567890", nombre: "Administrador UTE", rol: "admin" }).onConflictDoNothing();
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.cedula, cedula)).limit(1);

    if (user.length === 0) {
      res.status(401).json({ error: "Cédula no registrada en el sistema." });
      return;
    }

    // Convert both to lowercase and trim spaces to avoid case-sensitive mismatches
    const dbName = user[0].nombre.toLowerCase().trim();
    const inputName = nombre.toLowerCase().trim();

    if (dbName !== inputName) {
      res.status(401).json({ error: "El nombre no coincide con la cédula registrada." });
      return;
    }

    logger.info({ cedula }, "User logged in successfully");
    res.json({ success: true, user: user[0] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error({ err: message }, "auth/login error");
    res.status(500).json({ error: "Error de servidor al intentar iniciar sesión." });
  }
});

export default router;
