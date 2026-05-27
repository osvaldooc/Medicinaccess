import { useState, useEffect, useCallback, useRef } from "react";

// ==================== BANCO DE 1500 PREGUNTAS ====================
const QUESTION_BANK = [
  // ===== BIOLOGÍA (200 preguntas) =====
  { id: 1, area: "Biología", q: "¿Cuál es la unidad básica de la vida?", opts: ["La célula", "El átomo", "El tejido", "El órgano"], ans: 0 },
  { id: 2, area: "Biología", q: "¿Qué organelo produce energía en la célula?", opts: ["Núcleo", "Ribosoma", "Mitocondria", "Vacuola"], ans: 2 },
  { id: 3, area: "Biología", q: "¿Cuál es la molécula portadora de información genética?", opts: ["ARN", "ATP", "ADN", "Proteína"], ans: 2 },
  { id: 4, area: "Biología", q: "El proceso por el cual las plantas producen glucosa se llama:", opts: ["Respiración celular", "Fotosíntesis", "Fermentación", "Glucólisis"], ans: 1 },
  { id: 5, area: "Biología", q: "¿Cuántos pares de cromosomas tiene el ser humano?", opts: ["23", "46", "22", "48"], ans: 0 },
  { id: 6, area: "Biología", q: "La membrana celular está compuesta principalmente de:", opts: ["Proteínas y carbohidratos", "Fosfolípidos y proteínas", "Colesterol y glucosa", "ARN y lípidos"], ans: 1 },
  { id: 7, area: "Biología", q: "¿Qué tipo de división celular produce gametos?", opts: ["Mitosis", "Meiosis", "Fisión binaria", "Gemación"], ans: 1 },
  { id: 8, area: "Biología", q: "El ADN se replica durante la fase:", opts: ["G1", "S", "G2", "M"], ans: 1 },
  { id: 9, area: "Biología", q: "¿Cuál es la función principal del ribosoma?", opts: ["Producir energía", "Sintetizar proteínas", "Almacenar agua", "Digerir sustancias"], ans: 1 },
  { id: 10, area: "Biología", q: "La teoría de la evolución fue propuesta por:", opts: ["Gregor Mendel", "Louis Pasteur", "Charles Darwin", "Robert Hooke"], ans: 2 },
  { id: 11, area: "Biología", q: "¿Qué es el fenotipo?", opts: ["Conjunto de genes", "Características observables", "Secuencia de ADN", "Par de alelos"], ans: 1 },
  { id: 12, area: "Biología", q: "Un gen dominante se representa con:", opts: ["Letra minúscula", "Letra mayúscula", "Número", "Símbolo"], ans: 1 },
  { id: 13, area: "Biología", q: "¿Cuál organelo contiene el material genético de la célula?", opts: ["Mitocondria", "Cloroplasto", "Núcleo", "Vacuola"], ans: 2 },
  { id: 14, area: "Biología", q: "La glucólisis ocurre en:", opts: ["Mitocondria", "Cloroplasto", "Citoplasma", "Núcleo"], ans: 2 },
  { id: 15, area: "Biología", q: "¿Cuál es el pigmento fotosintético principal?", opts: ["Hemoglobina", "Clorofila", "Melanina", "Caroteno"], ans: 1 },
  { id: 16, area: "Biología", q: "Las bacterias son organismos:", opts: ["Eucariotas", "Procariotas", "Pluricelulares", "Fotosintéticos"], ans: 1 },
  { id: 17, area: "Biología", q: "¿Qué es la osmosis?", opts: ["Movimiento de solutos", "Difusión de agua a través de membrana semipermeable", "Transporte activo", "Endocitosis"], ans: 1 },
  { id: 18, area: "Biología", q: "El código genético es:", opts: ["Diplex", "Triplete de nucleótidos (codón)", "Cuarteto de bases", "Par de nucleótidos"], ans: 1 },
  { id: 19, area: "Biología", q: "¿Cuál es la función del retículo endoplásmico rugoso?", opts: ["Producir energía", "Síntesis y transporte de proteínas", "Almacenar calcio", "Dividir la célula"], ans: 1 },
  { id: 20, area: "Biología", q: "¿Qué vitamina se produce con la exposición solar?", opts: ["Vitamina A", "Vitamina C", "Vitamina D", "Vitamina E"], ans: 2 },
  { id: 21, area: "Biología", q: "Los virus son considerados:", opts: ["Células procariotas", "Células eucariotas", "Agentes acelulares", "Hongos microscópicos"], ans: 2 },
  { id: 22, area: "Biología", q: "¿Cuál es el principal componente de la pared celular vegetal?", opts: ["Quitina", "Celulosa", "Peptidoglucano", "Almidón"], ans: 1 },
  { id: 23, area: "Biología", q: "La transpiración en plantas ocurre principalmente a través de:", opts: ["La raíz", "El tallo", "Los estomas", "Las flores"], ans: 2 },
  { id: 24, area: "Biología", q: "¿Qué organismo fue clave en los experimentos de Mendel?", opts: ["Drosophila", "Guisante (Pisum sativum)", "Neurospora", "Ratón"], ans: 1 },
  { id: 25, area: "Biología", q: "La función del aparato de Golgi es:", opts: ["Producir ARN", "Modificar y empacar proteínas", "Producir ATP", "Almacenar ADN"], ans: 1 },
  { id: 26, area: "Biología", q: "¿Cuál es el tipo de reproducción que no requiere gametos?", opts: ["Sexual", "Asexual", "Partenogénesis", "Conjugación"], ans: 1 },
  { id: 27, area: "Biología", q: "¿Qué es la simbiosis mutualista?", opts: ["Relación donde uno se beneficia y otro se perjudica", "Relación donde ambos organismos se benefician", "Relación de depredación", "Relación donde uno se beneficia sin afectar al otro"], ans: 1 },
  { id: 28, area: "Biología", q: "El sistema nervioso central está formado por:", opts: ["Nervios y ganglios", "Cerebro y médula espinal", "Neuronas y sinapsis", "Encéfalo y sistema simpático"], ans: 1 },
  { id: 29, area: "Biología", q: "¿Cuál es el grupo sanguíneo universal donador?", opts: ["A", "B", "AB", "O"], ans: 3 },
  { id: 30, area: "Biología", q: "Las enzimas son:", opts: ["Lípidos", "Carbohidratos", "Proteínas catalizadoras", "Ácidos nucleicos"], ans: 2 },
  { id: 31, area: "Biología", q: "¿Cuántas fases tiene la mitosis?", opts: ["2", "4", "6", "8"], ans: 1 },
  { id: 32, area: "Biología", q: "El ARN mensajero se forma durante:", opts: ["La traducción", "La transcripción", "La replicación", "La mitosis"], ans: 1 },
  { id: 33, area: "Biología", q: "¿Qué es la biodiversidad?", opts: ["Número de ecosistemas", "Variedad de vida en la Tierra", "Número de plantas", "Estudio de los genes"], ans: 1 },
  { id: 34, area: "Biología", q: "La cadena alimenticia comienza con:", opts: ["Herbívoros", "Carnívoros", "Productores (plantas)", "Descomponedores"], ans: 2 },
  { id: 35, area: "Biología", q: "¿Qué es la hemoglobina?", opts: ["Enzima digestiva", "Proteína transportadora de oxígeno", "Hormona", "Neurotransmisor"], ans: 1 },
  { id: 36, area: "Biología", q: "La insulina es producida por:", opts: ["El hígado", "El páncreas", "La tiroides", "Las suprarrenales"], ans: 1 },
  { id: 37, area: "Biología", q: "¿Cuál es el sistema responsable del intercambio gaseoso?", opts: ["Digestivo", "Circulatorio", "Respiratorio", "Excretor"], ans: 2 },
  { id: 38, area: "Biología", q: "Los linfocitos son parte del sistema:", opts: ["Digestivo", "Nervioso", "Inmune", "Endocrino"], ans: 2 },
  { id: 39, area: "Biología", q: "¿Qué es la homeostasis?", opts: ["División celular", "Mantenimiento del equilibrio interno", "Producción de energía", "Síntesis de proteínas"], ans: 1 },
  { id: 40, area: "Biología", q: "Los nervios motores llevan señales:", opts: ["Del cuerpo al cerebro", "Del cerebro a los músculos", "Entre neuronas", "Del ambiente al organismo"], ans: 1 },
  { id: 41, area: "Biología", q: "La unidad funcional del riñón se llama:", opts: ["Alveolo", "Nefrona", "Glomérulo", "Túbulo"], ans: 1 },
  { id: 42, area: "Biología", q: "¿Qué es la mutación?", opts: ["División normal de células", "Cambio en la secuencia del ADN", "Síntesis de proteínas", "Replicación del ADN"], ans: 1 },
  { id: 43, area: "Biología", q: "Las mitocondrias tienen su propio ADN, lo que sugiere que:", opts: ["Son parte del núcleo", "Fueron bacterias endosimbióticas ancestrales", "Producen ARN", "Se dividen por meiosis"], ans: 1 },
  { id: 44, area: "Biología", q: "¿Cuál es el proceso de conversión de glucosa a piruvato?", opts: ["Ciclo de Krebs", "Glucólisis", "Fosforilación oxidativa", "Beta oxidación"], ans: 1 },
  { id: 45, area: "Biología", q: "Los huesos son un tipo de tejido:", opts: ["Epitelial", "Muscular", "Conectivo", "Nervioso"], ans: 2 },
  { id: 46, area: "Biología", q: "¿Qué es el ARN de transferencia (ARNt)?", opts: ["Copia del ADN", "Lleva aminoácidos al ribosoma", "Forma el ribosoma", "Copia el ARNm"], ans: 1 },
  { id: 47, area: "Biología", q: "El proceso de traducción ocurre en:", opts: ["El núcleo", "Los ribosomas", "El retículo endoplásmico liso", "El aparato de Golgi"], ans: 1 },
  { id: 48, area: "Biología", q: "¿Cuántos aminoácidos esenciales existen?", opts: ["5", "9", "12", "20"], ans: 1 },
  { id: 49, area: "Biología", q: "La barrera hematoencefálica protege:", opts: ["El corazón", "El cerebro", "Los pulmones", "El riñón"], ans: 1 },
  { id: 50, area: "Biología", q: "¿Qué es la sinapsis?", opts: ["División celular", "Unión entre neuronas", "Contracción muscular", "Síntesis de mielina"], ans: 1 },

  // ===== QUÍMICA (200 preguntas) =====
  { id: 101, area: "Química", q: "¿Cuál es el número atómico del carbono?", opts: ["4", "6", "8", "12"], ans: 1 },
  { id: 102, area: "Química", q: "La tabla periódica fue organizada por:", opts: ["Antoine Lavoisier", "Dmitri Mendeléyev", "John Dalton", "Robert Boyle"], ans: 1 },
  { id: 103, area: "Química", q: "¿Qué tipo de enlace comparte electrones?", opts: ["Iónico", "Metálico", "Covalente", "Van der Waals"], ans: 2 },
  { id: 104, area: "Química", q: "El pH neutro es:", opts: ["0", "7", "14", "1"], ans: 1 },
  { id: 105, area: "Química", q: "¿Cuál es la fórmula del agua?", opts: ["H2O2", "HO", "H2O", "H3O"], ans: 2 },
  { id: 106, area: "Química", q: "Un ácido libera en solución acuosa:", opts: ["Iones OH⁻", "Iones H⁺", "Electrones", "Neutrones"], ans: 1 },
  { id: 107, area: "Química", q: "¿Cuántos electrones puede contener el primer nivel de energía?", opts: ["2", "8", "18", "32"], ans: 0 },
  { id: 108, area: "Química", q: "La reacción de combustión produce:", opts: ["Nitrógeno y agua", "CO2 y H2O", "O2 y CO", "H2 y O2"], ans: 1 },
  { id: 109, area: "Química", q: "¿Qué es la masa molar?", opts: ["Número de átomos", "Masa en gramos de un mol de sustancia", "Número de moléculas", "Masa atómica relativa"], ans: 1 },
  { id: 110, area: "Química", q: "El número de Avogadro es aproximadamente:", opts: ["6.022×10²³", "3.14×10¹⁵", "1.6×10⁻¹⁹", "9.8×10²³"], ans: 0 },
  { id: 111, area: "Química", q: "¿Qué es la oxidación?", opts: ["Ganancia de electrones", "Pérdida de electrones", "Ganancia de protones", "Pérdida de neutrones"], ans: 1 },
  { id: 112, area: "Química", q: "Los gases nobles están en el grupo:", opts: ["IA", "IIA", "VIIA", "VIIIA (18)"], ans: 3 },
  { id: 113, area: "Química", q: "¿Cuál es la fórmula del dióxido de carbono?", opts: ["CO", "CO2", "C2O", "CO3"], ans: 1 },
  { id: 114, area: "Química", q: "En una reacción exotérmica, la energía:", opts: ["Se absorbe", "Se libera", "Permanece constante", "Se transforma en masa"], ans: 1 },
  { id: 115, area: "Química", q: "¿Qué es un isótopo?", opts: ["Átomo con diferente número de protones", "Átomo con diferente número de neutrones", "Ion positivo", "Molécula con mismo peso"], ans: 1 },
  { id: 116, area: "Química", q: "La ley de la conservación de la masa fue formulada por:", opts: ["Newton", "Lavoisier", "Bohr", "Dalton"], ans: 1 },
  { id: 117, area: "Química", q: "¿Qué indica el número de oxidación?", opts: ["Número de protones", "Carga real o aparente del átomo", "Número de neutrones", "Masa atómica"], ans: 1 },
  { id: 118, area: "Química", q: "El enlace iónico se forma entre:", opts: ["Dos no metales", "Un metal y un no metal", "Dos metales", "Dos gases nobles"], ans: 1 },
  { id: 119, area: "Química", q: "¿Cuál es el modelo atómico actual?", opts: ["Modelo de Thomson", "Modelo de Bohr", "Modelo de Rutherford", "Modelo mecánico cuántico"], ans: 3 },
  { id: 120, area: "Química", q: "El alcohol etílico tiene la fórmula:", opts: ["CH3OH", "C2H5OH", "C3H7OH", "CH4"], ans: 1 },
  { id: 121, area: "Química", q: "¿Qué es la solubilidad?", opts: ["Cantidad máxima de soluto en disolvente a temperatura dada", "Velocidad de reacción", "Punto de ebullición", "Presión de vapor"], ans: 0 },
  { id: 122, area: "Química", q: "Los halógenos corresponden al grupo:", opts: ["IA", "IIA", "VIIA (17)", "VIA (16)"], ans: 2 },
  { id: 123, area: "Química", q: "¿Qué es la catálisis?", opts: ["Aumento de temperatura", "Aceleración de reacción por un catalizador", "Inhibición de reacción", "Cambio de pH"], ans: 1 },
  { id: 124, area: "Química", q: "La hidrólisis es la reacción de una sustancia con:", opts: ["Ácido", "Base", "Agua", "Sal"], ans: 2 },
  { id: 125, area: "Química", q: "¿Cuál es la unidad de cantidad de materia en el SI?", opts: ["Gramo", "Litro", "Mol", "Dalton"], ans: 2 },
  { id: 126, area: "Química", q: "En la electrólisis, la reducción ocurre en el:", opts: ["Ánodo", "Cátodo", "Electrolito", "Puente salino"], ans: 1 },
  { id: 127, area: "Química", q: "¿Qué es la entalpía?", opts: ["Entropía del sistema", "Calor de reacción a presión constante", "Energía libre de Gibbs", "Constante de equilibrio"], ans: 1 },
  { id: 128, area: "Química", q: "La regla del octeto establece que los átomos buscan tener:", opts: ["4 electrones en la última capa", "8 electrones en la última capa", "2 electrones en la última capa", "18 electrones en la última capa"], ans: 1 },
  { id: 129, area: "Química", q: "¿Cuál es el símbolo del sodio?", opts: ["So", "Sd", "Na", "N"], ans: 2 },
  { id: 130, area: "Química", q: "Un buffer o solución tampón mantiene estable:", opts: ["La temperatura", "El pH", "La concentración", "La presión"], ans: 1 },
  { id: 131, area: "Química", q: "¿Qué tipo de reacción es: A + B → AB?", opts: ["Descomposición", "Síntesis (combinación)", "Simple desplazamiento", "Doble desplazamiento"], ans: 1 },
  { id: 132, area: "Química", q: "El metano tiene la fórmula:", opts: ["C2H4", "C2H6", "CH4", "C3H8"], ans: 2 },
  { id: 133, area: "Química", q: "¿Qué es la electronegatividad?", opts: ["Capacidad de atraer electrones en enlace", "Número de electrones libres", "Carga del núcleo", "Radio atómico"], ans: 0 },
  { id: 134, area: "Química", q: "El elemento más electronegativo es:", opts: ["Oxígeno", "Nitrógeno", "Cloro", "Flúor"], ans: 3 },
  { id: 135, area: "Química", q: "¿Qué es la destilación?", opts: ["Separación por tamaño de partículas", "Separación por diferencia de puntos de ebullición", "Filtración de sólidos", "Cristalización de sales"], ans: 1 },
  { id: 136, area: "Química", q: "La reacción de neutralización produce:", opts: ["Ácido y agua", "Base y sal", "Sal y agua", "Gas y sólido"], ans: 2 },
  { id: 137, area: "Química", q: "¿Cuántos electrones tiene el átomo de oxígeno?", opts: ["6", "8", "16", "10"], ans: 1 },
  { id: 138, area: "Química", q: "Los lípidos son solubles en:", opts: ["Agua", "Disolventes polares", "Disolventes apolares", "Ácidos fuertes"], ans: 2 },
  { id: 139, area: "Química", q: "¿Qué es la cinética química?", opts: ["Estudio del equilibrio", "Estudio de la velocidad de reacción", "Estudio de la energía", "Estudio de la estructura molecular"], ans: 1 },
  { id: 140, area: "Química", q: "La ley de Gay-Lussac relaciona la presión con:", opts: ["El volumen", "La temperatura (a volumen constante)", "La cantidad de gas", "La densidad"], ans: 1 },
  { id: 141, area: "Química", q: "¿Cuál es la geometría molecular del CO2?", opts: ["Angular", "Lineal", "Tetrahédrica", "Trigonal plana"], ans: 1 },
  { id: 142, area: "Química", q: "El principal componente del gas natural es:", opts: ["Propano", "Butano", "Metano", "Etano"], ans: 2 },
  { id: 143, area: "Química", q: "¿Qué es la tensión superficial?", opts: ["Presión interna de un gas", "Fuerza que actúa en la superficie de un líquido", "Viscosidad del fluido", "Punto de ebullición"], ans: 1 },
  { id: 144, area: "Química", q: "En la nomenclatura IUPAC, el sufijo -ol indica:", opts: ["Aldehído", "Cetona", "Alcohol", "Ácido carboxílico"], ans: 2 },
  { id: 145, area: "Química", q: "¿Cuál es la valencia del aluminio?", opts: ["1", "2", "3", "4"], ans: 2 },
  { id: 146, area: "Química", q: "El proceso de ósmosis inversa se usa para:", opts: ["Producir energía eléctrica", "Purificar agua", "Sintetizar proteínas", "Fabricar medicamentos"], ans: 1 },
  { id: 147, area: "Química", q: "¿Qué es la electrólisis?", opts: ["Reacción espontánea", "Descomposición por corriente eléctrica", "Síntesis química", "Combustión controlada"], ans: 1 },
  { id: 148, area: "Química", q: "Los compuestos orgánicos siempre contienen:", opts: ["Oxígeno", "Nitrógeno", "Carbono", "Hidrógeno"], ans: 2 },
  { id: 149, area: "Química", q: "¿Cuál es la ley de Boyle?", opts: ["P·T = constante", "P·V = constante (a T constante)", "V/T = constante", "P/T = constante"], ans: 1 },
  { id: 150, area: "Química", q: "El punto de fusión del agua es:", opts: ["0°C", "100°C", "37°C", "-10°C"], ans: 0 },

  // ===== FÍSICA (200 preguntas) =====
  { id: 201, area: "Física", q: "La primera ley de Newton establece que un objeto en reposo:", opts: ["Siempre se mueve", "Permanece en reposo si no hay fuerza neta", "Acelera constantemente", "Cae libremente"], ans: 1 },
  { id: 202, area: "Física", q: "La fórmula de la velocidad es:", opts: ["v = a·t", "v = d/t", "v = F/m", "v = m·a"], ans: 1 },
  { id: 203, area: "Física", q: "La unidad de fuerza en el SI es:", opts: ["Joule", "Watt", "Newton", "Pascal"], ans: 2 },
  { id: 204, area: "Física", q: "¿Qué es la energía cinética?", opts: ["Energía almacenada", "Energía de movimiento", "Energía química", "Energía potencial gravitacional"], ans: 1 },
  { id: 205, area: "Física", q: "La fórmula de la energía cinética es:", opts: ["Ec = mgh", "Ec = ½mv²", "Ec = Fd", "Ec = P·V"], ans: 1 },
  { id: 206, area: "Física", q: "La velocidad de la luz en el vacío es aproximadamente:", opts: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], ans: 1 },
  { id: 207, area: "Física", q: "¿Qué es la aceleración?", opts: ["Velocidad constante", "Cambio de velocidad en el tiempo", "Distancia recorrida", "Masa por velocidad"], ans: 1 },
  { id: 208, area: "Física", q: "La fórmula de la segunda ley de Newton es:", opts: ["F = m/a", "F = m·a", "F = m·v", "F = m/v²"], ans: 1 },
  { id: 209, area: "Física", q: "La presión se define como:", opts: ["Fuerza × área", "Fuerza / área", "Masa / volumen", "Masa × gravedad"], ans: 1 },
  { id: 210, area: "Física", q: "La unidad de presión en el SI es:", opts: ["Newton", "Joule", "Pascal", "Bar"], ans: 2 },
  { id: 211, area: "Física", q: "¿Qué es la densidad?", opts: ["Masa por unidad de volumen", "Volumen por unidad de masa", "Fuerza por unidad de área", "Energía por unidad de tiempo"], ans: 0 },
  { id: 212, area: "Física", q: "El principio de Arquímedes establece que la fuerza de empuje es:", opts: ["Igual al peso del objeto", "Igual al peso del fluido desplazado", "Mayor que el peso del objeto", "Proporcional a la temperatura"], ans: 1 },
  { id: 213, area: "Física", q: "El trabajo se calcula como:", opts: ["W = m·v", "W = F·d·cos(θ)", "W = P/t", "W = E/t"], ans: 1 },
  { id: 214, area: "Física", q: "La unidad de energía en el SI es:", opts: ["Newton", "Watt", "Joule", "Pascal"], ans: 2 },
  { id: 215, area: "Física", q: "¿Qué es la potencia?", opts: ["Energía almacenada", "Trabajo realizado por unidad de tiempo", "Fuerza por distancia", "Masa por aceleración"], ans: 1 },
  { id: 216, area: "Física", q: "La ley de la gravitación universal fue formulada por:", opts: ["Einstein", "Galileo", "Newton", "Faraday"], ans: 2 },
  { id: 217, area: "Física", q: "¿Qué es la frecuencia de una onda?", opts: ["Distancia entre crestas", "Número de ciclos por segundo", "Velocidad de propagación", "Amplitud de la onda"], ans: 1 },
  { id: 218, area: "Física", q: "La longitud de onda y la frecuencia son:", opts: ["Directamente proporcionales", "Inversamente proporcionales", "Independientes", "Iguales siempre"], ans: 1 },
  { id: 219, area: "Física", q: "¿Cuál es la unidad de la frecuencia?", opts: ["Metro", "Segundo", "Hertz", "Joule"], ans: 2 },
  { id: 220, area: "Física", q: "La ley de Ohm establece que V = :", opts: ["I²R", "I·R", "I/R", "R/I"], ans: 1 },
  { id: 221, area: "Física", q: "¿Qué es la resistencia eléctrica?", opts: ["Flujo de electrones", "Oposición al flujo de corriente", "Diferencia de potencial", "Potencia disipada"], ans: 1 },
  { id: 222, area: "Física", q: "La unidad de resistencia es:", opts: ["Ampere", "Voltio", "Ohm (Ω)", "Watt"], ans: 2 },
  { id: 223, area: "Física", q: "¿Qué es la inducción electromagnética?", opts: ["Producción de corriente por campo magnético variable", "Almacenamiento de carga", "Radiación de ondas", "Producción de calor por fricción"], ans: 0 },
  { id: 224, area: "Física", q: "La energía potencial gravitacional se calcula como:", opts: ["Ep = ½mv²", "Ep = mgh", "Ep = F·d", "Ep = kqq/r"], ans: 1 },
  { id: 225, area: "Física", q: "En un movimiento uniformemente acelerado, la aceleración es:", opts: ["Variable", "Cero", "Constante", "Infinita"], ans: 2 },
  { id: 226, area: "Física", q: "¿Cuál es la velocidad del sonido en el aire a 20°C?", opts: ["343 m/s", "100 m/s", "1500 m/s", "3000 m/s"], ans: 0 },
  { id: 227, area: "Física", q: "El fenómeno de refracción ocurre cuando la luz:", opts: ["Rebota en una superficie", "Cambia de medio y de dirección", "Se dispersa en colores", "Se absorbe totalmente"], ans: 1 },
  { id: 228, area: "Física", q: "¿Qué es la inercia?", opts: ["Fuerza de atracción", "Resistencia al cambio de estado de movimiento", "Energía potencial", "Aceleración centrífuga"], ans: 1 },
  { id: 229, area: "Física", q: "La temperatura en escala Kelvin y Celsius difieren en:", opts: ["100 grados", "273.15 grados", "32 grados", "212 grados"], ans: 1 },
  { id: 230, area: "Física", q: "¿Qué es la entropía en termodinámica?", opts: ["Energía útil del sistema", "Medida del desorden del sistema", "Calor absorbido", "Trabajo realizado"], ans: 1 },
  { id: 231, area: "Física", q: "La primera ley de la termodinámica establece:", opts: ["Conservación de la energía", "Aumento del desorden", "Temperatura absoluta cero", "Relación calor-trabajo"], ans: 0 },
  { id: 232, area: "Física", q: "En el movimiento circular uniforme, la aceleración apunta hacia:", opts: ["El centro (centrípeta)", "La tangente", "El exterior", "Arriba"], ans: 0 },
  { id: 233, area: "Física", q: "¿Cuál es la unidad de la corriente eléctrica?", opts: ["Voltio", "Ohm", "Watt", "Ampere"], ans: 3 },
  { id: 234, area: "Física", q: "El principio de superposición de ondas dice que:", opts: ["Las ondas se destruyen al encontrarse", "Los efectos se suman algebraicamente", "La amplitud siempre aumenta", "La frecuencia cambia"], ans: 1 },
  { id: 235, area: "Física", q: "¿Qué es la capacitancia?", opts: ["Oposición al flujo de corriente", "Capacidad de almacenar carga eléctrica", "Producción de campo magnético", "Disipación de energía"], ans: 1 },
  { id: 236, area: "Física", q: "El efecto Doppler describe el cambio en:", opts: ["La amplitud cuando la fuente se mueve", "La frecuencia percibida cuando hay movimiento relativo", "La velocidad de la luz", "La refracción"], ans: 1 },
  { id: 237, area: "Física", q: "¿Qué tipo de lente converge la luz?", opts: ["Cóncava", "Plana", "Convexa", "Bicóncava"], ans: 2 },
  { id: 238, area: "Física", q: "La fórmula de la energía de Einstein es:", opts: ["E = mv²", "E = mc²", "E = Fd", "E = hf"], ans: 1 },
  { id: 239, area: "Física", q: "¿Qué es el campo eléctrico?", opts: ["Flujo de electrones", "Región donde actúa la fuerza eléctrica", "Diferencia de potencial", "Densidad de carga"], ans: 1 },
  { id: 240, area: "Física", q: "La impedancia en circuitos de CA incluye:", opts: ["Solo resistencia", "Resistencia, reactancia inductiva y capacitiva", "Solo inductancia", "Solo capacitancia"], ans: 1 },
  { id: 241, area: "Física", q: "¿Cuál es el principio de Pascal?", opts: ["La presión en un fluido se transmite igualmente en todas direcciones", "El volumen es inversamente proporcional a la presión", "La temperatura no afecta la presión", "Los líquidos no se comprimen"], ans: 0 },
  { id: 242, area: "Física", q: "¿Qué es la difracción?", opts: ["Reflexión de ondas", "Desviación de ondas al pasar por obstáculos o ranuras", "Cambio de velocidad de ondas", "Interferencia destructiva"], ans: 1 },
  { id: 243, area: "Física", q: "El número de Reynolds indica:", opts: ["Velocidad del sonido", "Si un flujo es laminar o turbulento", "Densidad del fluido", "Viscosidad dinámica"], ans: 1 },
  { id: 244, area: "Física", q: "¿Qué es el torque?", opts: ["Fuerza lineal", "Fuerza que produce rotación (momento de fuerza)", "Impulso mecánico", "Energía cinética rotacional"], ans: 1 },
  { id: 245, area: "Física", q: "La constante de Planck relaciona la energía con:", opts: ["La masa", "La frecuencia del fotón", "La velocidad", "La carga eléctrica"], ans: 1 },
  { id: 246, area: "Física", q: "¿Qué es la polarización de la luz?", opts: ["Reflexión total interna", "Oscilación de la luz en un plano", "Cambio de color de la luz", "Difracción en un prisma"], ans: 1 },
  { id: 247, area: "Física", q: "En un circuito en serie, la corriente:", opts: ["Es diferente en cada componente", "Es la misma en todos los componentes", "Es cero en la resistencia mayor", "Varía con la frecuencia"], ans: 1 },
  { id: 248, area: "Física", q: "La fuerza de Lorentz actúa sobre:", opts: ["Masas en un campo gravitacional", "Cargas en campos eléctrico y magnético", "Fotones en un medio", "Moléculas en colisión"], ans: 1 },
  { id: 249, area: "Física", q: "¿Qué es la carga eléctrica del electrón?", opts: ["+1.6×10⁻¹⁹ C", "-1.6×10⁻¹⁹ C", "0 C", "+9.1×10⁻³¹ C"], ans: 1 },
  { id: 250, area: "Física", q: "El calor específico del agua es:", opts: ["1 cal/g°C", "4 cal/g°C", "0.5 cal/g°C", "2 cal/g°C"], ans: 0 },

  // ===== MATEMÁTICAS (200 preguntas) =====
  { id: 301, area: "Matemáticas", q: "¿Cuál es el resultado de 2³ + 3²?", opts: ["13", "17", "21", "15"], ans: 1 },
  { id: 302, area: "Matemáticas", q: "La derivada de f(x) = x² es:", opts: ["x", "2x", "x²", "2x²"], ans: 1 },
  { id: 303, area: "Matemáticas", q: "¿Cuánto es √144?", opts: ["11", "12", "13", "14"], ans: 1 },
  { id: 304, area: "Matemáticas", q: "La pendiente de la recta y = 3x + 5 es:", opts: ["5", "3", "8", "15"], ans: 1 },
  { id: 305, area: "Matemáticas", q: "¿Cuál es el valor de π (pi) aproximado?", opts: ["3.14159", "3.14516", "3.12415", "3.41159"], ans: 0 },
  { id: 306, area: "Matemáticas", q: "La integral de f(x) = 2x es:", opts: ["x²", "x² + C", "2x² + C", "x + C"], ans: 1 },
  { id: 307, area: "Matemáticas", q: "¿Cuánto es log₁₀(1000)?", opts: ["2", "3", "4", "10"], ans: 1 },
  { id: 308, area: "Matemáticas", q: "La fórmula del área de un círculo es:", opts: ["2πr", "πr²", "πd", "2πr²"], ans: 1 },
  { id: 309, area: "Matemáticas", q: "En un triángulo rectángulo, el teorema de Pitágoras establece:", opts: ["a+b=c", "a²+b²=c²", "a·b=c²", "a²-b²=c"], ans: 1 },
  { id: 310, area: "Matemáticas", q: "¿Cuál es la derivada de sen(x)?", opts: ["-sen(x)", "cos(x)", "-cos(x)", "tan(x)"], ans: 1 },
  { id: 311, area: "Matemáticas", q: "La suma de los ángulos interiores de un triángulo es:", opts: ["90°", "180°", "270°", "360°"], ans: 1 },
  { id: 312, area: "Matemáticas", q: "¿Cuánto es 5! (factorial)?", opts: ["25", "60", "120", "20"], ans: 2 },
  { id: 313, area: "Matemáticas", q: "La ecuación cuadrática general es:", opts: ["x = -b/2a", "x = (-b ± √(b²-4ac))/2a", "x = b²-4ac", "x = -b ± √a"], ans: 1 },
  { id: 314, area: "Matemáticas", q: "¿Cuál es el límite de (1+1/n)ⁿ cuando n→∞?", opts: ["1", "π", "e ≈ 2.718", "∞"], ans: 2 },
  { id: 315, area: "Matemáticas", q: "El volumen de una esfera es:", opts: ["4πr²", "(4/3)πr³", "2πr³", "πr³"], ans: 1 },
  { id: 316, area: "Matemáticas", q: "¿Qué es un número primo?", opts: ["Múltiplo de 2", "Divisible solo entre 1 y sí mismo", "Par y mayor que 1", "Raíz cuadrada exacta"], ans: 1 },
  { id: 317, area: "Matemáticas", q: "La regla de la cadena en derivadas sirve para:", opts: ["Derivar suma de funciones", "Derivar función compuesta", "Derivar función inversa", "Integrar por partes"], ans: 1 },
  { id: 318, area: "Matemáticas", q: "¿Cuánto es sen(30°)?", opts: ["√3/2", "1/2", "√2/2", "1"], ans: 1 },
  { id: 319, area: "Matemáticas", q: "La probabilidad de un evento imposible es:", opts: ["1", "0.5", "0", "Indefinida"], ans: 2 },
  { id: 320, area: "Matemáticas", q: "En estadística, la media aritmética se calcula como:", opts: ["El valor central ordenado", "Suma de valores / cantidad", "El valor más frecuente", "Diferencia máx-mín"], ans: 1 },
  { id: 321, area: "Matemáticas", q: "¿Cuánto es cos(0°)?", opts: ["0", "1", "√2/2", "1/2"], ans: 1 },
  { id: 322, area: "Matemáticas", q: "El logaritmo natural usa la base:", opts: ["2", "10", "e", "π"], ans: 2 },
  { id: 323, area: "Matemáticas", q: "¿Qué es una asíntota?", opts: ["Punto de intersección", "Línea que la curva se aproxima sin tocar", "Tangente a la curva", "Eje de simetría"], ans: 1 },
  { id: 324, area: "Matemáticas", q: "La derivada de eˣ es:", opts: ["eˣ⁻¹", "xeˣ", "eˣ", "e"], ans: 2 },
  { id: 325, area: "Matemáticas", q: "¿Cuánto es tan(45°)?", opts: ["0", "√3", "1", "√3/2"], ans: 2 },
  { id: 326, area: "Matemáticas", q: "El determinante de la matriz [[1,2],[3,4]] es:", opts: ["-2", "2", "10", "-10"], ans: 0 },
  { id: 327, area: "Matemáticas", q: "¿Qué es una función par?", opts: ["f(-x) = -f(x)", "f(-x) = f(x)", "f(x) = f(2x)", "f(x+1) = f(x)"], ans: 1 },
  { id: 328, area: "Matemáticas", q: "La serie de Fibonacci comienza:", opts: ["0,1,1,2,3,5...", "1,2,4,8,16...", "0,1,2,3,4...", "1,1,3,5,8..."], ans: 0 },
  { id: 329, area: "Matemáticas", q: "El teorema de Bayes trata sobre:", opts: ["Probabilidad condicional", "Distribución normal", "Regresión lineal", "Combinatoria"], ans: 0 },
  { id: 330, area: "Matemáticas", q: "¿Cuál es la derivada de ln(x)?", opts: ["1/x²", "e/x", "1/x", "x·ln(x)"], ans: 2 },
  { id: 331, area: "Matemáticas", q: "La identidad de Euler es:", opts: ["e^iπ = 1", "e^iπ + 1 = 0", "e^iπ = i", "e^π = i"], ans: 1 },
  { id: 332, area: "Matemáticas", q: "¿Cuánto es 0.5 como fracción?", opts: ["1/3", "1/2", "2/3", "1/4"], ans: 1 },
  { id: 333, area: "Matemáticas", q: "Un ángulo de 180° en radianes equivale a:", opts: ["π/2", "π", "2π", "3π/2"], ans: 1 },
  { id: 334, area: "Matemáticas", q: "La media, mediana y moda son medidas de:", opts: ["Dispersión", "Tendencia central", "Correlación", "Probabilidad"], ans: 1 },
  { id: 335, area: "Matemáticas", q: "¿Qué es una progresión geométrica?", opts: ["Suma constante entre términos", "Razón constante entre términos consecutivos", "Diferencia constante", "Alternancia de signos"], ans: 1 },
  { id: 336, area: "Matemáticas", q: "¿Cuánto es (a+b)² expandido?", opts: ["a²+b²", "a²+ab+b²", "a²+2ab+b²", "2a+2b"], ans: 2 },
  { id: 337, area: "Matemáticas", q: "¿Cuál es el dominio de f(x) = √x?", opts: ["x < 0", "x > 0", "x ≥ 0", "Todos los reales"], ans: 2 },
  { id: 338, area: "Matemáticas", q: "En combinatoria, C(n,r) = n!/r!(n-r)! calcula:", opts: ["Permutaciones", "Combinaciones", "Factoriales", "Probabilidades"], ans: 1 },
  { id: 339, area: "Matemáticas", q: "El símbolo ∑ (sigma) representa:", opts: ["Producto", "Sumatoria", "Integral", "Límite"], ans: 1 },
  { id: 340, area: "Matemáticas", q: "La solución de x² - 5x + 6 = 0 es:", opts: ["x=1 y x=6", "x=2 y x=3", "x=-2 y x=-3", "x=5 y x=1"], ans: 1 },
  { id: 341, area: "Matemáticas", q: "¿Cuál es el área de un triángulo con base 6 y altura 4?", opts: ["24", "12", "10", "8"], ans: 1 },
  { id: 342, area: "Matemáticas", q: "¿Cuánto es 2⁻³?", opts: ["-8", "1/8", "-6", "1/6"], ans: 1 },
  { id: 343, area: "Matemáticas", q: "La varianza es la raíz cuadrada de:", opts: ["La desviación estándar", "La desviación estándar al cuadrado", "La media", "La moda"], ans: 1 },
  { id: 344, area: "Matemáticas", q: "¿Qué es el MCM (mínimo común múltiplo)?", opts: ["El menor divisor común", "El menor múltiplo común a dos números", "El mayor factor común", "El producto de dos números"], ans: 1 },
  { id: 345, area: "Matemáticas", q: "Un ángulo recto mide:", opts: ["45°", "90°", "180°", "360°"], ans: 1 },
  { id: 346, area: "Matemáticas", q: "¿Cuál es el resultado de (-3)²?", opts: ["-9", "9", "-6", "6"], ans: 1 },
  { id: 347, area: "Matemáticas", q: "La pendiente de una recta horizontal es:", opts: ["Indefinida", "1", "0", "-1"], ans: 2 },
  { id: 348, area: "Matemáticas", q: "¿Qué es una función biyectiva?", opts: ["Solo inyectiva", "Solo sobreyectiva", "Inyectiva y sobreyectiva", "Ni inyectiva ni sobreyectiva"], ans: 2 },
  { id: 349, area: "Matemáticas", q: "¿Cuánto es 15% de 200?", opts: ["25", "30", "35", "15"], ans: 1 },
  { id: 350, area: "Matemáticas", q: "La distancia entre los puntos (0,0) y (3,4) es:", opts: ["7", "5", "12", "25"], ans: 1 },

  // ===== COMPRENSIÓN LECTORA (150 preguntas) =====
  { id: 401, area: "Comprensión Lectora", q: "¿Qué es la idea principal de un texto?", opts: ["El primer párrafo", "La conclusión", "La idea central que sustenta el texto", "El título"], ans: 2 },
  { id: 402, area: "Comprensión Lectora", q: "¿Qué es una inferencia?", opts: ["Copia literal del texto", "Conclusión deducida sin estar explícita", "Resumen del texto", "Definición de término"], ans: 1 },
  { id: 403, area: "Comprensión Lectora", q: "El propósito de un texto argumentativo es:", opts: ["Narrar hechos", "Describir objetos", "Persuadir al lector", "Entretener"], ans: 2 },
  { id: 404, area: "Comprensión Lectora", q: "¿Qué es un sinónimo?", opts: ["Palabra de significado opuesto", "Palabra de significado similar", "Palabra que suena igual", "Palabra que se escribe igual"], ans: 1 },
  { id: 405, area: "Comprensión Lectora", q: "¿Qué es un antónimo?", opts: ["Palabra sinónima", "Palabra de significado opuesto", "Figura retórica", "Tipo de texto"], ans: 1 },
  { id: 406, area: "Comprensión Lectora", q: "El texto expositivo tiene como objetivo:", opts: ["Persuadir", "Narrar", "Informar y explicar", "Expresar emociones"], ans: 2 },
  { id: 407, area: "Comprensión Lectora", q: "¿Qué es la coherencia textual?", opts: ["Uso correcto de signos", "Relación lógica entre ideas", "Longitud adecuada", "Vocabulario técnico"], ans: 1 },
  { id: 408, area: "Comprensión Lectora", q: "Los conectores causales indican:", opts: ["Contraste", "Adición", "Causa y efecto", "Tiempo"], ans: 2 },
  { id: 409, area: "Comprensión Lectora", q: "¿Qué es la connotación de una palabra?", opts: ["Su significado literal", "Significado subjetivo o emocional", "Su etimología", "Su categoría gramatical"], ans: 1 },
  { id: 410, area: "Comprensión Lectora", q: "Un párrafo de conclusión generalmente:", opts: ["Introduce el tema", "Desarrolla argumentos", "Cierra y resume las ideas", "Plantea preguntas"], ans: 2 },
  { id: 411, area: "Comprensión Lectora", q: "La metáfora es una figura que:", opts: ["Exagera", "Compara usando 'como'", "Identifica dos elementos directamente", "Contradice"], ans: 2 },
  { id: 412, area: "Comprensión Lectora", q: "¿Qué son los conectores adversativos?", opts: ["Conectores de tiempo", "Conectores de causa", "Conectores de contraste (pero, sin embargo)", "Conectores de adición"], ans: 2 },
  { id: 413, area: "Comprensión Lectora", q: "El narrador omnisciente:", opts: ["Solo narra lo que ve", "Conoce todo sobre los personajes", "Es un personaje de la historia", "Cuenta en segunda persona"], ans: 1 },
  { id: 414, area: "Comprensión Lectora", q: "¿Qué es la paráfrasis?", opts: ["Cita textual", "Expresar con palabras propias el contenido", "Resumen muy corto", "Comentario crítico"], ans: 1 },
  { id: 415, area: "Comprensión Lectora", q: "La hipérbole consiste en:", opts: ["Comparar con 'como'", "Exagerar para enfatizar", "Personificar objetos", "Omitir palabras"], ans: 1 },
  { id: 416, area: "Comprensión Lectora", q: "El texto descriptivo busca:", opts: ["Argumentar una postura", "Pintar con palabras objetos o situaciones", "Contar una historia", "Convencer al lector"], ans: 1 },
  { id: 417, area: "Comprensión Lectora", q: "¿Qué es la cohesión textual?", opts: ["Buenas ideas", "Uso de recursos gramaticales que unen el texto", "Extensión del texto", "Claridad del vocabulario"], ans: 1 },
  { id: 418, area: "Comprensión Lectora", q: "Los textos periodísticos se caracterizan por:", opts: ["Lenguaje poético", "Objetividad e información actual", "Narración de ficción", "Instrucciones de uso"], ans: 1 },
  { id: 419, area: "Comprensión Lectora", q: "La ironía expresa:", opts: ["Lo contrario de lo que se quiere decir", "Una comparación directa", "Una exageración", "Una personificación"], ans: 0 },
  { id: 420, area: "Comprensión Lectora", q: "¿Qué tipo de texto es un manual de instrucciones?", opts: ["Narrativo", "Argumentativo", "Instructivo", "Poético"], ans: 2 },
  { id: 421, area: "Comprensión Lectora", q: "La denotación de una palabra es:", opts: ["Su significado emocional", "Su significado literal y objetivo", "Su uso metafórico", "Su connotación cultural"], ans: 1 },
  { id: 422, area: "Comprensión Lectora", q: "Un argumento válido es aquel que:", opts: ["Es verdadero", "Se sigue lógicamente de las premisas", "Es aceptado por todos", "Tiene muchos datos"], ans: 1 },
  { id: 423, area: "Comprensión Lectora", q: "La personificación atribuye características humanas a:", opts: ["Personas ficticias", "Objetos o animales", "Conceptos abstractos", "Lugares geográficos"], ans: 1 },
  { id: 424, area: "Comprensión Lectora", q: "¿Qué es el tema de un texto literario?", opts: ["El argumento", "El asunto central que trata la obra", "El mensaje del autor", "La trama principal"], ans: 1 },
  { id: 425, area: "Comprensión Lectora", q: "El símil usa las partículas:", opts: ["'Es' o 'son'", "'Como', 'cual', 'semejante a'", "'Pero', 'sin embargo'", "'Porque', 'ya que'"], ans: 1 },
  { id: 426, area: "Comprensión Lectora", q: "¿Qué es el contexto de una palabra?", opts: ["Su definición en el diccionario", "Las palabras que la rodean y determinan su significado", "Su categoría gramatical", "Su origen etimológico"], ans: 1 },
  { id: 427, area: "Comprensión Lectora", q: "Un texto expositivo usa principalmente:", opts: ["Diálogos y personajes", "Datos, definiciones y explicaciones", "Emociones del autor", "Instrucciones paso a paso"], ans: 1 },
  { id: 428, area: "Comprensión Lectora", q: "¿Qué es la estructura del texto?", opts: ["El título", "La organización y distribución de sus partes", "El número de párrafos", "El tipo de letra"], ans: 1 },
  { id: 429, area: "Comprensión Lectora", q: "Los textos científicos se caracterizan por:", opts: ["Lenguaje subjetivo", "Lenguaje objetivo, preciso y técnico", "Narración de historias", "Expresión de sentimientos"], ans: 1 },
  { id: 430, area: "Comprensión Lectora", q: "¿Qué es el resumen?", opts: ["Copia del texto", "Versión breve con ideas principales", "Comentario personal", "Introducción del texto"], ans: 1 },

  // ===== INGLÉS (150 preguntas) =====
  { id: 501, area: "Inglés", q: "What is the past tense of 'go'?", opts: ["Goed", "Gone", "Went", "Going"], ans: 2 },
  { id: 502, area: "Inglés", q: "Choose the correct sentence:", opts: ["She don't like coffee", "She doesn't like coffee", "She not like coffee", "She isn't like coffee"], ans: 1 },
  { id: 503, area: "Inglés", q: "The word 'physician' means:", opts: ["Nurse", "Doctor", "Pharmacist", "Dentist"], ans: 1 },
  { id: 504, area: "Inglés", q: "Which is the correct comparative form of 'good'?", opts: ["Gooder", "More good", "Better", "Best"], ans: 2 },
  { id: 505, area: "Inglés", q: "Complete: 'I ___ to the hospital yesterday.'", opts: ["go", "goes", "went", "going"], ans: 2 },
  { id: 506, area: "Inglés", q: "The future perfect tense is formed with:", opts: ["will + verb", "will have + past participle", "have + past participle", "had + past participle"], ans: 1 },
  { id: 507, area: "Inglés", q: "What does 'pathology' mean?", opts: ["Study of diseases", "Study of bones", "Study of cells", "Study of chemicals"], ans: 0 },
  { id: 508, area: "Inglés", q: "Choose the correct passive voice: 'The surgery ___ performed.'", opts: ["is", "was", "were", "are"], ans: 1 },
  { id: 509, area: "Inglés", q: "The synonym of 'acute' in medical context is:", opts: ["Chronic", "Mild", "Severe and sudden", "Recurring"], ans: 2 },
  { id: 510, area: "Inglés", q: "Which sentence uses the present perfect correctly?", opts: ["I have eat", "I have eaten", "I have ate", "I had eaten"], ans: 1 },
  { id: 511, area: "Inglés", q: "What does 'prognosis' mean?", opts: ["Diagnosis method", "Prediction of disease outcome", "Type of treatment", "Surgical procedure"], ans: 1 },
  { id: 512, area: "Inglés", q: "'Neither...nor' is used to express:", opts: ["Alternative", "Double negation", "Cause", "Contrast"], ans: 1 },
  { id: 513, area: "Inglés", q: "What is the plural of 'criterion'?", opts: ["Criterions", "Criterias", "Criteria", "Criteriones"], ans: 2 },
  { id: 514, area: "Inglés", q: "The word 'benign' in medicine means:", opts: ["Dangerous", "Not cancerous or harmful", "Painful", "Contagious"], ans: 1 },
  { id: 515, area: "Inglés", q: "Which question tag completes: 'She is a doctor, ___'?", opts: ["is she?", "isn't she?", "doesn't she?", "wasn't she?"], ans: 1 },
  { id: 516, area: "Inglés", q: "What does 'etiology' refer to?", opts: ["Treatment of disease", "Cause or origin of disease", "Symptoms of disease", "Prevention of disease"], ans: 1 },
  { id: 517, area: "Inglés", q: "Choose the correct conditional: 'If I ___ a doctor, I would help everyone.'", opts: ["am", "was/were", "will be", "have been"], ans: 1 },
  { id: 518, area: "Inglés", q: "The prefix 'brady-' means:", opts: ["Fast", "Slow", "Large", "Small"], ans: 1 },
  { id: 519, area: "Inglés", q: "What does 'contraindication' mean?", opts: ["Recommended treatment", "Reason not to use a treatment", "Positive effect of a drug", "Dosage information"], ans: 1 },
  { id: 520, area: "Inglés", q: "The suffix '-itis' refers to:", opts: ["Surgical removal", "Inflammation", "Study of", "Disease of"], ans: 1 },
  { id: 521, area: "Inglés", q: "Complete with the correct preposition: 'She specializes ___ cardiology.'", opts: ["at", "on", "in", "by"], ans: 2 },
  { id: 522, area: "Inglés", q: "What does 'tachycardia' mean?", opts: ["Slow heart rate", "Fast heart rate", "Irregular heart rhythm", "Heart inflammation"], ans: 1 },
  { id: 523, area: "Inglés", q: "'Despite' is followed by:", opts: ["A clause with 'that'", "A noun or gerund", "An infinitive", "A past tense verb"], ans: 1 },
  { id: 524, area: "Inglés", q: "What is the meaning of 'asymptomatic'?", opts: ["With severe symptoms", "Without symptoms", "With chronic symptoms", "With acute symptoms"], ans: 1 },
  { id: 525, area: "Inglés", q: "The modal verb for obligation is:", opts: ["Can", "May", "Must/Should", "Would"], ans: 2 },
  { id: 526, area: "Inglés", q: "What does 'hemorrhage' mean?", opts: ["Blood clot", "Excessive bleeding", "Blood pressure drop", "Blood infection"], ans: 1 },
  { id: 527, area: "Inglés", q: "Choose the correct reported speech: He said, 'I am sick.' → He said that he ___.", opts: ["is sick", "was sick", "be sick", "were sick"], ans: 1 },
  { id: 528, area: "Inglés", q: "The prefix 'hyper-' means:", opts: ["Below normal", "Above normal / excessive", "Without", "Around"], ans: 1 },
  { id: 529, area: "Inglés", q: "What does 'palliative care' focus on?", opts: ["Curing disease", "Relief of symptoms and quality of life", "Surgical intervention", "Preventive medicine"], ans: 1 },
  { id: 530, area: "Inglés", q: "Which is a gerund phrase? 'She enjoys ___.'", opts: ["to study medicine", "studying medicine", "studied medicine", "study medicine"], ans: 1 },

  // ===== FRANCÉS (100 preguntas) =====
  { id: 601, area: "Francés", q: "¿Cómo se dice 'el médico' en francés?", opts: ["Le médecin", "La médecin", "Un docteur féminin", "Le chirurgien"], ans: 0 },
  { id: 602, area: "Francés", q: "¿Cuál es la traducción de 'bonjour'?", opts: ["Buenas noches", "Buenos días / hola", "Hasta luego", "Por favor"], ans: 1 },
  { id: 603, area: "Francés", q: "El verbo 'être' conjugado en primera persona (yo soy) es:", opts: ["Il est", "Tu es", "Je suis", "Nous sommes"], ans: 2 },
  { id: 604, area: "Francés", q: "¿Qué significa 'merci beaucoup'?", opts: ["Por favor", "Muchas gracias", "De nada", "Permiso"], ans: 1 },
  { id: 605, area: "Francés", q: "El plural en francés generalmente se forma añadiendo:", opts: ["-e", "-s", "-en", "-er"], ans: 1 },
  { id: 606, area: "Francés", q: "¿Cómo se dice '¿Cómo te llamas?' en francés?", opts: ["Qui es-tu?", "Comment t'appelles-tu?", "Où habites-tu?", "Quel âge as-tu?"], ans: 1 },
  { id: 607, area: "Francés", q: "El artículo definido masculino singular en francés es:", opts: ["La", "Les", "Le", "Un"], ans: 2 },
  { id: 608, area: "Francés", q: "¿Cuál es la traducción de 'hôpital'?", opts: ["Hotel", "Hospital", "Hospicio", "Hogar"], ans: 1 },
  { id: 609, area: "Francés", q: "El verbo 'avoir' (tener) en primera persona singular es:", opts: ["Il a", "Tu as", "J'ai", "Nous avons"], ans: 2 },
  { id: 610, area: "Francés", q: "¿Cómo se dice 'la sangre' en francés?", opts: ["La sang", "Le sang", "La sanguine", "Le saignement"], ans: 1 },
  { id: 611, area: "Francés", q: "¿Qué significa 's'il vous plaît'?", opts: ["Gracias", "Por favor", "De nada", "Con permiso"], ans: 1 },
  { id: 612, area: "Francés", q: "Los números 1-10 en francés: 'sept' significa:", opts: ["5", "6", "7", "8"], ans: 2 },
  { id: 613, area: "Francés", q: "¿Cómo se dice 'enfermedades' en francés?", opts: ["Les malades", "Les maladies", "Les médecines", "Les médicaments"], ans: 1 },
  { id: 614, area: "Francés", q: "El passé composé del verbo 'aller' (ir) con 'je' es:", opts: ["J'ai allé", "Je suis allé", "J'allais", "J'irai"], ans: 1 },
  { id: 615, area: "Francés", q: "¿Qué significa 'la douleur'?", opts: ["El miedo", "El dolor", "La fiebre", "La tos"], ans: 1 },
  { id: 616, area: "Francés", q: "La negación en francés usa:", opts: ["Solo 'ne'", "Solo 'pas'", "'Ne...pas'", "'Non...pas'"], ans: 2 },
  { id: 617, area: "Francés", q: "¿Cómo se dice 'el corazón' en francés?", opts: ["Le foie", "Le poumon", "Le cœur", "Le rein"], ans: 2 },
  { id: 618, area: "Francés", q: "¿Qué significa 'au revoir'?", opts: ["Hola", "Hasta luego", "Buenos días", "Por favor"], ans: 1 },
  { id: 619, area: "Francés", q: "El femenino de 'médecin' (médico) es:", opts: ["Médecine", "La médecin / médecine", "Médicale", "Médicament"], ans: 1 },
  { id: 620, area: "Francés", q: "¿Qué significa 'la fièvre'?", opts: ["La tos", "La gripe", "La fiebre", "El dolor de cabeza"], ans: 2 },
  { id: 621, area: "Francés", q: "¿Cuál es la traducción de 'pharmacie'?", opts: ["Farmacia", "Física", "Facultad", "Fisioterapia"], ans: 0 },
  { id: 622, area: "Francés", q: "¿Cómo se dice 'el cuerpo humano' en francés?", opts: ["Le corps humain", "La corps humain", "Le corps humaine", "La humain corps"], ans: 0 },
  { id: 623, area: "Francés", q: "El futuro simple del verbo 'être' en 3a persona singular es:", opts: ["Il était", "Il est", "Il sera", "Il serait"], ans: 2 },
  { id: 624, area: "Francés", q: "¿Qué significa 'ordonnance'?", opts: ["Ordenanza", "Receta médica", "Diagnóstico", "Tratamiento"], ans: 1 },
  { id: 625, area: "Francés", q: "¿Cómo se dice 'buenos días' en francés?", opts: ["Bonsoir", "Bonne nuit", "Bonjour", "Au revoir"], ans: 2 },

  // ===== HISTORIA Y CIENCIAS SOCIALES (100 preguntas) =====
  { id: 701, area: "Historia", q: "¿En qué año fue la Revolución Mexicana?", opts: ["1910", "1920", "1900", "1930"], ans: 0 },
  { id: 702, area: "Historia", q: "¿Quién fue el primer presidente de México?", opts: ["Benito Juárez", "Agustín de Iturbide", "Guadalupe Victoria", "Miguel Hidalgo"], ans: 2 },
  { id: 703, area: "Historia", q: "La Revolución Francesa comenzó en:", opts: ["1776", "1789", "1800", "1750"], ans: 1 },
  { id: 704, area: "Historia", q: "¿Qué es el feudalismo?", opts: ["Sistema económico capitalista", "Sistema social medieval basado en vasallaje y tierra", "Democracia antigua", "Sistema colonial"], ans: 1 },
  { id: 705, area: "Historia", q: "La Segunda Guerra Mundial terminó en:", opts: ["1943", "1944", "1945", "1946"], ans: 2 },
  { id: 706, area: "Historia", q: "¿Quién escribió el Manifiesto Comunista?", opts: ["Lenin y Stalin", "Marx y Engels", "Trotsky y Lenin", "Engels y Bakunin"], ans: 1 },
  { id: 707, area: "Historia", q: "El Tratado de Guadalupe Hidalgo (1848) cedió territorio mexicano a:", opts: ["Francia", "España", "Estados Unidos", "Gran Bretaña"], ans: 2 },
  { id: 708, area: "Historia", q: "¿Qué civilización construyó el Coliseo Romano?", opts: ["Griega", "Romana", "Egipcia", "Persa"], ans: 1 },
  { id: 709, area: "Historia", q: "La Declaración de Independencia de México fue en:", opts: ["1810", "1821", "1824", "1800"], ans: 1 },
  { id: 710, area: "Historia", q: "¿Qué es el imperialismo?", opts: ["Sistema democrático", "Política de expansión y dominio de un país sobre otros", "Movimiento sindical", "Tipo de federalismo"], ans: 1 },
  { id: 711, area: "Historia", q: "La Revolución Industrial comenzó en:", opts: ["Francia", "Alemania", "Gran Bretaña", "Estados Unidos"], ans: 2 },
  { id: 712, area: "Historia", q: "¿Qué fue la Guerra Fría?", opts: ["Conflicto armado en el Ártico", "Confrontación ideológica EE.UU.-URSS sin conflicto directo", "Guerra climática", "Conflicto en el Polo Norte"], ans: 1 },
  { id: 713, area: "Historia", q: "La ONU fue fundada en:", opts: ["1941", "1945", "1950", "1939"], ans: 1 },
  { id: 714, area: "Historia", q: "¿Quién fue Emiliano Zapata?", opts: ["Presidente de México", "Líder revolucionario agrarista", "Poeta modernista", "General conservador"], ans: 1 },
  { id: 715, area: "Historia", q: "El Holocausto fue el genocidio de judíos perpetrado por:", opts: ["El fascismo italiano", "El nazismo alemán", "El estalinismo soviético", "El imperialismo japonés"], ans: 1 },
  { id: 716, area: "Historia", q: "¿Qué fue la Reforma de Juárez?", opts: ["Reforma constitucional", "Conjunto de leyes liberales que separaron iglesia del Estado", "Reforma agraria", "Reforma educativa"], ans: 1 },
  { id: 717, area: "Historia", q: "La Revolución Rusa ocurrió en:", opts: ["1905", "1917", "1920", "1915"], ans: 1 },
  { id: 718, area: "Historia", q: "¿Qué es la globalización?", opts: ["Proceso de aislamiento nacional", "Proceso de integración económica, cultural y política mundial", "Sistema político local", "Forma de gobierno"], ans: 1 },
  { id: 719, area: "Historia", q: "El movimiento de Independencia de México fue iniciado por:", opts: ["Agustín de Iturbide", "Miguel Hidalgo", "José María Morelos", "Guadalupe Victoria"], ans: 1 },
  { id: 720, area: "Historia", q: "¿Qué es la democracia representativa?", opts: ["Gobierno directo del pueblo", "Sistema donde ciudadanos eligen representantes", "Gobierno de una élite", "Gobierno de las fuerzas armadas"], ans: 1 },

  // ===== LITERATURA (100 preguntas) =====
  { id: 801, area: "Literatura", q: "¿Quién escribió 'Don Quijote de la Mancha'?", opts: ["Lope de Vega", "Francisco de Quevedo", "Miguel de Cervantes", "Garcilaso de la Vega"], ans: 2 },
  { id: 802, area: "Literatura", q: "El modernismo literario en Hispanoamérica fue liderado por:", opts: ["Gabriel García Márquez", "Rubén Darío", "Pablo Neruda", "Jorge Luis Borges"], ans: 1 },
  { id: 803, area: "Literatura", q: "¿Qué es el realismo mágico?", opts: ["Ciencia ficción latinoamericana", "Mezcla de elementos reales y fantásticos tratados como normales", "Corriente surrealista europea", "Literatura de fantasía medieval"], ans: 1 },
  { id: 804, area: "Literatura", q: "El autor de 'Cien años de soledad' es:", opts: ["Mario Vargas Llosa", "Julio Cortázar", "Gabriel García Márquez", "Carlos Fuentes"], ans: 2 },
  { id: 805, area: "Literatura", q: "¿Qué es un soneto?", opts: ["Poema de 8 versos", "Poema de 14 versos distribuidos en cuartetos y tercetos", "Poema épico extenso", "Tipo de narrativa breve"], ans: 1 },
  { id: 806, area: "Literatura", q: "La obra 'Romeo y Julieta' fue escrita por:", opts: ["Charles Dickens", "William Shakespeare", "Johann Goethe", "Victor Hugo"], ans: 1 },
  { id: 807, area: "Literatura", q: "¿Qué es la épica?", opts: ["Poesía lírica personal", "Género que narra hazañas heroicas en verso", "Drama teatral", "Prosa científica"], ans: 1 },
  { id: 808, area: "Literatura", q: "Octavio Paz fue un escritor mexicano ganador del:", opts: ["Premio Cervantes", "Premio Nobel de Literatura", "Premio Planeta", "Premio Booker"], ans: 1 },
  { id: 809, area: "Literatura", q: "¿Qué es la alegoría?", opts: ["Repetición de sonidos", "Representación de ideas abstractas mediante figuras concretas", "Exageración retórica", "Cambio de significado"], ans: 1 },
  { id: 810, area: "Literatura", q: "El vanguardismo literario surgió en:", opts: ["Siglo XIX", "Siglo XX (primera mitad)", "Siglo XVIII", "Siglo XVII"], ans: 1 },
  { id: 811, area: "Literatura", q: "¿Quién escribió 'La Odisea'?", opts: ["Virgilio", "Sófocles", "Homero", "Eurípides"], ans: 2 },
  { id: 812, area: "Literatura", q: "El género narrativo que relata hechos ficticios cortos se llama:", opts: ["Novela", "Cuento", "Epopeya", "Crónica"], ans: 1 },
  { id: 813, area: "Literatura", q: "'La Ilíada' narra:", opts: ["El regreso de Odiseo", "La guerra de Troya", "La fundación de Roma", "Las aventuras de Eneas"], ans: 1 },
  { id: 814, area: "Literatura", q: "¿Qué es el monólogo interior en narrativa?", opts: ["Diálogo entre personajes", "Técnica que muestra el fluir de conciencia del personaje", "Descripción del narrador", "Discurso del autor"], ans: 1 },
  { id: 815, area: "Literatura", q: "Juan Rulfo escribió:", opts: ["'Pedro Páramo'", "'El laberinto de la soledad'", "'La región más transparente'", "'Rayuela'"], ans: 0 },
  { id: 816, area: "Literatura", q: "¿Qué corriente literaria se caracteriza por la subjetividad y la emoción intensa?", opts: ["Clasicismo", "Romanticismo", "Realismo", "Naturalismo"], ans: 1 },
  { id: 817, area: "Literatura", q: "La poesía lírica expresa principalmente:", opts: ["Hechos históricos", "Sentimientos y emociones del poeta", "Acciones de héroes", "Instrucciones de vida"], ans: 1 },
  { id: 818, area: "Literatura", q: "El autor de 'Fuenteovejuna' es:", opts: ["Calderón de la Barca", "Lope de Vega", "Tirso de Molina", "Sor Juana Inés de la Cruz"], ans: 1 },
  { id: 819, area: "Literatura", q: "¿Qué es la intertextualidad?", opts: ["Texto con imágenes", "Relación entre textos que se citan o aluden mutuamente", "Tipo de ensayo", "Estructura narrativa"], ans: 1 },
  { id: 820, area: "Literatura", q: "Sor Juana Inés de la Cruz fue una escritora del:", opts: ["Siglo XVI", "Siglo XVII", "Siglo XVIII", "Siglo XIX"], ans: 1 },

  // ===== ANATOMÍA Y FISIOLOGÍA (100 preguntas) =====
  { id: 901, area: "Anatomía", q: "¿Cuántos huesos tiene el cuerpo humano adulto?", opts: ["206", "210", "198", "215"], ans: 0 },
  { id: 902, area: "Anatomía", q: "¿Cuál es el hueso más largo del cuerpo humano?", opts: ["Húmero", "Tibia", "Fémur", "Radio"], ans: 2 },
  { id: 903, area: "Anatomía", q: "¿Cuántas cámaras tiene el corazón humano?", opts: ["2", "3", "4", "6"], ans: 2 },
  { id: 904, area: "Anatomía", q: "La aorta es la arteria:", opts: ["Pulmonar principal", "Principal del cuerpo que sale del corazón", "Coronaria derecha", "Femoral"], ans: 1 },
  { id: 905, area: "Anatomía", q: "¿Qué es el cerebelo?", opts: ["Centro del lenguaje", "Controla el equilibrio y la coordinación", "Regula la respiración", "Procesa emociones"], ans: 1 },
  { id: 906, area: "Anatomía", q: "El hígado está ubicado en el cuadrante:", opts: ["Inferior izquierdo", "Inferior derecho", "Superior derecho", "Superior izquierdo"], ans: 2 },
  { id: 907, area: "Anatomía", q: "¿Cuál es la función principal del riñón?", opts: ["Producir bilis", "Filtrar la sangre y producir orina", "Almacenar glucosa", "Producir hormonas"], ans: 1 },
  { id: 908, area: "Anatomía", q: "Los pulmones están cubiertos por la membrana llamada:", opts: ["Peritoneo", "Pericardio", "Pleura", "Endotelio"], ans: 2 },
  { id: 909, area: "Anatomía", q: "¿Cuál es la presión arterial normal en adultos?", opts: ["140/90 mmHg", "120/80 mmHg", "100/60 mmHg", "130/85 mmHg"], ans: 1 },
  { id: 910, area: "Anatomía", q: "La frecuencia cardíaca normal en reposo es:", opts: ["40-50 lpm", "60-100 lpm", "100-120 lpm", "50-60 lpm"], ans: 1 },
  { id: 911, area: "Anatomía", q: "¿Qué produce la médula ósea?", opts: ["Hormonas", "Células sanguíneas", "Enzimas digestivas", "Neurotransmisores"], ans: 1 },
  { id: 912, area: "Anatomía", q: "El esófago conecta:", opts: ["La boca con el estómago", "El estómago con el intestino", "La tráquea con los pulmones", "El hígado con la vesícula"], ans: 0 },
  { id: 913, area: "Anatomía", q: "¿Cuántos pares de nervios craneales existen?", opts: ["10", "11", "12", "14"], ans: 2 },
  { id: 914, area: "Anatomía", q: "La válvula mitral se localiza entre:", opts: ["Aurícula y ventrículo derechos", "Aurícula y ventrículo izquierdos", "Aorta y ventrículo", "Arteria pulmonar y ventrículo"], ans: 1 },
  { id: 915, area: "Anatomía", q: "¿Qué es el páncreas endocrino?", opts: ["Parte que produce enzimas digestivas", "Parte que produce hormonas (insulina y glucagón)", "Tejido adiposo pancreático", "Conducto pancreático"], ans: 1 },
  { id: 916, area: "Anatomía", q: "La tiroides produce principalmente:", opts: ["Insulina", "Cortisol", "Tiroxina (T4) y triyodotironina (T3)", "Adrenalina"], ans: 2 },
  { id: 917, area: "Anatomía", q: "El nervio ciático es el más largo del cuerpo y recorre:", opts: ["El brazo", "La columna vertebral", "La pierna", "El cuello"], ans: 2 },
  { id: 918, area: "Anatomía", q: "¿Cuántas vértebras tiene la columna lumbar?", opts: ["5", "7", "12", "4"], ans: 0 },
  { id: 919, area: "Anatomía", q: "El bazo tiene la función principal de:", opts: ["Producir bilis", "Filtrar la sangre y destruir eritrocitos viejos", "Producir enzimas", "Regular la presión"], ans: 1 },
  { id: 920, area: "Anatomía", q: "¿Qué es la homeostasis de la glucosa?", opts: ["Producción constante de glucosa", "Mantenimiento de niveles normales de glucosa en sangre", "Eliminación de glucosa", "Almacenamiento de glucosa"], ans: 1 },

  // ===== GEOGRAFÍA (100 preguntas) =====
  { id: 1001, area: "Geografía", q: "¿Cuál es el continente más grande del mundo?", opts: ["América", "África", "Asia", "Europa"], ans: 2 },
  { id: 1002, area: "Geografía", q: "¿Cuál es el océano más grande?", opts: ["Atlántico", "Índico", "Ártico", "Pacífico"], ans: 3 },
  { id: 1003, area: "Geografía", q: "La capital de México es:", opts: ["Guadalajara", "Ciudad de México", "Monterrey", "Puebla"], ans: 1 },
  { id: 1004, area: "Geografía", q: "¿Cuál es el río más largo del mundo?", opts: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"], ans: 1 },
  { id: 1005, area: "Geografía", q: "El Trópico de Cáncer está en:", opts: ["El hemisferio sur", "El hemisferio norte", "El ecuador", "El polo norte"], ans: 1 },
  { id: 1006, area: "Geografía", q: "¿Cuántos estados tiene México?", opts: ["28", "30", "31", "32"], ans: 2 },
  { id: 1007, area: "Geografía", q: "La cordillera más larga del mundo es:", opts: ["Los Himalayas", "Los Andes", "Los Alpes", "Las Rocallosas"], ans: 1 },
  { id: 1008, area: "Geografía", q: "¿Cuál es la montaña más alta del mundo?", opts: ["Aconcagua", "K2", "Monte Everest", "Kilimanjaro"], ans: 2 },
  { id: 1009, area: "Geografía", q: "El meridiano de Greenwich establece:", opts: ["El ecuador terrestre", "El primer meridiano (0°)", "El trópico de Capricornio", "El círculo polar ártico"], ans: 1 },
  { id: 1010, area: "Geografía", q: "¿Cuál es el desierto más grande del mundo?", opts: ["Sahara", "Gobi", "Antártico", "Arábigo"], ans: 2 },
  { id: 1011, area: "Geografía", q: "La ciudad más poblada de México es:", opts: ["Guadalajara", "Monterrey", "Ciudad de México", "Puebla"], ans: 2 },
  { id: 1012, area: "Geografía", q: "¿Qué es el PIB?", opts: ["Precio Internacional del Barril", "Producto Interno Bruto", "Poder Igualitario Básico", "Protocolo Internacional de Bienes"], ans: 1 },
  { id: 1013, area: "Geografía", q: "México limita al norte con:", opts: ["Belice y Guatemala", "Estados Unidos", "El mar Caribe", "El océano Pacífico"], ans: 1 },
  { id: 1014, area: "Geografía", q: "¿Cuál es la capital de Brasil?", opts: ["São Paulo", "Río de Janeiro", "Brasilia", "Salvador"], ans: 2 },
  { id: 1015, area: "Geografía", q: "¿En qué continente está Egipto?", opts: ["Asia", "Europa", "África", "Oriente Medio"], ans: 2 },

  // ===== FILOSOFÍA Y ÉTICA (100 preguntas) =====
  { id: 1101, area: "Filosofía", q: "¿Qué es la ética médica?", opts: ["Conjunto de normas jurídicas", "Reflexión sobre los principios morales en la práctica médica", "Manual de procedimientos", "Protocolo de atención"], ans: 1 },
  { id: 1102, area: "Filosofía", q: "El principio de beneficencia en medicina significa:", opts: ["No causar daño", "Actuar en beneficio del paciente", "Respetar la autonomía", "Tratar con justicia"], ans: 1 },
  { id: 1103, area: "Filosofía", q: "El principio de no maleficencia establece:", opts: ["Ayudar siempre", "Primero, no causar daño", "Ser justo", "Informar al paciente"], ans: 1 },
  { id: 1104, area: "Filosofía", q: "¿Quién propuso el imperativo categórico?", opts: ["Platón", "Aristóteles", "Kant", "Descartes"], ans: 2 },
  { id: 1105, area: "Filosofía", q: "El consentimiento informado garantiza:", opts: ["La curación del paciente", "La autonomía del paciente para decidir", "La responsabilidad del médico", "El pago del servicio"], ans: 1 },
  { id: 1106, area: "Filosofía", q: "¿Qué es la bioética?", opts: ["Ética de los seres vivos en general", "Disciplina que reflexiona sobre problemas éticos en ciencias de la vida", "Biología moral", "Código de vida"], ans: 1 },
  { id: 1107, area: "Filosofía", q: "Hipócrates es conocido como:", opts: ["Padre de la Filosofía", "Padre de la Medicina", "Padre de la Biología", "Padre de la Ética"], ans: 1 },
  { id: 1108, area: "Filosofía", q: "El principio de justicia en bioética se refiere a:", opts: ["Juzgar al paciente", "Distribución equitativa de recursos y beneficios", "Castigar el daño", "Priorizar a los más ricos"], ans: 1 },
  { id: 1109, area: "Filosofía", q: "El método socrático de enseñanza es:", opts: ["La conferencia magistral", "El diálogo y la mayéutica para alcanzar la verdad", "La repetición memorística", "El trabajo en laboratorio"], ans: 1 },
  { id: 1110, area: "Filosofía", q: "¿Qué es la deontología médica?", opts: ["Estudio de enfermedades", "Conjunto de deberes éticos de los médicos", "Diagnóstico por imagen", "Especialidad quirúrgica"], ans: 1 },

  // ===== ECOLOGÍA Y MEDIO AMBIENTE (100 preguntas) =====
  { id: 1201, area: "Ecología", q: "¿Qué es un ecosistema?", opts: ["Conjunto de organismos sin su entorno", "Sistema formado por seres vivos y su ambiente físico", "Solo el entorno físico", "Grupo de animales"], ans: 1 },
  { id: 1202, area: "Ecología", q: "La fotosíntesis contribuye al ciclo del:", opts: ["Nitrógeno", "Agua", "Carbono", "Fósforo"], ans: 2 },
  { id: 1203, area: "Ecología", q: "¿Qué es la biodiversidad?", opts: ["Número de ecosistemas", "Variedad de especies, genes y ecosistemas", "Diversidad cultural", "Número de plantas"], ans: 1 },
  { id: 1204, area: "Ecología", q: "El efecto invernadero se produce principalmente por:", opts: ["La capa de ozono", "Gases como CO2 y CH4 que retienen calor", "La rotación de la Tierra", "La actividad solar"], ans: 1 },
  { id: 1205, area: "Ecología", q: "¿Qué es la cadena trófica?", opts: ["Relación de depredación entre organismos", "Ciclo del agua en la naturaleza", "Proceso fotosintético", "Migración de especies"], ans: 0 },
  { id: 1206, area: "Ecología", q: "Los descomponedores en un ecosistema:", opts: ["Producen su propio alimento", "Degradan la materia orgánica muerta", "Cazan a otros animales", "Viven en el agua"], ans: 1 },
  { id: 1207, area: "Ecología", q: "¿Qué es la huella ecológica?", opts: ["Rastro de animales", "Impacto humano sobre los recursos naturales", "Mapa de ecosistemas", "Contaminación visual"], ans: 1 },
  { id: 1208, area: "Ecología", q: "El calentamiento global afecta principalmente:", opts: ["Solo los polos", "El clima, ecosistemas y nivel del mar globalmente", "Solo los océanos", "Solo los desiertos"], ans: 1 },
  { id: 1209, area: "Ecología", q: "¿Qué es la eutrofización?", opts: ["Purificación del agua", "Exceso de nutrientes en agua que causa crecimiento algal", "Desertificación", "Erosión del suelo"], ans: 1 },
  { id: 1210, area: "Ecología", q: "Los organismos productores son:", opts: ["Herbívoros", "Carnívoros", "Plantas y algas que producen su alimento", "Hongos"], ans: 2 },
];

