import { useEffect } from "react";
import { useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import { modulos } from "@/data/modules";
import { getResultados, getEstudiante } from "@/lib/store";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ClipboardCheck, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const resultados = getResultados();

  useEffect(() => {
    if (!getEstudiante()) setLocation("/login");
  }, [setLocation]);

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Evaluaciones generales */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#00c8ff" }}>
            Evaluaciones Generales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pretest Card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div
                className="rounded-2xl p-6 flex items-center justify-between cursor-pointer group transition-all duration-200"
                style={{ background: "#111c2e", border: "1px solid rgba(0,200,255,0.18)" }}
                onClick={() => setLocation("/pretest")}
                data-testid="card-pretest"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                    <ClipboardCheck size={22} style={{ color: "#00c8ff" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Pretest General</h3>
                    <p className="text-sm" style={{ color: "#7a9ab5" }}>
                      Conocimientos previos
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: "#00c8ff" }} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Postest Card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
              <div
                className="rounded-2xl p-6 flex items-center justify-between cursor-pointer group transition-all duration-200"
                style={{ background: "#111c2e", border: "1px solid rgba(0,200,255,0.18)" }}
                onClick={() => setLocation("/postest")}
                data-testid="card-postest"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,200,255,0.12)" }}>
                    <FlaskConical size={22} style={{ color: "#00c8ff" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Postest General</h3>
                    <p className="text-sm" style={{ color: "#7a9ab5" }}>
                      Evaluación final
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: "#00c8ff" }} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ borderTop: "1px solid #1f3b55" }} />

        {/* Módulos */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#00c8ff" }}>
            Módulos Clínicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulos.map((modulo, i) => {
              const res = resultados[modulo.id];
              const avance = res?.avance || 0;
              const isCompleted = avance === 100;

              return (
                <motion.div
                  key={modulo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden group transition-all duration-200" style={{ background: "#111c2e", borderColor: "#1f3b55" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,200,255,0.4)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#1f3b55")}
                  >
                    {/* EKG Banner */}
                    <div className="h-20 relative overflow-hidden border-b" style={{ background: "linear-gradient(135deg,#07111f,#0d2035)", borderColor: "#1f3b55" }}>
                      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <polyline
                          points="0,40 30,40 40,10 50,70 60,40 80,40 88,25 96,55 104,40 200,40"
                          fill="none"
                          stroke="#00c8ff"
                          strokeWidth="1.5"
                          opacity="0.35"
                        />
                      </svg>
                      {isCompleted && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,200,100,0.15)", color: "#00c864", border: "1px solid rgba(0,200,100,0.3)" }}>
                          Completado
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">{modulo.titulo}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1 text-sm" style={{ color: "#7a9ab5" }}>{modulo.desc}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 pb-2">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs" style={{ color: "#7a9ab5" }}>
                          <span>Progreso</span>
                          <span className="font-semibold text-white">{avance}%</span>
                        </div>
                        <Progress value={avance} className="h-1.5" />
                      </div>
                    </CardContent>

                    <CardFooter>
                      <button
                        data-testid={`button-ingresar-${modulo.id}`}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
                        style={{
                          background: isCompleted ? "rgba(0,200,100,0.1)" : "rgba(0,200,255,0.12)",
                          color: isCompleted ? "#00c864" : "#00c8ff",
                          border: isCompleted ? "1px solid rgba(0,200,100,0.25)" : "1px solid rgba(0,200,255,0.25)",
                          cursor: "pointer"
                        }}
                        onClick={() => setLocation(`/modulo/${modulo.id}`)}
                      >
                        <span>{isCompleted ? "Repasar Módulo" : avance > 0 ? "Continuar" : "Ingresar"}</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </Sidebar>
  );
}
