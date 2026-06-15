import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import Sidebar from "@/components/Sidebar";
import Ruleta from "@/components/Ruleta";
import Calculadora from "@/components/Calculadora";
import { modulos } from "@/data/modules";
import { temasPorModulo } from "@/data/temas";
import { getResultados, saveResultado } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, CheckCircle2, BookOpen, Stethoscope,
  FlaskConical, ClipboardCheck, CircleDot, Calculator, ChevronDown, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Pregunta, CasoClinico } from "@/data/modules";

type Tab = "info" | "caso" | "cuestionario" | "ruleta" | "calculadora" | "resultados";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "info",         label: "Información",   icon: BookOpen },
  { id: "caso",         label: "Caso Clínico",  icon: Stethoscope },
  { id: "cuestionario", label: "Cuestionario",  icon: ClipboardCheck },
  { id: "ruleta",       label: "Ruleta",         icon: CircleDot },
  { id: "calculadora",  label: "Calculadora",   icon: Calculator },
];

const SECCIONES: { key: keyof import("@/data/temas").SeccionTema; label: string; color: string; bg: string }[] = [
  { key: "definicion",  label: "Definición",   color: "#00c8ff", bg: "rgba(0,200,255,0.10)" },
  { key: "etiologia",   label: "Etiología",    color: "#a78bfa", bg: "rgba(167,139,250,0.10)" },
  { key: "clinica",     label: "Clínica",      color: "#fb923c", bg: "rgba(251,146,60,0.10)" },
  { key: "diagnostico", label: "Diagnóstico",  color: "#34d399", bg: "rgba(52,211,153,0.10)" },
  { key: "tratamiento", label: "Tratamiento",  color: "#f9a8d4", bg: "rgba(249,168,212,0.10)" },
];