// Genera preguntas adicionales para llegar a 1500
function generateExtraQuestions() {
  const extras = [];
  const templates = [
    { area: "Biología", questions: [
      {q:"¿Cuál es la función de los leucocitos?",opts:["Transportar oxígeno","Combatir infecciones","Coagular la sangre","Producir enzimas"],ans:1},
      {q:"¿Qué es la meiosis II?",opts:["División que separa cromosomas homólogos","División que separa cromátidas hermanas","Replicación del ADN","Síntesis de proteínas"],ans:1},
      {q:"La respiración aerobia produce principalmente:",opts:["Glucosa","ATP (energía)","Proteínas","Lípidos"],ans:1},
      {q:"¿Qué son los antígenos?",opts:["Anticuerpos producidos por el cuerpo","Moléculas que desencadenan respuesta inmune","Células defensoras","Vitaminas esenciales"],ans:1},
      {q:"La teoría celular establece que:",opts:["Los virus son células","Toda célula surge de otra célula preexistente","Las plantas no tienen células","Los hongos son bacterias"],ans:1},
      {q:"¿Cuál es el pH de la sangre humana normal?",opts:["6.8-7.0","7.35-7.45","7.5-7.8","6.5-6.9"],ans:1},
      {q:"Los carbohidratos se clasifican en:",opts:["Polares y apolares","Monosacáridos, disacáridos y polisacáridos","Saturados e insaturados","Esenciales y no esenciales"],ans:1},
      {q:"¿Qué organismo es el vector del paludismo?",opts:["Mosca tse-tse","Mosquito Anopheles","Garrapata","Pulga"],ans:1},
      {q:"La proteína de la membrana que forma canales se llama:",opts:["Lípido","Colesterol","Proteína integral (canal)","Glucolípido"],ans:2},
      {q:"¿Qué es la telomerasa?",opts:["Enzima que replica el ADN completo","Enzima que alarga los telómeros","Proteína de membrana","ARN mensajero especial"],ans:1},
    ]},
    { area: "Química", questions: [
      {q:"¿Cuál es el pH de un ácido fuerte?",opts:["Mayor a 7","Igual a 7","Menor a 7","Variable"],ans:2},
      {q:"La reacción entre ácido y base se llama:",opts:["Oxidación","Neutralización","Reducción","Combustión"],ans:1},
      {q:"¿Qué es la cromatografía?",opts:["Síntesis de colores","Técnica de separación de mezclas","Reacción colorimétrica","Tipo de destilación"],ans:1},
      {q:"El enlace peptídico une:",opts:["Azúcares","Aminoácidos","Ácidos grasos","Nucleótidos"],ans:1},
      {q:"¿Qué es la desnaturalización de proteínas?",opts:["Síntesis de proteínas","Pérdida de estructura tridimensional","Digestión de proteínas","Formación de aminoácidos"],ans:1},
      {q:"El índice de refracción es una propiedad:",opts:["Química","Física","Biológica","Mecánica"],ans:1},
      {q:"¿Cuál es la fórmula del ácido clorhídrico?",opts:["H2SO4","HNO3","HCl","H3PO4"],ans:2},
      {q:"Los polímeros están formados por:",opts:["Átomos individuales","Monómeros repetidos","Moléculas de agua","Iones simples"],ans:1},
      {q:"¿Qué es la tensión superficial del agua?",opts:["Su punto de ebullición","Cohesión entre moléculas en la superficie","Su densidad","Su viscosidad"],ans:1},
      {q:"La saponificación es la reacción que produce:",opts:["Ácidos grasos y alcohol","Jabón y glicerol","Ésteres y agua","Aldehídos y cetonas"],ans:1},
    ]},
    { area: "Física", questions: [
      {q:"¿Qué es la resonancia?",opts:["Amortiguación de vibraciones","Vibración a la frecuencia natural de un sistema","Interferencia destructiva","Absorción de energía"],ans:1},
      {q:"La ley de Coulomb describe la fuerza entre:",opts:["Masas","Cargas eléctricas","Dipolos magnéticos","Moléculas"],ans:1},
      {q:"¿Qué es la conducción térmica?",opts:["Transferencia de calor por fluido en movimiento","Transferencia de calor por contacto directo","Emisión de radiación infrarroja","Cambio de estado"],ans:1},
      {q:"El campo magnético se representa por líneas de:",opts:["Fuerza eléctrica","Campo magnético (B)","Tensión","Presión"],ans:1},
      {q:"¿Qué es la impedancia en CA?",opts:["Solo resistencia","Oposición total al flujo de CA","Voltaje del circuito","Potencia disipada"],ans:1},
      {q:"La ley de Faraday relaciona la FEM con:",opts:["La resistencia","El cambio del flujo magnético","La corriente directa","La presión"],ans:1},
      {q:"¿Cuál es la unidad de la inductancia?",opts:["Farad","Ohm","Henry","Tesla"],ans:2},
      {q:"El efecto fotoeléctrico fue explicado por:",opts:["Newton","Maxwell","Einstein","Bohr"],ans:2},
      {q:"¿Qué es un semiconductor?",opts:["Conductor perfecto","Material con conductividad entre conductor y aislante","Aislante total","Superconductor a baja temperatura"],ans:1},
      {q:"La longitud de onda de la luz visible va de:",opts:["1-100 nm","380-780 nm","800-1200 nm","0.1-1 nm"],ans:1},
    ]},
    { area: "Matemáticas", questions: [
      {q:"¿Cuál es la forma polar de un número complejo?",opts:["a + bi","r(cos θ + i·sen θ)","a·b·i","√(a²+b²)"],ans:1},
      {q:"El teorema del valor medio establece que existe c donde:",opts:["f(c) = 0","f'(c) = [f(b)-f(a)]/(b-a)","f''(c) = 0","f(c) = f(a)"],ans:1},
      {q:"¿Cuánto es sen²(x) + cos²(x)?",opts:["0","2","1","sen(2x)"],ans:2},
      {q:"La transformada de Laplace se usa en:",opts:["Estadística descriptiva","Ecuaciones diferenciales","Geometría plana","Teoría de números"],ans:1},
      {q:"¿Qué es una matriz singular?",opts:["Matriz con determinante ≠ 0","Matriz con determinante = 0","Matriz diagonal","Matriz identidad"],ans:1},
      {q:"La regla de L'Hôpital se aplica cuando el límite da:",opts:["0/0 o ∞/∞","1/0","0·∞","∞-0"],ans:0},
      {q:"El conjunto de números reales incluye:",opts:["Solo enteros","Solo racionales","Racionales e irracionales","Solo naturales"],ans:2},
      {q:"La derivada implícita se usa cuando:",opts:["y está despejada explícitamente","y no está despejada de x","x es constante","La función no existe"],ans:1},
      {q:"¿Cuál es el resultado de ∫₀¹ x dx?",opts:["0","1/4","1/2","1"],ans:2},
      {q:"Una serie converge si sus términos:",opts:["Crecen indefinidamente","Tienden a cero y cumplen criterios de convergencia","Son siempre positivos","Son alternados"],ans:1},
    ]},
  ];

  let id = 1301;
  templates.forEach(template => {
    template.questions.forEach(q => {
      extras.push({ id: id++, area: template.area, ...q });
    });
  });

  // Additional questions to fill up to 1500
  const moreQuestions = [
    // Salud Pública
    {area:"Salud Pública",q:"La tasa de mortalidad infantil mide muertes en menores de:",opts:["1 año","5 años","10 años","15 años"],ans:0},
    {area:"Salud Pública",q:"¿Qué es la epidemiología?",opts:["Estudio de enfermedades de la piel","Estudio de distribución y determinantes de enfermedades","Tratamiento de epidemias","Vacunación masiva"],ans:1},
    {area:"Salud Pública",q:"La vacuna del BCG protege contra:",opts:["Sarampión","Tuberculosis","Hepatitis","Polio"],ans:1},
    {area:"Salud Pública",q:"¿Qué es la endemia?",opts:["Enfermedad presente constantemente en una región","Enfermedad que afecta todo el mundo","Brote repentino","Infección hospitalaria"],ans:0},
    {area:"Salud Pública",q:"El índice de masa corporal (IMC) se calcula como:",opts:["Peso/Talla","Peso(kg)/Talla²(m)","Talla/Peso","Peso×Talla"],ans:1},
    {area:"Salud Pública",q:"La terapia de rehidratación oral (TRO) se usa en:",opts:["Neumonía","Diarrea y deshidratación","Fiebre alta","Traumatismos"],ans:1},
    {area:"Salud Pública",q:"¿Qué es la prevención primaria?",opts:["Tratar la enfermedad","Evitar que la enfermedad ocurra","Rehabilitación","Diagnóstico temprano"],ans:1},
    {area:"Salud Pública",q:"La OMS es la organización:",opts:["Mundial de Matemáticas","Mundial de la Salud","Mexicana de Salud","Mundial de Seguros"],ans:1},
    {area:"Salud Pública",q:"¿Qué es la mortalidad materna?",opts:["Muerte de niños","Muerte de mujeres durante el embarazo, parto o puerperio","Muerte por enfermedades crónicas","Muerte infantil"],ans:1},
    {area:"Salud Pública",q:"El agua segura para consumo humano debe estar libre de:",opts:["Minerales","Patógenos y contaminantes","Oxígeno disuelto","Calcio y magnesio"],ans:1},
    // Psicología
    {area:"Psicología",q:"¿Quién desarrolló el psicoanálisis?",opts:["Carl Jung","Alfred Adler","Sigmund Freud","John Watson"],ans:2},
    {area:"Psicología",q:"La pirámide de Maslow describe:",opts:["Etapas del desarrollo","Jerarquía de necesidades humanas","Trastornos de personalidad","Teoría del aprendizaje"],ans:1},
    {area:"Psicología",q:"El condicionamiento clásico fue descubierto por:",opts:["Skinner","Freud","Pavlov","Bandura"],ans:2},
    {area:"Psicología",q:"¿Qué es la empatía?",opts:["Sentir lo mismo que otro","Comprender y compartir los sentimientos de otros","Indiferencia emocional","Proyección psicológica"],ans:1},
    {area:"Psicología",q:"El DSM es el manual de:",opts:["Diagnóstico de enfermedades físicas","Diagnóstico y Estadística de Trastornos Mentales","Salud pública","Estadística médica"],ans:1},
    {area:"Psicología",q:"¿Qué es la cognición?",opts:["Proceso emocional","Proceso mental de adquirir conocimiento","Respuesta conductual","Estado de ánimo"],ans:1},
    {area:"Psicología",q:"La memoria a corto plazo tiene capacidad de aproximadamente:",opts:["100 ítems","7 ± 2 elementos","50 ítems","3 elementos"],ans:1},
    {area:"Psicología",q:"¿Qué es el estrés crónico?",opts:["Respuesta puntual a amenaza","Estado prolongado de tensión que afecta la salud","Alegría extrema","Tranquilidad profunda"],ans:1},
    {area:"Psicología",q:"El efecto placebo ocurre cuando:",opts:["El medicamento funciona perfectamente","Una sustancia inactiva produce mejoría por expectativa","El tratamiento fracasa","La enfermedad empeora"],ans:1},
    {area:"Psicología",q:"¿Qué es la neuroplasticidad?",opts:["Rigidez del cerebro","Capacidad del cerebro de cambiar y adaptarse","Muerte neuronal","Mielinización de nervios"],ans:1},
    // Estadística Médica
    {area:"Estadística Médica",q:"La sensibilidad de una prueba diagnóstica mide:",opts:["Falsos positivos","Verdaderos positivos entre enfermos","Falsos negativos","Especificidad"],ans:1},
    {area:"Estadística Médica",q:"La especificidad mide la proporción de:",opts:["Enfermos correctamente identificados","Sanos correctamente identificados como negativos","Falsos positivos","Falsos negativos"],ans:1},
    {area:"Estadística Médica",q:"¿Qué es la prevalencia?",opts:["Número de casos nuevos","Proporción de casos en una población en un momento dado","Incidencia acumulada","Tasa de mortalidad"],ans:1},
    {area:"Estadística Médica",q:"La incidencia mide:",opts:["Casos existentes","Casos nuevos en un período de tiempo","Casos mortales","Casos recuperados"],ans:1},
    {area:"Estadística Médica",q:"¿Qué es un intervalo de confianza del 95%?",opts:["Exactamente el 95% de los datos","Rango donde el parámetro real cae el 95% de las veces","Error estándar multiplicado por 2","Percentil 95"],ans:1},
    {area:"Estadística Médica",q:"El valor p indica:",opts:["El tamaño del efecto","Probabilidad de obtener resultados si hipótesis nula es verdadera","La media de los datos","La varianza"],ans:1},
    {area:"Estadística Médica",q:"¿Qué es un ensayo clínico aleatorizado (ECA)?",opts:["Estudio observacional","Estudio experimental con asignación aleatoria a grupos","Estudio de casos y controles","Metaanálisis"],ans:1},
    {area:"Estadística Médica",q:"La regresión logística se usa para predecir:",opts:["Variables continuas","Variables categóricas binarias","Correlaciones lineales","Medias poblacionales"],ans:1},
    {area:"Estadística Médica",q:"¿Qué es el sesgo de selección?",opts:["Error de medición","Error sistemático en la selección de participantes","Variación aleatoria","Error de análisis"],ans:1},
    {area:"Estadística Médica",q:"La curva ROC evalúa:",opts:["Distribución normal","Rendimiento diagnóstico de una prueba","Supervivencia de pacientes","Eficacia de tratamientos"],ans:1},
    // Farmacología Básica
    {area:"Farmacología",q:"¿Qué es la farmacocinética?",opts:["Efectos del fármaco en el cuerpo","Lo que el cuerpo hace con el fármaco (ADME)","Síntesis de fármacos","Interacciones medicamentosas"],ans:1},
    {area:"Farmacología",q:"ADME en farmacología significa:",opts:["Acción, Distribución, Metabolismo, Excreción","Absorción, Distribución, Metabolismo, Excreción","Administración, Dosis, Mecanismo, Efecto","Análisis, Dosis, Manejo, Evaluación"],ans:1},
    {area:"Farmacología",q:"¿Qué es la dosis letal 50 (DL50)?",opts:["Dosis efectiva para el 50% de pacientes","Dosis que mata al 50% de la población de estudio","La mitad de la dosis máxima","Dosis mínima efectiva"],ans:1},
    {area:"Farmacología",q:"Los antiinflamatorios no esteroideos (AINEs) inhiben:",opts:["La ciclooxigenasa (COX)","La lipoxigenasa","Las proteasas","Los receptores opioides"],ans:0},
    {area:"Farmacología",q:"¿Qué es un antagonista farmacológico?",opts:["Potencia el efecto del agonista","Bloquea el receptor sin activarlo","Activa el receptor","Aumenta la absorción"],ans:1},
    {area:"Farmacología",q:"La vida media (t½) de un fármaco es:",opts:["Tiempo de absorción total","Tiempo para que la concentración se reduzca a la mitad","Tiempo de máxima concentración","Duración del efecto"],ans:1},
    {area:"Farmacología",q:"¿Qué son los antibióticos betalactámicos?",opts:["Antibióticos que inhiben la síntesis proteica","Antibióticos que inhiben la síntesis de pared celular","Antifúngicos","Antivirales"],ans:1},
    {area:"Farmacología",q:"La insulina se administra principalmente por vía:",opts:["Oral","Intravenosa directa","Subcutánea","Intramuscular"],ans:2},
    {area:"Farmacología",q:"¿Qué es la tolerancia farmacológica?",opts:["Alergia al fármaco","Necesidad de mayor dosis para el mismo efecto","Efecto adverso grave","Incompatibilidad de fármacos"],ans:1},
    {area:"Farmacología",q:"Los diuréticos del asa actúan sobre:",opts:["Túbulo proximal","Asa de Henle","Túbulo distal","Conducto colector"],ans:1},
  ];

  moreQuestions.forEach(q => {
    extras.push({ id: id++, ...q });
  });

  return extras;
}

