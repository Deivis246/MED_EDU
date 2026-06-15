import type { Pregunta } from "./modules";

interface SpecialtyRule {
  name: string;
  keywords: string[];
}

const RULES: SpecialtyRule[] = [
  {
    name: "Cardiología",
    keywords: ["infarto", "miocardio", "ecg", "elevación del st", "coronaria", "soplo", "taquicardia", "bradicardia", "arritmia", "fibrilación auricular", "fibrilacion auricular", "antihipertensiv", "hipertensión grado", "hipertension grado", "presión sistólica", "presion sistolica", "adenosina", "estatina", "hmg-coa", "lipoproteína", "lipoproteina", "ldl", "verapamilo", "anticoagulación", "anticoagulacion", "tpsv", "reperfusión", "reperfusion", "angioplastia"],
  },
  {
    name: "Nefrología",
    keywords: ["renal prerrenal", "lesion renal", "lesión renal", "creatinina", "sodio urinario", "osmolaridad urinaria", "glomerulonefritis", "glomerulo", "azotemia", "necrosis tubular", "cilindros eritrocitarios", "cilindros granulosos", "fena", "nta ", "nefrótico", "nefrotico", "nefrítico", "nefritico", "síndrome nefr", "sindrome nefr"],
  },
  {
    name: "Gastroenterología",
    keywords: ["diarrea osmótica", "diarrea secretora", "hemorragia", "hematemesis", "melena", "hematoquecia", "cirrótico", "cirrotico", "variceal", "octreótida", "octreotida", "colecistitis", "murphy", "vesicular", "biliar", "pancreatitis", "amilasa", "lipasa", "úlcera péptica", "ulcera peptica", "esofágic", "esofagic", "hígado", "higado", "ictericia", "gastroesofágico", "gastroesofagico", "sangrado digestivo", "necrosis pancreátic", "necrosis pancreat"],
  },
  {
    name: "Neumología",
    keywords: ["disnea progresiva", "espirometría", "espirom", "epoc", "obstrucción al flujo", "vef1", "cvf", "broncodilatador", "bronco", "pulmonar", "esputo", "tos aguda", "tos crónica", "cavitación", "absceso pulmonar", "neumotórax", "tromboembolismo", "pleurítico", "pleuritico", "silicosis", "satO2", "sato2", "anthonisen"],
  },
  {
    name: "Endocrinología",
    keywords: ["tsh", "t4 libre", "tiroides", "hipotiroidismo", "hipertiroidismo", "levotiroxina", "diabetes mellitus", "glucosa 4", "glucosa en ayunas", "insulina", "cetoacidosis", "hba1c", "cortisol", "hipófisis", "hipofisis", "acth", "gonadotropina", "gh ", "deficiencia hormonal", "oxitocina", "vasopresina", "hipoglucemia", "suprarrenal", "kussmaul", "somatos", "panhipopituitar"],
  },
  {
    name: "Reumatología",
    keywords: ["artritis reumatoide", "artritis septica", "artritis séptica", "líquido sinovial", "liquido sinovial", "artrocentesis", "monoartritis", "poliartritis", "gota", "tofácea", "tofacea", "lupus", "acr/eular", "ifp", "mcf", "ácido úrico", "acido urico"],
  },
  {
    name: "Infectología",
    keywords: ["dengue", "leptospirosis", "paludismo", "malaria", "vih", "hiv", "tuberculosis", "anaerobios", "absceso pulmonar", "zona tropical", "aguas contaminadas", "fiebre amarilla", "leishmaniasis"],
  },
  {
    name: "Hematología",
    keywords: ["anemia", "ferritina", "vcm", "menorragia", "hemolítica", "hemolitica", "leucemia", "linfoma", "ciclofosfamida", "azoospermia", "plaquetas", "trombocitopenia", "incompatibilidad abo", "bilirrubina indirecta", "kernicterus", "isoaglutinina"],
  },
  {
    name: "Neurología",
    keywords: ["cefalea súbita", "cefalea subita", "hemorragia subaracnoidea", "subaracnoidea", "meníngeos", "meningeos", "rigidez de nuca", "neurona motora", "babinski", "espasticidad", "parálisis de bell", "paralisis de bell", "debilidad facial", "hemicara", "convulsión", "convulsion", "epilepsia", "coma", "encefalic", "encefalop", "tercer par", "mesencéfalo", "mesencefalo", "fotomotor", "pupil"],
  },
  {
    name: "Pediatría",
    keywords: ["lactante", "recién nacido", "recien nacido", "neonatal", "neonato", "niño de", "nino de", "niña de", "vacuna", "crup", "bronquiolitis", "vrs", "rotavirus", "pediatr"],
  },
  {
    name: "Ginecología y Obstetricia",
    keywords: ["gestante", "embaraz", "parto", "preeclampsia", "eclampsia", "ecografía transvaginal", "ecografia transvaginal", "endometrio", "menstrual", "ovario", "ovárico", "ovarico", "rh negativa", "inmunoglobulina anti", "fetal", "obstétric", "obstetric", "posmenopáusica", "posmenopausica", "corticoides antenatales", "sulfato de magnesio", "uterino anormal", "hirsutismo", "sop", "miomatosis", "sangrado uterino"],
  },
  {
    name: "Cirugía General",
    keywords: ["apendicitis", "apendicectomía", "apendicectomia", "blumberg", "hernia inguinal", "obstrucción intestinal", "obstruccion intestinal", "irreductible"],
  },
  {
    name: "Emergencias",
    keywords: ["anafilaxia", "adrenalina intramuscular", "adrenalina im", "reanimación", "reanimacion", "quemaduras", "choque", "shock", "reposición hemodinámica", "reposicion hemodinamica", "taponamiento cardíaco", "taponamiento cardiaco"],
  },
  {
    name: "Dermatología",
    keywords: ["psoriasis", "dermatitis seborreica", "liquen plano", "acantólisis", "acantolisis", "pénfigo", "penfigo", "eritematoescamosas", "escamas plateadas", "surcos nasogenianos", "cuero cabelludo", "pitiriasis", "tiña", "tina ", "impétigo", "impetigo"],
  },
  {
    name: "Traumatología",
    keywords: ["fractura", "síndrome compartimental", "sindrome compartimental", "esguince", "ortopéd", "ortoped"],
  },
  {
    name: "Psiquiatría",
    keywords: ["suicida", "depresión", "depresion", "tept", "postraumático", "postraumatico", "pesadillas", "hipervigilancia", "trastorno de pánico", "trastorno de panico", "obsesivo", "bipolar", "psiquiátric", "psiquiatric", "anhedonia", "antidepresiv"],
  },
  {
    name: "Salud Pública",
    keywords: ["prevalencia", "incidencia", "vigilancia de vih", "epidemiolog", "tamizaje", "sangre oculta en heces", "colonoscopia", "cesación tabáquica", "cesacion tabaquica", "cardiometabólico", "cardiometabolico"],
  },
  {
    name: "Bioética",
    keywords: ["consentimiento", "autonomía", "autonomia", "principio", "paternalismo", "negligencia", "dolo médico", "dolo medico", "inhabilidad"],
  },
  {
    name: "Urología",
    keywords: ["prostática", "prostatica", "psa", "próstata", "prostata", "cateterismo vesical", "retención urinaria", "retencion urinaria", "globo vesical"],
  },
  {
    name: "Oftalmología",
    keywords: ["catarata", "cristalino", "retina", "agudeza visual", "subcapsular", "degeneración macular"],
  },
  {
    name: "Medicina Familiar",
    keywords: ["estilo de vida", "tabaquismo", "imc ", "riesgo cardiometabólico", "riesgo cardiometabolico", "consejería", "consejeria", "cambios de estilo"],
  },
  {
    name: "Farmacología",
    keywords: ["mecanismo de acción", "mecanismo de accion", "fármaco", "farmaco", "inhibidor", "receptor", "estatinas inhiben", "hmg-coa reductasa"],
  },
];

export function classifySpecialty(question: string): string {
  const lower = question.toLowerCase();
  for (const rule of RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) return rule.name;
    }
  }
  return "Medicina Interna";
}

export interface SpecialtyStat {
  name: string;
  count: number;
}

export function getSpecialtyBreakdown(questions: Pregunta[]): SpecialtyStat[] {
  const counts: Record<string, number> = {};
  for (const q of questions) {
    const sp = classifySpecialty(q.q);
    counts[sp] = (counts[sp] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
