import { MemberActivity } from './activitiesTypes';

export const memberActivitiesFr: MemberActivity[] = [
  {
    id: 'quiz-doctrina-de-cristo-basico',
    title: 'Quiz : La doctrine du Christ en action',
    type: 'scripture-quiz',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 8,
    description:
      'Un quiz rapide pour revoir les points essentiels de la doctrine du Christ et la vivre chaque jour.',
    studyHint:
      'En cas de doute, revenez au module « La doctrine du Christ dans la vie quotidienne » et relisez les résumés.',
    reward: {
      xp: 100,
      badge: 'doctrine-du-christ-niveau-1',
    },
    questions: [
      {
        id: 'dc-q1',
        prompt:
          'Laquelle de ces options décrit le mieux la foi en Jésus-Christ pour un membre de paroisse ?',
        options: [
          'Croire que Jésus existe et assister aux réunions du dimanche.',
          'Lui faire suffisamment confiance pour agir, changer et ouvrir la bouche pour témoigner.',
          'Ressentir de la paix en écoutant de la musique spirituelle.',
          'Connaître beaucoup d’Écritures par cœur.',
        ],
        correctOptionIndex: 1,
        explanation:
          'La vraie foi conduit toujours à l’action. Elle va au-delà de la croyance et implique d’obéir et d’inviter les autres.',
        scriptureReference: '2 Néphi 25:26',
      },
      {
        id: 'dc-q2',
        prompt: 'Lequel des exemples suivants illustre le mieux la « repentance continue » ?',
        options: [
          'Confesser un péché grave une seule fois dans la vie.',
          'Se sentir coupable à chaque erreur.',
          'Examiner souvent sa vie, ajuster sa conduite et chercher à changer avec l’aide du Seigneur.',
          'Éviter de penser à ses faiblesses pour ne pas se décourager.',
        ],
        correctOptionIndex: 2,
        explanation:
          'La repentance continue est un processus quotidien et joyeux d’ajustement vers le Christ, pas un événement isolé.',
        scriptureReference: 'Alma 36',
      },
      {
        id: 'dc-q3',
        prompt:
          'Dans un monde rempli de distractions, « persévérer jusqu’à la fin » signifie surtout :',
        options: [
          'Continuer à assister à l’Église même si tout semble routinier.',
          'Tenir bon comme on peut jusqu’au retour du Christ.',
          'Venir au Christ encore et encore, renouveler les alliances et aider les autres à faire de même.',
          'Éviter de parler de ses doutes ou difficultés spirituelles.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Persévérer est un processus actif : revenir au Christ, renouveler ses alliances et soutenir les autres sur le chemin.',
        scriptureReference: '2 Néphi 31:20',
      },
    ],
  },
  {
    id: 'escenarios-vida-real-misioneros',
    title: 'Que feriez-vous ? (avec les missionnaires)',
    type: 'scenario-quiz',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 12,
    description:
      'Des situations réelles pour pratiquer la manière de réagir en tant que membre travaillant avec les missionnaires.',
    studyHint:
      'Pensez toujours aux principes : amour, libre arbitre, révélation personnelle et respect des rôles.',
    reward: {
      xp: 150,
      badge: 'compagnon-de-confiance',
    },
    questions: [
      {
        id: 'scen-m1',
        prompt:
          'Les missionnaires vous demandent d’assister à une leçon avec votre ami qui vit un divorce douloureux. Quelle approche est la plus appropriée ?',
        options: [
          'Parler la plupart du temps car vous connaissez mieux la situation.',
          'Laisser les missionnaires enseigner et ajouter votre témoignage et votre soutien aux moments clés.',
          'Partager de nombreux détails privés du divorce pour que les missionnaires sachent tout.',
          'Refuser systématiquement ce type de leçon car le sujet est trop sensible.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Votre rôle est de soutenir et de témoigner, non de remplacer les missionnaires ni de dévoiler des détails intimes.',
      },
      {
        id: 'scen-m2',
        prompt:
          'Vous sentez qu’un investigateur n’est pas prêt pour la date de baptême fixée. Que devriez-vous faire ?',
        options: [
          'Vous plaindre des missionnaires auprès d’autres membres.',
          'Dire directement à l’investigateur d’annuler la date.',
          'Partager vos impressions en privé avec les missionnaires et, si nécessaire, avec le dirigeant de mission.',
          'Ne rien dire car les missionnaires savent mieux que vous.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Une communication honnête, respectueuse et privée avec les missionnaires et les dirigeants est la bonne approche.',
      },
    ],
  },
  {
    id: 'adivina-el-personaje-misional',
    title: 'Devinez le héros missionnaire',
    type: 'character-guess',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 7,
    description:
      'Devinez quel personnage des Écritures est décrit et reliez les principes missionnaires à des exemples concrets.',
    studyHint:
      'Réfléchissez à la manière dont chaque personnage a vécu la doctrine du Christ et témoigné.',
    reward: {
      xp: 80,
      badge: 'expert-des-heros',
    },
    questions: [
      {
        id: 'char-1',
        prompt:
          'J’étais un prophète qui a invité son peuple à venir au Christ avec joie. J’ai beaucoup prêché la repentance et vu de nombreux baptêmes aux eaux de Mormon. Qui suis-je ?',
        options: ['Alma le Jeune', 'Néphi', 'Mosiah', 'Énos'],
        correctOptionIndex: 0,
        explanation:
          'Alma le Jeune a fortement prêché la repentance et a vu de nombreuses alliances aux eaux de Mormon.',
      },
      {
        id: 'char-2',
        prompt:
          'J’étais un missionnaire qui a enseigné un roi et son peuple. Beaucoup ont déposé leurs armes et ont préféré mourir plutôt que de rompre leurs alliances. Qui suis-je ?',
        options: ['Ammôn', 'Mormon', 'Moroni', 'Hélaman'],
        correctOptionIndex: 0,
        explanation:
          'Ammôn a enseigné le roi Lamoni et beaucoup de Lamanites devenus le peuple d’Anti-Néphi-Léhi.',
      },
    ],
  },
  {
    id: 'practica-companero-misional',
    title: 'Pratique : Être le compagnon des missionnaires',
    type: 'companion-practice',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 15,
    description:
      'Exercice guidé pour apprendre à présenter des amis, partager votre témoignage et inviter avec amour.',
    studyHint:
      'Ne cherchez pas la perfection. Visez la clarté, la simplicité et un témoignage centré sur le Christ.',
    reward: {
      xp: 200,
      badge: 'compagnon-de-champ',
    },
    questions: [
      {
        id: 'comp-1',
        prompt:
          'Imaginez comment présenter un ami aux missionnaires en moins de 30 secondes. Choisissez l’option qui correspond le mieux.',
        options: [
          'Donner uniquement son nom et son numéro.',
          'Expliquer brièvement qui il est, sa situation spirituelle et pourquoi l’Évangile pourrait l’aider.',
          'Raconter toute son histoire personnelle en détail.',
          'Dire simplement : « C’est mon ami. Appelez-le. »',
        ],
        correctOptionIndex: 1,
        explanation:
          'Une bonne présentation donne assez de contexte pour enseigner avec sensibilité sans violer la vie privée.',
      },
      {
        id: 'comp-2',
        prompt:
          'Pendant une leçon, l’investigateur demande : « Cela vaut-il vraiment la peine de sacrifier autant pour l’Église ? ». Quelle réponse est la plus utile ?',
        options: [
          'Donner une longue explication historique.',
          'Dire que ce n’est pas si difficile une fois habitué.',
          'Partager une expérience personnelle où un sacrifice a apporté paix et croissance spirituelle.',
          'Dire d’en parler plus tard aux missionnaires.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Un témoignage personnel, bref et centré sur le Christ est souvent plus puissant qu’une explication purement intellectuelle.',
      },
    ],
  },
  {
    id: 'desafios-de-servicio-misional',
    title: 'Défis de service missionnaire',
    type: 'service-challenge',
    difficulty: 'medium',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 10,
    description:
      'Défis simples et concrets pour appliquer immédiatement des principes missionnaires chez vous et à la paroisse.',
    studyHint:
      'Choisissez un ou deux défis réalisables cette semaine. N’essayez pas de tout faire en même temps.',
    reward: {
      xp: 250,
      badge: 'mains-dans-la-moisson',
    },
    questions: [
      {
        id: 'serv-1',
        prompt:
          'Cette semaine, choisissez AU MOINS un de ces défis comme engagement personnel :',
        options: [
          'M’asseoir près d’un nouveau converti ou d’un visiteur et le présenter à au moins une autre personne.',
          'Envoyer un message d’encouragement à un missionnaire à plein temps ou rentré de mission.',
          'Prier par leur nom pour au moins deux personnes avec lesquelles je pourrais partager l’Évangile.',
          'Inviter quelqu’un à une activité simple de la paroisse (pas forcément au culte).',
        ],
        correctOptionIndex: 0,
        explanation:
          'Il n’y a pas de réponse unique ; l’invitation est de choisir et d’accomplir au moins un défi concret cette semaine.',
      },
    ],
  },
  {
    id: 'reflexion-diario-misional-miembro',
    title: 'Réflexion : Mon journal missionnaire de membre',
    type: 'reflection-journal',
    difficulty: 'easy',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_working_with_missionaries',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 12,
    description:
      'Un espace guidé pour écrire comment le Seigneur se sert de vous dans le rassemblement d’Israël.',
    studyHint:
      'Soyez honnête. Le Seigneur sait déjà où vous en êtes ; cet exercice vous aide à le voir plus clairement.',
    reward: {
      xp: 120,
      badge: 'chroniqueur-du-rassemblement',
    },
    questions: [
      {
        id: 'refl-1',
        prompt:
          'Écrivez (hors app, dans votre journal) une expérience récente où vous avez ressenti une inspiration pour servir, inviter ou témoigner, même si c’était petit.',
        explanation:
          'Puis marquez l’activité comme complétée pour vous rappeler que l’Esprit œuvre déjà dans votre vie.',
      },
      {
        id: 'refl-2',
        prompt:
          'Dressez une liste de trois noms : un membre de famille, un ami, et quelqu’un de votre paroisse, quartier ou travail. Notez ce que vous pourriez faire pour chacun dans les deux prochaines semaines.',
        explanation:
          'Ces noms peuvent devenir vos premières références préparées dans la prière.',
      },
    ],
  },
];

