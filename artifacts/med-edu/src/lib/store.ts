export interface Estudiante {
  nombre: string;
  cedula: string;
  curso: string;
}

export interface ModuloResultado {
  pretest: number;
  caso: number;
  juego: number;
  postest: number;
  final: number;
  avance: number; // 0 to 100
}

export interface Resultados {
  [moduloId: string]: ModuloResultado;
}

export const getEstudiante = (): Estudiante | null => {
  const data = localStorage.getItem("estudianteMedInterna");
  return data ? JSON.parse(data) : null;
};

export const setEstudiante = (estudiante: Estudiante) => {
  localStorage.setItem("estudianteMedInterna", JSON.stringify(estudiante));
};

export const clearEstudiante = () => {
  localStorage.removeItem("estudianteMedInterna");
};

export const getResultados = (): Resultados => {
  const data = localStorage.getItem("resultadosMedInterna");
  return data ? JSON.parse(data) : {};
};

export async function syncToBackend(testType?: "pretest" | "postest") {
  const estudiante = getEstudiante();
  if (!estudiante) return; // No user logged in

  const cedula = estudiante.cedula;
  const nombre = estudiante.nombre;
  
  const pretestGeneral = getPretestGeneral();
  const postestGeneral = getPostestGeneral();
  
  const pretestAnsStr = localStorage.getItem("med_edu_pretest_answers");
  const postestAnsStr = localStorage.getItem("med_edu_postest_answers");
  
  const payload = {
    cedula,
    nombre,
    pretestGeneral: pretestGeneral !== null ? pretestGeneral : undefined,
    postestGeneral: postestGeneral !== null ? postestGeneral : undefined,
    pretestRespuestas: (testType === "pretest" || !testType) && pretestAnsStr ? JSON.parse(pretestAnsStr) : undefined,
    postestRespuestas: (testType === "postest" || !testType) && postestAnsStr ? JSON.parse(postestAnsStr) : undefined,
  };

  try {
    await fetch("/api/results/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Failed to sync to backend", err);
  }
}

export const saveResultado = (moduloId: string, resultado: ModuloResultado) => {
  const current = getResultados();
  current[moduloId] = resultado;
  localStorage.setItem("resultadosMedInterna", JSON.stringify(current));
};

export const getPretestGeneral = (): number | null => {
  const data = localStorage.getItem("pretestGeneralScore");
  return data !== null ? JSON.parse(data) : null;
};

export function setPretestGeneral(score: number, answers?: Record<number, string | number>) {
  localStorage.setItem("pretestGeneralScore", score.toString());
  if (answers) {
    localStorage.setItem("med_edu_pretest_answers", JSON.stringify(answers));
  }
  syncToBackend("pretest");
}

export const getPostestGeneral = (): number | null => {
  const data = localStorage.getItem("postestGeneralScore");
  return data !== null ? JSON.parse(data) : null;
};

export function setPostestGeneral(score: number, answers?: Record<number, string | number>) {
  localStorage.setItem("postestGeneralScore", score.toString());
  if (answers) {
    localStorage.setItem("med_edu_postest_answers", JSON.stringify(answers));
  }
  syncToBackend("postest");
}
