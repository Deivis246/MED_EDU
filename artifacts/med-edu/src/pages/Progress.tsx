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

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleSubmitToSheets = async () => {
    setSending(true);
    setSendError("");
    setSent(false);
    try {
      const resp = await fetch("/api/results/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: estudiante?.nombre,
          cedula: estudiante?.cedula,
          resultados,
          pretestGeneral: pretestScore,
          postestGeneral: postestScore,
        })
      });
      const data = await resp.json() as { error?: string };
      if (!resp.ok) {
        throw new Error(data.error || "Error al enviar los resultados a la base de datos");
      }
      toast({
        title: "¡Éxito!",
        description: "Tus resultados se han guardado en la base de datos.",
      });
      setSent(true);
    } catch (e: unknown) {
      setSendError(e instanceof Error ? e.message : "Error al enviar. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

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

          {/* Submit button */}
          <div className="pt-2 border-t border-border">
            {sent ? (
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(0,200,100,0.1)", border: "1px solid rgba(0,200,100,0.3)" }}>
                <CheckCircle2 size={20} style={{ color: "#00c864" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#00c864" }}>¡Resultados enviados correctamente!</p>
                  <p className="text-xs" style={{ color: "#7a9ab5" }}>Tus datos están ahora en Google Sheets y Vercel Postgres.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleSubmitToSheets}
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                  style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a", border: "none", cursor: sending ? "not-allowed" : "pointer" }}
                >
                  {sending ? (
                    <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                  ) : (
                    <><Send size={16} /> Enviar a Google Sheets y Base de Datos</>
                  )}
                </button>
                {sendError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.25)" }}>
                    <AlertCircle size={16} style={{ color: "#ff6b6b" }} />
                    <p className="text-sm" style={{ color: "#ff6b6b" }}>{sendError}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