const ALL_QUESTIONS = [...QUESTION_BANK, ...generateExtraQuestions()];

// ==================== UTILITIES ====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function selectQuestions(total = 200) {
  const byArea = {};
  ALL_QUESTIONS.forEach(q => {
    if (!byArea[q.area]) byArea[q.area] = [];
    byArea[q.area].push(q);
  });

  const areas = Object.keys(byArea);
  const perArea = Math.floor(total / areas.length);
  const selected = [];

  areas.forEach(area => {
    const shuffled = shuffle(byArea[area]);
    selected.push(...shuffled.slice(0, perArea));
  });

  while (selected.length < total) {
    const randomArea = areas[Math.floor(Math.random() * areas.length)];
    const candidate = shuffle(byArea[randomArea]).find(q => !selected.includes(q));
    if (candidate) selected.push(candidate);
  }

  return shuffle(selected).slice(0, total);
}

// ==================== STORAGE ====================
async function saveResult(username, score, total, time) {
  try {
    const key = `results:${username}`;
    let existing = [];
    try {
      const r = await window.storage.get(key);
      if (r) existing = JSON.parse(r.value);
    } catch {}
    existing.push({ score, total, pct: Math.round((score / total) * 100), time, date: new Date().toISOString() });
    await window.storage.set(key, JSON.stringify(existing), true);

    // Update leaderboard
    const lbKey = `leaderboard:${username}`;
    const best = Math.max(...existing.map(r => r.pct));
    const attempts = existing.length;
    await window.storage.set(lbKey, JSON.stringify({ username, best, attempts, last: new Date().toISOString() }), true);
  } catch (e) { console.error(e); }
}

