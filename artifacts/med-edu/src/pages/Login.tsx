import { useState } from "react";
import { useLocation } from "wouter";
import { setEstudiante } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, BookOpen, Stethoscope, Calculator, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [, setLocation] = useLocation();
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !cedula) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setEstudiante({ nombre, cedula, curso: "" });
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: "#07111f" }}>
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[55%] rounded-full blur-[130px]" style={{ background: "rgba(0,200,255,0.07)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[45%] rounded-full blur-[110px]" style={{ background: "rgba(0,200,255,0.06)" }} />
        {/* Subtle grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00c8ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT — Hero */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit" style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.25)" }}>
            <Activity size={14} style={{ color: "#00c8ff" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#00c8ff" }}>
              Plataforma Educativa 2.0
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-7xl font-black leading-none tracking-tight" style={{ color: "#ffffff" }}>
              Universidad
            </h1>
            <h1 className="text-7xl font-black leading-none tracking-tight" style={{ color: "#00c8ff" }}>
              UTE
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed max-w-md" style={{ color: "#7a9ab5" }}>
            Domina las especialidades clínicas a través de casos interactivos, calculadoras médicas y simulaciones gamificadas.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { icon: BookOpen, label: "8 Módulos Especializados" },
              { icon: Stethoscope, label: "Casos Clínicos Reales" },
              { icon: Calculator, label: "Calculadoras Médicas" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,200,255,0.1)" }}>
                  <Icon size={16} style={{ color: "#00c8ff" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "#aec9db" }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Login Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-sm"
        >
          <div className="rounded-2xl p-8" style={{ background: "#111c2e", border: "1px solid rgba(0,200,255,0.12)", boxShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#ffffff" }}>Ingreso al Campus</h2>
            <p className="text-sm mb-7" style={{ color: "#7a9ab5" }}>Ingrese sus datos para continuar su progreso</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nombre" style={{ color: "#aec9db", fontSize: "0.85rem" }}>Nombre Completo</Label>
                <Input
                  id="nombre"
                  data-testid="input-nombre"
                  placeholder="Ej. Dr. Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff", borderRadius: "10px", padding: "12px 14px" }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="cedula" style={{ color: "#aec9db", fontSize: "0.85rem" }}>Cédula de Identidad</Label>
                <Input
                  id="cedula"
                  data-testid="input-cedula"
                  placeholder="Ej. 12345678"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  style={{ background: "#0b1628", border: "1px solid #1f3b55", color: "#eaf6ff", borderRadius: "10px", padding: "12px 14px" }}
                />
              </div>

              {error && (
                <p className="text-sm font-medium" style={{ color: "#ff6b6b" }}>{error}</p>
              )}

              <button
                type="submit"
                data-testid="button-acceder"
                className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl mt-1 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(90deg, #00c8ff, #0096c7)", color: "#00111a", fontSize: "1rem", cursor: "pointer", border: "none" }}
              >
                Acceder
                <ArrowRight size={18} />
              </button>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
