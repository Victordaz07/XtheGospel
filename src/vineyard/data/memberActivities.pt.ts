import { MemberActivity } from './activitiesTypes';

export const memberActivitiesPt: MemberActivity[] = [
  {
    id: 'quiz-doctrina-de-cristo-basico',
    title: 'Quiz: A doutrina de Cristo em ação',
    type: 'scripture-quiz',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 8,
    description:
      'Um quiz rápido para revisar os pontos essenciais da doutrina de Cristo e como vivê-la no dia a dia.',
    studyHint:
      'Se tiver dificuldade, volte ao módulo “A doutrina de Cristo na vida diária” e releia os resumos.',
    reward: {
      xp: 100,
      badge: 'doutrina-de-cristo-nivel-1',
    },
    questions: [
      {
        id: 'dc-q1',
        prompt: 'Qual opção descreve melhor a fé em Jesus Cristo para um membro de ala?',
        options: [
          'Acreditar que Jesus existe e ir à Igreja aos domingos.',
          'Confiar tanto Nele que está disposto a agir, mudar e abrir a boca para testificar.',
          'Sentir paz ao ouvir música espiritual.',
          'Saber muitos versículos de cor.',
        ],
        correctOptionIndex: 1,
        explanation:
          'A verdadeira fé sempre leva à ação. É mais do que acreditar: é confiar o suficiente para obedecer e convidar outros.',
        scriptureReference: '2 Néfi 25:26',
      },
      {
        id: 'dc-q2',
        prompt: 'Qual exemplo descreve melhor o “arrependimento contínuo”?',
        options: [
          'Confessar um pecado grave uma única vez na vida.',
          'Sentir culpa sempre que comete um erro.',
          'Rever com frequência a própria vida, ajustar o comportamento e buscar mudar com a ajuda do Senhor.',
          'Evitar pensar nas fraquezas para não ficar desanimado.',
        ],
        correctOptionIndex: 2,
        explanation:
          'O arrependimento contínuo é um processo diário e alegre de mudança em direção a Cristo, não um evento isolado.',
        scriptureReference: 'Alma 36',
      },
      {
        id: 'dc-q3',
        prompt: 'Em um mundo cheio de distrações, “perseverar até o fim” significa principalmente:',
        options: [
          'Continuar indo à Igreja mesmo se tudo parecer rotineiro.',
          'Apenas aguentar firme até que Cristo venha.',
          'Continuar vindo a Cristo repetidas vezes, renovando convênios e ajudando outros a fazer o mesmo.',
          'Evitar falar sobre dúvidas ou lutas espirituais.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Perseverar é algo ativo: continuar vindo a Cristo, renovar convênios e sustentar outros no caminho.',
        scriptureReference: '2 Néfi 31:20',
      },
    ],
  },
  {
    id: 'escenarios-vida-real-misioneros',
    title: 'O que você faria? (com os missionários)',
    type: 'scenario-quiz',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 12,
    description:
      'Cenários reais para praticar como você reagiria ao trabalhar com os missionários.',
    studyHint:
      'Pense sempre em princípios: amor, arbítrio, revelação pessoal e respeito aos papéis dos missionários e dos líderes.',
    reward: {
      xp: 150,
      badge: 'companheiro-de-confianca',
    },
    questions: [
      {
        id: 'scen-m1',
        prompt:
          'Os missionários pedem que você os acompanhe em uma lição com seu amigo que está passando por um divórcio doloroso. Qual a atitude mais adequada?',
        options: [
          'Falar a maior parte do tempo porque você conhece melhor a situação.',
          'Deixar que os missionários ensinem e acrescentar seu testemunho e apoio em momentos-chave.',
          'Compartilhar muitos detalhes privados do divórcio para que os missionários saibam de tudo.',
          'Recusar sempre esse tipo de lição porque o assunto é “sensível demais”.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Seu papel é apoiar e testificar, não substituir os missionários nem expor detalhes íntimos.',
      },
      {
        id: 'scen-m2',
        prompt:
          'Você sente que um pesquisador não está pronto para a data de batismo marcada pelos missionários. O que deve fazer?',
        options: [
          'Reclamar dos missionários para outros membros.',
          'Dizer diretamente ao pesquisador para cancelar a date.',
          'Compartilhar suas impressões em particular com os missionários e, se necessário, com o líder de missão da ala.',
          'Não dizer nada, porque os missionários sempre sabem mais que você.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Comunicação honesta, respeitosa e privada com missionários e líderes é o caminho correto.',
      },
    ],
  },
  {
    id: 'adivina-el-personaje-misional',
    title: 'Adivinhe o herói missionário',
    type: 'character-guess',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 7,
    description:
      'Adivinhe qual personagem das Escrituras está sendo descrito e conecte princípios missionários a exemplos reais.',
    studyHint:
      'Pense em como cada personagem viveu a doutrina de Cristo e abriu a boca para testificar.',
    reward: {
      xp: 80,
      badge: 'especialista-em-herois',
    },
    questions: [
      {
        id: 'char-1',
        prompt:
          'Fui um profeta que convidou seu povo a vir a Cristo com alegria. Preguei muito sobre arrependimento e vi muitos batismos nas águas de Mórmon. Quem sou eu?',
        options: ['Alma, o Filho', 'Néfi', 'Mosias', 'Enos'],
        correctOptionIndex: 0,
        explanation:
          'Alma, o Filho, pregou poderosamente o arrependimento e viu muitos convênios nas águas de Mórmon.',
      },
      {
        id: 'char-2',
        prompt:
          'Fui um missionário que ensinou um rei e seu povo. Muitos largaram suas armas e preferiram morrer a quebrar seus convênios. Quem sou eu?',
        options: ['Amom', 'Mórmon', 'Morôni', 'Helamã'],
        correctOptionIndex: 0,
        explanation:
          'Amom ensinou o rei Lamôni e muitos lamanitas que se tornaram o povo de Anti-Néfi-Léfi.',
      },
    ],
  },
  {
    id: 'practica-companero-misional',
    title: 'Prática: Ser o companheiro dos missionários',
    type: 'companion-practice',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 15,
    description:
      'Atividade guiada para apresentar amigos, compartilhar testemunho e convidar com amor.',
    studyHint:
      'Não tente soar perfeito. Foque em ser claro, simples e centrado em Cristo.',
    reward: {
      xp: 200,
      badge: 'companheiro-de-campo',
    },
    questions: [
      {
        id: 'comp-1',
        prompt:
          'Imagine como apresentaria um amigo aos missionários em menos de 30 segundos. Escolha a opção mais adequada.',
        options: [
          'Apenas dizer o nome e o telefone.',
          'Explicar brevemente quem ele é, sua situação espiritual e por que o evangelho pode ajudá-lo.',
          'Contar toda a história pessoal dele em detalhes.',
          'Dizer apenas: “É meu amigo, liguem para ele.”',
        ],
        correctOptionIndex: 1,
        explanation:
          'Uma boa apresentação fornece contexto suficiente para ensinar com sensibilidade sem invadir a privacidade.',
      },
      {
        id: 'comp-2',
        prompt:
          'Em uma lição, o pesquisador pergunta: “Vale mesmo a pena sacrificar tanto pela Igreja?”. Qual resposta seria mais útil?',
        options: [
          'Dar uma longa explicação sobre a história da Igreja.',
          'Dizer que não é tão difícil depois que acostuma.',
          'Compartilhar brevemente uma experiência pessoal em que um sacrifício trouxe paz e crescimento espiritual.',
          'Dizer para perguntar isso aos missionários depois.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Um testemunho pessoal e centrado em Cristo geralmente é mais poderoso que uma explicação puramente intelectual.',
      },
    ],
  },
  {
    id: 'desafios-de-servicio-misional',
    title: 'Desafios de serviço missionário',
    type: 'service-challenge',
    difficulty: 'medium',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 10,
    description:
      'Desafios simples e práticos para aplicar princípios missionários em casa e na ala.',
    studyHint:
      'Escolha um ou dois desafios que você realmente consiga cumprir nesta semana.',
    reward: {
      xp: 250,
      badge: 'maos-na-colheita',
    },
    questions: [
      {
        id: 'serv-1',
        prompt: 'Nesta semana, escolha PELO MENOS um dos seguintes desafios pessoais:',
        options: [
          'Sentar perto de um novo converso ou visitante e apresentá-lo a outra pessoa.',
          'Enviar uma mensagem de incentivo a um missionário de tempo integral ou retornado.',
          'Orar, mencionando pelo nome, ao menos duas pessoas com quem poderia compartilhar o evangelho.',
          'Convidar alguém para uma atividade simples da ala (não necessariamente para o domingo).',
        ],
        correctOptionIndex: 0,
        explanation:
          'Não há apenas uma resposta “certa”; o convite é escolher e cumprir pelo menos um desafio concreto nesta semana.',
      },
    ],
  },
  {
    id: 'reflexion-diario-misional-miembro',
    title: 'Reflexão: Meu diário missionário como membro',
    type: 'reflection-journal',
    difficulty: 'easy',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_working_with_missionaries',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 12,
    description:
      'Espaço guiado para registrar como o Senhor está usando você na colheita de Israel.',
    studyHint:
      'Seja honesto. O Senhor já sabe onde você está; este exercício é para que você enxerque isso com clareza.',
    reward: {
      xp: 120,
      badge: 'cronista-da-colheita',
    },
    questions: [
      {
        id: 'refl-1',
        prompt:
          'Escreva (fora do app) uma experiência recente em que sentiu um convite do Espírito para servir, convidar ou testificar, mesmo que tenha sido algo pequeno.',
        explanation:
          'Depois, marque esta atividade como concluída para lembrar que o Espírito já está operando em sua vida.',
      },
      {
        id: 'refl-2',
        prompt:
          'Liste três nomes: um familiar, um amigo e alguém da ala, bairro ou trabalho. Escreva o que poderia fazer por cada um nas próximas duas semanas.',
        explanation:
          'Esses nomes podem se tornar suas primeiras referências preparadas em oração.',
      },
    ],
  },
];

