import { pgTable, text, serial, real, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const studentResultsTable = pgTable("student_results", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  cedula: text("cedula").notNull(),
  pretestGeneral: real("pretest_general"),
  postestGeneral: real("postest_general"),
  resultadosModulos: jsonb("resultados_modulos").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudentResultSchema = createInsertSchema(studentResultsTable).omit({ id: true, createdAt: true });
export type InsertStudentResult = z.infer<typeof insertStudentResultSchema>;
export type StudentResult = typeof studentResultsTable.$inferSelect;
