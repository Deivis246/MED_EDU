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

export const syncToBackend = async () => {
  const estudiante = getEstudiante();
  if (!estudiante) return;

  const resultados = getResultados();
  const pretestGeneral = getPretestGeneral();
  const postestGeneral = getPostestGeneral();

  try {
    await fetch("/api/results/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: estudiante.nombre,
        cedula: estudiante.cedula,
        resultados,
        pretestGeneral,
        postestGeneral
      })
    });
  } catch (err) {
    console.error("Failed to sync to backend", err);
  }
};

export const saveResultado = (moduloId: string, resultado: ModuloResultado) => {
  const current = getResultados();
  current[moduloId] = resultado;
  localStorage.setItem("resultadosMedInterna", JSON.stringify(current));
  syncToBackend();
};

export const getPretestGeneral = (): number | null => {
  const data = localStorage.getItem("pretestGeneralScore");
  return data !== null ? JSON.parse(data) : null;
};

export const setPretestGeneral = (score: number) => {
  localStorage.setItem("pretestGeneralScore", JSON.stringify(score));
  syncToBackend();
};

export const getPostestGeneral = (): number | null => {
  const data = localStorage.getItem("postestGeneralScore");
  return data !== null ? JSON.parse(data) : null;
};

export const setPostestGeneral = (score: number) => {
  localStorage.setItem("postestGeneralScore", JSON.stringify(score));
  syncToBackend();
};
