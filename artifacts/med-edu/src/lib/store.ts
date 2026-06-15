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

export const saveResultado = (moduloId: string, resultado: ModuloResultado) => {
  const current = getResultados();
  current[moduloId] = resultado;
  localStorage.setItem("resultadosMedInterna", JSON.stringify(current));
};

export const getPretestGeneral = (): number | null => {
  const data = localStorage.getItem("pretestGeneralScore");
  return data !== null ? JSON.parse(data) : null;
};

export const setPretestGeneral = (score: number) => {
  localStorage.setItem("pretestGeneralScore", JSON.stringify(score));
};

export const getPostestGeneral = (): number | null => {
  const data = localStorage.getItem("postestGeneralScore");
  return data !== null ? JSON.parse(data) : null;
};

export const setPostestGeneral = (score: number) => {
  localStorage.setItem("postestGeneralScore", JSON.stringify(score));
};
