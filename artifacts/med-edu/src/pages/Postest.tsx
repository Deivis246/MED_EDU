import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import { postestGeneral } from "@/data/generalTest";
import { getSpecialtyBreakdown } from "@/data/specialtyClassifier";
import { setPostestGeneral } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FlaskConical, CheckCircle2, Lock } from "lucide-react";
import { motion } from "framer-motion";

const specialtyStats = getSpecialtyBreakdown(postestGeneral);

const PIN = "2222";

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleDigit = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    setError(false);
    if (val && idx < 3) {
      const el = document.getElementById(`pin-${idx + 1}`);
      el?.focus();
    }
    if (next.every(d => d !== "") && (val || idx === 3)) {
      const code = [...next.slice(0, idx), val, ...next.slice(idx + 1)].join("");
      if (code.length === 4) {
        if (code === PIN) {
          onUnlock();
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => { setDigits(["", "", "", ""]); setShake(false); document.getElementById("pin-0")?.focus(); }, 500);
        }
      }
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      document.getElementById(`pin-${idx - 1}`)?.focus();
    }
  };

  return (
    <Sidebar>
      <div className="max-w-sm mx-auto mt-20 space-y-6 text-center">
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,200,255,0.12)" }}>
            <Lock size={28} style={{ color: "#00c8ff" }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Acceso al Postest</h1>
          <p className="text-sm mb-8" style={{ color: "#7a9ab5" }}>Ingresa la clave de 4 dígitos para continuar</p>

          <div className="flex justify-center gap-3 mb-6">
            {digits.map((d, i) => (
              <input
                key={i}
                id={`pin-${i}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={d}
                autoFocus={i === 0}
                onChange={e => handleDigit(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-14 h-14 text-center text-2xl font-bold rounded-xl outline-none transition-all"
                style={{
                  background: "#111c2e",
                  border: `2px solid ${error ? "rgba(255,80,80,0.6)" : d ? "rgba(0,200,255,0.6)" : "rgba(31,59,85,1)"}`,
                  color: "#fff",
                  caretColor: "transparent",
                }}
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium"
              style={{ color: "#ff6b6b" }}
            >
              Clave incorrecta. Intenta de nuevo.
            </motion.p>
          )}
        </motion.div>
      </div>
    </Sidebar>
  );
}

const maxCount = Math.max(...specialtyStats.map(s => s.count));

export default function Postest() {
  const [, setLocation] = useLocation();
  const [unlocked, setUnlocked] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  const handleFinish = () => {
    const c = postestGeneral.filter((q, i) => answers[i] === q.c).length;

    const formattedAnswers: Record<number, string> = {};
    for (let i = 0; i < postestGeneral.length; i++) {
      if (answers[i] === postestGeneral[i].c) {
        formattedAnswers[i] = "CORRECTO";
      } else {
        formattedAnswers[i] = "INCORRECTO";
      }
    }

    setPostestGeneral(Math.round((c / postestGeneral.length) * 100), formattedAnswers);
    setFinished(true);
  };

  const correct = finished
    ? postestGeneral.filter((q, i) => answers[i] === q.c).length
    : 0;
  const score = finished ? Math.round((correct / postestGeneral.length) * 100) : 0;

  return (
    <Sidebar>
      <div className="max-w-3xl mx-auto space-y-6 pb-20">
        <button
          onClick={() => setLocation("/dashboard")}
          className="flex items-center gap-2 text-sm mb-2 transition-opacity hover:opacity-80"
          style={{ color: "#7a9ab5", background: "none", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={16} /> Volver al Dashboard
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
            <FlaskConical size={24} style={{ color: "#00c8ff" }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Postest General</h1>
            <p style={{ color: "#7a9ab5" }}>Evaluación final — <span className="font-semibold text-white">{postestGeneral.length} preguntas</span> en {specialtyStats.length} especialidades</p>
          </div>
        </div>

        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(0,200,255,0.2)", background: "#0a1525" }}>
          <div className="px-5 py-3 border-b" style={{ borderColor: "rgba(0,200,255,0.15)", background: "rgba(0,200,255,0.07)" }}>
            <span className="text-sm font-semibold text-white">Preguntas por especialidad</span>
          </div>
          <div className="px-5 py-4 grid grid-cols-1 gap-2">
            {specialtyStats.map(({ name, count }) => (
              <div key={name} className="flex items-center gap-3">
                <span className="text-xs w-44 flex-shrink-0 text-right" style={{ color: "#7a9ab5" }}>{name}</span>
                <div className="flex-1 rounded-full overflow-hidden h-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%`, background: "linear-gradient(90deg,#00c8ff,#0096c7)" }}
                  />
                </div>
                <span className="text-xs font-bold w-6 text-right text-white">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {finished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-6 flex items-center gap-5"
            style={{ background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.25)" }}
          >
            <CheckCircle2 size={36} style={{ color: "#00c8ff" }} />
            <div>
              <p className="text-sm mb-1" style={{ color: "#7a9ab5" }}>Resultado del Postest General</p>
              <p className="text-4xl font-black text-white">{score}<span className="text-xl font-normal" style={{ color: "#7a9ab5" }}>/100</span></p>
              <p className="text-sm mt-1" style={{ color: "#7a9ab5" }}>
                {correct} de {postestGeneral.length} respuestas correctas
              </p>
            </div>
          </motion.div>
        )}

        <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
          <CardContent className="pt-6 space-y-6">
            {postestGeneral.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="rounded-xl p-4 border"
                style={{ background: "#0b1628", borderColor: "#1f3b55" }}
              >
                <p className="font-medium text-white mb-3">
                  <span style={{ color: "#00c8ff" }}>{i + 1}.</span> {p.q}
                </p>
                <RadioGroup
                  value={answers[i]?.toString()}
                  onValueChange={(val) => !finished && setAnswers(prev => ({ ...prev, [i]: parseInt(val) }))}
                  disabled={finished}
                  className="space-y-2"
                >
                  {p.a.map((ans, ai) => {
                    const isCorrect = finished && p.c === ai;
                    const isWrong = finished && answers[i] === ai && p.c !== ai;
                    return (
                      <div
                        key={ai}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{
                          background: isCorrect ? "rgba(0,200,100,0.12)" : isWrong ? "rgba(255,80,80,0.1)" : "transparent",
                          border: isCorrect ? "1px solid rgba(0,200,100,0.35)" : isWrong ? "1px solid rgba(255,80,80,0.3)" : "1px solid transparent"
                        }}
                      >
                        <RadioGroupItem value={ai.toString()} id={`post-${i}-${ai}`} />
                        <Label htmlFor={`post-${i}-${ai}`} className="cursor-pointer flex-1" style={{ color: isCorrect ? "#00c864" : isWrong ? "#ff6b6b" : "#eaf6ff" }}>
                          {ans}
                          {isCorrect && <span className="ml-2 text-xs font-semibold" style={{ color: "#00c864" }}> ✓ Correcta</span>}
                          {isWrong && <span className="ml-2 text-xs font-semibold" style={{ color: "#ff6b6b" }}> ✗ Incorrecta</span>}
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
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {!finished && (
          <button
            onClick={handleFinish}
            className="w-full py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
            style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a", border: "none", cursor: "pointer" }}
          >
            Finalizar Postest General
          </button>
        )}
        {finished && (
          <button
            onClick={() => setLocation("/dashboard")}
            className="w-full py-4 rounded-xl font-bold text-base transition-all duration-200 hover:opacity-90"
            style={{ background: "#111c2e", color: "#00c8ff", border: "1px solid rgba(0,200,255,0.3)", cursor: "pointer" }}
          >
            Volver al Dashboard
          </button>
        )}
      </div>
    </Sidebar>
  );
}