function InfoTab({ moduloId }: { moduloId: string }) {
  const temas = temasPorModulo[moduloId] ?? [];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (temas.length === 0) {
    return (
      <div className="rounded-xl p-6 text-sm" style={{ background: "#111c2e", border: "1px solid #1f3b55", color: "#7a9ab5" }}>
        No hay información disponible para este módulo.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs mb-4 px-1" style={{ color: "#7a9ab5" }}>
        Selecciona un tema para ver el resumen clínico estructurado.
      </p>
      {temas.map((tema, idx) => {
        const isOpen = openIdx === idx;
        return (
          <motion.div key={idx} initial={false} layout className="rounded-xl overflow-hidden"
            style={{ background: "#111c2e", border: isOpen ? "1px solid rgba(0,200,255,0.35)" : "1px solid #1f3b55" }}>
            <button onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: isOpen ? "rgba(0,200,255,0.18)" : "rgba(0,200,255,0.08)" }}>
                <BookOpen size={14} style={{ color: "#00c8ff" }} />
              </div>
              <span className="flex-1 font-semibold text-sm" style={{ color: isOpen ? "#00c8ff" : "#eaf6ff" }}>
                {tema.nombre}
              </span>
              <span style={{ color: "#7a9ab5" }}>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}>
                  <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid #1f3b55", paddingTop: "14px" }}>
                    {SECCIONES.map(({ key, label, color, bg }) => (
                      <div key={key} className="rounded-lg p-3" style={{ background: bg, border: `1px solid ${color}22` }}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color }}>
                          {label}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#c8dde8" }}>
                          {tema.seccion[key]}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ModuleView() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const modulo = modulos.find(m => m.id === id);

  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [pretestAnswers, setPretestAnswers] = useState<Record<number, number>>({});
  const [casoAnswer, setCasoAnswer] = useState("");
  const [postestAnswers, setPostestAnswers] = useState<Record<number, number>>({});
  const [unifiedAnswers, setUnifiedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [resultados, setResultados] = useState(getResultados());
  const [casosAnswers, setCasosAnswers] = useState<Record<string, number>>({});
  const [casosFinished, setCasosFinished] = useState<Record<number, boolean>>({});
  const [casosExpanded, setCasosExpanded] = useState<Record<number, boolean>>({ 0: true });

  const isUnified = id === "salud-mental";
  const hasCasosExtra = !!(modulo?.casosClinicosExtra?.length);
  const preguntasUnificadas = isUnified
    ? [...(modulos.find(m => m.id === id)?.preguntasPretest ?? []), ...(modulos.find(m => m.id === id)?.preguntasPostest ?? [])]
    : [];

  useEffect(() => {
    if (!modulo) setLocation("/dashboard");
  }, [id, modulo, setLocation]);

  if (!modulo) return null;

  const calculateScore = (answers: Record<number, number>, preguntas: Pregunta[]) => {
    if (!preguntas.length) return 0;
    const correct = preguntas.filter((p, i) => answers[i] === p.c).length;
    return Math.round((correct / preguntas.length) * 100);
  };

  const handleFinish = () => {
    let pretestScore: number;
    let postestScore: number;
    if (isUnified) {
      const nPre = modulo.preguntasPretest.length;
      const preAnswers: Record<number, number> = {};
      const postAnswers: Record<number, number> = {};
      Object.entries(unifiedAnswers).forEach(([k, v]) => {
        const idx = parseInt(k);
        if (idx < nPre) preAnswers[idx] = v;
        else postAnswers[idx - nPre] = v;
      });
      pretestScore = calculateScore(preAnswers, modulo.preguntasPretest);
      postestScore = calculateScore(postAnswers, modulo.preguntasPostest);
    } else {
      pretestScore = calculateScore(pretestAnswers, modulo.preguntasPretest);
      postestScore = calculateScore(postestAnswers, modulo.preguntasPostest);
    }
    const casoScore  = casoAnswer.toLowerCase().includes(modulo.respuestaCaso.toLowerCase()) ? 100 : 50;
    const finalScore = Math.round(pretestScore * 0.25 + casoScore * 0.25 + postestScore * 0.5);
    saveResultado(modulo.id, { pretest: pretestScore, caso: casoScore, juego: 0, postest: postestScore, final: finalScore, avance: 100 });
    setResultados(getResultados());
    setIsFinished(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderQuestions = (
    type: string,
    preguntas: Pregunta[],
    answers: Record<number, number>,
    setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>
  ) => (
    <div className="space-y-4">
      {preguntas.map((p, idx) => (
        <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
          className="rounded-xl p-4 border" style={{ background: "#0b1628", borderColor: "#1f3b55" }}>
          <p className="font-medium text-white mb-3 text-sm">
            <span style={{ color: "#00c8ff" }}>{idx + 1}.</span> {p.q}
          </p>
          <RadioGroup value={answers[idx]?.toString()} onValueChange={v => setAnswers(prev => ({ ...prev, [idx]: parseInt(v) }))} disabled={isFinished} className="space-y-2">
            {p.a.map((ans, aIdx) => (
              <div key={aIdx} className="flex items-center gap-3 p-2.5 rounded-lg"
                style={{ background: "transparent", border: "1px solid transparent" }}>
                <RadioGroupItem value={aIdx.toString()} id={`${type}-q${idx}-a${aIdx}`} />
                <Label htmlFor={`${type}-q${idx}-a${aIdx}`} className="cursor-pointer flex-1 text-sm" style={{ color: "#eaf6ff" }}>
                  {ans}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </motion.div>
      ))}
    </div>
  );

  const renderFeedback = (label: string, preguntas: Pregunta[], answers: Record<number, number>) => (
    <Card style={{ background: "#111c2e", borderColor: "rgba(0,200,100,0.3)" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white text-base">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,100,0.12)" }}>
            <CheckCircle2 size={16} style={{ color: "#00c864" }} />
          </div>
          Retroalimentación — {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {preguntas.map((p, idx) => {
            const userAns = answers[idx];
            const isCorrect = userAns === p.c;
            return (
              <div key={idx} className="rounded-xl p-4 border" style={{ background: "#0b1628", borderColor: isCorrect ? "rgba(0,200,100,0.3)" : "rgba(255,80,80,0.3)" }}>
                <p className="font-medium text-white mb-2 text-sm">
                  <span style={{ color: "#00c8ff" }}>{idx + 1}.</span> {p.q}
                </p>
                {userAns !== undefined && !isCorrect && (
                  <p className="text-xs mb-1" style={{ color: "#ff6b6b" }}>
                    ✗ Tu respuesta: {p.a[userAns]}
                  </p>
                )}
                <p className="text-xs font-bold" style={{ color: "#00c864" }}>
                  ✓ Respuesta correcta: {p.a[p.c]}
                </p>
                {p.e && (
                  <p className="text-xs leading-relaxed mt-2 pt-2" style={{ color: "#aec9db", borderTop: "1px solid #1f3b55" }}>{p.e}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const res = resultados[modulo.id];

  return (
    <Sidebar>
      <div className="max-w-3xl mx-auto pb-20">
        {/* Back */}
        <button onClick={() => setLocation("/dashboard")} className="flex items-center gap-2 text-sm mb-4 hover:opacity-80 transition-opacity" style={{ color: "#7a9ab5", background: "none", border: "none", cursor: "pointer" }}>
          <ArrowLeft size={16} /> Volver al Dashboard
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">{modulo.titulo}</h1>
          <p className="mt-1 text-sm" style={{ color: "#7a9ab5" }}>{modulo.desc}</p>
        </div>

        {/* Completed banner */}
        {(isFinished || res?.avance === 100) && res && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-4"
            style={{ background: "rgba(0,200,255,0.07)", border: "1px solid rgba(0,200,255,0.25)" }}>
            <CheckCircle2 size={28} style={{ color: "#00c8ff" }} />
            <div className="flex-1">
              <p className="font-bold text-white text-sm mb-2">Módulo Completado</p>
              <div className="flex flex-wrap gap-2">
                {[["Pretest", res.pretest], ["Caso", res.caso], ["Cuest.", res.juego], ["Postest", res.postest]].map(([l, v]) => (
                  <span key={l} className="text-xs px-2 py-1 rounded-md" style={{ background: "#0b1628", color: "#aec9db" }}>{l}: <b style={{ color: "#fff" }}>{v}%</b></span>
                ))}
                <span className="text-xs px-3 py-1 rounded-md font-bold" style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a" }}>Final: {res.final}%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab nav */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1" style={{ borderBottom: "1px solid #1f3b55" }}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: active ? "#111c2e" : "transparent",
                  color: active ? "#00c8ff" : "#7a9ab5",
                  borderBottom: active ? "2px solid #00c8ff" : "2px solid transparent",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: -1,
                }}>
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
          {(isFinished || res?.avance === 100) && (
            <button onClick={() => setActiveTab("resultados")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: activeTab === "resultados" ? "#111c2e" : "transparent",
                color: activeTab === "resultados" ? "#00c864" : "#7a9ab5",
                borderBottom: activeTab === "resultados" ? "2px solid #00c864" : "2px solid transparent",
                border: "none",
                cursor: "pointer",
                marginBottom: -1,
              }}>
              <CheckCircle2 size={15} />
              Resultados
            </button>
          )}
        </div>

        {/* Tab content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

          {/* ── INFORMACIÓN ── */}
          {activeTab === "info" && (
            <InfoTab moduloId={modulo.id} />
          )}

          {/* ── CASO CLÍNICO ── */}
          {activeTab === "caso" && (
            hasCasosExtra ? (
              /* Módulos con casos clínicos MCQ (Módulo 1, Módulo 8…) */
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#00c8a0" }}>
                  Casos Clínicos · {(modulo.casosClinicosExtra ?? []).length} casos · 5 preguntas c/u
                </p>
                {(modulo.casosClinicosExtra ?? []).map((caso: CasoClinico, ci: number) => {
                  const expanded = casosExpanded[ci] ?? false;
                  const finished = casosFinished[ci] ?? false;
                  const casoPregs = caso.preguntas;
                  const correct = finished
                    ? casoPregs.filter((p, pi) => casosAnswers[`${ci}-${pi}`] === p.c).length
                    : 0;
                  const score = finished ? Math.round((correct / casoPregs.length) * 100) : 0;
                  return (
                    <Card key={ci} style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
                      <CardHeader
                        className="cursor-pointer select-none"
                        onClick={() => setCasosExpanded(prev => ({ ...prev, [ci]: !prev[ci] }))}
                      >
                        <CardTitle className="flex items-center gap-3 text-white text-base">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,180,120,0.15)" }}>
                            <Stethoscope size={16} style={{ color: "#00c8a0" }} />
                          </div>
                          <span className="flex-1 text-sm">{caso.titulo}</span>
                          {finished && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: score >= 60 ? "rgba(0,200,100,0.15)" : "rgba(255,100,80,0.15)", color: score >= 60 ? "#00c864" : "#ff6b6b" }}>
                              {score}% ({correct}/{casoPregs.length})
                            </span>
                          )}
                          {expanded ? <ChevronUp size={16} style={{ color: "#7a9ab5" }} /> : <ChevronDown size={16} style={{ color: "#7a9ab5" }} />}
                        </CardTitle>
                      </CardHeader>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <CardContent className="pt-0">
                              <div className="rounded-xl p-4 mb-5 text-sm leading-relaxed" style={{ background: "rgba(0,180,120,0.06)", borderLeft: "3px solid rgba(0,180,120,0.4)", color: "#c0ddd4" }}>
                                {caso.descripcion}
                              </div>
                              <div className="space-y-4">
                                {casoPregs.map((p, pi) => {
                                  const ans = casosAnswers[`${ci}-${pi}`];
                                  return (
                                    <div key={pi} className="rounded-xl p-4 border" style={{ background: "#0b1628", borderColor: "#1f3b55" }}>
                                      <p className="font-medium text-white mb-3 text-sm">
                                        <span style={{ color: "#00c8a0" }}>{pi + 1}.</span> {p.q}
                                      </p>
                                      <RadioGroup
                                        value={ans?.toString()}
                                        onValueChange={v => !finished && setCasosAnswers(prev => ({ ...prev, [`${ci}-${pi}`]: parseInt(v) }))}
                                        disabled={finished}
                                        className="space-y-2"
                                      >
                                        {p.a.map((opt, ai) => {
                                          const isCorrect = finished && p.c === ai;
                                          const isWrong   = finished && ans === ai && p.c !== ai;
                                          return (
                                            <div key={ai} className="flex items-center gap-3 p-2.5 rounded-lg"
                                              style={{ background: isCorrect ? "rgba(0,200,100,0.12)" : isWrong ? "rgba(255,80,80,0.1)" : "transparent", border: isCorrect ? "1px solid rgba(0,200,100,0.35)" : isWrong ? "1px solid rgba(255,80,80,0.3)" : "1px solid transparent" }}>
                                              <RadioGroupItem value={ai.toString()} id={`caso${ci}-q${pi}-a${ai}`} />
                                              <Label htmlFor={`caso${ci}-q${pi}-a${ai}`} className="cursor-pointer flex-1 text-sm"
                                                style={{ color: isCorrect ? "#00c864" : isWrong ? "#ff6b6b" : "#eaf6ff" }}>
                                                {opt}
                                                {isCorrect && <span className="ml-2 text-xs font-bold" style={{ color: "#00c864" }}> ✓ Correcta</span>}
                                                {isWrong   && <span className="ml-2 text-xs font-bold" style={{ color: "#ff6b6b" }}> ✗ Incorrecta</span>}
                                              </Label>
                                            </div>
                                          );
                                        })}
                                      </RadioGroup>
                                      {finished && p.e && (
                                        <div className="mt-3 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(0,200,255,0.07)", borderLeft: "3px solid rgba(0,200,255,0.4)", color: "#a8d8ea" }}>
                                          <span className="font-semibold" style={{ color: "#00c8ff" }}>💡 Explicación: </span>{p.e}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </CardContent>
                            {!finished && (
                              <CardFooter>
                                <button
                                  onClick={() => setCasosFinished(prev => ({ ...prev, [ci]: true }))}
                                  className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                                  style={{ background: "linear-gradient(90deg,#00c8a0,#009e80)", color: "#001a14", border: "none", cursor: "pointer" }}>
                                  Ver Resultado del Caso {ci + 1}
                                </button>
                              </CardFooter>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-base">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                      <Stethoscope size={16} style={{ color: "#00c8ff" }} />
                    </div>
                    Caso Clínico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl p-5 leading-relaxed text-sm" style={{ background: "#0b1628", color: "#eaf6ff", border: "1px solid rgba(0,200,255,0.2)" }}>
                    {modulo.caso}
                  </div>
                  <div className="space-y-2">
                    <Label style={{ color: "#aec9db" }}>Tu diagnóstico y plan terapéutico:</Label>
                    <Textarea value={casoAnswer} onChange={e => setCasoAnswer(e.target.value)} disabled={isFinished}
                      placeholder="Escribe tu diagnóstico y conducta inicial aquí..."
                      className="min-h-[110px] text-sm"
                      style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff" }} />
                  </div>
                  {isFinished && (
                    <div className="rounded-xl p-4 text-sm" style={{
                      background: casoAnswer.toLowerCase().includes(modulo.respuestaCaso.toLowerCase()) ? "rgba(0,200,100,0.1)" : "rgba(255,180,0,0.08)",
                      border:     casoAnswer.toLowerCase().includes(modulo.respuestaCaso.toLowerCase()) ? "1px solid rgba(0,200,100,0.3)" : "1px solid rgba(255,180,0,0.3)",
                      color:      casoAnswer.toLowerCase().includes(modulo.respuestaCaso.toLowerCase()) ? "#00c864" : "#ffb300",
                    }}>
                      {casoAnswer.toLowerCase().includes(modulo.respuestaCaso.toLowerCase())
                        ? "✓ Diagnóstico correcto."
                        : `⚠ Diagnóstico esperado incluye: "${modulo.respuestaCaso}". Puntuación parcial (50%).`}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          )}

          {/* ── CUESTIONARIO ── */}
          {activeTab === "cuestionario" && (
            <div className="space-y-6">
              {isUnified ? (
                /* Módulo 8 — cuestionario unificado */
                <>
                  <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-base">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                          <ClipboardCheck size={16} style={{ color: "#00c8ff" }} />
                        </div>
                        Cuestionario
                        <span className="ml-auto text-xs font-normal px-2 py-1 rounded-full" style={{ background: "rgba(0,200,255,0.1)", color: "#00c8ff" }}>
                          {preguntasUnificadas.length} preguntas
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderQuestions("unified", preguntasUnificadas, unifiedAnswers, setUnifiedAnswers)}
                    </CardContent>
                    {!isFinished && (
                      <CardFooter>
                        <button onClick={handleFinish}
                          className="w-full py-3 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-[0.98]"
                          style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a", border: "none", cursor: "pointer" }}>
                          Finalizar y Evaluar Módulo
                        </button>
                      </CardFooter>
                    )}
                  </Card>

                  {/* Nota + Retroalimentación tras finalizar — módulo 8 */}
                  {isFinished && res && (
                    <>
                      <Card style={{ background: "#111c2e", borderColor: "rgba(0,200,100,0.3)" }}>
                        <CardContent className="pt-5">
                          <div className="flex flex-wrap gap-3 items-center">
                            <span className="text-sm font-semibold text-white mr-2">Tus resultados:</span>
                            <span className="px-3 py-1 rounded-md text-xs" style={{ background: "#0b1628", color: "#aec9db" }}>Sección 1: <b style={{ color: "#fff" }}>{res.pretest}%</b></span>
                            <span className="px-3 py-1 rounded-md text-xs" style={{ background: "#0b1628", color: "#aec9db" }}>Sección 2: <b style={{ color: "#fff" }}>{res.postest}%</b></span>
                            <span className="px-3 py-1 rounded-md text-xs font-bold" style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a" }}>Nota Final: {res.final}%</span>
                          </div>
                        </CardContent>
                      </Card>
                      {renderFeedback("Cuestionario", preguntasUnificadas, unifiedAnswers)}
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Preguntas primera sección */}
                  <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-base">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                          <ClipboardCheck size={16} style={{ color: "#00c8ff" }} />
                        </div>
                        <span className="ml-auto text-xs font-normal px-2 py-1 rounded-full" style={{ background: "rgba(0,200,255,0.1)", color: "#00c8ff" }}>
                          {modulo.preguntasPretest.length} preguntas
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderQuestions("pretest", modulo.preguntasPretest, pretestAnswers, setPretestAnswers)}
                    </CardContent>
                  </Card>

                  {/* Preguntas segunda sección */}
                  <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-base">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                          <FlaskConical size={16} style={{ color: "#00c8ff" }} />
                        </div>
                        <span className="ml-auto text-xs font-normal px-2 py-1 rounded-full" style={{ background: "rgba(0,200,255,0.1)", color: "#00c8ff" }}>
                          {modulo.preguntasPostest.length} preguntas
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderQuestions("postest", modulo.preguntasPostest, postestAnswers, setPostestAnswers)}
                    </CardContent>
                    {!isFinished && (
                      <CardFooter>
                        <button onClick={handleFinish}
                          className="w-full py-3 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-[0.98]"
                          style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a", border: "none", cursor: "pointer" }}>
                          Finalizar y Evaluar Módulo
                        </button>
                      </CardFooter>
                    )}
                  </Card>

                  {/* Nota + Retroalimentación tras finalizar */}
                  {isFinished && res && (
                    <>
                      <Card style={{ background: "#111c2e", borderColor: "rgba(0,200,100,0.3)" }}>
                        <CardContent className="pt-5">
                          <div className="flex flex-wrap gap-3 items-center">
                            <span className="text-sm font-semibold text-white mr-2">Tus resultados:</span>
                            <span className="px-3 py-1 rounded-md text-xs" style={{ background: "#0b1628", color: "#aec9db" }}>Sección 1: <b style={{ color: "#fff" }}>{res.pretest}%</b></span>
                            <span className="px-3 py-1 rounded-md text-xs" style={{ background: "#0b1628", color: "#aec9db" }}>Sección 2: <b style={{ color: "#fff" }}>{res.postest}%</b></span>
                            <span className="px-3 py-1 rounded-md text-xs font-bold" style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a" }}>Nota Final: {res.final}%</span>
                          </div>
                        </CardContent>
                      </Card>
                      {renderFeedback("Sección 1", modulo.preguntasPretest, pretestAnswers)}
                      {renderFeedback("Sección 2", modulo.preguntasPostest, postestAnswers)}
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {/* ── RULETA ── */}
          {activeTab === "ruleta" && (
            <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-base">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                    <CircleDot size={16} style={{ color: "#00c8ff" }} />
                  </div>
                  Ruleta de Preguntas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Ruleta preguntas={[...modulo.preguntasJuego, ...modulo.preguntasPretest.slice(0, 3)]} moduloId={modulo.id} />
              </CardContent>
            </Card>
          )}

          {/* ── CALCULADORA ── */}
          {activeTab === "calculadora" && (
            <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-base">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                    <Calculator size={16} style={{ color: "#00c8ff" }} />
                  </div>
                  Calculadora Clínica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calculadora calculadoraId={modulo.calculadoraId} />
              </CardContent>
            </Card>
          )}

          {/* ── RESULTADOS ── solo visible tras completar */}
          {activeTab === "resultados" && (isFinished || res?.avance === 100) && res && (
            <div className="space-y-6">
              {/* Puntajes */}
              <Card style={{ background: "#111c2e", borderColor: "rgba(0,200,100,0.3)" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-base">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,200,100,0.12)" }}>
                      <CheckCircle2 size={16} style={{ color: "#00c864" }} />
                    </div>
                    Calificaciones del Módulo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {([["Sección 1", res.pretest], ["Caso Clínico", res.caso], ["Ruleta", res.juego], ["Sección 2", res.postest]] as [string, number][]).map(([l, v]) => (
                      <div key={l} className="flex flex-col items-center px-4 py-3 rounded-xl" style={{ background: "#0b1628", border: "1px solid #1f3b55", minWidth: 90 }}>
                        <span className="text-xs mb-1" style={{ color: "#7a9ab5" }}>{l}</span>
                        <span className="text-lg font-bold text-white">{v}%</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center px-4 py-3 rounded-xl" style={{ background: "linear-gradient(135deg,rgba(0,200,255,0.15),rgba(0,150,200,0.15))", border: "1px solid rgba(0,200,255,0.4)", minWidth: 90 }}>
                      <span className="text-xs mb-1" style={{ color: "#00c8ff" }}>Nota Final</span>
                      <span className="text-lg font-bold" style={{ color: "#00c8ff" }}>{res.final}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </motion.div>
      </div>
    </Sidebar>
  );
}
