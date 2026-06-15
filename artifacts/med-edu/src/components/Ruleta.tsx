import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Pregunta } from "@/data/modules";

interface RuletaProps {
  preguntas: Pregunta[];
  moduloId: string;
}

const SEGMENT_COLORS = [
  "#00c8ff", "#0a4a6a", "#00a8d4", "#063a52",
  "#0090b8", "#052e42", "#007a99", "#041e2e",
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function segmentPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M${cx},${cy} L${start.x},${start.y} A${r},${r} 0 ${large} 1 ${end.x},${end.y} Z`;
}

export default function Ruleta({ preguntas, moduloId }: RuletaProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const spinCount = useRef(0);

  const n = preguntas.length;
  const segAngle = 360 / n;
  const CX = 150, CY = 150, R = 140;

  const handleSpin = () => {
    if (spinning) return;
    setAnswer(null);
    setRevealed(false);
    setSelectedIdx(null);
    spinCount.current += 1;

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomOffset = Math.floor(Math.random() * 360);
    const newRotation = rotation + extraSpins * 360 + randomOffset;
    setRotation(newRotation);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      // pointer is at top (12 o'clock). Wheel rotated by newRotation.
      // Which segment is under the pointer?
      const normalized = ((newRotation % 360) + 360) % 360;
      const idx = Math.floor(((360 - normalized) % 360) / segAngle) % n;
      setSelectedIdx(idx);
    }, 3500);
  };

  const currentQ = selectedIdx !== null ? preguntas[selectedIdx] : null;

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-sm text-center" style={{ color: "#7a9ab5" }}>
        Gira la ruleta para obtener una pregunta aleatoria del módulo.
      </p>

      {/* Wheel container */}
      <div className="relative" style={{ width: 320, height: 320 }}>
        {/* Pointer */}
        <div
          className="absolute left-1/2 z-10"
          style={{
            top: -8,
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "28px solid #00c8ff",
            filter: "drop-shadow(0 0 6px #00c8ff)",
          }}
        />

        {/* SVG Wheel */}
        <motion.svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          style={{ margin: "0 auto", display: "block" }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3.5, ease: [0.17, 0.67, 0.35, 1.0] }}
        >
          {/* Shadow circle */}
          <circle cx={CX} cy={CY} r={R + 4} fill="none" stroke="rgba(0,200,255,0.15)" strokeWidth="6" />

          {/* Segments */}
          {preguntas.map((p, i) => {
            const startDeg = i * segAngle;
            const endDeg = (i + 1) * segAngle;
            const midDeg = startDeg + segAngle / 2;
            const textPos = polarToCartesian(CX, CY, R * 0.65, midDeg);
            const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];

            return (
              <g key={i}>
                <path
                  d={segmentPath(CX, CY, R, startDeg, endDeg)}
                  fill={color}
                  stroke="#07111f"
                  strokeWidth="2"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={i % 2 === 0 ? "#07111f" : "#00c8ff"}
                  transform={`rotate(${midDeg}, ${textPos.x}, ${textPos.y})`}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* Center hub */}
          <circle cx={CX} cy={CY} r={22} fill="#07111f" stroke="#00c8ff" strokeWidth="2.5" />
          <text x={CX} y={CY} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#00c8ff" fontWeight="bold">
            GIRAR
          </text>
        </motion.svg>

        {/* Spin button overlay */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="absolute inset-0 w-full h-full rounded-full cursor-pointer"
          style={{ background: "transparent", border: "none" }}
        />
      </div>

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="px-8 py-3 rounded-xl font-bold text-base transition-all duration-200"
        style={{
          background: spinning ? "#1f3b55" : "linear-gradient(90deg,#00c8ff,#0096c7)",
          color: spinning ? "#7a9ab5" : "#00111a",
          border: "none",
          cursor: spinning ? "not-allowed" : "pointer",
        }}
      >
        {spinning ? "Girando..." : selectedIdx !== null ? "Girar de nuevo" : "¡Girar!"}
      </button>

      {/* Question result */}
      {currentQ && !spinning && (
        <motion.div
          key={selectedIdx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-2xl p-5"
          style={{ background: "#0b1628", border: "1px solid rgba(0,200,255,0.25)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(0,200,255,0.15)", color: "#00c8ff" }}>
              {(selectedIdx ?? 0) + 1}
            </span>
            <p className="font-semibold text-white text-sm">{currentQ.q}</p>
          </div>

          {!revealed ? (
            <>
              <RadioGroup
                value={answer?.toString()}
                onValueChange={(v) => setAnswer(parseInt(v))}
                className="space-y-2 mb-4"
              >
                {currentQ.a.map((opt, ai) => (
                  <div key={ai} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: "#111c2e" }}>
                    <RadioGroupItem value={ai.toString()} id={`ruleta-${moduloId}-${selectedIdx}-${ai}`} />
                    <Label htmlFor={`ruleta-${moduloId}-${selectedIdx}-${ai}`} className="cursor-pointer text-sm" style={{ color: "#eaf6ff" }}>
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <button
                onClick={() => setRevealed(true)}
                disabled={answer === null}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: answer === null ? "#1f3b55" : "rgba(0,200,255,0.15)",
                  color: answer === null ? "#4a6478" : "#00c8ff",
                  border: "1px solid rgba(0,200,255,0.2)",
                  cursor: answer === null ? "not-allowed" : "pointer",
                }}
              >
                Revelar respuesta
              </button>
            </>
          ) : (
            <div className="space-y-2">
              {currentQ.a.map((opt, ai) => {
                const isCorrect = ai === currentQ.c;
                const isWrong = ai === answer && answer !== currentQ.c;
                return (
                  <div
                    key={ai}
                    className="flex items-center gap-2 p-2.5 rounded-lg text-sm"
                    style={{
                      background: isCorrect ? "rgba(0,200,100,0.12)" : isWrong ? "rgba(255,80,80,0.1)" : "transparent",
                      border: isCorrect ? "1px solid rgba(0,200,100,0.35)" : isWrong ? "1px solid rgba(255,80,80,0.3)" : "1px solid transparent",
                      color: isCorrect ? "#00c864" : isWrong ? "#ff6b6b" : "#7a9ab5",
                    }}
                  >
                    {isCorrect ? "✓" : isWrong ? "✗" : "·"} {opt}
                    {isCorrect && <span className="ml-auto text-xs font-bold" style={{ color: "#00c864" }}>Correcta</span>}
                  </div>
                );
              })}
              <div
                className="mt-3 p-3 rounded-lg text-sm font-semibold text-center"
                style={{
                  background: answer === currentQ.c ? "rgba(0,200,100,0.12)" : "rgba(255,80,80,0.1)",
                  color: answer === currentQ.c ? "#00c864" : "#ff6b6b",
                }}
              >
                {answer === currentQ.c ? "¡Correcto! 🎯" : "Incorrecto — repasa el contenido del módulo"}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