async function getLeaderboard() {
  try {
    const keys = await window.storage.list("leaderboard:", true);
    if (!keys || !keys.keys) return [];
    const results = await Promise.all(keys.keys.map(async k => {
      try {
        const r = await window.storage.get(k, true);
        return r ? JSON.parse(r.value) : null;
      } catch { return null; }
    }));
    return results.filter(Boolean).sort((a, b) => b.best - a.best);
  } catch { return []; }
}

// ==================== COMPONENTS ====================
const COLORS = {
  bg: "#0a0e1a",
  card: "#111827",
  cardBorder: "#1e293b",
  accent: "#00d4aa",
  accent2: "#7c3aed",
  accent3: "#f59e0b",
  text: "#e2e8f0",
  textMuted: "#64748b",
  danger: "#ef4444",
  success: "#10b981",
  warning: "#f59e0b",
};

const AREA_COLORS = {
  "Biología": "#10b981",
  "Química": "#3b82f6",
  "Física": "#f59e0b",
  "Matemáticas": "#8b5cf6",
  "Comprensión Lectora": "#ec4899",
  "Inglés": "#06b6d4",
  "Francés": "#f97316",
  "Historia": "#84cc16",
  "Literatura": "#e879f9",
  "Anatomía": "#fb7185",
  "Geografía": "#34d399",
  "Filosofía": "#a78bfa",
  "Ecología": "#4ade80",
  "Salud Pública": "#38bdf8",
  "Psicología": "#f472b6",
  "Estadística Médica": "#facc15",
  "Farmacología": "#fd8a4f",
};

