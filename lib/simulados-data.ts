export interface Alternative {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface Question {
  id: number;
  number: number;
  subject: string;
  discipline: 'Física' | 'Química' | 'Biologia' | 'Matemática' | 'Linguagens';
  difficulty: 'FÁCIL' | 'MÉDIO' | 'DIFÍCIL';
  context: string[];
  hasCircuitDiagram?: boolean;
  imageCaption?: string;
  prompt: string;
  alternatives: Alternative[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: {
    resolution: string;
    keyConcept: string;
    distractors: {
      option: string;
      reason: string;
    }[];
  };
}

export interface SimuladoMeta {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  category: 'enem' | 'concursos' | 'vestibulares' | 'fundamental';
  questionsCount: number;
  duration: string;
  completedQuestions?: number;
  totalTimeMinutes: number;
  officialTag?: string;
  highlight?: boolean;
}

export interface DisciplinePerformance {
  discipline: string;
  total: number;
  correct: number;
  wrong: number;
  percentage: number;
  status: 'Excelente' | 'Bom' | 'Atenção';
}

export const SIMULADOS_CATALOG: SimuladoMeta[] = [
  {
    id: 'enem-2024-dia1',
    title: 'ENEM 2024 - Simulado Geral Dia 1',
    subtitle: 'Linguagens, Códigos e suas Tecnologias, Ciências Humanas e Proposta de Redação.',
    badge: 'Mais Realizado',
    officialTag: 'Oficial ENEM',
    category: 'enem',
    questionsCount: 90,
    duration: '4h 30min',
    totalTimeMinutes: 270,
    highlight: true,
  },
  {
    id: 'enem-2024-cn',
    title: 'ENEM 2024 - Ciências da Natureza Oficial',
    subtitle: 'Física, Química e Biologia com questões contextualizadas e foco em interpretação de gráficos e circuitos.',
    badge: 'Em Andamento',
    officialTag: 'Simulado Ativo',
    category: 'enem',
    questionsCount: 45,
    completedQuestions: 18,
    duration: '3h 45min',
    totalTimeMinutes: 225,
    highlight: false,
  },
  {
    id: 'concurso-caixa-bb',
    title: 'Concurso Caixa / Banco do Brasil',
    subtitle: 'Conhecimentos Básicos e Específicos: Matemática Financeira, Língua Portuguesa e Vendas.',
    badge: 'Concursos Bancários',
    officialTag: 'Nível Intermediário',
    category: 'concursos',
    questionsCount: 60,
    duration: '3h 30min',
    totalTimeMinutes: 210,
    highlight: false,
  },
  {
    id: 'fundamental-saeb-9ano',
    title: 'Simulado 9º Ano - Prova Brasil / Saeb',
    subtitle: '40 Questões objetivas de Matemática e Língua Portuguesa com resolução comentada.',
    badge: 'Fundamental',
    officialTag: 'Foco em Descritores',
    category: 'fundamental',
    questionsCount: 40,
    duration: '2h 00min',
    totalTimeMinutes: 120,
    highlight: false,
  },
  {
    id: 'fuvest-1fase',
    title: 'FUVEST 1ª Fase - Simulado Específico',
    subtitle: 'Prova interdisciplinar completa com 90 questões padrão USP para aferição de corte.',
    badge: 'Vestibular USP',
    officialTag: 'Edição Recente',
    category: 'vestibulares',
    questionsCount: 90,
    duration: '5h 00min',
    totalTimeMinutes: 300,
    highlight: false,
  },
  {
    id: 'unicamp-1fase',
    title: 'UNICAMP 2025 - 1ª Fase Conhecimentos Gerais',
    subtitle: '72 Questões interdisciplinares com foco em leitura crítica e resolução contextualizada.',
    badge: 'Comvest',
    officialTag: 'Atualizado',
    category: 'vestibulares',
    questionsCount: 72,
    duration: '4h 00min',
    totalTimeMinutes: 240,
    highlight: false,
  },
];

export const EXAM_QUESTIONS: Question[] = [
  {
    id: 11,
    number: 11,
    subject: 'Ciências da Natureza • Biologia',
    discipline: 'Biologia',
    difficulty: 'FÁCIL',
    context: [
      'Em ecossistemas aquáticos continentais, o processo de eutrofização decorrente do despejo indevido de efluentes ricos em compostos nitrogenados e fosfatados provoca alterações físico-químicas drásticas na coluna d’água.',
      'A proliferação acelerada de cianobactérias e microalgas na camada superficial reduz progressivamente a penetração de luz solar nas zonas eufóticas mais profundas.'
    ],
    prompt: 'Qual é o impacto ecológico imediato nos níveis tróficos inferiores resultante da escassez de luminosidade?',
    alternatives: [
      { letter: 'A', text: 'Aumento da taxa fotossintética da vegetação submersa com acréscimo de oxigênio dissolvido.' },
      { letter: 'B', text: 'Morte de produtores fotossintetizantes bentônicos e elevação da Demanda Bioquímica de Oxigênio (DBO).' },
      { letter: 'C', text: 'Inibição imediata das bactérias decompositoras anaeróbicas na bacia de sedimentação.' },
      { letter: 'D', text: 'Redução abrupta da concentração de nitritos e fosfatos nos primeiros centímetros superficiais.' },
      { letter: 'E', text: 'Aumento da taxa de reprodução de peixes carnívoros pela alta disponibilidade de biomassa algal.' },
    ],
    correctAnswer: 'B',
    explanation: {
      resolution: 'Sem penetração de luz nas camadas mais profundas, as algas e plantas submersas não realizam fotossíntese e morrem. A consequente decomposição dessa massa de matéria orgânica pelas bactérias aeróbicas consome quase todo o oxigênio dissolvido, aumentando a DBO e provocando anóxia.',
      keyConcept: 'Eutrofização artificial, oxigênio dissolvido e demanda bioquímica de oxigênio (DBO).',
      distractors: [
        { option: 'A', reason: 'A falta de luz solar reduz drasticamente a fotossíntese, em vez de aumentá-la.' },
        { option: 'C', reason: 'Os decompositores anaeróbicos proliferam nas fases finais quando o oxigênio se esgota.' },
        { option: 'D', reason: 'A concentração de fosfatos e nitritos permanece elevada devido à poluição contínua.' },
        { option: 'E', reason: 'A mortandade em massa de peixes ocorre por falta de oxigênio respirável.' },
      ],
    },
  },
  {
    id: 12,
    number: 12,
    subject: 'Ciências da Natureza • Química',
    discipline: 'Química',
    difficulty: 'MÉDIO',
    context: [
      'A síntese industrial de amônia pelo processo Haber-Bosch é representada pelo equilíbrio químico: N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) com variação de entalpia negativa (ΔH < 0).',
      'Para otimizar o rendimento comercial em reatores contínuos, os engenheiros químicos ajustam variáveis termodinâmicas como temperatura e pressão parcial dos gases reagentes.'
    ],
    prompt: 'Com base no princípio de Le Chatelier, para deslocar o equilíbrio no sentido da formação do produto NH₃, deve-se:',
    alternatives: [
      { letter: 'A', text: 'Aumentar a temperatura e diminuir a pressão do reator.' },
      { letter: 'B', text: 'Diminuir a temperatura e diminuir a pressão de operação.' },
      { letter: 'C', text: 'Aumentar a pressão total e manter a temperatura moderada compatível com a cinética.' },
      { letter: 'D', text: 'Remover continuamente o gás nitrogênio N₂ da câmara de combustão.' },
      { letter: 'E', text: 'Adicionar um catalisador de ferro para deslocar o equilíbrio termodinâmico para a direita.' },
    ],
    correctAnswer: 'C',
    explanation: {
      resolution: 'No lado dos reagentes há 4 mols gasosos (1 de N₂ + 3 de H₂) e no lado dos produtos há 2 mols gasosos (2 de NH₃). Pelo princípio de Le Chatelier, o aumento da pressão favorece o lado de menor volume gasoso (formação de amônia). Sendo a reação exotérmica (ΔH < 0), a redução da temperatura favorece o produto, mas exige temperatura moderada para que a velocidade não caia excessivamente.',
      keyConcept: 'Princípio de Le Chatelier: influência da pressão e temperatura em equilíbrios gasosos homogêneos.',
      distractors: [
        { option: 'A', reason: 'Aumentar a temperatura em reação exotérmica desloca o equilíbrio para os reagentes (esquerda).' },
        { option: 'B', reason: 'Diminuir a pressão favorece o lado com maior número de mols de gás (reagentes).' },
        { option: 'D', reason: 'Remover reagente desloca o equilíbrio no sentido de reconstituí-lo, desfavorecendo o produto.' },
        { option: 'E', reason: 'Catalisadores aceleram o tempo para atingir o equilíbrio, mas não alteram o valor da constante nem a composição no equilíbrio.' },
      ],
    },
  },
  {
    id: 13,
    number: 13,
    subject: 'Ciências da Natureza • Física',
    discipline: 'Física',
    difficulty: 'FÁCIL',
    context: [
      'Uma ciclista desloca-se em uma ciclovia plana a uma velocidade constante de 18 km/h. Ao avistar um obstáculo a 25 metros de distância, aciona suavemente os freios, provocando uma desaceleração uniforme de módulo 1,0 m/s² até a parada total.'
    ],
    prompt: 'A distância total percorrida pela ciclista durante a frenagem e o tempo necessário para o repouso são, respectivamente:',
    alternatives: [
      { letter: 'A', text: '12,5 m e 5,0 s' },
      { letter: 'B', text: '25,0 m e 10,0 s' },
      { letter: 'C', text: '18,0 m e 3,6 s' },
      { letter: 'D', text: '15,0 m e 4,5 s' },
      { letter: 'E', text: '10,0 m e 5,0 s' },
    ],
    correctAnswer: 'A',
    explanation: {
      resolution: 'Primeiro converte-se a velocidade inicial: v₀ = 18 km/h = 18 / 3,6 = 5,0 m/s. Pela equação de Torricelli: v² = v₀² - 2·a·Δs => 0 = 5² - 2·(1)·Δs => 2·Δs = 25 => Δs = 12,5 m. Pela função horária da velocidade: v = v₀ - a·t => 0 = 5 - 1·t => t = 5,0 s.',
      keyConcept: 'Movimento Retilíneo Uniformemente Variado (MRUV) e Equação de Torricelli.',
      distractors: [
        { option: 'B', reason: 'Erro comum ao usar 18 km/h diretamente sem converter para m/s.' },
        { option: 'C', reason: 'Valor numérico sem considerar a fórmula de Torricelli.' },
        { option: 'D', reason: 'Cálculo aproximado incorreto do intervalo de tempo.' },
        { option: 'E', reason: 'Distância incorreta por esquecer o divisor 2 da equação v² = 2·a·d.' },
      ],
    },
  },
  {
    id: 14,
    number: 14,
    subject: 'Ciências da Natureza • Física',
    discipline: 'Física',
    difficulty: 'MÉDIO',
    context: [
      'Em um circuito elétrico residencial projetado para operar com tensão contínua de segurança, uma lâmpada halógena de resistência ôhmica constante está conectada a um reostato linear graduado de 0 a 50 Ω.',
      'O gráfico a seguir ilustra a curva de dissipação de potência da lâmpada em função da corrente que atravessa o filamento sob diferentes ajustes da resistência total equivalente do ramo condutor:'
    ],
    hasCircuitDiagram: true,
    imageCaption: 'Figura 1: Curva de potência dissipada (W) versus intensidade da corrente elétrica (A).',
    prompt: 'Considerando a conservação de energia e que a fonte mantém d.d.p. constante de 120 V, determine o valor aproximado da corrente nominal quando o circuito atinge o ponto de rendimento luminoso máximo indicado pelo pico da curva.',
    alternatives: [
      { letter: 'A', text: '1,2 A e a resistência interna nula dissipa energia mínima.' },
      { letter: 'B', text: '2,0 A, operando em regime estacionário com temperatura ambiente estável.' },
      { letter: 'C', text: '2,5 A, correspondendo ao pico de 300 W onde a impedância total iguala-se à da fonte.' },
      { letter: 'D', text: '4,8 A, com o reostato totalmente aberto na posição de máxima resistência condutiva.' },
      { letter: 'E', text: '5,0 A, provocando sobrecarga temporária no gerador por efeito Joule cumulativo.' },
    ],
    correctAnswer: 'C',
    explanation: {
      resolution: 'Pelo teorema da máxima transferência de potência (e análise gráfica do circuito fechado com reostato), a potência máxima útil dissipada ocorre quando a resistência ajustável do reostato iguala a resistência interna do gerador/filamento equivalente. Sob tensão nominal de 120 V e no vértice da parábola de rendimento luminoso (P = 300 W), temos P = V·i_útil ou analisando o ponto de pico grafado: i = 2,5 A, no qual P = 120 V × 2,5 A = 300 W, exatamente o valor assinalado no pico.',
      keyConcept: 'Eletrodinâmica: Potência elétrica (P = V·i), reostatos em circuitos série e ponto de máxima dissipação.',
      distractors: [
        { option: 'A', reason: '1,2 A corresponde a uma dissipação de apenas 144 W, muito abaixo do rendimento máximo.' },
        { option: 'B', reason: '2,0 A resulta em 240 W, correspondente ao ramo ascendente da curva.' },
        { option: 'D', reason: '4,8 A implicaria quase curto-circuito, gerando queda excessiva de rendimento luminoso.' },
        { option: 'E', reason: '5,0 A excede o ponto operacional seguro de projeto.' },
      ],
    },
  },
  {
    id: 15,
    number: 15,
    subject: 'Ciências da Natureza • Química',
    discipline: 'Química',
    difficulty: 'DIFÍCIL',
    context: [
      'Pilhas de combustível de óxido sólido (SOFC) operam em temperaturas elevadas (entre 600 °C e 1000 °C) e utilizam como eletrólito uma cerâmica condutora de íons óxido (O²⁻).',
      'No ânodo, o hidrogênio molecular sofre oxidação ao reagir com os ânions O²⁻ transportados através da membrana eletrolítica cerâmica porosa.'
    ],
    prompt: 'A semirreação balanceada que ocorre especificamente no ânodo dessa célula eletroquímica é:',
    alternatives: [
      { letter: 'A', text: 'O₂ + 4 e⁻ → 2 O²⁻' },
      { letter: 'B', text: '2 H₂ + 2 O²⁻ → 2 H₂O + 4 e⁻' },
      { letter: 'C', text: 'H₂ + 2 OH⁻ → 2 H₂O + 2 e⁻' },
      { letter: 'D', text: '2 H₂O + 4 e⁻ → 2 H₂ + 2 O²⁻' },
      { letter: 'E', text: 'O²⁻ + 2 e⁻ → O₂' },
    ],
    correctAnswer: 'B',
    explanation: {
      resolution: 'No ânodo sempre ocorre oxidação (perda de elétrons). O combustível H₂ reage com os íons condutores O²⁻ que chegam do cátodo através da cerâmica, formando vapor d’água e liberando elétrons para o circuito externo: 2 H₂ + 2 O²⁻ → 2 H₂O + 4 e⁻.',
      keyConcept: 'Eletroquímica avançada: Semirreações de oxirredução em células a combustível cerâmicas (SOFC).',
      distractors: [
        { option: 'A', reason: 'Esta é a reação de redução que ocorre no cátodo, com recebimento de elétrons pelo oxigênio.' },
        { option: 'C', reason: 'Esta reação utiliza íons hidroxila (OH⁻), característicos de células alcalinas (AFC), não SOFC.' },
        { option: 'D', reason: 'Representa um processo de eletrólise reversa não condizente com a operação galvânica.' },
        { option: 'E', reason: 'Equação eletroquimicamente incorreta e com desbalanço de cargas.' },
      ],
    },
  },
  {
    id: 16,
    number: 16,
    subject: 'Ciências da Natureza • Física',
    discipline: 'Física',
    difficulty: 'MÉDIO',
    context: [
      'A refração da luz solar ao incidir obliquamente sobre gotas de água em suspensão na atmosfera dá origem ao arco-íris primário e secundário.',
      'A separação das cores decorre do fenômeno da dispersão cromática, em que o índice de refração do meio transparente varia sutilmente com a frequência da onda luminosa.'
    ],
    prompt: 'Na passagem da luz solar do ar para o interior da gota de água:',
    alternatives: [
      { letter: 'A', text: 'A luz violeta sofre o maior desvio angular por possuir menor velocidade na água.' },
      { letter: 'B', text: 'A luz vermelha sofre maior desvio angular devido ao seu menor comprimento de onda.' },
      { letter: 'C', text: 'Todas as componentes espectrais mantêm a mesma velocidade e ângulo de refração.' },
      { letter: 'D', text: 'A frequência da luz diminui proporcionalmente à redução da velocidade de propagação.' },
      { letter: 'E', text: 'A reflexão total ocorre sem haver dispersão da luz branca em nenhum ponto.' },
    ],
    correctAnswer: 'A',
    explanation: {
      resolution: 'A luz violeta possui maior frequência no espectro visível. Em meios materiais dispersivos como a água, quanto maior a frequência, maior é o índice de refração (n_violeta > n_vermelho), logo menor é a velocidade da onda luminosa naquele meio (v = c/n). Pela lei de Snell (n₁·sen θ₁ = n₂·sen θ₂), maior índice resulta em menor ângulo com a normal, portanto maior desvio angular.',
      keyConcept: 'Óptica geométrica: Dispersão da luz, lei de Snell-Descartes e refração da luz em prismas/gotas d’água.',
      distractors: [
        { option: 'B', reason: 'A luz vermelha tem maior comprimento de onda e sofre MENOR desvio angular.' },
        { option: 'C', reason: 'Cada cor possui índice de refração ligeiramente diferente (dispersão).' },
        { option: 'D', reason: 'A frequência da luz depende exclusivamente da fonte emissora e NUNCA varia na refração.' },
        { option: 'E', reason: 'A separação de cores é justamente a dispersão angular.' },
      ],
    },
  },
];

export const INITIAL_USER_ANSWERS: Record<number, 'A' | 'B' | 'C' | 'D' | 'E'> = {
  11: 'B',
  12: 'C',
  13: 'A',
  14: 'C', // Initially selected as C matching the screenshot
};

export const INITIAL_FLAGGED_QUESTIONS: number[] = [15];

export const INITIAL_DISCIPLINE_STATS: DisciplinePerformance[] = [
  { discipline: 'Física', total: 15, correct: 13, wrong: 2, percentage: 86.6, status: 'Excelente' },
  { discipline: 'Química', total: 15, correct: 11, wrong: 4, percentage: 73.3, status: 'Bom' },
  { discipline: 'Biologia', total: 15, correct: 14, wrong: 1, percentage: 93.3, status: 'Excelente' },
  { discipline: 'Matemática', total: 25, correct: 19, wrong: 6, percentage: 76.0, status: 'Bom' },
  { discipline: 'Linguagens & Códigos', total: 20, correct: 15, wrong: 5, percentage: 75.0, status: 'Bom' },
];
