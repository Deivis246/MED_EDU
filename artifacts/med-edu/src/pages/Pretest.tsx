import { useState } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import { pretestGeneral } from "@/data/generalTest";
import { getSpecialtyBreakdown } from "@/data/specialtyClassifier";
import { setPretestGeneral } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const specialtyStats = getSpecialtyBreakdown(pretestGeneral);

const maxCount = Math.max(...specialtyStats.map(s => s.count));

export default function Pretest() {
  const [, setLocation] = useLocation();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const handleFinish = () => {
    const c = pretestGeneral.filter((q, i) => answers[i] === q.c).length;
    setPretestGeneral(Math.round((c / pretestGeneral.length) * 100), answers);
    setFinished(true);
  };

  const correct = finished
    ? pretestGeneral.filter((q, i) => answers[i] === q.c).length
    : 0;
  const score = finished ? Math.round((correct / pretestGeneral.length) * 100) : 0;

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
            <ClipboardCheck size={24} style={{ color: "#00c8ff" }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Pretest General</h1>
            <p style={{ color: "#7a9ab5" }}>Evalúa tus conocimientos previos — <span className="font-semibold text-white">{pretestGeneral.length} preguntas</span> en {specialtyStats.length} especialidades</p>
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
              <p className="text-sm mb-1" style={{ color: "#7a9ab5" }}>Resultado del Pretest General</p>
              <p className="text-4xl font-black text-white">{score}<span className="text-xl font-normal" style={{ color: "#7a9ab5" }}>/100</span></p>
              <p className="text-sm mt-1" style={{ color: "#7a9ab5" }}>
                {correct} de {pretestGeneral.length} respuestas correctas
              </p>
            </div>
          </motion.div>
        )}

        <Card style={{ background: "#111c2e", borderColor: "#1f3b55" }}>
          <CardContent className="pt-6 space-y-6">
            {pretestGeneral.map((p, i) => (
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
                        <RadioGroupItem value={ai.toString()} id={`pre-${i}-${ai}`} />
                        <Label htmlFor={`pre-${i}-${ai}`} className="cursor-pointer flex-1" style={{ color: isCorrect ? "#00c864" : isWrong ? "#ff6b6b" : "#eaf6ff" }}>
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
            Finalizar Pretest General
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