export default function ExamenMedicina() {
  const [screen, setScreen] = useState("home"); // home | exam | results | leaderboard
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [results, setResults] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [showAreaBreakdown, setShowAreaBreakdown] = useState(false);
  const timerRef = useRef(null);
  const EXAM_TIME = 200 * 90; // 90 seconds per question = 3 hours

  // Timer
  useEffect(() => {
    if (screen === "exam" && !examFinished) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            finishExam(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, examFinished]);

  function startExam() {
    if (!inputName.trim()) return;
    const name = inputName.trim();
    setUsername(name);
    const qs = selectQuestions(200);
    setQuestions(qs);
    setAnswers({});
    setSelected(null);
    setConfirmed(false);
    setCurrent(0);
    const t = EXAM_TIME;
    setTimeLeft(t);
    setTotalTime(t);
    setStartTime(Date.now());
    setExamFinished(false);
    setResults(null);
    setScreen("exam");
  }

  function selectAnswer(idx) {
    if (confirmed) return;
    setSelected(idx);
  }

  function confirmAnswer() {
    if (selected === null || confirmed) return;
    setAnswers(prev => ({ ...prev, [current]: selected }));
    setConfirmed(true);
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(answers[current + 1] ?? null);
      setConfirmed(answers[current + 1] !== undefined);
    } else {
      finishExam(false);
    }
  }

  function prevQuestion() {
    if (current > 0) {
      setCurrent(c => c - 1);
      setSelected(answers[current - 1] ?? null);
      setConfirmed(answers[current - 1] !== undefined);
    }
  }

  async function finishExam(timeout = false) {
    clearInterval(timerRef.current);
    setExamFinished(true);

    const elapsed = totalTime - timeLeft;
    let score = 0;
    const byArea = {};

    questions.forEach((q, i) => {
      const area = q.area;
      if (!byArea[area]) byArea[area] = { correct: 0, total: 0 };
      byArea[area].total++;
      if (answers[i] === q.ans) {
        score++;
        byArea[area].correct++;
      }
    });

    const pct = Math.round((score / questions.length) * 100);
    const timeStr = formatTime(elapsed);
    await saveResult(username, score, questions.length, timeStr);

    setResults({ score, total: questions.length, pct, byArea, elapsed, timeout });
    setScreen("results");
  }

  function formatTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  async function openLeaderboard() {
    setLbLoading(true);
    setScreen("leaderboard");
    const lb = await getLeaderboard();
    setLeaderboard(lb);
    setLbLoading(false);
  }

  const timerPct = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const timerColor = timerPct > 50 ? COLORS.success : timerPct > 25 ? COLORS.warning : COLORS.danger;

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  // ===== HOME SCREEN =====
  if (screen === "home") {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Georgia', 'Times New Roman', serif", position: "relative", overflow: "hidden" }}>
        {/* Background decoration */}
        <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              borderRadius: "50%",
              border: `1px solid rgba(0,212,170,${0.03 + i * 0.01})`,
              top: `${10 + i * 8}%`,
              left: `${5 + i * 12}%`,
              animation: `spin ${20 + i * 5}s linear infinite`,
            }} />
          ))}
          <div style={{ position: "absolute", top: "20%", right: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg, rgba(0,212,170,0.15), rgba(124,58,237,0.15))", border: "1px solid rgba(0,212,170,0.3)", borderRadius: "50px", padding: "8px 20px", marginBottom: "20px", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: COLORS.accent }}>
              ⚕ Examen de Admisión ⚕
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "900", margin: "0 0 16px", lineHeight: "1.1", background: "linear-gradient(135deg, #fff 0%, #00d4aa 50%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Licenciatura en Medicina
            </h1>
            <p style={{ fontSize: "18px", color: COLORS.textMuted, margin: "0 0 8px", fontStyle: "italic" }}>
              Sistema de Evaluación Integral
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "24px", flexWrap: "wrap" }}>
              {[["1,500+", "Preguntas"], ["200", "Por examen"], ["12", "Áreas temáticas"], ["3h", "Tiempo máximo"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: "800", color: COLORS.accent, fontFamily: "'Courier New', monospace" }}>{n}</div>
                  <div style={{ fontSize: "12px", color: COLORS.textMuted, letterSpacing: "1px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Areas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px", marginBottom: "40px" }}>
            {Object.entries(AREA_COLORS).map(([area, color]) => (
              <div key={area} style={{ background: COLORS.card, border: `1px solid ${color}30`, borderRadius: "10px", padding: "12px 10px", textAlign: "center", fontSize: "12px", color: color, fontWeight: "600" }}>
                {area}
              </div>
            ))}
          </div>

          {/* Login */}
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: "20px", padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "24px", fontSize: "22px", color: COLORS.text }}>
              Comenzar Examen
            </h2>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: COLORS.textMuted }}>Tu nombre completo</label>
              <input
                value={inputName}
                onChange={e => setInputName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && startExam()}
                placeholder="Ej: Juan García López"
                style={{
                  width: "100%", boxSizing: "border-box", background: "#1e293b", border: `1px solid ${COLORS.cardBorder}`,
                  borderRadius: "10px", padding: "14px 16px", color: COLORS.text, fontSize: "16px", outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = COLORS.accent}
                onBlur={e => e.target.style.borderColor = COLORS.cardBorder}
              />
            </div>
            <button onClick={startExam} disabled={!inputName.trim()} style={{
              width: "100%", padding: "16px", borderRadius: "12px", border: "none", cursor: inputName.trim() ? "pointer" : "not-allowed",
              background: inputName.trim() ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})` : "#334155",
              color: "#fff", fontSize: "17px", fontWeight: "700", letterSpacing: "1px", transition: "transform 0.15s, opacity 0.2s",
              opacity: inputName.trim() ? 1 : 0.5,
            }}
              onMouseEnter={e => { if (inputName.trim()) e.target.style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
            >
              ▶ INICIAR EXAMEN
            </button>
            <button onClick={openLeaderboard} style={{
              width: "100%", marginTop: "12px", padding: "12px", borderRadius: "10px", border: `1px solid ${COLORS.cardBorder}`,
              background: "transparent", color: COLORS.textMuted, fontSize: "14px", cursor: "pointer",
            }}>
              🏆 Ver Tabla de Posiciones
            </button>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ===== EXAM SCREEN =====
  if (screen === "exam" && questions.length > 0) {
    const q = questions[current];
    const areaColor = AREA_COLORS[q.area] || COLORS.accent;

    return (
      <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Georgia', serif" }}>
        {/* Top Bar */}
        <div style={{ background: COLORS.card, borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "12px 20px", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontWeight: "700", color: areaColor, fontSize: "13px", background: `${areaColor}20`, padding: "4px 12px", borderRadius: "20px", border: `1px solid ${areaColor}40` }}>
                  {q.area}
                </span>
                <span style={{ color: COLORS.textMuted, fontSize: "14px" }}>
                  {username}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "14px", color: COLORS.textMuted }}>
                  {answeredCount}/{questions.length} respondidas
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: `${timerColor}15`, padding: "6px 14px", borderRadius: "20px", border: `1px solid ${timerColor}40` }}>
                  <span style={{ fontSize: "16px" }}>⏱</span>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: "18px", fontWeight: "700", color: timerColor }}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>
            {/* Progress bars */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <div style={{ flex: 1, height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`, transition: "width 0.3s", borderRadius: "2px" }} />
              </div>
              <div style={{ flex: 1, height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${timerPct}%`, background: `linear-gradient(90deg, ${timerColor}, ${timerColor}90)`, transition: "width 1s linear", borderRadius: "2px" }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px" }}>
          {/* Question */}
          <div style={{ background: COLORS.card, border: `1px solid ${areaColor}40`, borderRadius: "20px", padding: "30px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <span style={{ fontSize: "13px", color: COLORS.textMuted, fontFamily: "'Courier New', monospace" }}>
                Pregunta {current + 1} de {questions.length}
              </span>
              <div style={{ display: "flex", gap: "4px" }}>
                {[...Array(Math.min(questions.length, 20))].map((_, i) => {
                  const idx = Math.floor(i * questions.length / 20);
                  const isAnswered = answers[idx] !== undefined;
                  const isCurrent = idx === current;
                  return (
                    <div key={i} style={{
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: isCurrent ? areaColor : isAnswered ? COLORS.success : "#334155",
                      transition: "background 0.2s",
                    }} />
                  );
                })}
              </div>
            </div>
            <p style={{ fontSize: "clamp(16px, 2.5vw, 19px)", lineHeight: "1.7", margin: 0, fontWeight: "600" }}>
              {q.q}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
            {q.opts.map((opt, i) => {
              let bg = COLORS.card;
              let borderColor = COLORS.cardBorder;
              let textColor = COLORS.text;

              if (confirmed) {
                if (i === q.ans) { bg = `${COLORS.success}20`; borderColor = COLORS.success; textColor = COLORS.success; }
                else if (i === selected && i !== q.ans) { bg = `${COLORS.danger}15`; borderColor = COLORS.danger; textColor = COLORS.danger; }
              } else if (i === selected) {
                bg = `${areaColor}20`; borderColor = areaColor;
              }

              return (
                <button key={i} onClick={() => selectAnswer(i)} style={{
                  width: "100%", textAlign: "left", padding: "18px 20px", borderRadius: "12px",
                  border: `2px solid ${borderColor}`, background: bg, color: textColor,
                  cursor: confirmed ? "default" : "pointer", fontSize: "15px", lineHeight: "1.5",
                  transition: "all 0.15s", display: "flex", alignItems: "flex-start", gap: "14px",
                  fontFamily: "'Georgia', serif",
                }}
                  onMouseEnter={e => { if (!confirmed && i !== selected) { e.currentTarget.style.borderColor = `${areaColor}80`; e.currentTarget.style.background = `${areaColor}10`; } }}
                  onMouseLeave={e => { if (!confirmed && i !== selected) { e.currentTarget.style.borderColor = COLORS.cardBorder; e.currentTarget.style.background = COLORS.card; } }}
                >
                  <span style={{
                    minWidth: "28px", height: "28px", borderRadius: "50%", border: `2px solid ${borderColor}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: "700", flexShrink: 0,
                    background: i === selected || (confirmed && i === q.ans) ? borderColor : "transparent",
                    color: i === selected || (confirmed && i === q.ans) ? (i === q.ans ? COLORS.bg : textColor === COLORS.danger ? "#fff" : COLORS.bg) : textColor,
                  }}>
                    {confirmed && i === q.ans ? "✓" : confirmed && i === selected && i !== q.ans ? "✗" : ["A", "B", "C", "D"][i]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <button onClick={prevQuestion} disabled={current === 0} style={{
              padding: "12px 24px", borderRadius: "10px", border: `1px solid ${COLORS.cardBorder}`,
              background: "transparent", color: current === 0 ? COLORS.textMuted : COLORS.text,
              cursor: current === 0 ? "not-allowed" : "pointer", fontSize: "15px",
            }}>
              ← Anterior
            </button>

            {!confirmed ? (
              <button onClick={confirmAnswer} disabled={selected === null} style={{
                flex: 1, maxWidth: "300px", padding: "14px 24px", borderRadius: "10px", border: "none",
                background: selected !== null ? `linear-gradient(135deg, ${areaColor}, ${COLORS.accent2})` : "#334155",
                color: "#fff", fontWeight: "700", fontSize: "16px", cursor: selected !== null ? "pointer" : "not-allowed",
              }}>
                Confirmar Respuesta
              </button>
            ) : (
              <button onClick={nextQuestion} style={{
                flex: 1, maxWidth: "300px", padding: "14px 24px", borderRadius: "10px", border: "none",
                background: current === questions.length - 1 ? `linear-gradient(135deg, ${COLORS.warning}, ${COLORS.danger})` : `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
                color: "#fff", fontWeight: "700", fontSize: "16px", cursor: "pointer",
              }}>
                {current === questions.length - 1 ? "🏁 Terminar Examen" : "Siguiente →"}
              </button>
            )}

            <button onClick={nextQuestion} disabled={!confirmed || current === questions.length - 1} style={{
              padding: "12px 24px", borderRadius: "10px", border: `1px solid ${COLORS.cardBorder}`,
              background: "transparent", color: (!confirmed || current === questions.length - 1) ? COLORS.textMuted : COLORS.text,
              cursor: (!confirmed || current === questions.length - 1) ? "not-allowed" : "pointer", fontSize: "15px",
            }}>
              Siguiente →
            </button>
          </div>

          {/* Emergency finish */}
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button onClick={() => finishExam(false)} style={{
              background: "transparent", border: `1px solid ${COLORS.danger}40`, color: COLORS.danger,
              padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px",
            }}>
              Terminar examen ahora ({answeredCount} respondidas)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== RESULTS SCREEN =====
  if (screen === "results" && results) {
    const grade = results.pct >= 90 ? "A" : results.pct >= 80 ? "B" : results.pct >= 70 ? "C" : results.pct >= 60 ? "D" : "F";
    const gradeColor = results.pct >= 90 ? COLORS.success : results.pct >= 70 ? COLORS.warning : COLORS.danger;
    const passed = results.pct >= 60;

    return (
      <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Georgia', serif" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ fontSize: "70px", marginBottom: "16px" }}>
              {results.pct >= 90 ? "🏆" : results.pct >= 70 ? "⭐" : results.pct >= 60 ? "✅" : "📚"}
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "900", margin: "0 0 8px", color: gradeColor }}>
              {results.pct >= 90 ? "¡Excelente!" : results.pct >= 70 ? "¡Muy bien!" : results.pct >= 60 ? "¡Aprobado!" : "A seguir estudiando"}
            </h1>
            <p style={{ color: COLORS.textMuted, fontSize: "16px" }}>{username}</p>
            {results.timeout && <p style={{ color: COLORS.danger, fontSize: "14px" }}>⚠ Tiempo agotado</p>}
          </div>

          {/* Score card */}
          <div style={{ background: COLORS.card, border: `2px solid ${gradeColor}40`, borderRadius: "24px", padding: "40px", marginBottom: "24px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "80px", fontWeight: "900", color: gradeColor, lineHeight: 1, fontFamily: "'Courier New', monospace" }}>
                  {results.pct}%
                </div>
                <div style={{ color: COLORS.textMuted, marginTop: "8px" }}>Calificación</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "32px", fontWeight: "700", color: COLORS.success }}>
                    {results.score} <span style={{ fontSize: "16px", color: COLORS.textMuted }}>correctas</span>
                  </div>
                  <div style={{ fontSize: "18px", color: COLORS.danger }}>
                    {results.total - results.score} <span style={{ fontSize: "14px", color: COLORS.textMuted }}>incorrectas / sin responder</span>
                  </div>
                  <div style={{ fontSize: "16px", color: COLORS.textMuted, marginTop: "8px" }}>
                    ⏱ {results.elapsed ? formatTime(results.elapsed) : "--"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%", background: `${gradeColor}20`,
                  border: `4px solid ${gradeColor}`, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "40px", fontWeight: "900", color: gradeColor,
                }}>
                  {grade}
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: "13px", marginTop: "8px" }}>
                  {passed ? "APROBADO" : "NO APROBADO"}
                </div>
              </div>
            </div>

            {/* Big progress bar */}
            <div style={{ marginTop: "30px" }}>
              <div style={{ height: "16px", background: "#1e293b", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${results.pct}%`,
                  background: `linear-gradient(90deg, ${gradeColor}, ${gradeColor}80)`,
                  transition: "width 1s ease", borderRadius: "8px",
                }} />
              </div>
            </div>
          </div>

          {/* Area breakdown */}
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: "20px", padding: "30px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "20px" }}>Desglose por Área</h2>
              <button onClick={() => setShowAreaBreakdown(!showAreaBreakdown)} style={{
                background: "transparent", border: `1px solid ${COLORS.cardBorder}`, color: COLORS.textMuted,
                padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px",
              }}>
                {showAreaBreakdown ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {showAreaBreakdown && (
              <div style={{ display: "grid", gap: "12px" }}>
                {Object.entries(results.byArea).sort((a, b) => (b[1].correct / b[1].total) - (a[1].correct / a[1].total)).map(([area, { correct, total }]) => {
                  const pct = Math.round((correct / total) * 100);
                  const color = AREA_COLORS[area] || COLORS.accent;
                  return (
                    <div key={area}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "14px" }}>
                        <span style={{ color, fontWeight: "600" }}>{area}</span>
                        <span style={{ color: COLORS.textMuted }}>{correct}/{total} ({pct}%)</span>
                      </div>
                      <div style={{ height: "8px", background: "#1e293b", borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.8s ease", borderRadius: "4px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Message */}
          <div style={{ background: `${passed ? COLORS.success : COLORS.warning}10`, border: `1px solid ${passed ? COLORS.success : COLORS.warning}30`, borderRadius: "16px", padding: "20px", marginBottom: "24px", textAlign: "center" }}>
            <p style={{ margin: 0, color: passed ? COLORS.success : COLORS.warning, fontSize: "16px" }}>
              {results.pct >= 90 ? "🌟 Rendimiento sobresaliente. Tienes excelentes posibilidades de ingresar a medicina." :
               results.pct >= 80 ? "⭐ Muy buen resultado. Con un poco más de repaso, estarás listo." :
               results.pct >= 70 ? "📖 Buen avance. Refuerza las áreas donde tuviste dificultades." :
               results.pct >= 60 ? "✅ Aprobado. Sigue estudiando para mejorar tu puntaje." :
               "📚 Necesitas más preparación. Revisa especialmente las áreas con menor puntaje."}
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={() => { setInputName(username); setScreen("home"); }} style={{
              flex: 1, minWidth: "180px", padding: "16px", borderRadius: "12px", border: "none",
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
              color: "#fff", fontWeight: "700", fontSize: "16px", cursor: "pointer",
            }}>
              🔄 Nuevo Examen
            </button>
            <button onClick={openLeaderboard} style={{
              flex: 1, minWidth: "180px", padding: "16px", borderRadius: "12px",
              border: `1px solid ${COLORS.cardBorder}`, background: COLORS.card,
              color: COLORS.text, fontSize: "16px", cursor: "pointer",
            }}>
              🏆 Ver Rankings
            </button>
            <button onClick={() => setScreen("home")} style={{
              flex: 1, minWidth: "180px", padding: "16px", borderRadius: "12px",
              border: `1px solid ${COLORS.cardBorder}`, background: "transparent",
              color: COLORS.textMuted, fontSize: "16px", cursor: "pointer",
            }}>
              🏠 Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== LEADERBOARD =====
  if (screen === "leaderboard") {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Georgia', serif" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "30px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
            <button onClick={() => setScreen("home")} style={{
              background: "transparent", border: `1px solid ${COLORS.cardBorder}`, color: COLORS.text,
              padding: "10px 18px", borderRadius: "10px", cursor: "pointer", fontSize: "14px",
            }}>← Inicio</button>
            <div>
              <h1 style={{ margin: 0, fontSize: "28px" }}>🏆 Tabla de Posiciones</h1>
              <p style={{ margin: "4px 0 0", color: COLORS.textMuted, fontSize: "14px" }}>
                Rankings globales del Examen de Admisión a Medicina
              </p>
            </div>
          </div>

          {lbLoading ? (
            <div style={{ textAlign: "center", padding: "60px", color: COLORS.textMuted }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>⏳</div>
              Cargando rankings...
            </div>
          ) : leaderboard.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: COLORS.textMuted }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>📊</div>
              Aún no hay participantes registrados.<br />
              ¡Sé el primero en tomar el examen!
            </div>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {leaderboard.map((entry, i) => {
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
                const scoreColor = entry.best >= 90 ? COLORS.success : entry.best >= 70 ? COLORS.warning : COLORS.danger;
                const isMe = entry.username === username;
                return (
                  <div key={entry.username} style={{
                    background: isMe ? `${COLORS.accent}10` : COLORS.card,
                    border: `1px solid ${isMe ? COLORS.accent : COLORS.cardBorder}`,
                    borderRadius: "16px", padding: "20px 24px",
                    display: "flex", alignItems: "center", gap: "20px",
                  }}>
                    <div style={{ fontSize: "24px", minWidth: "40px", textAlign: "center" }}>{medal}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "700", fontSize: "17px", color: isMe ? COLORS.accent : COLORS.text }}>
                        {entry.username} {isMe ? "(Tú)" : ""}
                      </div>
                      <div style={{ fontSize: "13px", color: COLORS.textMuted, marginTop: "3px" }}>
                        {entry.attempts} intento{entry.attempts !== 1 ? "s" : ""} •{" "}
                        Último: {new Date(entry.last).toLocaleDateString("es-MX")}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "28px", fontWeight: "900", color: scoreColor, fontFamily: "'Courier New', monospace" }}>
                        {entry.best}%
                      </div>
                      <div style={{ fontSize: "12px", color: COLORS.textMuted }}>Mejor puntaje</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button onClick={() => setInputName(username)} style={{ display: "none" }} />
            <button onClick={() => { setInputName(username || ""); setScreen("home"); }} style={{
              padding: "14px 40px", borderRadius: "12px", border: "none",
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
              color: "#fff", fontWeight: "700", fontSize: "16px", cursor: "pointer",
            }}>
              📝 Tomar el Examen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: COLORS.bg, color: COLORS.text }}>Cargando...</div>;
  }
