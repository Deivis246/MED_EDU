import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getResultados, getEstudiante, getPretestGeneral, getPostestGeneral } from "@/lib/store";
import { modulos } from "@/data/modules";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Progress() {
  const { toast } = useToast();
  const resultados = getResultados();
  const estudiante = getEstudiante();
  const pretestScore = getPretestGeneral();
  const postestScore = getPostestGeneral();

  const completedModules = modulos.filter(m => resultados[m.id]?.avance === 100);

  // Los resultados se sincronizan automáticamente ahora.

  return (
    <Sidebar>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Registro de Progreso</h1>
          <p className="text-muted-foreground mt-2">Revisa tus calificaciones y desempeño clínico.</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-white">Estudiante</h2>
            <p className="text-muted-foreground">{estudiante?.nombre} • {estudiante?.cedula}</p>
          </div>

          {/* General scores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4 text-center" style={{ background: "rgba(0,200,255,0.07)", border: "1px solid rgba(0,200,255,0.2)" }}>
              <p className="text-xs mb-1" style={{ color: "#7a9ab5" }}>Pretest General</p>
              <p className="text-3xl font-black text-white">
                {pretestScore != null ? `${pretestScore}%` : <span className="text-sm font-normal" style={{ color: "#7a9ab5" }}>Sin completar</span>}
              </p>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: "rgba(0,200,255,0.07)", border: "1px solid rgba(0,200,255,0.2)" }}>
              <p className="text-xs mb-1" style={{ color: "#7a9ab5" }}>Postest General</p>
              <p className="text-3xl font-black text-white">
                {postestScore != null ? `${postestScore}%` : <span className="text-sm font-normal" style={{ color: "#7a9ab5" }}>Sin completar</span>}
              </p>
            </div>
          </div>

          {completedModules.length === 0 ? (
            <div className="text-center py-12 bg-background/50 rounded-lg border border-dashed border-border">
              <p className="text-muted-foreground">Aún no has completado ningún módulo.</p>
            </div>
          ) : (
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-background">
                  <TableRow>
                    <TableHead>Módulo</TableHead>
                    <TableHead className="text-right">Cuestionario</TableHead>
                    <TableHead className="text-right">Caso Clínico</TableHead>
                    <TableHead className="text-right">Juego</TableHead>
                    <TableHead className="text-right">Revisión</TableHead>
                    <TableHead className="text-right">Nota Final</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedModules.map((modulo) => {
                    const res = resultados[modulo.id];
                    return (
                      <TableRow key={modulo.id}>
                        <TableCell className="font-medium text-white">{modulo.titulo}</TableCell>
                        <TableCell className="text-right">{res.pretest}%</TableCell>
                        <TableCell className="text-right">{res.caso}%</TableCell>
                        <TableCell className="text-right">{res.juego}%</TableCell>
                        <TableCell className="text-right">{res.postest}%</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={res.final >= 70 ? "default" : "destructive"} className="ml-auto">
                            {res.final}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Envio manual eliminado */}
        </div>
      </div>
    </Sidebar>
  );
}
