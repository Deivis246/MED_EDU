export interface SeccionTema {
  definicion: string;
  etiologia: string;
  clinica: string;
  diagnostico: string;
  tratamiento: string;
}

export interface Tema {
  nombre: string;
  seccion: SeccionTema;
}

export const temasPorModulo: Record<string, Tema[]> = {

  /* ══════════════════════════════════════════════
     MÓDULO 1 — MEDICINA INTERNA
  ══════════════════════════════════════════════ */
  "medicina-interna": [
    {
      nombre: "Cardiología — Síndrome Coronario Agudo",
      seccion: {
        definicion: "Espectro de entidades causadas por reducción aguda del flujo coronario. Incluye STEMI (oclusión total con supradesnivel ST), NSTEMI (oclusión parcial con troponina +) y angina inestable (sin necrosis).",
        etiologia: "Rotura de placa aterosclerótica con formación de trombo intraluminal. Factores de riesgo: HTA, DM, dislipidemia, tabaquismo, obesidad, historia familiar.",
        clinica: "Dolor precordial opresivo irradiado a brazo izquierdo, mandíbula o espalda. Asocia diaforesis, náuseas, disnea, palidez. En ancianos y diabéticos puede ser atípico (disnea sin dolor).",
        diagnostico: "ECG (supradesnivel ST ≥1 mm en ≥2 derivaciones contiguas o nuevo BRIHH en STEMI). Troponina I/T de alta sensibilidad (NSTEMI). Ecocardiograma para motilidad regional.",
        tratamiento: "STEMI: ACTP primaria <90 min (o fibrinólisis si no disponible). NSTEMI: anticoagulación (HBPM) + AAS + P2Y12 (ticagrelor/clopidogrel) + estatina + betabloqueante. IECA en todos."
      }
    },
    {
      nombre: "Cardiología — Insuficiencia Cardíaca",
      seccion: {
        definicion: "Síndrome clínico por incapacidad del corazón para mantener el gasto cardíaco necesario en reposo o esfuerzo. Clasificada por fracción de eyección: reducida FEr (<40%), levemente reducida FElr (40-49%), preservada FEp (≥50%).",
        etiologia: "FEr: cardiopatía isquémica (50%), miocardiopatía dilatada, valvulopatías. FEp: HTA (principal), diabetes, obesidad, fibrilación auricular.",
        clinica: "Disnea de esfuerzo progresiva, ortopnea, disnea paroxística nocturna, edema bimaleolar, crepitantes bibasales, tercer ruido (galope), ingurgitación yugular, hepatomegalia.",
        diagnostico: "BNP/NT-proBNP elevados. Ecocardiograma (evalúa FE, tamaño cavidades, valvulopatías). RxTx: cardiomegalia + redistribución vascular. ECG (causa subyacente).",
        tratamiento: "FEr: IECA/ARA-II + betabloqueante (carvedilol/bisoprolol) + ARM (espironolactona) + iSGLT2 (dapagliflozina). Descompensación: furosemida IV. FEp: control de comorbilidades + iSGLT2."
      }
    },
    {
      nombre: "Cardiología — Fibrilación Auricular",
      seccion: {
        definicion: "Arritmia supraventricular con activación auricular desorganizada (400-600 impulsos/min), sin contracción auricular efectiva. La más frecuente en la práctica clínica.",
        etiologia: "HTA (principal), cardiopatía estructural, tirotoxicosis, apnea del sueño, valvulopatía mitral, alcohol ('holiday heart'), cirugía cardíaca.",
        clinica: "Palpitaciones, disnea, intolerancia al esfuerzo, mareo, síncope. Pulso irregular. Puede ser asintomática (hallazgo incidental). Complicaciones: embolismo cerebral (ACV), IC.",
        diagnostico: "ECG: ausencia de ondas P + intervalo RR irregularmente irregular + fibras oscilatorias basales. Holter si paroxística. Ecocardiograma para cardiopatía subyacente y trombo.",
        tratamiento: "Anticoagulación: CHA₂DS₂-VASc ≥2 (hombre) / ≥3 (mujer) → ACOD (apixabán/rivaroxabán). Control frecuencia: betabloqueante o digoxina. Control ritmo: amiodarona, flecainida, cardioversión."
      }
    },
    {
      nombre: "Neumología — EPOC",
      seccion: {
        definicion: "Enfermedad prevenible y tratable caracterizada por limitación crónica al flujo aéreo no totalmente reversible, progresiva, asociada a respuesta inflamatoria anormal de los pulmones a gases y partículas nocivas.",
        etiologia: "Tabaquismo (causa principal, >80 %). Exposición ocupacional (polvos, humos). Combustión de biomasa. Déficit de α1-antitripsina (causa genética, enfisema en jóvenes).",
        clinica: "Disnea progresiva de esfuerzo (síntoma cardinal), tos crónica, expectoración. Exacerbaciones: aumento de disnea + cambio en esputo + aumento de tos. Sibilancias, hiperresonancia, tórax en tonel.",
        diagnostico: "Espirometría: FEV1/FVC <0.70 posbroncodilatador. Clasificación GOLD 1-4 por FEV1 (>80%, 50-80%, 30-50%, <30%). Rx tórax: hiperinsuflación. TAC: enfisema, bronquiectasias.",
        tratamiento: "Broncodilatadores de larga acción: LAMA (tiotropio) ± LABA (salmeterol). ICS si >2 exacerbaciones/año o eosinófilos ≥300. Exacerbación: broncodilatadores + prednisolona 40 mg × 5 días + antibiótico. Oxígeno si PaO2 <55."
      }
    },
    {
      nombre: "Neumología — Neumonía Adquirida en la Comunidad",
      seccion: {
        definicion: "Infección aguda del parénquima pulmonar adquirida fuera del ámbito hospitalario o en las primeras 48 horas de hospitalización.",
        etiologia: "S. pneumoniae (más frecuente en adultos). Mycoplasma pneumoniae (atípica, jóvenes). H. influenzae (EPOC). Virus (influenza, SARS-CoV-2). Legionella (brotes, hiponatremia).",
        clinica: "Fiebre, tos productiva, disnea, dolor pleurítico. Examen: matidez, soplo tubario, crepitantes en zona afectada. Síntomas atípicos: cefalea, mialgias, inicio insidioso (gérmenes atípicos).",
        diagnostico: "Rx tórax: infiltrado alveolar/intersticial (confirma). CURB-65: ≥2 puntos → hospitalización; ≥3 → considerar UCI. Hemocultivos, antígeno neumococo/Legionella en urinario.",
        tratamiento: "Ambulatorio: amoxicilina 1g c/8h o azitromicina. Hospitalizado: BL (amoxicilina-clavulánico o ceftriaxona) + macrólido. UCI/grave: BL anti-Pseudomonas + fluoroquinolona respiratoria."
      }
    },
    {
      nombre: "Endocrinología — Diabetes Mellitus",
      seccion: {
        definicion: "Grupo de enfermedades metabólicas caracterizadas por hiperglucemia crónica resultante de defectos en la secreción o acción de la insulina. DM1: destrucción autoinmune de células β. DM2: resistencia insulínica + deficiencia progresiva.",
        etiologia: "DM1: autoinmune (anti-GAD, anti-islotes), factores genéticos HLA-DR3/DR4 + ambientales. DM2: genética poligénica + obesidad (resistencia insulínica) + sedentarismo + envejecimiento.",
        clinica: "Poliuria, polidipsia, polifagia, pérdida de peso (aguda). Crónica: retinopatía, nefropatía, neuropatía periférica, pie diabético, enfermedad cardiovascular.",
        diagnostico: "Glucosa ayunas ≥126 mg/dL (×2). Glucosa postprandial (2h) ≥200 mg/dL. HbA1c ≥6.5 %. Glucosa al azar ≥200 + síntomas.",
        tratamiento: "DM2: metformina + cambios de estilo de vida. Si ECV: arGLP-1 (semaglutida) o iSGLT2 (dapagliflozina). Objetivo HbA1c <7 %. DM1: insulina basal + bolos. Monitoreo glucémico continuo."
      }
    },
    {
      nombre: "Endocrinología — Cetoacidosis Diabética",
      seccion: {
        definicion: "Complicación metabólica aguda de DM (principalmente tipo 1) caracterizada por la tríada: hiperglucemia, cetosis y acidosis metabólica con anión gap elevado.",
        etiologia: "Déficit absoluto o relativo de insulina. Desencadenantes: infecciones (50%), omisión de insulina, estrés quirúrgico, IAM, embarazo. Primera manifestación de DM1 no diagnosticada.",
        clinica: "Poliuria, polidipsia, náuseas, vómitos, dolor abdominal, debilidad. Aliento cetónico (frutas). Respiración de Kussmaul (acidosis compensatoria). Alteración del estado de conciencia.",
        diagnostico: "Glucosa >250 mg/dL + pH <7.3 + bicarbonato <18 mEq/L + anión gap >12 + cetonemia/cetonuria positiva. Leve: pH 7.25-7.30. Moderada: 7.00-7.24. Grave: <7.00.",
        tratamiento: "Hidratación: SS 0.9% 1L/h × 2h, luego 0.45%. Insulina regular IV 0.1 U/kg/h (no iniciar si K+ <3.3). Reposición K+ (añadir al suero si K+ <5.3). Criterios de resolución: glucosa <200 + pH >7.3 + HCO3 >18."
      }
    },
    {
      nombre: "Gastroenterología — Cirrosis Hepática",
      seccion: {
        definicion: "Estadio final de fibrosis hepática progresiva con distorsión de la arquitectura normal del hígado y formación de nódulos regenerativos. Irreversible en estadios avanzados.",
        etiologia: "Alcohol (primera causa en Ecuador/Latinoamérica), VHC, VHB, esteatohepatitis no alcohólica (NASH), hepatitis autoinmune, cirrosis biliar primaria, hemocromatosis.",
        clinica: "Compensada: asintomática o fatiga inespecífica, hepatoesplenomegalia. Descompensada: ascitis, encefalopatía hepática, sangrado variceal, ictericia, edema.",
        diagnostico: "Biopsia hepática (estándar de oro). Elastografía hepática (Fibroscan) no invasiva. Child-Pugh A-C y MELD para pronóstico. Ecografía: nódulos, esplenomegalia.",
        tratamiento: "Tratar la causa (abstinencia alcohólica, antivirales). Ascitis: restricción de sal + diuréticos (espironolactona + furosemida) + paracentesis terapéutica. PBE: ceftriaxona IV. Profilaxis varices: propranolol. Trasplante hepático en Child B/C."
      }
    },
    {
      nombre: "Nefrología — Lesión Renal Aguda",
      seccion: {
        definicion: "Deterioro brusco de la función renal definido por KDIGO como: ↑creatinina ≥0.3 mg/dL en 48h, o ↑creatinina ≥1.5× el basal en 7 días, o diuresis <0.5 mL/kg/h por ≥6h.",
        etiologia: "Prerrenal (60-70%): hipovolemia, hipotensión, shock. Intrínseca: necrosis tubular aguda (isquemia, nefrotóxicos — AINE, contraste, aminoglucósidos). Posrenal: obstrucción urinaria (próstata, cálculos).",
        clinica: "Oliguria/anuria, edema, hipertensión, síntomas urémicos (náuseas, confusión). Prerrenal: piel seca, taquicardia, hipotensión postural. Posrenal: globo vesical, dolor cólico.",
        diagnostico: "FENA (fracción excreción sodio): prerrenal <1%, intrínseca >2%. Creatinina/urea séricas. EGO (cilindros granulosos en NTA, cilindros eritrocíticos en GN). Ecografía renal.",
        tratamiento: "Prerrenal: hidratación IV. Intrínseca: retirar nefrotóxicos + soporte. Posrenal: descompresión (sonda vesical, nefrostomía). Diálisis si anuria refractaria, hiperpotasemia, acidosis severa, sobrecarga hídrica."
      }
    },
    {
      nombre: "Infectología — Sepsis y Choque Séptico",
      seccion: {
        definicion: "Sepsis (Sepsis-3): disfunción orgánica potencialmente mortal causada por respuesta desregulada del huésped a infección (SOFA ≥2). Choque séptico: hipotensión refractaria + lactato >2 mmol/L.",
        etiologia: "Focos: pulmón (40%), urinario (25%), abdominal (20%), piel/tejidos blandos. Bacterias gram-negativas (E. coli, Klebsiella, Pseudomonas) y gram-positivas (S. aureus, S. pneumoniae). Candida en inmunodeprimidos.",
        clinica: "Fiebre o hipotermia, taquicardia, taquipnea, alteración mental. Órganos diana: IRA, coagulopatía (CID), disfunción hepática, íleo, hipotensión refractaria.",
        diagnostico: "Sospecha clínica + SOFA ≥2. Hemocultivos × 2 (antes de antibióticos). Lactato (>2 mmol/L peor pronóstico). PCR, procalcitonina, hemograma, gases arteriales. qSOFA (FR, Glasgow, TAS) como herramienta de cribado.",
        tratamiento: "Bundle 1 hora: hemocultivos + antibióticos de amplio espectro + lactato + líquidos 30 mL/kg. Vasopresor si PAM <65: noradrenalina. Hidrocortisona si refractario. Desescalada ATB según cultivos. Fuente de infección: control (drenaje, cirugía)."
      }
    },
    {
      nombre: "Reumatología — Artritis Reumatoide",
      seccion: {
        definicion: "Enfermedad inflamatoria autoinmune crónica sistémica que afecta predominantemente las articulaciones sinoviales, con destrucción articular progresiva e importantes manifestaciones extraarticulares.",
        etiologia: "Multifactorial: susceptibilidad genética (HLA-DR4, HLA-DR1) + factores ambientales (tabaco activa la citrulinación de proteínas). Autoanticuerpos: factor reumatoide (FR) y anti-CCP (más específico).",
        clinica: "Poliartritis simétrica de pequeñas articulaciones (MCF, IFP, muñecas). Rigidez matutina >1 hora. Manifestaciones extraarticulares: nódulos reumatoides, vasculitis, afectación pulmonar (NIU), síndrome de Sjögren secundario.",
        diagnostico: "Criterios ACR/EULAR 2010: ≥6 puntos (articulaciones + serología + reactantes de fase aguda + duración). FR y anti-CCP. VSG/PCR elevadas. Rx: erosiones periarticulares, pinzamiento del espacio articular.",
        tratamiento: "FAME convencional: metotrexato 15-25 mg/semana (1ª línea) ± hidroxicloroquina ± sulfasalazina. Corticoides puente a dosis bajas. FAME biológicos si falla: anti-TNF (etanercept, adalimumab), abatacept, rituximab, tocilizumab."
      }
    },
    {
      nombre: "Hematología — Anemias",
      seccion: {
        definicion: "Reducción de la concentración de hemoglobina por debajo de los valores normales: Hb <13 g/dL en hombres adultos, <12 g/dL en mujeres no embarazadas, <11 g/dL en embarazadas.",
        etiologia: "Ferropénica: déficit de hierro (sangrado crónico — principal; malabsorción). Megaloblástica: déficit B12 (anemia perniciosa, vegetarianos) o folato (embarazo, alcohol). Hemolítica: autoinmune, drepanocitosis, esferocitosis. Aplásica: daño médula ósea.",
        clinica: "Astenia, palidez, taquicardia, disnea de esfuerzo, cefalea. Ferropénica: coiloniquia, glositis, disfagia (Plummer-Vinson). Megaloblástica: neuropatía periférica, glositis. Hemolítica: ictericia, esplenomegalia.",
        diagnostico: "Hemograma completo (VCM: microcítica <80 fl, normocítica 80-100, macrocítica >100). Frotis: hipocromía/microcitosis (ferropénica); macrocitos + neutrófilos hipersegmentados (megaloblástica). Ferritina, hierro, TIBC. Reticulocitos, LDH, Coombs.",
        tratamiento: "Ferropénica: sulfato ferroso 200 mg/día + tratar causa. Megaloblástica-B12: cianocobalamina IM 1000 μg/día × 7 días, luego mensual. Megaloblástica-folato: ácido fólico 5 mg/día. Hemolítica autoinmune: corticoides. Transfusión si Hb <7 g/dL (estable) o <8 (cardiopatía)."
      }
    },
  ],

  /* ══════════════════════════════════════════════
     MÓDULO 2 — PEDIATRÍA
  ══════════════════════════════════════════════ */
  "pediatria": [
    {
      nombre: "Neonatología — Reanimación Neonatal",
      seccion: {
        definicion: "Conjunto de maniobras realizadas en los primeros minutos de vida para establecer respiración y circulación efectivas. Aproximadamente el 10% de los RN necesita alguna intervención.",
        etiologia: "Factores prenatales: asfixia perinatal, prematuridad, infección materna, malformaciones. Factores perinatales: distocia, prolapso de cordón, abrupción placentaria, hemorragia.",
        clinica: "Evaluación inicial (30 segundos): tono muscular (¿vigoroso?), respiración/llanto, frecuencia cardíaca. Signo de alarma: FC <100 lpm, apnea, cianosis central, hipotonía.",
        diagnostico: "Score de Apgar al 1 y 5 minutos: color, FC, tono, reflejos, respiración. No guía las decisiones de reanimación (se toman antes del minuto). FC: mejor indicador de respuesta.",
        tratamiento: "Pasos: calentar + secar + estimular (30 s). Si FC <100: VPP (máscara + bolsa, 40-60 ventilaciones/min). Si FC <60 tras VPP eficaz: compresiones 3:1 + adrenalina IV/IO 0.01-0.03 mg/kg. Considerar intubación en <28 semanas."
      }
    },
    {
      nombre: "Neonatología — Ictericia Neonatal",
      seccion: {
        definicion: "Coloración amarilla de piel y mucosas por depósito de bilirrubina cuando sus niveles superan 5-7 mg/dL. La fisiológica es transitoria; la patológica requiere tratamiento.",
        etiologia: "Fisiológica: incremento producción (hemólisis fetal-neonatal) + captación hepática inmadura. Patológica: incompatibilidad Rh/ABO, esferocitosis, déficit G6PD, hipotiroidismo, atresia biliar (bilirrubina directa).",
        clinica: "Coloración ictérica progresocefalocaudal (Kramer: zonas 1-5). Fisiológica: aparece día 2-3, máximo día 4-5, desaparece <2 semanas. Patológica: aparece <24h, bilirrubina >15 mg/dL, directa >2 mg/dL, persiste >2 semanas.",
        diagnostico: "Bilirrubina total y directa sérica. Bilirrubinómetro transcutáneo como cribado. Grupo sanguíneo + Coombs directo. Nomograma de Bhutani (hora de vida vs bilirrubina). Evaluar en gráfica de riesgo.",
        tratamiento: "Fototerapia: irradiación con luz azul-verde (430-490 nm) → fotoisomerización bilirrubina. Umbrales según nomograma y factores de riesgo. Exanguinotransfusión: bilirrubina 25-30 mg/dL o encefalopatía (kernicterus). Tratar la causa."
      }
    },
    {
      nombre: "Neonatología — Sepsis Neonatal",
      seccion: {
        definicion: "Síndrome clínico de infección sistémica en el primer mes de vida. Temprana (<72h): adquirida intraparto. Tardía (>72h): adquirida en entorno hospitalario o comunitario.",
        etiologia: "Temprana: Estreptococo grupo B (principal), E. coli, Listeria monocytogenes. Tardía hospitalaria: S. epidermidis (prematuros con catéteres), S. aureus, Klebsiella, Candida.",
        clinica: "Inestabilidad térmica (hipo/hipertermia), letargia, succión débil, quejido, apnea, bradicardia, intolerancia alimentaria, distensión abdominal, piel moteada, ictericia.",
        diagnostico: "Hemocultivo (patrón de oro). Hemograma: leucopenia <5.000 o leucocitosis >25.000, neutropenia, bandemia >20%. PCR/procalcitonina (inicio tardío). LCR (si estable): descartar meningitis.",
        tratamiento: "Temprana: ampicilina + gentamicina IV × 7-10 días. Tardía nosocomial: vancomicina + cefotaxima o piperazilina-tazobactam según epidemiología. Antifúngico si sospecha de Candida. Soporte: ventilación, inotrópicos, glucosa."
      }
    },
    {
      nombre: "Crecimiento y Desarrollo — Hitos y Vigilancia",
      seccion: {
        definicion: "Proceso continuo de adquisición de capacidades físicas, cognitivas, del lenguaje y sociales según ventanas críticas de desarrollo. La vigilancia detecta desviaciones que requieren intervención.",
        etiologia: "Retraso del desarrollo: prematuridad, hipotiroidismo congénito, infecciones TORCH, malnutrición, deprivación sensorial, síndromes genéticos (Down, Turner), parálisis cerebral.",
        clinica: "Señales de alarma: no sostiene la cabeza a los 4 meses, no se sienta a los 9 meses, no camina a los 18 meses, no dice palabras a los 16 meses, pérdida de habilidades adquiridas.",
        diagnostico: "Escalas estandarizadas: Denver II (0-6 años). Pruebas específicas: Bayley-III, Vineland. Tamizaje neonatal: TSH, PKU, hipoacusia (OAE/ABR). Curvas OMS de crecimiento.",
        tratamiento: "Intervención temprana: estimulación temprana, logopedia, fisioterapia, terapia ocupacional. Tratar la causa subyacente. Suplementación nutricional. Derivación a especialista si sospecha de causa orgánica."
      }
    },
    {
      nombre: "Infectología Pediátrica — Bronquiolitis",
      seccion: {
        definicion: "Infección aguda del tracto respiratorio inferior (bronquíolos) que afecta principalmente a lactantes menores de 2 años. Primera causa de hospitalización en lactantes.",
        etiologia: "Virus sincitial respiratorio (VSR): 70-80% de casos. Rinovirus (segundo). Adenovirus, parainfluenza, metaneumovirus humano. Pico: noviembre-marzo (invierno).",
        clinica: "Pródromo 2-3 días: rinorrea, fiebre baja. Progresión a: tos seca, sibilancias espiratorias difusas, taquipnea, tiraje subcostal/intercostal, dificultad para alimentarse. Oximetría <95% en cuadros moderados.",
        diagnostico: "Clínico principalmente. Rx tórax: hiperinsuflación + atelectasias (no sistemática). Test rápido VSR en aspirado nasofaríngeo (confirma pero no cambia manejo). SpO2.",
        tratamiento: "Soporte: aspiración de secreciones, posición semiincorporada, oxígeno si SpO2 <92-94%. Alimentación fraccionada o SNG si taquipnea >60 rpm. No salbutamol ni corticoides de rutina (evidencia no apoya). Hospitalización si SpO2 <92%, prematuridad, cardiopatía congénita."
      }
    },
    {
      nombre: "Infectología Pediátrica — Enfermedades Exantemáticas",
      seccion: {
        definicion: "Conjunto de infecciones virales (principalmente) de la infancia caracterizadas por erupción cutánea generalizada como manifestación destacada del cuadro clínico.",
        etiologia: "Sarampión: paramixovirus. Rubéola: togavirus. Varicela: VZV (herpesvirus). Roséola: HHV-6/HHV-7. Escarlatina: S. pyogenes (bacteriana). Eritema infeccioso: parvovirus B19.",
        clinica: "Sarampión: fiebre alta + Koplik (manchas blanquecinas en mucosa bucal) + exantema maculopapular cefalocaudal. Varicela: máculas → pápulas → vesículas → costras (diferentes estadios simultáneos). Roséola: fiebre 3-5 días → exantema rosado al ceder. Escarlatina: lengua en fresa + exantema de lija.",
        diagnostico: "Clínico en la mayoría. Serología IgM/IgG si necesario. Cultivo faríngeo en escarlatina (S. pyogenes). PCR para herpesvirus. Notificación obligatoria: sarampión, rubéola.",
        tratamiento: "Sarampión: vitamina A en niños. Varicela: aciclovir si >12 años o inmunocompromiso. Escarlatina: amoxicilina 10 días (previene fiebre reumática). Roséola/eritema infeccioso: sintomático. Vacunación como prevención."
      }
    },
    {
      nombre: "Emergencias Pediátricas — Deshidratación",
      seccion: {
        definicion: "Déficit de agua y electrolitos en el organismo del niño, la mayoría por pérdidas gastrointestinales. Clasificada por grado: leve (<5%), moderada (5-10%), grave (>10% del peso corporal).",
        etiologia: "Gastroenteritis aguda (causa más frecuente): viral (rotavirus) o bacteriana. Otras: fiebre, taquipnea, vómitos intensos, poliuria (DM, diabetes insípida), quemaduras.",
        clinica: "Leve: sed, mucosas levemente secas. Moderada: ojos hundidos, fontanela deprimida, signo del pliegue 1-2 s, oliguria. Grave: letargia, hipotensión, taquicardia, llenado capilar >3 s, anuria.",
        diagnostico: "Clínico: valoración del estado de hidratación. Laboratorio si moderado-grave: ionograma (tipo de deshidratación: iso/hipo/hipernatrémica), creatinina, glucosa, gases.",
        tratamiento: "Leve-moderada: SRO 50-100 mL/kg en 4 horas (vía oral o SNG). Vómitos: ondansetrón 0.15 mg/kg VO. Grave: SS 0.9% 20 mL/kg IV en bolo, repetir si necesario. Continuar con SRO tras estabilización. Alimentación precoz."
      }
    },
    {
      nombre: "Vacunas — Esquema MSP Ecuador",
      seccion: {
        definicion: "Programa nacional de inmunizaciones del MSP Ecuador. Conjunto de vacunas administradas en momentos específicos del ciclo vital para prevenir enfermedades inmunoprevenibles.",
        etiologia: "Las enfermedades prevenibles generan alta morbimortalidad infantil: sarampión, polio, tosferina, difteria, tétanos, hepatitis B, meningitis bacteriana, rotavirus, neumococo.",
        clinica: "Calendario 2024: RN (BCG + HB), 2m (Penta + OPV + Rota + Neumo), 4m (Penta + OPV + Rota + Neumo), 6m (Penta + OPV + Influenza), 12m (SRP + Varicela + FA + Neumo refuerzo), 18m (SRP 2ª + DPT refuerzo), 5a (DPT + OPV).",
        diagnostico: "ESAVI (Evento Supuestamente Atribuible a Vacunación e Inmunización): clasificar como grave (hospitalización, secuela permanente, muerte) o leve (dolor, fiebre <48h). Notificar al MSP dentro de 24-48h.",
        tratamiento: "Contraindicaciones absolutas: anafilaxia previa al componente, vacunas vivas en inmunodeficiencia severa (SCID) y embarazo. Contraindicación temporal: enfermedad aguda moderada-grave. No contraindicación: fiebre leve, antibiótico, lactancia, contacto con embarazada."
      }
    },
  ],

  /* ══════════════════════════════════════════════
     MÓDULO 3 — GINECOLOGÍA Y OBSTETRICIA
  ══════════════════════════════════════════════ */
  "ginecologia": [
    {
      nombre: "Control Prenatal y Riesgo Obstétrico",
      seccion: {
        definicion: "Conjunto de acciones y procedimientos sistemáticos destinados a la prevención, diagnóstico y tratamiento de los factores que puedan condicionar morbimortalidad materna y perinatal.",
        etiologia: "Riesgo obstétrico elevado: cesárea anterior, macrosomía, gestación múltiple, enfermedades crónicas maternas (DM, HTA, LES, cardiopatía), antecedente de pérdida perinatal, edad extrema (<16 o >40 años).",
        clinica: "Controles mínimos OMS: 8 (MSP Ecuador recomienda 12). Incluye: PA, peso, talla uterina, presentación fetal, FCF, EGO, hemograma, grupo/Rh, VDRL, VIH, prueba de glucosa.",
        diagnostico: "FPP (Naegele): FUR −3 meses +7 días. Ecografías: 11-14 semanas (translucencia nucal, PAPP-A, βhCG libre), 20-24 semanas (morfológica), 32-34 semanas (bienestar fetal). Tamizaje glucosa: 24-28 semanas.",
        tratamiento: "Suplementación: ácido fólico 0.4 mg/día desde preconcepcional. Hierro 60 mg/día desde 2° trimestre. Calcio 1.5 g/día si riesgo preeclampsia. Vacunación: dTpa 27-36 semanas, influenza."
      }
    },
    {
      nombre: "Preeclampsia y Eclampsia",
      seccion: {
        definicion: "Preeclampsia: HTA (≥140/90) + proteinuria (≥300 mg/24h) después de semana 20. Eclampsia: preeclampsia + convulsiones tonicoclónicas no atribuibles a otra causa. Síndrome HELLP: hemólisis + enzimas hepáticas elevadas + trombocitopenia.",
        etiologia: "Placentación anormal con invasión trofoblástica deficiente → vasoconstricción sistémica. Factores de riesgo: primigestante, HTA crónica, DM, obesidad, gestación múltiple, enfermedad renal, antecedente de PE.",
        clinica: "Leve: PA ≥140/90 + proteinuria. Severa: PA ≥160/110, creatinina >1.1, trombocitopenia <100k, enzimas hepáticas dobles, edema pulmonar, síntomas neurológicos (cefalea, escotomas, hiperreflexia).",
        diagnostico: "PA en dos tomas separadas 4-6h. Proteinuria en orina 24h o relación proteína/creatinina >0.3 en muestra única. Hemograma, PCR, transaminasas, creatinina, ácido úrico. Biopsia renal si dudas.",
        tratamiento: "Leve <37 semanas: control ambulatorio estricto. Severa o ≥37 semanas: finalización del embarazo. Sulfato de Mg (anticonvulsivante): 4-6g IV bolo + 1-2 g/h (antídoto: gluconato Ca²⁺). Antihipertensivo severa: nifedipino VO o labetalol IV."
      }
    },
    {
      nombre: "Hemorragias Obstétricas",
      seccion: {
        definicion: "Sangrado de origen uterino o del canal del parto durante el embarazo o el puerperio. Principal causa de mortalidad materna directa en el mundo.",
        etiologia: "Placenta previa: inserción anormal de la placenta (previa oclusiva, marginal, de inserción baja). DPPNI: separación brusca de la placenta normoinserta por trauma, HTA, cocaína. HPP: atonía (70%), retención placentaria, laceraciones, coagulopatía.",
        clinica: "Placenta previa: hemorragia indolora rojo brillante, tercer trimestre, sin estado de shock proporcional. DPPNI: hemorragia oscura + dolor abdominal intenso + útero en leño + sufrimiento fetal. HPP: sangrado posparto >500 mL (vaginal) o >1000 mL (cesárea).",
        diagnostico: "Placenta previa: ecografía (NO tacto vaginal). DPPNI: clínico + ecografía (puede ser negativa). HPP: estimación visual de pérdida. En todos: hemograma, coagulación, grupo/Rh.",
        tratamiento: "Placenta previa: cesárea electiva (36-37 semanas en oclusiva). DPPNI: cesárea de emergencia. HPP: masaje uterino + oxitocina 10 UI IV/IM + misoprostol 800 mcg rectal, ácido tranexámico 1g IV, HBMO (hidratación + hemo)."
      }
    },
    {
      nombre: "Trabajo de Parto y Parto",
      seccion: {
        definicion: "Proceso fisiológico de contracciones uterinas regulares y progresivas que llevan a la dilatación cervical, descenso y expulsión del feto y la placenta.",
        etiologia: "Inicio espontáneo (prostaglandinas, oxitocina endógena, cortisol fetal). Inducción médica indicada cuando los riesgos de continuar el embarazo superan los del parto: >41 semanas, preeclampsia, RPM.",
        clinica: "Fase latente: contracciones irregulares, dilatación 0-6 cm. Fase activa: contracciones regulares (3-5/10 min), dilatación ≥6 cm, velocidad ≥1 cm/h. Expulsivo: pujo + descenso de la presentación.",
        diagnostico: "Partograma: registro gráfico de dilatación, descenso y FCF. Línea de alerta (progresión normal). Línea de acción (4h después): requiere decisión. Monitoreo fetal: DIP I (normal), DIP II (insuficiencia úteroplacentaria), DIP variable.",
        tratamiento: "Manejo activo del alumbramiento: oxitocina 10 UI IM tras expulsión fetal + tracción controlada del cordón. Episiotomía: no rutinaria, solo si necesario. Indicaciones de cesárea: presentación transversa, sufrimiento fetal agudo, desproporción cefalopélvica, placenta previa oclusiva."
      }
    },
    {
      nombre: "Infecciones en el Embarazo — TORCH y ITU",
      seccion: {
        definicion: "Las infecciones durante el embarazo pueden tener consecuencias graves para el feto (malformaciones, aborto, muerte fetal) o la madre (sepsis). TORCH: Toxoplasma, Rubéola, Citomegalovirus, Herpes, Sífilis.",
        etiologia: "Toxoplasma: ingesta de carne mal cocida o contacto con heces de gato. CMV: contacto con saliva/orina/leche materna. Sífilis: Treponema pallidum vía sexual o vertical. ITU: E. coli (80%), K. pneumoniae, Proteus.",
        clinica: "CMV fetal: RCIU, microcefalia, calcificaciones periventriculares, coriorretinitis. Rubéola: triada (cardiopatía + cataratas + sordera). Sífilis congénita: lesiones óseas, rash, hepatoesplenomegalia. ITU embarazo: disuria, urgencia; bacteriuria asintomática frecuente (riesgo pielonefritis).",
        diagnostico: "Serología TORCH: IgM (infección reciente) + IgG (inmunidad). Tamizaje rutinario: VDRL (sífilis), rubéola (1ª visita). Urocultivo en bacteriuria asintomática (se trata siempre). EcoObstétrica si infección confirmada.",
        tratamiento: "Toxoplasma agudo: espiramicina (1er trimestre), pirimetamina + sulfadiazina si infección fetal confirmada. Rubéola: solo preventiva (vacuna preconcepcional). CMV: ganciclovir fetal en casos severos. Sífilis: penicilina G benzatínica. ITU: cefalexina o nitrofurantoína (no en tercer trimestre)."
      }
    },
    {
      nombre: "Ginecología — SOP y Endometriosis",
      seccion: {
        definicion: "SOP: síndrome anovulatorio con hiperandrogenismo y ovarios poliquísticos, la endocrinopatía más frecuente en mujeres en edad reproductiva. Endometriosis: presencia de tejido endometrial fuera de la cavidad uterina.",
        etiologia: "SOP: multifactorial (genética + resistencia insulínica + alteración del eje hipotálamo-hipófisis-ovario). Endometriosis: implantación de células endometriales por menstruación retrógrada, metaplasia celómica o diseminación linfática.",
        clinica: "SOP: oligomenorrea/amenorrea, signos de hiperandrogenismo (hirsutismo, acné, alopecia), obesidad. Endometriosis: dismenorrea progresiva (síntoma cardinal), dispareunia profunda, dolor pélvico crónico, infertilidad.",
        diagnostico: "SOP (Rotterdam ≥2 de 3): oligoanovulación + hiperandrogenismo clínico/bioquímico + ovarios poliquísticos (≥12 folículos 2-9mm o volumen ≥10 mL). TSH, prolactina, testosterona, DHEAS. Endometriosis: laparoscopía con biopsia (estándar de oro). Ecografía: endometriomas.",
        tratamiento: "SOP: ACO para regular ciclos + antiandrogenismo; metformina si resistencia insulínica; inducción ovulación si deseo gestacional (letrozol, citrato de clomifeno). Endometriosis: ACO o progestágenos, análogos GnRH; laparoscopía terapéutica (ablación de implantes, cistectomía de endometriomas)."
      }
    },
    {
      nombre: "Oncología Ginecológica — Cáncer Cervicouterino",
      seccion: {
        definicion: "Neoplasia maligna del cérvix uterino. Segunda causa de muerte por cáncer en mujeres latinoamericanas. Alta asociación con VPH (virus del papiloma humano).",
        etiologia: "VPH de alto riesgo oncogénico (16, 18, 31, 33, 45) necesario pero no suficiente. Cofactores: tabaquismo, inmunosupresión, múltiples parejas sexuales, inicio temprano de actividad sexual, coinfección con Chlamydia/HSV2.",
        clinica: "Precoz: asintomático (detectado por tamizaje). Avanzado: metrorragia (sangrado irregular), leucorrea fétida, coitorragia. Estadios avanzados: dolor pélvico, hidronefrosis, hematuria/rectorragia (invasión vejiga/recto).",
        diagnostico: "Tamizaje: PAP (citología cervical) cada 3 años en 25-65 años o cotesting PAP+VPH cada 5 años. Colposcopía + biopsia dirigida en PAP anormal. Estadificación FIGO: clínica + TC/RMN pélvica.",
        tratamiento: "CIN 2-3: LEEP (escisión electroquirúrgica con asa), criocirugía, conización. Estadio IA: histerectomía simple o radical según profundidad invasión. IB-IIA: histerectomía radical + linfadenectomía. IIB-IVA: quimiorradioterapia (cisplatino + radioterapia). Vacuna VPH: prevención."
      }
    },
    {
      nombre: "Planificación Familiar",
      seccion: {
        definicion: "Conjunto de prácticas que permiten a las personas decidir libremente el número de hijos, el espaciamiento entre ellos y el momento de tenerlos, mediante el uso de métodos anticonceptivos.",
        etiologia: "La no planificación familiar se asocia a: embarazo no deseado, aborto inseguro, mortalidad materna, desigualdades sociales. El acceso a planificación es un derecho sexual y reproductivo.",
        clinica: "Elegibilidad OMS (categorías 1-4): cat 1 (sin restricción), cat 2 (ventajas > riesgos), cat 3 (riesgos > ventajas), cat 4 (contraindicado). Ej.: ACO combinado cat 4 en trombofilia o HTA severa.",
        diagnostico: "Historia clínica completa: antecedentes personales (HTA, TVP, hepatopatía, migraña con aura, tabaquismo), ginecológicos, número de hijos, deseo gestacional. No se requieren exámenes de laboratorio rutinarios.",
        tratamiento: "ACO combinado (estrógeno + progestágeno): alta eficacia, regula ciclo. DIU cobre: no hormonal, 10 años, anticoncepción de emergencia hasta 5 días. DIU LNG (Mirena): >5 años, disminuye sangrado. Implante: >3 años, más eficaz. Anticoncepción de emergencia: levonorgestrel 1.5 mg <72h."
      }
    },
  ],

  /* ══════════════════════════════════════════════
     MÓDULO 4 — CIRUGÍA GENERAL
  ══════════════════════════════════════════════ */
  "cirugia": [
    {
      nombre: "Apendicitis Aguda",
      seccion: {
        definicion: "Inflamación aguda del apéndice cecal. Causa más frecuente de abdomen quirúrgico en el mundo. Pico de incidencia: 10-30 años.",
        etiologia: "Obstrucción del lumen apendicular: fecalito (principal en adultos), hiperplasia linfoide (niños), parásitos, cuerpo extraño. La obstrucción → aumento de presión → isquemia → inflamación → perforación.",
        clinica: "Dolor periumbilical que migra a fosa ilíaca derecha (FID) en 12-24h. Náuseas, vómitos, fiebre moderada (38-38.5°C). Signos: Blumberg (rebote en FID), Rovsing (dolor contralateral), McBurney (punto doloroso), psoas (apendicitis retrocecal).",
        diagnostico: "Score de Alvarado (MANTRELS): ≥7 → alta probabilidad quirúrgica. TC abdominopélvica (mejor sensibilidad 97%, especificidad 95%). Ecografía en mujeres jóvenes y embarazadas (evitar radiación). PCR + leucocitosis.",
        tratamiento: "Apendicectomía laparoscópica (estándar de oro). Antibiótico profiláctico: cefazolina + metronidazol. Perforación: irrigación + drenaje + antibiótico prolongado. Conservador (antibiótico solo): en casos seleccionados de apendicitis no complicada (controversial)."
      }
    },
    {
      nombre: "Colecistitis y Colelitiasis",
      seccion: {
        definicion: "Colelitiasis: presencia de cálculos en la vesícula biliar. Colecistitis aguda: inflamación de la vesícula biliar, generalmente secundaria a obstrucción del conducto cístico por un cálculo.",
        etiologia: "Cálculos de colesterol (80%): exceso de colesterol + disminución de sales biliares + estasis. Las 4F: Fat (obeso), Forty (>40 años), Female (mujer), Fertile (multípara). Cálculos pigmentados: hemólisis crónica, cirrosis.",
        clinica: "Cólico biliar: dolor intenso en hipocondrio derecho o epigastrio, 30 min-6h, poscomida grasa, sin fiebre. Colecistitis: dolor persistente >6h + fiebre + leucocitosis + Murphy positivo (interrupción inspiratoria al palpar HCD).",
        diagnostico: "Ecografía abdominal: cálculos (mejor prueba), pared vesicular >4mm, líquido perivesicular, edema. Murphy ecográfico. TC para complicaciones. Laboratorio: leucocitosis, PCR, bilirrubina, FA (coledocolitiasis).",
        tratamiento: "Colecistitis aguda: NPO + hidratación IV + analgesia + antibiótico (ciprofloxacino + metronidazol o amoxicilina-clavulánico) + colecistectomía laparoscópica (electiva en primera semana). Coledocolitiasis: CPRE + esfinterotomía → colecistectomía diferida."
      }
    },
    {
      nombre: "Pancreatitis Aguda",
      seccion: {
        definicion: "Proceso inflamatorio agudo del páncreas con activación prematura de enzimas pancreáticas que causan autodigestión. Puede ir desde leve (edematosa) hasta grave con necrosis y falla orgánica.",
        etiologia: "Litiásica (40-50%): cálculo enclavado en la ampolla de Vater. Alcohólica (25-30%): consumo excesivo crónico de alcohol. Otras: hipertrigliceridemia (>1000 mg/dL), hipercalcemia, post-CPRE, trauma, fármacos (azatioprina, tiazidas).",
        clinica: "Dolor epigástrico intenso de inicio brusco, irradiado 'en cinturón' hacia la espalda, continuo, que mejora en posición fetal. Náuseas, vómitos profusos. Signos de gravedad: Grey-Turner (flancos equimóticos), Cullen (periumbilical equimótico).",
        diagnostico: "Lipasa sérica >3× valor normal (más específica que amilasa). TC abdominal con contraste: necrosis (puntuación de Balthazar). Escala BISAP (≥2 = grave) y APACHE II. Ecografía: cálculos biliares.",
        tratamiento: "Leve: hidratación agresiva (Ringer lactato 250-500 mL/h) + NPO + analgesia (ketorolaco, tramadol). Grave (BISAP ≥2 o Ranson ≥3): UCI + nutrición enteral precoz (nasoyeyunal) + antibiótico si necrosis infectada (carbapenem). CPRE urgente si coledocolitiasis + colangitis."
      }
    },
    {
      nombre: "Trauma Abdominal y ATLS",
      seccion: {
        definicion: "Lesión de órganos abdominales o estructuras vasculares por mecanismo externo. Cerrado: sin solución de continuidad de la pared. Penetrante: herida que atraviesa el peritoneo parietal.",
        etiologia: "Cerrado (80%): accidentes de tráfico (principal), caídas, deporte. Órgano más lesionado: bazo (40-55%), hígado (35-45%). Penetrante (20%): arma blanca, arma de fuego. Órgano más lesionado: intestino delgado.",
        clinica: "Dolor abdominal, defensa, descompresión. Signos de hemorragia: taquicardia, hipotensión, palidez. Rotura de bazo: hemoperitoneo + dolor en hombro izquierdo (signo de Kehr). Rotura de víscera hueca: peritonitis.",
        diagnostico: "FAST (Focused Assessment with Sonography for Trauma): detecta líquido libre (sangre). Alta sensibilidad en manos expertas. TC abdominal con contraste: el estándar de oro en paciente estable. DPL (lavado peritoneal diagnóstico): si FAST negativa con alta sospecha.",
        tratamiento: "Inestable: laparotomía exploratoria de emergencia. Estable con FAST negativa: TC. Damage control surgery: control hemorrágico + contaminación → UCI → cirugía definitiva 24-48h. Bazo: esplenorrafia o esplenectomía. Lesiones hepáticas: empaquetamiento (packing)."
      }
    },
    {
      nombre: "Hernias de la Pared Abdominal",
      seccion: {
        definicion: "Protrusión de contenido abdominal a través de un defecto o punto débil de la pared abdominal. Según localización: inguinal (75%), umbilical (10%), femoral (femoral >inguinal en mujer), incisional.",
        etiologia: "Factores predisponentes: debilidad congénita de la fascia, obesidad, estreñimiento crónico, EPOC (tos), ascitis, cirugías previas (incisional), embarazo (umbilical), trabajo físico intenso.",
        clinica: "Tumoración visible/palpable que aumenta con Valsalva. Dolor. Reducible (se reduce en decúbito). Incarcerada: no reducible, sin compromiso vascular. Estrangulada: compromiso vascular → isquemia → necrosis → urgencia.",
        diagnostico: "Clínico: maniobra de Valsalva, anillo herniario, contenido herniario (epiplón, intestino). Ecografía si duda diagnóstica. TC si sospecha de complicaciones.",
        tratamiento: "Electiva: hernioplastia de Lichtenstein (malla sin tensión, bajo índice de recidiva). Laparoscópica (TEP/TAPP): bilateral, recidivante, femoral. Estrangulada: cirugía urgente + resección del asa necrótica si afectada. Hernia umbilical en lactante: observación hasta 2 años."
      }
    },
    {
      nombre: "Proctología — Hemorroides y Fisura Anal",
      seccion: {
        definicion: "Hemorroides: dilatación varicosa de los plexos venosos hemorroidales interno (sobre la línea pectínea) y externo (bajo la línea pectínea). Fisura anal: solución de continuidad longitudinal del epitelio del conducto anal.",
        etiologia: "Hemorroides: estreñimiento crónico + hipertensión venosa portal + esfuerzo defecatorio, embarazo, sedentarismo. Fisura: deposiciones duras, trauma anal, hipertonía del esfínter anal interno.",
        clinica: "Hemorroides internas: sangrado rojo brillante posdefecación (no dolorosas). Grados I-IV por prolapso. Externas: dolor intenso agudo (trombosis). Fisura: dolor agudo posposcadefecación (como 'cuchillada') + sangrado escaso + espasmo esfinteriano.",
        diagnostico: "Inspección perianal directa y anoscopia. Hemorroides: clasificación de Goligher. Fisura posterior (99% casos). Fisura atípica (lateral, múltiple): descartar Crohn, sífilis, VIH.",
        tratamiento: "Hemorroides grado I-II: dieta rica en fibra + baños de asiento + higiene. Grado III: ligadura con banda elástica. Grado IV o externas trombosadas: hemorroidectomía de Milligan-Morgan. Fisura aguda: nitroglicerina tópica 0.4% o diltiazem 2%. Crónica: toxina botulínica o esfinterotomía lateral interna."
      }
    },
  ],

  /* ══════════════════════════════════════════════
     MÓDULO 5 — EMERGENCIAS
  ══════════════════════════════════════════════ */
  "emergencias": [
    {
      nombre: "Reanimación Cardiopulmonar (RCP/ACLS)",
      seccion: {
        definicion: "Conjunto de maniobras de soporte vital básico y avanzado para restaurar circulación espontánea y ventilación en un paciente en paro cardiorrespiratorio.",
        etiologia: "Adulto: causas cardíacas (FV, TVSP en el 80%). Paro extrahospitalario: FV (mejor pronóstico). Causas reversibles (5H5T): Hipoxia, Hipovolemia, H+ (acidosis), Hipo/Hiperpotasemia, Hipotermia; Neumotórax a Tensión, Taponamiento, Tóxicos, Trombosis coronaria, TEP.",
        clinica: "Paciente inconsciente, sin respiración efectiva (apnea o gasping), sin pulso palpable en arteria carótida o femoral. Piel pálida/cianótica. En FV/TV: puede haber convulsiones iniciales.",
        diagnostico: "Diagnóstico clínico inmediato (máximo 10 segundos de evaluación). ECG tan pronto esté disponible: ritmos desfibrilables (FV/TVSP) vs no desfibrilables (AESP, asistolia). DEA: analiza el ritmo automáticamente.",
        tratamiento: "SVB: 30 compresiones + 2 ventilaciones. Compresiones 100-120/min, 5-6 cm profundidad. SVA: desfibrilación (FV/TVSP) + adrenalina 1 mg IV c/3-5 min + amiodarona 300 mg (1ª dosis). Tratar la causa. Post-PCR: hipotermia terapéutica (33-36°C × 24h)."
      }
    },
    {
      nombre: "Shock — Tipos y Manejo",
      seccion: {
        definicion: "Estado de hipoperfusión tisular generalizada con déficit en la entrega o utilización de oxígeno que lleva a disfunción celular y orgánica. Clasificación: hipovolémico, distributivo (séptico, anafiláctico), cardiogénico, obstructivo.",
        etiologia: "Hipovolémico: hemorragia, deshidratación, quemaduras. Séptico: infección diseminada. Anafiláctico: alérgenos (medicamentos, alimentos, venenos). Cardiogénico: IAM (principal), miocarditis, arritmias. Obstructivo: TEP masivo, neumotórax a tensión, taponamiento.",
        clinica: "Tríada: hipotensión (TAS <90 mmHg o caída >40 mmHg del basal) + taquicardia + signos de hipoperfusión (piel fría/cianótica, confusión, oliguria, lactato >2 mmol/L). Cardiogénico: edema pulmonar. Anafiláctico: urticaria, angioedema, broncoespasmo.",
        diagnostico: "Clínico + PAM (objetivo ≥65 mmHg) + lactato sérico. Clasificar el tipo: ecocardiograma (FE, taponamiento, contractilidad), hemocultivos (séptico), triptasa (anafiláctico), D-dímero + AngioTC (obstructivo).",
        tratamiento: "Hipovolémico: cristaloides + hemoderivados (hemorragia). Séptico: ATB + noradrenalina. Anafiláctico: adrenalina IM 0.3-0.5 mg. Cardiogénico: revascularización urgente + dobutamina. Obstructivo: tratar causa (drenaje neumotórax, anticoagulación TEP, pericardiocentesis)."
      }
    },
    {
      nombre: "Intoxicaciones Agudas",
      seccion: {
        definicion: "Situaciones de urgencia producidas por la exposición a sustancias tóxicas (medicamentos, plaguicidas, sustancias de abuso, gases) que generan alteraciones fisiológicas potencialmente mortales.",
        etiologia: "Accidental (niños), voluntaria (autointoxicación — suicidio, adultos), laboral (plaguicidas organofosforados). Principales: paracetamol (sobredosis medicamentosa más frecuente), BZD, opioides, organofosforados, alcohol.",
        clinica: "Organofosforados: síndrome muscarínico (SLUDGE: salivación, lagrimeo, micción, diarrea, GI, emesis) + miosis + bradicardia + nicotínico (fasciculaciones, debilidad muscular). Paracetamol: fase I (síntomas GI 24h), fase II (elevación transaminasas 48-72h), fase III (fallo hepático 72-96h).",
        diagnostico: "Historia clínica + toxídromo identificado. Laboratorio: glucosa, ionograma, creatinina, transaminasas, coagulación, gasometría. Niveles plasmáticos específicos (paracetamol: nomograma Rumack-Matthew). Actividad colinesterasa eritrocitaria (organofosforados).",
        tratamiento: "Medidas generales: ABC + carbón activado 1 g/kg VO (efectivo <1-2h). Antídotos: Paracetamol → N-acetilcisteína IV (150 mg/kg bolo); Organofosforados → atropina (hasta secar secreciones) + pralidoxima <48h; BZD → flumazenil 0.2 mg IV; Opioides → naloxona 0.4-2 mg IV/IM."
      }
    },
    {
      nombre: "Emergencias Metabólicas",
      seccion: {
        definicion: "Alteraciones agudas del metabolismo (glucosa, electrolitos, equilibrio ácido-base) que pueden producir riesgo vital inmediato si no se tratan con prontitud.",
        etiologia: "CAD: déficit de insulina (DM1 o DM2) + estrés metabólico (infección). EHH: DM2 + deshidratación grave. Hipoglucemia: exceso de insulina o sulfonilurea, ayuno prolongado, alcohol. Hiperpotasemia: IRC, fármacos (IECA, heparina), hemólisis, rabdomiólisis.",
        clinica: "CAD: poliuria, polidipsia, dolor abdominal, aliento cetónico, Kussmaul, alteración del estado de conciencia. EHH: similar pero sin cetoacidosis, más profundo deterioro del sensorio. Hipoglucemia: diaforesis, temblor, palpitaciones, confusión, convulsión, coma. Hiperpotasemia: parálisis, ondas T picudas en ECG, FV.",
        diagnostico: "CAD: glucosa >250 + pH <7.3 + HCO3 <18 + AG >12 + cetonemia. EHH: glucosa >600 + osm >320 + sin cetosis significativa. Hipoglucemia: glucosa <70 mg/dL + síntomas. Hiperpotasemia: K+ >5.5 + ECG.",
        tratamiento: "CAD: SS 0.9% agresiva + insulina regular 0.1 U/kg/h + K+ (si <5.3 y diuresis). No insulina si K+ <3.3. EHH: igual pero hidratación más agresiva y menor dosis insulina. Hipoglucemia consciente: 15-20g glucosa VO (regla 15-15). Inconsciente: D50% 25 mL IV. Hiperpotasemia: gluconato Ca²⁺ + insulina/glucosa + kayexalato."
      }
    },
    {
      nombre: "ACV Isquémico y Estado Epiléptico",
      seccion: {
        definicion: "ACV isquémico: déficit neurológico focal de inicio brusco por oclusión arterial cerebral. Estado epiléptico: convulsión continua >5 minutos o ≥2 convulsiones sin recuperar conciencia entre ellas.",
        etiologia: "ACV isquémico: aterosclerosis (la más frecuente), cardioembólico (FA, IAM, valvulopatías), lacunar (HTA, DM). Estado epiléptico: epilepsia no controlada, ACV, TCE, meningoencefalitis, alteraciones metabólicas (glucosa, Na+), abstinencia de BZD/alcohol.",
        clinica: "ACV isquémico: FAST (Facial drop, Arm drift, Speech problem, Time to call). Déficit focal: hemiparesia, hemiplejía, afasia, hemianopsia. Trombosis de arteria basilar: síntomas de circulación posterior (vértigo, diplopia, ataxia). Estado epiléptico: convulsiones tónico-clónicas generalizadas o focales persistentes.",
        diagnostico: "ACV: TC sin contraste URGENTE (descarta hemorragia). RMN difusión: infarto <6h. Escala NIHSS (cuantifica déficit). EEG en estado epiléptico no convulsivo. Glucosa capilar antes de todo antiepiléptico.",
        tratamiento: "ACV isquémico: rtPA 0.9 mg/kg IV en <4.5h (si sin contraindicaciones). Trombectomía mecánica hasta 24h en grandes vasos. AAS 325 mg en primeras 24-48h (si no trombolisis). Estado epiléptico: lorazepam 0.1 mg/kg IV → fenitoína 20 mg/kg IV → propofol + intubación. Glucosa IV si hipoglucemia."
      }
    },
  ],

  /* ══════════════════════════════════════════════
     MÓDULO 6 — SALUD PÚBLICA Y APS
  ══════════════════════════════════════════════ */
  "salud-publica": [
    {
      nombre: "Epidemiología — Medidas de Frecuencia y Asociación",
      seccion: {
        definicion: "La epidemiología estudia la distribución y determinantes de los estados de salud y enfermedad en las poblaciones humanas, y aplica ese conocimiento para controlar los problemas de salud.",
        etiologia: "Las tasas de incidencia y prevalencia dependen de: frecuencia de exposiciones, características del agente, susceptibilidad del huésped y factores del entorno. La tasa de prevalencia ≈ incidencia × duración de la enfermedad.",
        clinica: "Medidas de frecuencia: Incidencia (nuevos casos/población en riesgo × tiempo). Prevalencia (total casos/población × tiempo). Mortalidad específica. AVISA (DALY): carga de enfermedad. AVPM: muerte prematura. AVPD: discapacidad.",
        diagnostico: "Medidas de asociación: Riesgo Relativo (RR = I expuestos/I no expuestos) para cohortes. Odds Ratio (OR = a×d/b×c) para casos y controles. RR/OR >1: factor de riesgo. <1: factor protector. =1: sin asociación. IC 95% que no incluye el 1 = significativo.",
        tratamiento: "Aplicación en salud pública: identificar factores de riesgo modificables → diseñar intervenciones preventivas → evaluar su efectividad → vigilancia epidemiológica continua. Notificación obligatoria de enfermedades transmisibles para vigilancia en tiempo real."
      }
    },
    {
      nombre: "Pruebas Diagnósticas — Validez y Reproductibilidad",
      seccion: {
        definicion: "Propiedades de una prueba diagnóstica para clasificar correctamente a los individuos como enfermos o sanos. Validez interna (mide lo que debe medir) y reproductibilidad (resultados consistentes).",
        etiologia: "La elección del punto de corte (cut-off) determina el balance entre sensibilidad y especificidad. Al bajar el umbral: ↑ sensibilidad, ↓ especificidad (más falsos positivos). Al subir: lo opuesto.",
        clinica: "Sensibilidad (Se = VP/VP+FN): alta Se → pocas enfermedades sin detectar → útil para TAMIZAJE. Especificidad (Esp = VN/VN+FP): alta Esp → pocos falsos positivos → útil para CONFIRMACIÓN. Regla: SnNout (alta Se: si negativo descarta) y SpPin (alta Esp: si positivo confirma).",
        diagnostico: "VPP = VP/(VP+FP): probabilidad de enfermedad si test +. Depende de la prevalencia. Con la misma Se y Esp, si la prevalencia baja → VPP cae (más falsos positivos relativamente). Curva ROC: área bajo la curva (AUC) representa la discriminación global del test.",
        tratamiento: "Para tamizaje poblacional: priorizar alta sensibilidad (no dejar casos sin detectar). Para confirmar diagnóstico: priorizar alta especificidad. En enfermedades raras con test imperfecto: muchos falsos positivos → estrategia en 2 pasos (test muy sensible seguido de test muy específico)."
      }
    },
    {
      nombre: "Atención Primaria en Salud (APS)",
      seccion: {
        definicion: "Estrategia de organización de los sistemas de salud y modelo de atención dirigido a toda la población, que garantiza el primer contacto accesible, integral, continuo y coordinado con el sistema de salud.",
        etiologia: "Declaración de Alma-Ata (1978): salud como derecho humano + APS como estrategia global. Astana (2018): cobertura sanitaria universal, ODS 3. Problemas que justifican APS: inequidades, fragmentación de sistemas, alto costo de atención especializada.",
        clinica: "Atributos esenciales: primer contacto (punto de entrada), longitudinalidad (continuidad a largo plazo), integralidad (aborda todos los problemas de salud), coordinación (integración con otros niveles). Ecuador: Modelo MAIS-FCI con equipos por territorio, Redes Integradas de Servicios de Salud (RISS).",
        diagnostico: "Niveles de prevención: Primaria (evitar la enfermedad: vacunas, educación). Secundaria (detección precoz: tamizajes, diagnóstico temprano). Terciaria (reducir secuelas: rehabilitación). Cuaternaria (evitar sobremedicalización: no pruebas innecesarias).",
        tratamiento: "Intervenciones de APS con evidencia: control de HTA y DM en primer nivel, tamizaje de cáncer, inmunizaciones, atención prenatal, lactancia materna, TRO en diarrea, antibiótico para NAC. Resultado: reducción de hospitalizaciones y mortalidad prematura."
      }
    },
    {
      nombre: "Programas de Salud Pública — MSP Ecuador",
      seccion: {
        definicion: "Conjunto de estrategias organizadas por el MSP Ecuador para controlar y eliminar enfermedades transmisibles prioritarias y mejorar los indicadores de salud de la población.",
        etiologia: "Prioridades basadas en carga de enfermedad: tuberculosis (incidencia ~30/100.000), VIH (notificación obligatoria), dengue (brotes estacionales), malaria (zonas tropicales), leishmaniasis, chagas. Determinantes sociales: pobreza, hacinamiento, acceso a agua segura.",
        clinica: "TB pulmonar: tos >2 semanas + pérdida de peso + sudores nocturnos + hemoptisis. VIH: infecciones oportunistas en estadio SIDA. Dengue: fiebre + mialgias + exantema + trombocitopenia. Signos de alarma dengue: dolor abdominal intenso, sangrado, hepatomegalia.",
        diagnostico: "TB: baciloscopia de esputo (BK) + cultivo Löwenstein-Jensen + prueba de sensibilidad. VIH: ELISA (tamizaje) + Western Blot (confirmatorio) + carga viral + CD4. Dengue: NS1 Ag (días 1-5), IgM/IgG (a partir del día 5), hemograma seriado.",
        tratamiento: "TB: TAES/DOTS - 2HRZE/4HR (isoniacida + rifampicina + pirazinamida + etambutol). VIH: TAR universal desde diagnóstico (tenofovir + lamivudina + dolutegravir en Ecuador). Dengue sin signos de alarma: ambulatorio + hidratación oral + paracetamol (no AINE). Con alarma: hospitalización + hidratación IV."
      }
    },
    {
      nombre: "Diseños de Estudio en Epidemiología",
      seccion: {
        definicion: "Estrategias metodológicas para investigar la asociación entre exposiciones y desenlaces de salud. Clasificados en: observacionales (sin intervención del investigador) y experimentales (con intervención).",
        etiologia: "La elección del diseño depende de: la pregunta de investigación, la frecuencia de la enfermedad, los recursos disponibles, las consideraciones éticas y el nivel de evidencia requerido.",
        clinica: "Descriptivos: reporte/serie de casos (generan hipótesis, nivel de evidencia bajo). Analíticos observacionales: Cohorte (prospectiva/retrospectiva → RR, mayor potencia para causas raras); Casos y controles (retrospectivo → OR, eficiente para enfermedades raras); Transversal (prevalencia, exposición simultánea).",
        diagnostico: "Sesgos: De selección (¿quiénes entran al estudio?). De información/clasificación (¿cómo se miden los datos?). Sesgo de recuerdo (casos/controles recuerdan diferente). Confusión (tercera variable asociada con exposición y desenlace). La aleatorización controla el confusor en los ECAs.",
        tratamiento: "Jerarquía de evidencia (Oxford): 1a (meta-análisis de ECAs) > 1b (ECA individual) > 2a (revisión sistemática de cohortes) > 2b (cohorte individual) > 3 (casos y controles) > 4 (series de casos) > 5 (opinión de expertos). Para práctica clínica: preferir meta-análisis o ECAs para tomar decisiones."
      }
    },
  ],

  /* ══════════════════════════════════════════════
     MÓDULO 7 — BIOÉTICA Y LEGISLACIÓN SANITARIA
  ══════════════════════════════════════════════ */
  "bioetica": [
    {
      nombre: "Principios Bioéticos",
      seccion: {
        definicion: "El principlismo de Beauchamp y Childress (1979) establece 4 principios prima facie que guían la toma de decisiones éticas en medicina: Autonomía, Beneficencia, No maleficencia y Justicia.",
        etiologia: "Surgieron en respuesta a los abusos en investigación médica (Tuskegee, experimentos Nazi). El Informe Belmont (1979) estableció los principios de respeto por las personas, beneficencia y justicia para la investigación.",
        clinica: "Conflictos frecuentes: Autonomía vs Beneficencia (paternalismo: el médico decide 'por el bien del paciente'). No maleficencia vs Beneficencia (tratamientos con riesgos). Justicia vs Autonomía (recursos limitados). Autonomía: requiere competencia + voluntariedad + información adecuada.",
        diagnostico: "Dilema ético: situación donde dos o más principios o valores entran en conflicto. Proceso: identificar el problema → identificar los valores en conflicto → considerar alternativas → tomar una decisión justificable → evaluar las consecuencias.",
        tratamiento: "No maleficencia: evitar daño activo. Beneficencia: promover el bien. La tensión entre ambos se resuelve con el principio del doble efecto: una acción con efecto bueno y efecto secundario malo puede ser éticamente permitida si: la acción es buena en sí misma, la intención es el bien, el mal no es el medio para el bien y hay proporción entre bien y mal."
      }
    },
    {
      nombre: "Consentimiento Informado",
      seccion: {
        definicion: "Proceso comunicativo y acto jurídico mediante el cual el paciente, tras recibir información comprensible sobre su situación de salud y las opciones terapéuticas, toma voluntariamente una decisión sobre su atención médica.",
        etiologia: "Base ética: principio de autonomía (respeto por la autodeterminación del paciente). Base legal: Ley de Derechos y Amparo del Paciente (Ecuador), Código de Ética Médica, Constitución Art. 66 (derechos de libertad).",
        clinica: "Elementos obligatorios: diagnóstico actual, pronóstico sin y con tratamiento, naturaleza del procedimiento, riesgos comunes y graves, beneficios esperados, alternativas existentes, consecuencias de no actuar. El formulario firmado NO reemplaza la conversación médico-paciente.",
        diagnostico: "Evaluación de la competencia (capacidad): el paciente comprende la información + aprecia sus consecuencias + razona sobre las alternativas + comunica su decisión de forma estable. La competencia es específica para cada decisión (no todo-o-nada).",
        tratamiento: "Excepciones válidas al CI: 1) Urgencia vital (riesgo inmediato de muerte). 2) Incapacidad con representante válido. 3) Renuncia voluntaria e informada. 4) Privilegio terapéutico (muy restringido). En menores: padres/tutores deciden, pero el menor maduro (adolescente con capacidad de comprensión) puede participar o decidir en algunas situaciones."
      }
    },
    {
      nombre: "Confidencialidad y Secreto Profesional",
      seccion: {
        definicion: "Obligación del médico de no revelar la información obtenida en el contexto de la relación médico-paciente sin el consentimiento explícito del paciente. Fundamento: respeto a la autonomía y protección de la confianza.",
        etiologia: "Fundamento ético: autonomía del paciente (control sobre su información) + confianza en la relación médico-paciente (esencial para la eficacia terapéutica). Fundamento legal: Ley de Derechos y Amparo del Paciente, COIP (revelación de secretos).",
        clinica: "El secreto médico aplica a: toda la información clínica, diagnóstico, pronóstico, tratamiento, aspectos personales del paciente. La historia clínica: propiedad de la institución de salud; el paciente tiene derecho de acceso. Conservación mínima: 15 años en Ecuador.",
        diagnostico: "Excepciones al secreto profesional (legalmente reconocidas): 1) Enfermedades de notificación obligatoria (TB, VIH, dengue, etc.). 2) Peligro cierto e identificable para un tercero conocido (deber de advertir). 3) Orden judicial. 4) Declaración pericial en juicio.",
        tratamiento: "Violación del secreto médico genera: responsabilidad ética (sanción del colegio profesional), responsabilidad civil (daños y perjuicios por revelación), responsabilidad penal (COIP Art. 178-180: revelación de información privada hasta 3 años). La notificación de enfermedades obligatorias al MSP no viola el secreto profesional al no identificar al paciente públicamente."
      }
    },
    {
      nombre: "Legislación Sanitaria Ecuatoriana",
      seccion: {
        definicion: "Marco normativo que regula el ejercicio de la medicina, los derechos de los pacientes, la organización del sistema de salud y la responsabilidad profesional en Ecuador.",
        etiologia: "La legislación sanitaria ecuatoriana se fundamenta en: Constitución de la República 2008 (Arts. 32, 362-365), Ley Orgánica de Salud, Ley de Derechos y Amparo del Paciente, Código Orgánico Integral Penal (COIP).",
        clinica: "Constitución Art. 32: salud como derecho humano garantizado por el Estado, vinculado a los derechos al agua, alimentación, educación y entorno sano. Art. 362: las instituciones de salud tienen la obligación ineludible de brindar atención de emergencia.",
        diagnostico: "Derechos del paciente (Ley 77-2006): 1) Atención digna sin discriminación. 2) Confidencialidad. 3) Segunda opinión. 4) Negativa al tratamiento (no urgencia). 5) Información completa sobre su salud. 6) Acceso a historia clínica. 7) Trato no discriminatorio.",
        tratamiento: "Responsabilidad médica: ética (Federación Médica Ecuatoriana/colegio provincial), civil (juicio de daños y perjuicios por negligencia → indemnización), penal (COIP: homicidio culposo Art. 145 = hasta 3 años si fallece por negligencia; lesiones Art. 152). Violencia intrafamiliar: el médico DEBE reportar según Ley 103."
      }
    },
    {
      nombre: "Dilemas Bioéticos en la Práctica Clínica",
      seccion: {
        definicion: "Situaciones clínicas donde los principios éticos entran en conflicto y no existe una respuesta universal correcta, requiriendo deliberación moral contextualizada y apoyo del comité de bioética.",
        etiologia: "Origen de los dilemas: limitación de recursos (UCIs, trasplantes), tecnología que alarga la vida sin calidad, conflicto entre voluntad del paciente y familia, investigación en poblaciones vulnerables, eutanasia, objeción de conciencia.",
        clinica: "Testigo de Jehová que rechaza transfusión: autonomía (adulto competente) vs beneficencia/no maleficencia. Decisión: respetar la negativa del adulto competente (firmar formulario de negativa al tratamiento). Paciente terminal que pide eutanasia activa: en Ecuador es penada → ofrecer sedación paliativa.",
        diagnostico: "Comité de Bioética hospitalario: órgano consultivo (no sancionador) que asesora en dilemas éticos clínicos, revisa protocolos de investigación y elabora políticas institucionales. Composición multidisciplinaria: médicos, enfermeras, juristas, filósofo, representante comunitario.",
        tratamiento: "Sedación paliativa: administración de fármacos para reducir el nivel de conciencia en pacientes con sufrimiento refractario al final de la vida. No es eutanasia (intención es aliviar, no matar). Principio del doble efecto. Directrices anticipadas (voluntad anticipada): expresión escrita de deseos del paciente para el futuro cuando no pueda decidir."
      }
    },
  ],

  /* ══════════════════════════════════════════════
     MÓDULO 8 — SALUD MENTAL
  ══════════════════════════════════════════════ */
  "salud-mental": [
    {
      nombre: "Depresión Mayor",
      seccion: {
        definicion: "Trastorno mental caracterizado por episodios de ánimo deprimido persistente, anhedonia y múltiples síntomas neurovegetativos y cognitivos que generan deterioro funcional significativo.",
        etiologia: "Multifactorial: disregulación de neurotransmisores (serotonina, noradrenalina, dopamina), disfunción del eje HPA (cortisol elevado crónico), factores genéticos (heredabilidad ~40%), estresores psicosociales, enfermedades médicas (hipotiroidismo, Parkinson, ACV).",
        clinica: "Síntoma cardinal: ánimo deprimido + anhedonia, ≥2 semanas. Síntomas acompañantes (≥5 en total): cambios de peso/apetito, insomnio/hipersomnia, agitación/enlentecimiento psicomotor, fatiga, culpa excesiva, dificultad de concentración, ideación suicida pasiva o activa.",
        diagnostico: "Clínico (DSM-5/CIE-11). PHQ-9 para tamizaje y severidad (5-9: leve, 10-14: moderada, 15-19: moderada-grave, ≥20: grave). Descartar causa orgánica: TSH, hemograma, B12. Escala de Columbia (C-SSRS) para riesgo suicida.",
        tratamiento: "Leve: TCC (psicoterapia). Moderada-grave: ISRS (sertralina 50mg/día, fluoxetina 20mg/día) como primera línea + TCC. Respuesta esperada en 4-6 semanas; si falla: cambiar de ISRS o añadir buspirone/mirtazapina. Mantener mínimo 6-12 meses (primer episodio) o indefinidamente (recurrente). Hospitalización si riesgo suicida alto."
      }
    },
    {
      nombre: "Trastorno Bipolar",
      seccion: {
        definicion: "Trastorno del estado de ánimo crónico caracterizado por episodios de manía o hipomanía (polo alto) que alternan con episodios depresivos (polo bajo), con funcionamiento normal en los intervalos.",
        etiologia: "Alta heredabilidad (85%). Genes implicados: ANK3, CACNA1C. Desencadenantes: disrupción del ciclo sueño-vigilia, estrés psicosocial, sustancias (cocaína, cannabis), falta de adherencia al tratamiento. Antidepresivos en monoterapia pueden precipitar manía.",
        clinica: "Tipo I: episodio maníaco ≥7 días (euforia/irritabilidad + insomnio reducido sin cansancio + grandiosidad + logorrea + pensamiento acelerado + conductas impulsivas de riesgo). Tipo II: hipomanía (<7 días, sin hospitalización) + depresión mayor. Ciclotimia: fluctuaciones subsindrómicas ≥2 años.",
        diagnostico: "Clínico (DSM-5). Historia de episodios maníacos o hipomaníacos. Escala MDQ (Mood Disorder Questionnaire) como tamizaje. Descartar: hipotiroidismo, intoxicación por estimulantes, lesión frontal. Niveles séricos de estabilizadores: litio (0.6-1.2 mEq/L).",
        tratamiento: "Manía aguda: antipsicótico (olanzapina/quetiapina/risperidona) ± valproato/litio. Mantenimiento: litio (previene suicidio) o valproato o lamotrigina (más efectivo en fase depresiva). Evitar antidepresivos en monoterapia. TCC + psicoeducación del paciente y familia."
      }
    },
    {
      nombre: "Trastornos de Ansiedad y TOC",
      seccion: {
        definicion: "Los trastornos de ansiedad son la patología mental más prevalente. Incluyen: TAG, trastorno de pánico, fobia social, fobia específica, TEPT. TOC (trastorno obsesivo-compulsivo): obsesiones + compulsiones que generan deterioro funcional.",
        etiologia: "Genética + ambiental. Hiperactividad del sistema límbico (amígdala) con deficiente modulación prefrontal. Rol del eje HPA y disfunción serotoninérgica/GABAérgica. TOC: circuito cortico-estriado-talámico-cortical (CSTC) hiperfuncionante.",
        clinica: "TAG: preocupación excesiva y difícil de controlar >6 meses + 3 síntomas somáticos. Pánico: ataques súbitos de miedo intenso + síntomas autonómicos (palpitaciones, disnea, parestesias, miedo a morir). TOC: obsesiones egodistónicas que generan ansiedad + compulsiones rituales para aliviarla. Tiempo de rituales >1h/día.",
        diagnostico: "Clínico (DSM-5). TAG: GAD-7 ≥10. Pánico: escala PDSS. TOC: Y-BOCS ≥16 (moderado). Descartar causa orgánica (hipertiroidismo, feocromocitoma, aritmias) en ansiedad. EEG en TOC (descartar epilepsia).",
        tratamiento: "Primera línea todos: ISRS (dosis altas en TOC: fluoxetina 60-80 mg) + TCC (exposición y prevención de respuesta en TOC; técnicas de relajación y reestructuración cognitiva en TAG/pánico). BZD: solo a corto plazo (riesgo de dependencia). TAG: también buspirona, venlafaxina, pregabalina."
      }
    },
    {
      nombre: "Esquizofrenia y Otras Psicosis",
      seccion: {
        definicion: "Trastorno mental grave y crónico caracterizado por síntomas positivos (distorsión de la realidad), negativos (empobrecimiento de la función mental) y desorganizados, con deterioro funcional significativo.",
        etiologia: "Hipótesis dopaminérgica: hiperfunción dopaminérgica mesolímbica (síntomas positivos) + hipofunción mesocortical (síntomas negativos). Genética alta heredabilidad (80%). Factores de riesgo: cannabis en adolescencia, trauma, urbanización, migración, infecciones prenatales.",
        clinica: "Síntomas positivos: alucinaciones auditivas (voces que comentan la conducta, dialogan en tercera persona), delirios (persecutorio, de grandiosidad, de control), desorganización del pensamiento. Síntomas negativos: abulia, alogia, aplanamiento afectivo, anhedonia, aislamiento social. Criterio de duración: ≥6 meses (al menos 1 mes activo).",
        diagnostico: "Clínico (DSM-5). Hemograma, metabólico, función tiroidea, toxicología: descartar causas orgánicas. RMN cerebral: primera presentación (descartar lesión estructural). PANSS (Escala de Síntomas Positivos y Negativos) para cuantificar.",
        tratamiento: "Antipsicóticos 2ª generación (preferencia): risperidona 4-6 mg, olanzapina 10-20 mg, quetiapina 400-800 mg, aripiprazol (menor síndrome metabólico). Monitorizar: glucosa, lípidos, PA, ECG (QTc). Clozapina: única aprobada para esquizofrenia refractaria; agranulocitosis en 1% (hemograma semanal × 6 meses). Rehabilitación psicosocial + psicoeducación familiar."
      }
    },
    {
      nombre: "Urgencias Psiquiátricas — Riesgo Suicida y Agitación",
      seccion: {
        definicion: "El riesgo suicida es la posibilidad de que un paciente lleve a cabo un acto autodestructivo con intención de morir. La agitación psicomotriz es un estado de hiperactividad motora, tensión interna y desinhibición conductual.",
        etiologia: "Riesgo suicida: trastornos afectivos (depresión, bipolar), esquizofrenia, abuso de sustancias, dolor crónico, enfermedades terminales, historia de intentos previos, aislamiento social. Agitación: psicosis aguda, delirium (orgánico), intoxicación/abstinencia, manía, trastorno de personalidad, demencia con conductismo.",
        clinica: "Factores de riesgo suicida: intento previo (principal), plan específico y letal, acceso a medios, género masculino, edad >65, diagnóstico psiquiátrico grave, aislamiento. Agitación: hiperactividad motora, voz elevada, amenazas verbales, agresividad, desorientación. Escala STAMP: 5 factores de riesgo de escalada.",
        diagnostico: "Riesgo suicida: escala Columbia C-SSRS (ideación pasiva → activa → con plan → con intento). Siempre preguntar directamente: '¿Ha pensado en hacerse daño o en suicidarse?'. Agitación: descartar causa orgánica (glucemia, tóxicos, neurológica, metabólica) antes de etiquetar como psiquiátrica.",
        tratamiento: "Riesgo suicida alto: hospitalización involuntaria si es necesario + medidas de seguridad ambiental (retirar objetos peligrosos) + tratamiento del trastorno de base. Agitación: de-escalada verbal (ambiente tranquilo, tono calmado) → si falla: lorazepam 1-2 mg IM ± haloperidol 5 mg IM. Droperidol o ziprasidona si disponibles. Contención física: último recurso."
      }
    },
    {
      nombre: "Adicciones y Sustancias",
      seccion: {
        definicion: "Trastorno por uso de sustancias (DSM-5): patrón problemático de uso que genera deterioro funcional significativo, caracterizado por pérdida de control, tolerancia, abstinencia y uso compulsivo a pesar de consecuencias.",
        etiologia: "Biológica: vulnerabilidad genética + activación del sistema dopaminérgico de recompensa (núcleo accumbens). Psicológica: estilos de afrontamiento, trauma, comorbilidad psiquiátrica. Social: disponibilidad de sustancias, normas culturales, red de apoyo débil.",
        clinica: "Alcohol: intoxicación (sedación, ataxia, disartria → coma, depresión respiratoria). Abstinencia: temblor + sudoración + taquicardia (6-24h) → convulsiones (24-48h) → delirium tremens (48-72h: alucinaciones + confusión + inestabilidad autonómica). Opioides: miosis + depresión respiratoria + coma. Cocaína: midriasis + HTA + taquicardia + euforia → convulsiones.",
        diagnostico: "Entrevista motivacional + AUDIT (alcohol), DAST-10 (drogas). Test de detección en orina: cannabis (semanas), cocaína (días), opioides (días). Síndrome de abstinencia alcohólica: escala CIWA-Ar. Gravedad del TUS (DSM-5): leve (2-3 criterios), moderado (4-5), grave (≥6).",
        tratamiento: "Alcohol: abstinencia → benzodiacepinas tituladas por CIWA + tiamina IV 100 mg (previene Wernicke). Mantenimiento: naltrexona, acamprosato. Opioides: metadona o buprenorfina/naloxona (tratamiento de mantenimiento). Intoxicación: naloxona 0.4-2 mg IV/IM. Nicotina: vareniclina > bupropión > TRN (parche/chicle/spray). Cannabis: abstinencia + TCC."
      }
    },
  ],
};
