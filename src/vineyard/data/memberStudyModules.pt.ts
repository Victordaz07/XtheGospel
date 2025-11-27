import { StudyModule } from './types';

// Helper function to convert blocks to markdown
const blocksToMarkdown = (blocks: any[]): string => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `### ${block.text}`;
        case 'paragraph':
          return block.text;
        case 'list':
          if (block.style === 'bullet') {
            return block.items.map((item: string) => `- ${item}`).join('\n');
          }
          return block.items.map((item: string, index: number) => `${index + 1}. ${item}`).join('\n');
        default:
          return '';
      }
    })
    .join('\n\n');
};

// Helper function to convert references
const convertReferences = (refs: any) => {
  const references: any[] = [];
  
  if (refs.scriptures) {
    refs.scriptures.forEach((scripture: string) => {
      references.push({
        type: 'scripture',
        source: scripture,
      });
    });
  }
  
  if (refs.manuals) {
    refs.manuals.forEach((manual: string) => {
      references.push({
        type: 'manual',
        source: manual,
      });
    });
  }
  
  if (refs.talks) {
    refs.talks.forEach((talk: string) => {
      references.push({
        type: 'talk',
        source: talk,
      });
    });
  }
  
  return references;
};

export const memberStudyModulesPt: StudyModule[] = [
  {
    id: 'member_doctrine_of_christ',
    title: 'A doutrina de Cristo no dia a dia',
    subtitle: 'Fé, arrependimento, convênios e perseverar — como membro, não só como amigo da Igreja.',
    description:
      'Ajudar os membros do ramo/ala a ver a doutrina de Cristo como um ciclo contínuo, e não como um evento isolado do batismo ou da missão. O objetivo é que o membro se sinta responsável por aplicar essa doutrina em sua própria vida e ajudar outros a fazê-lo, apoiando a obra missionária e preparando-se para a Segunda Vinda.',
    levelRecommended: 1,
    sections: [
      {
        id: 'faith_in_christ_action',
        title: 'Fé em Jesus Cristo que leva à ação',
        summary:
          'Ter fé em Jesus Cristo não é apenas aceitar que Ele é o Filho de Deus. É confiar em Seu caráter a ponto de estarmos dispostos a arriscar conforto, prestígio e tempo para segui-Lo.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. O que realmente significa ter fé em Cristo como membro?',
          },
          {
            type: 'paragraph',
            text: 'Ter fé em Jesus Cristo não é apenas aceitar que Ele é o Filho de Deus. É confiar em Seu caráter a ponto de estarmos dispostos a arriscar conforto, prestígio e tempo para segui-Lo.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Supõe que o Senhor já está preparando pessoas ao seu redor.',
              'Ora com expectativa de receber impressões sobre a quem servir, convidar ou consolar.',
              'Vê os mandamentos como oportunidades para demonstrar amor, não como uma lista fria de regras.',
              'Confia que o Salvador pode mudar corações, começando pelo seu.',
              'Continua agindo na obra missionária mesmo quando a ala parece fria ou desinteressada.',
            ],
          },
          {
            type: 'heading',
            text: '2. Fé que se traduz em passos concretos',
          },
          {
            type: 'paragraph',
            text: 'Uma fé que nunca muda nenhuma agenda é apenas uma ideia bonita. Fé em Cristo, para um membro, se manifesta de maneiras muito específicas.',
          },
          {
            type: 'heading',
            text: 'Em casa',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Reuniões familiares onde se fala naturalmente de missionários, conversos e amigos da Igreja.',
              'Orações onde pessoas são mencionadas pelo nome.',
              'Crianças e jovens vendo que compartilhar o evangelho é um tópico normal em casa.',
            ],
          },
          {
            type: 'heading',
            text: 'Na ala',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Disposição para receber atribuições missionárias sem se ofender ou dar desculpas.',
              'Chegar cedo à capela para procurar recém-chegados ou visitantes e sentar-se perto deles.',
              'Oferecer-se para acompanhar os missionários em lições importantes, mesmo quando isso significa reorganizar a agenda.',
            ],
          },
          {
            type: 'heading',
            text: 'Na vida cotidiana',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Manter uma lista mental ou escrita de pessoas pelas quais se está orando para compartilhar o evangelho.',
              'Estar ciente de que qualquer conversa normal pode se tornar espiritual se o Espírito indicar.',
              'Não esconder que é membro da Igreja no trabalho ou na escola.',
            ],
          },
          {
            type: 'heading',
            text: '3. Obstáculos comuns à fé missionária',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Medo da rejeição: "Se eu convidar, eles vão ficar chateados."',
              'Perfeccionismo: "Não sei o suficiente para explicar bem."',
              'Vergonha social: "Não quero que pensem que sou fanático."',
              'Experiências passadas difíceis: convites rejeitados, amigos que se afastaram.',
            ],
          },
          {
            type: 'paragraph',
            text: 'O evangelho ensina que a fé cresce ao agir, não ao esperar até nos sentirmos prontos. Membros que escolhem agir apesar do medo estão verdadeiramente vivendo a doutrina de Cristo.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Néfi 25:26', 'Éter 12:6', 'Tiago 2:17–18'],
          manuals: ['Pregar Meu Evangelho, cap. 3 — "A doutrina de Cristo"', 'Vem, e Segue-Me — lições sobre fé em Cristo'],
          talks: ['Discursos do Élder Dieter F. Uchtdorf sobre fé e confiança no Senhor'],
        }),
      },
      {
        id: 'continuous_repentance',
        title: 'Arrependimento contínuo: como isso se manifesta em um membro',
        summary:
          'O arrependimento não é apenas para grandes pecados; é o processo diário de ajustar o coração em direção a Cristo e permitir que Ele nos mude.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. O arrependimento não é castigo, é privilégio',
          },
          {
            type: 'paragraph',
            text: 'Para muitos membros, "arrependimento" soa como algo dramático associado a pecados graves. Mas o verdadeiro discipulado é medido pela capacidade de ajustar o rumo todos os dias.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Reconhecer com humildade que ainda podemos nos parecer mais com Cristo.',
              'Aceitar correção sem desculpas nem culpar os outros.',
              'Alegrar-se de que o Senhor nos mostre os pontos cegos.',
            ],
          },
          {
            type: 'heading',
            text: '2. Padrão de arrependimento diário para um membro missionário',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Revisar o dia com o Senhor: o que agradou e quais oportunidades foram perdidas.',
              'Reconhecer com precisão, sem generalizações nem autodesprezo.',
              'Expressar dor sincera mas cheia de esperança na Expiação.',
              'Definir um plano de mudança específico para o dia seguinte.',
              'Levantar-se novamente sem ficar preso na culpa.',
            ],
          },
          {
            type: 'heading',
            text: '3. Arrependimento e o sacramento',
          },
          {
            type: 'paragraph',
            text: 'O sacramento é o laboratório semanal do arrependimento contínuo. Um membro que vive a doutrina de Cristo chega com reverência, escuta as orações com intenção e sai com uma decisão concreta para aquela semana.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Helamã 5:10–11', 'Mosias 4:2–3', 'Doutrina e Convênios 58:42–43'],
          manuals: ['Pregar Meu Evangelho, cap. 3 — fé e arrependimento'],
          talks: [],
        }),
      },
      {
        id: 'endure_to_the_end',
        title: 'Perseverar até o fim em um mundo distraído',
        summary:
          'Perseverar não é aguentar entediado, mas continuar avançando com propósito, carregando os fardos uns dos outros e cumprindo convênios.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. O desafio: permanecer fiel quando tudo compete por nossa atenção',
          },
          {
            type: 'paragraph',
            text: 'Hoje basta se distrair para se afastar do Evangelho: muitas horas em redes sociais, pouco tempo nas Escrituras; entusiasmo pelo temporal, pouca energia para servir.',
          },
          {
            type: 'heading',
            text: '2. Âncoras espirituais para permanecer firmes',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Oração sincera de manhã e à noite, mesmo que seja breve.',
              'Pelo menos um versículo significativo por dia com intenção de aplicá-lo.',
              'Um ato deliberado de bondade todos os dias.',
              'Renovar os convênios no sacramento com uma frase-chave para a semana.',
              'Registrar de forma simples o progresso no serviço missionário.',
              'Cercar-se de amigos que empurrem em direção ao templo e não à tibieza.',
            ],
          },
          {
            type: 'heading',
            text: '3. Perseverar na obra missionária',
          },
          {
            type: 'paragraph',
            text: 'Perseverar até o fim inclui perseverar na obra do Senhor. Não há aposentadoria espiritual: continuamos aprendendo, testificando e apoiando conversos e missionários.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Néfi 31:20', '3 Néfi 27:16–22', 'Doutrina e Convênios 14:7'],
          manuals: [],
          talks: [],
        }),
      },
    ],
  },
  {
    id: 'member_new_converts_temple',
    title: 'Cuidar dos novos conversos e prepará-los para o templo',
    subtitle: 'Acompanhar além do batismo.',
    description:
      'Um novo converso é uma alma que fez um convênio, mas ainda está aprendendo a caminhar espiritualmente. Os primeiros meses são decisivos: as raízes da fé são tenras e precisam de luz, alimento e um ambiente seguro.',
    levelRecommended: 2,
    sections: [
      {
        id: 'convert_care_principles',
        title: 'Princípios para cuidar dos novos conversos',
        summary:
          'O batismo não é o fim; é o começo. Um novo converso é uma alma que fez um convênio, mas ainda está aprendendo a caminhar espiritualmente.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. O batismo não é o fim; é o começo',
          },
          {
            type: 'paragraph',
            text: 'Um novo converso é uma alma que fez um convênio, mas ainda está aprendendo a caminhar espiritualmente. Os primeiros meses são decisivos: as raízes da fé são tenras e precisam de luz, alimento e um ambiente seguro.',
          },
          {
            type: 'heading',
            text: 'Princípios eternos para cuidar deles',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Amor constante e genuíno: mais amigos reais que visitas formais.',
              'Normalizar as perguntas: as dúvidas não destroem a fé; o silêncio sim.',
              'Envolvê-los em serviço simples para que se sintam parte da família.',
              'Ajudá-los a formar um círculo de amizades dentro da Igreja.',
            ],
          },
          {
            type: 'heading',
            text: 'Como se parece um bom acompanhamento?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Você os contata durante a semana, não apenas no domingo.',
              'Você pergunta como está a leitura do Livro de Mórmon deles.',
              'Você ora por eles pelo nome.',
              'Você se senta com eles na capela.',
              'Você os apresenta a outros membros da ala.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Morôni 6:4'],
          manuals: ['Pregar Meu Evangelho, cap. 13 — Ajudar os novos conversos a permanecerem firmes'],
          talks: ['Élder Jeffrey R. Holland — "O primeiro grande mandamento"'],
        }),
      },
      {
        id: 'auxiliary_roles_callings',
        title: 'Papel das organizações auxiliares e exemplos de chamados',
        summary:
          'A Igreja tem um design inspirado para sustentar conversos. Cada membro é edificado pela fé e deve ser totalmente integrado ao corpo da Igreja.',
        estimatedMinutes: 16,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. A Igreja é projetada para sustentar conversos',
          },
          {
            type: 'paragraph',
            text: 'O Senhor organiza Sua Igreja para que cada membro seja edificado pela fé. Um converso não deve depender apenas dos missionários ou de um líder; deve ser totalmente integrado ao corpo da Igreja.',
          },
          {
            type: 'heading',
            text: 'Papéis-chave nos primeiros três meses',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Sociedade de Socorro: apoio espiritual e emocional, amizade, ensino personalizado sobre o convênio batismal.',
              'Quórum de élderes: convidar a servir, ensinar responsabilidades do sacerdócio quando apropriado, acompanhar em objetivos espirituais.',
              'Organizações de crianças e jovens: integração social, atividades, amizades saudáveis e tutoria espiritual para crianças ou jovens conversos.',
            ],
          },
          {
            type: 'heading',
            text: 'Chamados simples ideais para novos conversos',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Recepcionista na porta.',
              'Ajudante em atividades.',
              'Distribuir programas.',
              'Ajudar na preparação do sacramento (se tiver o sacerdócio apropriado).',
              'Oferecer orações nas reuniões.',
              'Ajudar na limpeza do edifício ou na tecnologia.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Regra de ouro: um novo converso deve receber um chamado apropriado nas primeiras quatro semanas.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Efésios 4:12'],
          manuals: ['Manual Geral — princípios sobre cuidado dos membros e chamados'],
          talks: ['Élder Dieter F. Uchtdorf — "O caminho do discípulo"'],
        }),
      },
      {
        id: 'priesthood_and_temple',
        title: 'Primeiros passos com o Sacerdócio e o templo',
        summary:
          'Um homem recém-batizado começa uma jornada em direção a receber o Sacerdócio Aarônico e, mais tarde, o de Melquisedeque. Ele precisa avançar com clareza, paz e apoio.',
        estimatedMinutes: 18,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. O sacerdócio: proteger, abençoar e servir',
          },
          {
            type: 'paragraph',
            text: 'Um homem recém-batizado começa uma jornada em direção a receber o Sacerdócio Aarônico e, mais tarde, o de Melquisedeque. Ele precisa avançar com clareza, paz e apoio.',
          },
          {
            type: 'heading',
            text: 'O que é o sacerdócio — e o que não é',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'É a autoridade de Deus para abençoar, ensinar, batizar, consolar e presidir sob revelação.',
              'Não é hierarquia, controle, privilégio humano ou poder pessoal.',
            ],
          },
          {
            type: 'heading',
            text: 'Conversas importantes antes da ordenação ao sacerdócio',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Lei de castidade.',
              'Palavra de Sabedoria.',
              'Dízimo.',
              'Recomendação para o templo.',
              'Serviço cristão e oração pessoal.',
            ],
          },
          {
            type: 'heading',
            text: '2. Preparação para a primeira vez no templo',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'O templo é casa de fé, lugar de convênios eternos e escola celestial.',
              'Eles devem saber o que esperar emocionalmente: paz, luz, amor.',
              'Eles devem entender como se vestir: roupas modestas, claras, simples.',
              'Eles não devem ir sozinhos; que seja um dia especial com amigos da ala.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Salmos 24:3–4'],
          manuals: ['Manual Geral — capítulos sobre preparação para o templo'],
          talks: ['Presidente Russell M. Nelson — "O templo e sua relação com Deus"'],
        }),
      },
    ],
  },
  {
    id: 'member_working_with_missionaries',
    title: 'Trabalhar lado a lado com os missionários',
    subtitle: 'De membro espectador a companheiro de confiança.',
    description:
      'Os missionários não foram chamados para fazer a obra sozinhos. O Senhor sempre trabalhou com companheiros: Moisés–Arão, Alma–Amuleque, Néfi–Lamã. Na obra missionária moderna, o membro é o terceiro companheiro.',
    levelRecommended: 2,
    sections: [
      {
        id: 'principles_with_missionaries',
        title: 'Princípios para trabalhar com os missionários',
        summary:
          'Os missionários a tempo integral têm autoridade para ensinar e reunir Israel. Os membros têm acesso diário a seus vizinhos, colegas de trabalho, familiares e amigos.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introdução',
          },
          {
            type: 'paragraph',
            text: 'Os missionários não foram chamados para fazer a obra sozinhos. O Senhor sempre trabalhou com companheiros: Moisés–Arão, Alma–Amuleque, Néfi–Lamã. Na obra missionária moderna, o membro é o terceiro companheiro.',
          },
          {
            type: 'heading',
            text: 'O que significa ser companheiro deles?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Vive atento a impressões: reconhece pensamentos como "Ligue para eles", "Convide-os", "Ouça-os".',
              'Ama sem agenda: acompanha com respeito e autenticidade, compartilha a verdade como amigo.',
              'Vê os missionários como companheiros, não como "funcionários" da Igreja.',
              'Está disposto a sujar as mãos: vai a lições, prepara o ambiente espiritual e se preocupa com a pessoa além do compromisso.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Doutrina e Convênios 11:21'],
          manuals: ['Pregar Meu Evangelho, cap. 9 — Encontrar pessoas para ensinar'],
          talks: ['Élder David A. Bednar — "Vinde e vede"'],
        }),
      },
      {
        id: 'inspired_referrals',
        title: 'Como preparar e oferecer referências de maneira inspirada',
        summary:
          'A referência não é um nome; é uma pessoa amada por Deus. O Salvador frequentemente trabalhou por meio de recomendações pessoais, e esse padrão continua hoje.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introdução',
          },
          {
            type: 'paragraph',
            text: 'A referência não é um nome; é uma pessoa amada por Deus. O Salvador frequentemente trabalhou por meio de recomendações pessoais, e esse padrão continua hoje.',
          },
          {
            type: 'heading',
            text: 'Princípios para oferecer referências inspiradas',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Não oferecer nomes aleatórios que os missionários não possam contatar com preparação prévia.',
              'Falar com a pessoa antes de dar seu nome: explicar quem são os missionários e o que farão.',
              'Preparar o terreno compartilhando hinos, versículos ou seu testemunho antes da visita.',
              'Acompanhar os missionários à lição sempre que possível.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Alma 17:2–3'],
          manuals: ['Pregar Meu Evangelho, cap. 3 — Ensinar pelo Espírito'],
          talks: ['Presidente Russell M. Nelson — ensinamentos sobre o recolhimento de Israel'],
        }),
      },
      {
        id: 'after_each_lesson',
        title: 'Acompanhar após cada lição',
        summary:
          'O batismo é um começo, não uma linha de chegada. Um novo converso permanece forte quando alguém caminha com ele. Os missionários ensinam; os membros fornecem a comunidade da Igreja.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introdução',
          },
          {
            type: 'paragraph',
            text: 'O batismo é um começo, não uma linha de chegada. Um novo converso permanece forte quando alguém caminha com ele. Os missionários ensinam; os membros fornecem a comunidade da Igreja.',
          },
          {
            type: 'heading',
            text: 'Princípios para acompanhar após cada lição',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Reensinar em suas próprias palavras o que foi discutido e perguntar como eles viveram isso.',
              'Convidar à participação: ler Escrituras juntos, participar de atividades, apresentar novos amigos da ala.',
              'Ser a primeira linha de apoio: lembrar compromissos, esclarecer doutrina simples, confirmar testemunhos.',
              'Ajudar sua transição para o templo: explicar entrevistas, convênios e a paz do templo.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Mosias 18:21'],
          manuals: ['Pregar Meu Evangelho, cap. 13 — Retenção de novos conversos'],
          talks: ['Élder Dieter F. Uchtdorf — "Um por um"'],
        }),
      },
    ],
  },
];
