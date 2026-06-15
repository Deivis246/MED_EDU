import { useState, type ReactElement } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface CalculadoraProps {
  calculadoraId: string;
}

interface ResultadoCalc {
  valor: string;
  interpretacion: string;
  color: "cyan" | "green" | "yellow" | "red";
  detalles?: string[];
}

/* ---- IMC ---- */
function CalcIMC() {
  const [peso, setPeso] = useState("");
  const [talla, setTalla] = useState("");
  const [result, setResult] = useState<ResultadoCalc | null>(null);

  const calcular = () => {
    const p = parseFloat(peso), t = parseFloat(talla) / 100;
    if (!p || !t || t <= 0) return;
    const imc = p / (t * t);
    let inter = "", color: ResultadoCalc["color"] = "cyan";
    if (imc < 18.5) { inter = "Bajo peso — evaluar causa y nutrición"; color = "yellow"; }
    else if (imc < 25) { inter = "Peso normal — mantener hábitos saludables"; color = "green"; }
    else if (imc < 30) { inter = "Sobrepeso — cambios en estilo de vida"; color = "yellow"; }
    else if (imc < 35) { inter = "Obesidad grado I — intervención terapéutica"; color = "red"; }
    else if (imc < 40) { inter = "Obesidad grado II — tratamiento multidisciplinario"; color = "red"; }
    else { inter = "Obesidad grado III (mórbida) — valorar cirugía bariátrica"; color = "red"; }
    setResult({ valor: `${imc.toFixed(1)} kg/m²`, interpretacion: inter, color, detalles: [`Peso: ${p} kg`, `Talla: ${(t * 100).toFixed(0)} cm`] });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>Calculadora de Índice de Masa Corporal (IMC)</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label style={{ color: "#aec9db", fontSize: "0.8rem" }}>Peso (kg)</Label>
          <Input value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ej. 75" type="number" style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff" }} />
        </div>
        <div className="space-y-1">
          <Label style={{ color: "#aec9db", fontSize: "0.8rem" }}>Talla (cm)</Label>
          <Input value={talla} onChange={e => setTalla(e.target.value)} placeholder="Ej. 170" type="number" style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff" }} />
        </div>
      </div>
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- Holliday-Segar (Pediatría) ---- */
function CalcHolliday() {
  const [peso, setPeso] = useState("");
  const [result, setResult] = useState<ResultadoCalc | null>(null);

  const calcular = () => {
    const p = parseFloat(peso);
    if (!p || p <= 0) return;
    let ml = 0;
    if (p <= 10) ml = p * 100;
    else if (p <= 20) ml = 1000 + (p - 10) * 50;
    else ml = 1500 + (p - 20) * 20;
    const mlh = ml / 24;
    setResult({
      valor: `${ml.toFixed(0)} mL/día`,
      interpretacion: "Requerimiento de líquidos por fórmula de Holliday-Segar",
      color: "cyan",
      detalles: [
        `Peso: ${p} kg`,
        `Por hora: ${mlh.toFixed(1)} mL/h`,
        `Regla 4-2-1: ${p <= 10 ? p * 4 : p <= 20 ? 40 + (p - 10) * 2 : 60 + (p - 20)} mL/h`,
      ],
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>Requerimiento de Líquidos IV — Holliday-Segar</p>
      <div className="space-y-1">
        <Label style={{ color: "#aec9db", fontSize: "0.8rem" }}>Peso del niño (kg)</Label>
        <Input value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ej. 15" type="number" style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff" }} />
      </div>
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- Naegele FPP ---- */
function CalcNaegele() {
  const [fur, setFur] = useState("");
  const [result, setResult] = useState<ResultadoCalc | null>(null);

  const calcular = () => {
    if (!fur) return;
    const date = new Date(fur);
    if (isNaN(date.getTime())) return;
    const fpp = new Date(date);
    fpp.setMonth(fpp.getMonth() + 9);
    fpp.setDate(fpp.getDate() + 7);
    const hoy = new Date();
    const semanasGest = Math.floor((hoy.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7));
    const diasRest = Math.max(0, Math.floor((fpp.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)));
    const opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    setResult({
      valor: fpp.toLocaleDateString("es-ES", opts),
      interpretacion: `Fecha Probable de Parto (Regla de Naegele)`,
      color: semanasGest >= 37 ? "green" : semanasGest >= 28 ? "cyan" : "yellow",
      detalles: [
        `FUR: ${date.toLocaleDateString("es-ES", opts)}`,
        `Semanas de gestación: ${semanasGest >= 0 ? semanasGest : "—"}`,
        `Días restantes para FPP: ${diasRest}`,
        semanasGest < 37 ? "Pretérmino (<37 sem)" : semanasGest <= 42 ? "A término (37-42 sem)" : "Postérmino (>42 sem)",
      ],
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>Fecha Probable de Parto — Regla de Naegele</p>
      <div className="space-y-1">
        <Label style={{ color: "#aec9db", fontSize: "0.8rem" }}>Fecha de Última Regla (FUR)</Label>
        <Input value={fur} onChange={e => setFur(e.target.value)} type="date" style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff" }} />
      </div>
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- Alvarado (Cirugía) ---- */
function CalcAlvarado() {
  const items = [
    { label: "Migración del dolor a FID", pts: 1 },
    { label: "Anorexia", pts: 1 },
    { label: "Náuseas / Vómitos", pts: 1 },
    { label: "Dolor a la palpación en FID", pts: 2 },
    { label: "Rebote (Blumberg) positivo", pts: 1 },
    { label: "Temperatura >37.3°C", pts: 1 },
    { label: "Leucocitosis >10.000/mm³", pts: 2 },
    { label: "Desviación a la izquierda en diferencial", pts: 1 },
  ];
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));
  const [result, setResult] = useState<ResultadoCalc | null>(null);

  const toggle = (i: number) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));

  const calcular = () => {
    const score = items.reduce((s, item, i) => s + (checked[i] ? item.pts : 0), 0);
    let inter = "", color: ResultadoCalc["color"] = "cyan";
    if (score <= 3) { inter = "Baja probabilidad de apendicitis — observación y reevaluación"; color = "green"; }
    else if (score <= 6) { inter = "Probabilidad intermedia — considerar TC abdominal o ecografía"; color = "yellow"; }
    else { inter = "Alta probabilidad de apendicitis — indicación quirúrgica"; color = "red"; }
    setResult({ valor: `${score} / 10 puntos`, interpretacion: inter, color });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>Score de Alvarado — Probabilidad de Apendicitis</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors" style={{ background: checked[i] ? "rgba(0,200,255,0.1)" : "#0b1628", border: `1px solid ${checked[i] ? "rgba(0,200,255,0.3)" : "#1f3b55"}` }}>
            <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="accent-cyan-400" />
            <span className="text-sm flex-1" style={{ color: "#eaf6ff" }}>{item.label}</span>
            <span className="text-xs font-bold" style={{ color: "#00c8ff" }}>+{item.pts}</span>
          </label>
        ))}
      </div>
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- Glasgow (Emergencias) ---- */
function CalcGlasgow() {
  const ocular = [{ v: 4, l: "4 — Espontánea" }, { v: 3, l: "3 — A la voz" }, { v: 2, l: "2 — Al dolor" }, { v: 1, l: "1 — Ausente" }];
  const verbal = [{ v: 5, l: "5 — Orientado" }, { v: 4, l: "4 — Confuso" }, { v: 3, l: "3 — Palabras inapropiadas" }, { v: 2, l: "2 — Sonidos incomprensibles" }, { v: 1, l: "1 — Ausente" }];
  const motor = [{ v: 6, l: "6 — Obedece órdenes" }, { v: 5, l: "5 — Localiza dolor" }, { v: 4, l: "4 — Retira al dolor" }, { v: 3, l: "3 — Flexión anormal" }, { v: 2, l: "2 — Extensión" }, { v: 1, l: "1 — Ausente" }];

  const [o, setO] = useState("");
  const [v, setV] = useState("");
  const [m, setM] = useState("");
  const [result, setResult] = useState<ResultadoCalc | null>(null);

  const calcular = () => {
    const ov = parseInt(o), vv = parseInt(v), mv = parseInt(m);
    if (!ov || !vv || !mv) return;
    const total = ov + vv + mv;
    let inter = "", color: ResultadoCalc["color"] = "cyan";
    if (total >= 14) { inter = "Leve — monitorización y reevaluación"; color = "green"; }
    else if (total >= 9) { inter = "Moderado — hospitalización, evaluación neuroquirúrgica"; color = "yellow"; }
    else { inter = "Severo — UCI, manejo de vía aérea, neurocirugía urgente"; color = "red"; }
    setResult({ valor: `${total} / 15 puntos`, interpretacion: inter, color, detalles: [`Ocular: ${ov}`, `Verbal: ${vv}`, `Motor: ${mv}`] });
  };

  const selectStyle = { background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff", padding: "10px", borderRadius: "8px", width: "100%" };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>Escala de Coma de Glasgow (GCS)</p>
      {[["Apertura Ocular (O)", ocular, o, setO], ["Respuesta Verbal (V)", verbal, v, setV], ["Respuesta Motora (M)", motor, m, setM]].map(([lbl, opts, val, setter]: any) => (
        <div key={lbl} className="space-y-1">
          <Label style={{ color: "#aec9db", fontSize: "0.8rem" }}>{lbl}</Label>
          <select value={val} onChange={e => setter(e.target.value)} style={selectStyle}>
            <option value="">Seleccionar...</option>
            {opts.map((o: any) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
      ))}
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- Epidemiología (Salud Pública) ---- */
function CalcEpi() {
  const [casosExp, setCasosExp] = useState("");
  const [totalExp, setTotalExp] = useState("");
  const [casosNoExp, setCasosNoExp] = useState("");
  const [totalNoExp, setTotalNoExp] = useState("");
  const [result, setResult] = useState<ResultadoCalc | null>(null);

  const calcular = () => {
    const ce = parseFloat(casosExp), te = parseFloat(totalExp), cne = parseFloat(casosNoExp), tne = parseFloat(totalNoExp);
    if (!ce || !te || !cne || !tne) return;
    const ie = ce / te;
    const ine = cne / tne;
    const rr = ie / ine;
    let inter = "", color: ResultadoCalc["color"] = "cyan";
    if (rr > 1) { inter = `Factor de RIESGO: los expuestos tienen ${rr.toFixed(2)}x más probabilidad de enfermar`; color = "red"; }
    else if (rr < 1) { inter = `Factor PROTECTOR: los expuestos tienen ${(1 / rr).toFixed(2)}x menos probabilidad de enfermar`; color = "green"; }
    else { inter = "Sin asociación (RR = 1)"; color = "cyan"; }
    setResult({
      valor: `RR = ${rr.toFixed(2)}`,
      interpretacion: inter,
      color,
      detalles: [
        `Incidencia expuestos: ${(ie * 100).toFixed(2)}%`,
        `Incidencia no expuestos: ${(ine * 100).toFixed(2)}%`,
        `Riesgo atribuible: ${((ie - ine) * 100).toFixed(2)}%`,
      ],
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>Cálculo de Riesgo Relativo (RR) — Estudio de Cohorte</p>
      <div className="grid grid-cols-2 gap-4">
        {[["Casos (expuestos)", casosExp, setCasosExp], ["Total expuestos", totalExp, setTotalExp], ["Casos (no expuestos)", casosNoExp, setCasosNoExp], ["Total no expuestos", totalNoExp, setTotalNoExp]].map(([lbl, val, setter]: any) => (
          <div key={lbl} className="space-y-1">
            <Label style={{ color: "#aec9db", fontSize: "0.8rem" }}>{lbl}</Label>
            <Input value={val} onChange={e => setter(e.target.value)} placeholder="0" type="number" style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff" }} />
          </div>
        ))}
      </div>
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- Bioética — Checklist Consentimiento ---- */
function CalcConsentimiento() {
  const items = [
    "El paciente comprende el diagnóstico",
    "Se explicó el procedimiento o tratamiento",
    "Se describieron los riesgos y beneficios",
    "Se presentaron alternativas terapéuticas",
    "El paciente pudo hacer preguntas",
    "No hay coacción ni presión familiar/médica",
    "El paciente es mayor de edad o tiene representante legal",
    "El paciente está consciente y orientado",
    "Se entregó copia del documento firmado",
    "Se documentó en historia clínica",
  ];
  const [checked, setChecked] = useState<boolean[]>(new Array(items.length).fill(false));
  const [result, setResult] = useState<ResultadoCalc | null>(null);
  const toggle = (i: number) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));

  const calcular = () => {
    const score = checked.filter(Boolean).length;
    let inter = "", color: ResultadoCalc["color"] = "cyan";
    if (score === 10) { inter = "Consentimiento informado COMPLETO y válido"; color = "green"; }
    else if (score >= 7) { inter = "Consentimiento INCOMPLETO — completar ítems faltantes antes del procedimiento"; color = "yellow"; }
    else { inter = "Consentimiento DEFICIENTE — no proceder sin completar los requisitos"; color = "red"; }
    setResult({ valor: `${score} / 10 ítems`, interpretacion: inter, color });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>Checklist de Consentimiento Informado</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <label key={i} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ background: checked[i] ? "rgba(0,200,100,0.08)" : "#0b1628", border: `1px solid ${checked[i] ? "rgba(0,200,100,0.25)" : "#1f3b55"}` }}>
            <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="accent-cyan-400" />
            <span className="text-sm" style={{ color: "#eaf6ff" }}>{item}</span>
          </label>
        ))}
      </div>
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- PHQ-9 (Salud Mental) ---- */
function CalcPHQ9() {
  const preguntas = [
    "Poco interés o placer en hacer cosas",
    "Se ha sentido decaído, deprimido o sin esperanzas",
    "Dificultad para dormir, o duerme demasiado",
    "Se ha sentido cansado o con poca energía",
    "Sin apetito o comiendo en exceso",
    "Se ha sentido mal consigo mismo, que es un fracaso",
    "Dificultad para concentrarse en actividades",
    "Se mueve o habla tan despacio que los demás lo notan; o inquieto",
    "Pensamientos de que sería mejor estar muerto o hacerse daño",
  ];
  const opciones = ["0 — Para nada", "1 — Varios días", "2 — Más de la mitad de días", "3 — Casi todos los días"];
  const [vals, setVals] = useState<string[]>(new Array(9).fill(""));
  const [result, setResult] = useState<ResultadoCalc | null>(null);

  const setVal = (i: number, v: string) => setVals(prev => prev.map((x, idx) => idx === i ? v : x));

  const calcular = () => {
    if (vals.some(v => v === "")) return;
    const score = vals.reduce((s, v) => s + parseInt(v), 0);
    let inter = "", color: ResultadoCalc["color"] = "cyan";
    if (score <= 4) { inter = "Sin depresión o mínima — monitorizar"; color = "green"; }
    else if (score <= 9) { inter = "Depresión leve — intervención psicoeducativa, seguimiento"; color = "cyan"; }
    else if (score <= 14) { inter = "Depresión moderada — evaluar inicio de tratamiento (ISRS + TCC)"; color = "yellow"; }
    else if (score <= 19) { inter = "Depresión moderada-severa — tratamiento farmacológico obligatorio"; color = "red"; }
    else { inter = "Depresión severa — tratamiento intensivo, valorar hospitalización"; color = "red"; }
    const q9 = parseInt(vals[8]);
    setResult({ valor: `${score} / 27 puntos`, interpretacion: inter, color, detalles: q9 > 0 ? ["⚠ Ítem 9 positivo: evaluar riesgo suicida de inmediato"] : [] });
  };

  const selectStyle = { background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff", padding: "8px", borderRadius: "8px", width: "100%", fontSize: "0.8rem" };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold" style={{ color: "#00c8ff" }}>PHQ-9 — Escala de Depresión de Patient Health Questionnaire</p>
      <p className="text-xs" style={{ color: "#7a9ab5" }}>Durante las últimas 2 semanas, ¿con qué frecuencia le han molestado los siguientes problemas?</p>
      <div className="space-y-3">
        {preguntas.map((p, i) => (
          <div key={i} className="space-y-1">
            <p className="text-xs font-medium" style={{ color: "#aec9db" }}>{i + 1}. {p}</p>
            <select value={vals[i]} onChange={e => setVal(i, e.target.value)} style={selectStyle}>
              <option value="">Seleccionar...</option>
              {opciones.map((o, oi) => <option key={oi} value={oi.toString()}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
      <CalcButton onClick={calcular} />
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---- Shared sub-components ---- */
function CalcButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
      style={{ background: "linear-gradient(90deg,#00c8ff,#0096c7)", color: "#00111a", border: "none", cursor: "pointer" }}
    >
      Calcular
    </button>
  );
}

const colorMap = {
  cyan: { bg: "rgba(0,200,255,0.08)", border: "rgba(0,200,255,0.25)", text: "#00c8ff" },
  green: { bg: "rgba(0,200,100,0.08)", border: "rgba(0,200,100,0.25)", text: "#00c864" },
  yellow: { bg: "rgba(255,180,0,0.08)", border: "rgba(255,180,0,0.25)", text: "#ffb300" },
  red: { bg: "rgba(255,80,80,0.08)", border: "rgba(255,80,80,0.25)", text: "#ff6b6b" },
};

function ResultCard({ result }: { result: ResultadoCalc }) {
  const c = colorMap[result.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4 space-y-2"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <p className="text-2xl font-black" style={{ color: c.text }}>{result.valor}</p>
      <p className="text-sm font-medium text-white">{result.interpretacion}</p>
      {result.detalles?.map((d, i) => (
        <p key={i} className="text-xs" style={{ color: "#7a9ab5" }}>{d}</p>
      ))}
    </motion.div>
  );
}

/* ---- Main router ---- */
export default function Calculadora({ calculadoraId }: CalculadoraProps) {
  const map: Record<string, ReactElement> = {
    imc: <CalcIMC />,
    holliday: <CalcHolliday />,
    naegele: <CalcNaegele />,
    alvarado: <CalcAlvarado />,
    glasgow: <CalcGlasgow />,
    epidemiologia: <CalcEpi />,
    consentimiento: <CalcConsentimiento />,
    phq9: <CalcPHQ9 />,
  };
  return (
    <div className="rounded-xl p-5" style={{ background: "#0b1628", border: "1px solid #1f3b55" }}>
      {map[calculadoraId] ?? <p style={{ color: "#7a9ab5" }}>Calculadora no disponible para este módulo.</p>}
    </div>
  );
}
