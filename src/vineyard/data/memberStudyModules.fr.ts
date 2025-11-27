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

export const memberStudyModulesFr: StudyModule[] = [
  {
    id: 'member_doctrine_of_christ',
    title: 'La doctrine du Christ dans la vie quotidienne',
    subtitle: 'Foi, repentir, alliances et persévérance — en tant que membre, pas seulement en tant qu\'ami de l\'Église.',
    description:
      'Aider les membres de paroisse à voir la doctrine du Christ comme un cycle continu et non comme un événement unique lié au baptême ou à la mission. Le but est que le membre se sente responsable d\'appliquer cette doctrine dans sa propre vie et d\'aider les autres à en faire autant, en soutenant l\'œuvre missionnaire et en se préparant à la Seconde Venue.',
    levelRecommended: 1,
    sections: [
      {
        id: 'faith_in_christ_action',
        title: 'Foi en Jésus-Christ qui pousse à l\'action',
        summary:
          'La foi en Jésus-Christ n\'est pas seulement admettre qu\'Il est le Fils de Dieu. C\'est avoir une telle confiance en son caractère que nous sommes prêts à risquer notre confort, notre prestige et notre temps pour Le suivre.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. Que signifie vraiment avoir foi au Christ en tant que membre ?',
          },
          {
            type: 'paragraph',
            text: 'La foi en Jésus-Christ n\'est pas seulement admettre qu\'Il est le Fils de Dieu. C\'est avoir une telle confiance en son caractère que nous sommes prêts à risquer notre confort, notre prestige et notre temps pour Le suivre.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Suppose que le Seigneur prépare déjà des personnes autour de nous.',
              'Prie avec l\'attente de recevoir des inspirations pour savoir qui servir, inviter ou consoler.',
              'Voit les commandements comme des occasions de manifester l\'amour, et non comme une liste froide de règles.',
              'A confiance que le Sauveur peut changer les cœurs, en commençant par le sien.',
              'Continue d\'agir dans l\'œuvre missionnaire même lorsque la paroisse semble froide ou peu intéressée.',
            ],
          },
          {
            type: 'heading',
            text: '2. Foi qui se traduit en pas concrets',
          },
          {
            type: 'paragraph',
            text: 'Une foi qui ne change aucune agenda n\'est qu\'une belle idée. La foi au Christ, pour un membre, se manifeste de manière très spécifique.',
          },
          {
            type: 'heading',
            text: 'À la maison',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Réunions familiales où l\'on parle naturellement des missionnaires, des convertis et des amis de l\'Église.',
              'Prières où l\'on mentionne des personnes par leur nom.',
              'Enfants et jeunes qui voient que partager l\'Évangile est un sujet normal à la maison.',
            ],
          },
          {
            type: 'heading',
            text: 'Dans la paroisse',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Accepter les responsabilités missionnaires sans s\'offenser ni se chercher d\'excuses.',
              'Arriver tôt à la chapelle pour chercher les nouveaux ou les visiteurs et s\'asseoir près d\'eux.',
              'Se porter volontaire pour accompagner les missionnaires dans des leçons clés, même si cela implique de réorganiser son emploi du temps.',
            ],
          },
          {
            type: 'heading',
            text: 'Dans la vie quotidienne',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Avoir une liste mentale ou écrite de personnes pour lesquelles on prie afin de partager l\'Évangile.',
              'Être conscient qu\'une conversation normale peut devenir spirituelle si l\'Esprit l\'indique.',
              'Ne pas cacher que l\'on est membre de l\'Église au travail ou à l\'école.',
            ],
          },
          {
            type: 'heading',
            text: '3. Obstacles courants à la foi missionnaire',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Peur du rejet : "Si j\'invite, ils vont se fâcher."',
              'Perfectionnisme : "Je ne sais pas assez pour bien expliquer."',
              'Honte sociale : "Je ne veux pas qu\'ils pensent que je suis fanatique."',
              'Expériences passées difficiles : invitations rejetées, amis qui se sont éloignés.',
            ],
          },
          {
            type: 'paragraph',
            text: 'L\'Évangile enseigne que la foi se fortifie en agissant, pas en attendant de se sentir prêt. Le membre qui décide d\'agir malgré la peur vit vraiment la doctrine du Christ.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Néphi 25:26', 'Éther 12:6', 'Jacques 2:17–18'],
          manuals: ['Prêchez mon Évangile, chap. 3 — « La doctrine du Christ »', 'Viens et suis-moi — leçons sur la foi au Christ'],
          talks: ['Messages de l Elder Dieter F. Uchtdorf sur la foi et la confiance au Seigneur'],
        }),
      },
      {
        id: 'continuous_repentance',
        title: 'Repentir continuel : à quoi cela ressemble chez un membre',
        summary:
          'Pour beaucoup de membres, le mot « repentir » semble dramatique et réservé aux péchés graves. Pourtant, le véritable discipulat se mesure à la fréquence à laquelle nous ajustons notre trajectoire, et non au nombre de fois où nous tombons.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. Le repentir n\'est pas une punition, c\'est un privilège',
          },
          {
            type: 'paragraph',
            text: 'Pour beaucoup de membres, le mot « repentir » semble dramatique et réservé aux péchés graves. Pourtant, le véritable discipulat se mesure à la fréquence à laquelle nous ajustons notre trajectoire, et non au nombre de fois où nous tombons.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Reconnaître avec humilité que nous pouvons encore ressembler davantage au Christ.',
              'Accepter la correction sans excuses ni blâmer les autres.',
              'Se réjouir que le Seigneur nous montre nos angles morts.',
            ],
          },
          {
            type: 'heading',
            text: '2. Modèle de repentir quotidien pour un membre missionnaire',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Revoir la journée avec le Seigneur : ce qui Lui a plu et les opportunités manquées.',
              'Reconnaître avec précision, sans généralisations ni autodénigrement.',
              'Exprimer une douleur sincère mais pleine d\'espérance en l\'Expiation.',
              'Définir un plan de changement spécifique pour le lendemain.',
              'Se relever sans rester piégé dans la culpabilité.',
            ],
          },
          {
            type: 'heading',
            text: '3. Repentir et la Sainte-Cène',
          },
          {
            type: 'paragraph',
            text: 'La Sainte-Cène est le laboratoire hebdomadaire du repentir continu. Un membre qui vit la doctrine du Christ arrive avec révérence, écoute les prières avec intention et sort avec une décision concrète pour cette semaine.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Hélaman 5:10–11', 'Mosiah 4:2–3', 'Doctrine et Alliances 58:42–43'],
          manuals: ['Prêchez mon Évangile, chap. 3 — foi et repentir'],
          talks: [],
        }),
      },
      {
        id: 'endure_to_the_end',
        title: 'Persévérer jusqu\'à la fin dans un monde distrait',
        summary:
          'Persévérer n\'est pas tenir bon en s\'ennuyant, mais continuer d\'avancer avec un but, porter les fardeaux les uns des autres et respecter les alliances.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. Le défi : rester fidèle lorsque tout réclame notre attention',
          },
          {
            type: 'paragraph',
            text: 'Aujourd\'hui, il n\'est pas nécessaire de renier ouvertement la foi pour s\'éloigner de l\'Évangile. Il suffit d\'être assez distrait : beaucoup de temps sur les réseaux sociaux, peu de temps dans les Écritures ; beaucoup d\'énergie pour les nouvelles et le divertissement, peu pour le service.',
          },
          {
            type: 'heading',
            text: '2. Ancres spirituelles pour rester fermes',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Prière sincère matin et soir, même si elle est brève.',
              'Au moins un verset significatif par jour avec l\'intention de l\'appliquer.',
              'Un acte délibéré de bonté chaque jour.',
              'Renouveler les alliances dans la Sainte-Cène avec une phrase clé pour la semaine.',
              'Tenir un registre simple du progrès dans le service missionnaire.',
              'S\'entourer d\'amis qui poussent vers le temple et non vers la tiédeur.',
            ],
          },
          {
            type: 'heading',
            text: '3. Persévérer dans l\'œuvre missionnaire',
          },
          {
            type: 'paragraph',
            text: 'Persévérer jusqu\'à la fin inclut persévérer dans l\'œuvre du Seigneur. Il n\'y a pas de retraite spirituelle : on continue d\'apprendre, de témoigner et de soutenir les convertis et les missionnaires.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Néphi 31:20', '3 Néphi 27:16–22', 'Doctrine et Alliances 14:7'],
          manuals: [],
          talks: [],
        }),
      },
    ],
  },
  {
    id: 'member_new_converts_temple',
    title: 'Prendre soin des nouveaux convertis et les préparer au temple',
    subtitle: 'Les accompagner au-delà du baptême.',
    description:
      'Un nouveau converti est une âme qui a fait une alliance mais qui apprend encore à marcher spirituellement. Les premiers mois sont décisifs : ses racines de foi sont fragiles et ont besoin de lumière, de nourriture et d\'un environnement sûr.',
    levelRecommended: 2,
    sections: [
      {
        id: 'convert_care_principles',
        title: 'Principes pour prendre soin des nouveaux convertis',
        summary:
          'Le baptême n\'est pas la fin, c\'est le début. Un nouveau converti est une âme qui a fait une alliance mais qui apprend encore à marcher spirituellement.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. Le baptême n\'est pas la fin, c\'est le début',
          },
          {
            type: 'paragraph',
            text: 'Un nouveau converti est une âme qui a fait une alliance mais qui apprend encore à marcher spirituellement. Les premiers mois sont décisifs : ses racines de foi sont fragiles et ont besoin de lumière, de nourriture et d\'un environnement sûr.',
          },
          {
            type: 'heading',
            text: 'Principes éternels pour prendre soin d\'eux',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Amour constant et authentique : plus d\'amis réels que de visites formelles.',
              'Normaliser les questions : les doutes ne détruisent pas la foi ; le silence le fait.',
              'Les impliquer dans un service simple pour qu\'ils se sentent partie de la famille.',
              'Les aider à former un cercle d\'amitiés au sein de l\'Église.',
            ],
          },
          {
            type: 'heading',
            text: 'À quoi ressemble un bon suivi ?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Vous les contactez pendant la semaine, pas seulement le dimanche.',
              'Vous leur demandez comment va leur lecture du Livre de Mormon.',
              'Vous priez pour eux par leur nom.',
              'Vous vous asseyez avec eux dans la chapelle.',
              'Vous les présentez à d\'autres membres de la paroisse.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Moroni 6:4'],
          manuals: ['Prêchez mon Évangile, chap. 13 — Aider les nouveaux convertis à rester actifs'],
          talks: ['Elder Jeffrey R. Holland — « Le premier grand commandement »'],
        }),
      },
      {
        id: 'auxiliary_roles_callings',
        title: 'Rôle des organisations auxiliaires et exemples d\'appels',
        summary:
          'L\'Église a un dessein inspiré pour soutenir les convertis. Chaque membre est édifié par la foi et doit être pleinement intégré dans le corps de l\'Église.',
        estimatedMinutes: 16,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. L\'Église est conçue pour soutenir les convertis',
          },
          {
            type: 'paragraph',
            text: 'Le Seigneur organise Son Église pour que chaque membre soit édifié par la foi. Un converti ne doit pas dépendre uniquement des missionnaires ou d\'un dirigeant ; il doit être pleinement intégré dans le corps de l\'Église.',
          },
          {
            type: 'heading',
            text: 'Rôles clés dans les trois premiers mois',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Société de Secours : accompagnement spirituel, amitié et enseignement personnalisé de l\'alliance baptismale.',
              'Collège des anciens : l\'inviter à servir, lui enseigner les responsabilités de la prêtrise le cas échéant, l\'accompagner dans ses objectifs spirituels.',
              'Organisations pour enfants et jeunes : intégration sociale, activités, amitiés saines et tutorat spirituel pour les enfants ou jeunes convertis.',
            ],
          },
          {
            type: 'heading',
            text: 'Appels simples idéaux pour les nouveaux convertis',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Accueil à la porte.',
              'Aide dans les activités.',
              'Distribution de programmes.',
              'Aide à la préparation de la Sainte-Cène (s\'il détient la prêtrise appropriée).',
              'Offrir des prières dans les réunions.',
              'Aide au nettoyage du bâtiment ou à la technologie.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Règle d\'or : un nouveau converti doit recevoir un appel approprié dans les quatre premières semaines.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Éphésiens 4:12'],
          manuals: ['Manuel général — principes sur le soin des membres et les appels'],
          talks: ['Elder Dieter F. Uchtdorf — « Le chemin du disciple »'],
        }),
      },
      {
        id: 'priesthood_and_temple',
        title: 'Premiers pas avec la Prêtrise et le temple',
        summary:
          'Un homme nouvellement baptisé commence un chemin vers la réception de la Prêtrise d\'Aaron et, plus tard, celle de Melchisédek. Il doit avancer avec clarté, paix et accompagnement.',
        estimatedMinutes: 18,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. La prêtrise : protéger, bénir et servir',
          },
          {
            type: 'paragraph',
            text: 'Un homme nouvellement baptisé commence un chemin vers la réception de la Prêtrise d\'Aaron et, plus tard, celle de Melchisédek. Il doit avancer avec clarté, paix et accompagnement.',
          },
          {
            type: 'heading',
            text: 'Qu\'est-ce que la prêtrise — et ce qu\'elle n\'est pas',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'C\'est l\'autorité de Dieu pour bénir, enseigner, baptiser, consoler et présider sous révélation.',
              'Ce n\'est pas un rang, un contrôle, un privilège humain ou un pouvoir personnel.',
            ],
          },
          {
            type: 'heading',
            text: 'Conversations importantes avant l\'ordination à la prêtrise',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Loi de chasteté.',
              'Parole de Sagesse.',
              'Dîme.',
              'Recommandation pour le temple.',
              'Service chrétien et prière personnelle.',
            ],
          },
          {
            type: 'heading',
            text: '2. Préparation pour la première fois au temple',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Le temple est une maison de foi, un lieu d\'alliances éternelles et une école céleste.',
              'Ils doivent savoir quoi attendre émotionnellement : paix, lumière, amour.',
              'Ils doivent comprendre comment s\'habiller : vêtements modestes, clairs, simples.',
              'Ils ne doivent pas y aller seuls, et vivre cette visite comme un jour spécial.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Psaumes 24:3–4'],
          manuals: ['Manuel général — chapitres sur la préparation au temple'],
          talks: ['Président Russell M. Nelson — « Le temple et votre relation avec Dieu »'],
        }),
      },
    ],
  },
  {
    id: 'member_working_with_missionaries',
    title: 'Travailler main dans la main avec les missionnaires',
    subtitle: 'D\'un membre spectateur à un compagnon de confiance.',
    description:
      'Les missionnaires ne sont pas appelés à faire l\'œuvre seuls. Le Seigneur a toujours travaillé avec des compagnons : Moïse–Aaron, Alma–Amulek, Néphi–Léhi. Dans l\'œuvre missionnaire moderne, le membre est le troisième compagnon.',
    levelRecommended: 2,
    sections: [
      {
        id: 'principles_with_missionaries',
        title: 'Principes pour travailler avec les missionnaires',
        summary:
          'Les missionnaires à temps plein ont l\'autorité d\'enseigner et de rassembler Israël. Les membres ont un accès quotidien à leurs voisins, collègues, membres de la famille et amis.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introduction',
          },
          {
            type: 'paragraph',
            text: 'Les missionnaires ne sont pas appelés à faire l\'œuvre seuls. Le Seigneur a toujours travaillé avec des compagnons : Moïse–Aaron, Alma–Amulek, Néphi–Léhi. Dans l\'œuvre missionnaire moderne, le membre est le troisième compagnon.',
          },
          {
            type: 'heading',
            text: 'Que signifie être leur compagnon ?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Vit attentif aux impressions : reconnaît des pensées comme "Appelle-les", "Invite-les", "Écoute-les".',
              'Aime sans agenda : accompagne avec respect et authenticité, partage la vérité comme un ami.',
              'Voit les missionnaires comme des compagnons, pas comme des "employés" de l\'Église.',
              'Est prêt à se salir les mains : assiste aux leçons, prépare l\'atmosphère spirituelle et se soucie de la personne au-delà du rendez-vous.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Doctrine et Alliances 11:21'],
          manuals: ['Prêchez mon Évangile, chap. 9 — Trouver des personnes à enseigner'],
          talks: ['Elder David A. Bednar — « Venez et voyez »'],
        }),
      },
      {
        id: 'inspired_referrals',
        title: 'Comment préparer et offrir des références de manière inspirée',
        summary:
          'La référence n\'est pas un nom ; c\'est une personne aimée de Dieu. Le Sauveur a souvent travaillé par des recommandations personnelles, et ce modèle continue aujourd\'hui.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introduction',
          },
          {
            type: 'paragraph',
            text: 'La référence n\'est pas un nom ; c\'est une personne aimée de Dieu. Le Sauveur a souvent travaillé par des recommandations personnelles, et ce modèle continue aujourd\'hui.',
          },
          {
            type: 'heading',
            text: 'Principes pour offrir des références inspirées',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Ne pas offrir des noms au hasard que les missionnaires ne peuvent pas contacter avec une préparation préalable.',
              'Parler avec la personne avant de donner son nom : expliquer qui sont les missionnaires et ce qu\'ils feront.',
              'Préparer le terrain en partageant des cantiques, des versets ou votre témoignage avant la visite.',
              'Accompagner les missionnaires à la leçon chaque fois que c\'est possible.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Alma 17:2–3'],
          manuals: ['Prêchez mon Évangile, chap. 3 — Enseigner par l\'Esprit'],
          talks: ['Président Russell M. Nelson — enseignements sur le rassemblement d\'Israël'],
        }),
      },
      {
        id: 'after_each_lesson',
        title: 'Accompagner après chaque leçon',
        summary:
          'Le baptême est un commencement, pas une ligne d\'arrivée. Un nouveau converti reste fort quand quelqu\'un marche avec lui. Les missionnaires enseignent ; les membres fournissent la communauté de l\'Église.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introduction',
          },
          {
            type: 'paragraph',
            text: 'Le baptême est un commencement, pas une ligne d\'arrivée. Un nouveau converti reste fort quand quelqu\'un marche avec lui. Les missionnaires enseignent ; les membres fournissent la communauté de l\'Église.',
          },
          {
            type: 'heading',
            text: 'Principes pour accompagner après chaque leçon',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Réenseigner dans vos propres mots ce qui a été discuté et demander comment ils l\'ont vécu.',
              'Inviter à la participation : Écritures ensemble, activités, nouvelles amitiés dans la paroisse.',
              'Être la première ligne de soutien : rappeler les engagements, clarifier les doutes simples, renforcer les témoignages.',
              'Aider leur transition vers le temple : expliquer les entrevues, les alliances et la paix du temple.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Mosiah 18:21'],
          manuals: ['Prêchez mon Évangile, chap. 13 — Rétention des nouveaux convertis'],
          talks: ['Elder Dieter F. Uchtdorf — « Une personne à la fois »'],
        }),
      },
    ],
  },
];
