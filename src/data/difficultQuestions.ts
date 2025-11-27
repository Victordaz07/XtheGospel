import { LocalizedText } from './lessonsData';

export interface DifficultQuestion {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export const DIFFICULT_QUESTIONS: DifficultQuestion[] = [
  {
    id: 'q1',
    question: {
      en: 'Why does God allow suffering?',
      es: '¿Por qué Dios permite el sufrimiento?',
      fr: 'Pourquoi Dieu permet-il la souffrance?',
      pt: 'Por que Deus permite o sofrimento?',
    },
    answer: {
      en: 'God allows suffering as part of our mortal experience to help us grow, learn, and develop Christlike attributes. Through trials, we can come closer to Christ and understand His Atonement better. God does not cause suffering, but He can help us find meaning and strength through it.',
      es: 'Dios permite el sufrimiento como parte de nuestra experiencia mortal para ayudarnos a crecer, aprender y desarrollar atributos semejantes a Cristo. A través de las pruebas, podemos acercarnos más a Cristo y comprender mejor Su Expiação. Dios no causa el sufrimiento, pero puede ayudarnos a encontrar significado y fortaleza a través de él.',
      fr: 'Dieu permet la souffrance dans le cadre de notre expérience mortelle pour nous aider à grandir, à apprendre et à développer des attributs semblables au Christ. À travers les épreuves, nous pouvons nous rapprocher du Christ et mieux comprendre Son Expiation. Dieu ne cause pas la souffrance, mais Il peut nous aider à trouver un sens et de la force à travers elle.',
      pt: 'Deus permite o sofrimento como parte de nossa experiência mortal para nos ajudar a crescer, aprender e desenvolver atributos semelhantes a Cristo. Através das provações, podemos nos aproximar de Cristo e compreender melhor Sua Expiação. Deus não causa o sofrimento, mas pode nos ajudar a encontrar significado e força através dele.',
    },
  },
  {
    id: 'q2',
    question: {
      en: 'What if my family doesn\'t want me to be baptized?',
      es: '¿Qué pasa si mi familia no quiere que me bautice?',
      fr: 'Que faire si ma famille ne veut pas que je sois baptisé?',
      pt: 'E se minha família não quiser que eu seja batizado?',
    },
    answer: {
      en: 'This is a difficult situation. It\'s important to respect your family while following your own spiritual path. You can continue learning, praying, and growing in faith. Many people find that as they live the gospel, their family sees positive changes and becomes more accepting. Talk with the missionaries about your specific situation.',
      es: 'Esta es una situación difícil. Es importante respetar a tu familia mientras sigues tu propio camino espiritual. Puedes continuar aprendiendo, orando y creciendo en la fe. Muchas personas encuentran que al vivir el evangelio, su familia ve cambios positivos y se vuelve más aceptadora. Habla con los misioneros sobre tu situación específica.',
      fr: 'C\'est une situation difficile. Il est important de respecter votre famille tout en suivant votre propre chemin spirituel. Vous pouvez continuer à apprendre, à prier et à grandir dans la foi. Beaucoup de gens constatent qu\'en vivant l\'Évangile, leur famille voit des changements positifs et devient plus acceptante. Parlez avec les missionnaires de votre situation spécifique.',
      pt: 'Esta é uma situação difícil. É importante respeitar sua família enquanto segue seu próprio caminho espiritual. Você pode continuar aprendendo, orando e crescendo na fé. Muitas pessoas descobrem que, ao viver o evangelho, sua família vê mudanças positivas e se torna mais aceitadora. Fale com os missionários sobre sua situação específica.',
    },
  },
  {
    id: 'q3',
    question: {
      en: 'How is this church different from other Christian churches?',
      es: '¿En qué se diferencia esta iglesia de otras iglesias cristianas?',
      fr: 'En quoi cette église est-elle différente des autres églises chrétiennes?',
      pt: 'Como esta igreja é diferente de outras igrejas cristãs?',
    },
    answer: {
      en: 'The Church of Jesus Christ of Latter-day Saints believes in the same Jesus Christ as other Christian churches, but we believe that God has restored His original Church with living prophets, priesthood authority, and additional scripture like the Book of Mormon. We believe in continuing revelation and that families can be together forever.',
      es: 'La Iglesia de Jesucristo de los Santos de los Últimos Días cree en el mismo Jesucristo que otras iglesias cristianas, pero creemos que Dios ha restaurado Su Iglesia original con profetas vivientes, autoridad del sacerdocio y escritura adicional como el Libro de Mormón. Creemos en la revelación continua y que las familias pueden estar juntas para siempre.',
      fr: 'L\'Église de Jésus-Christ des Saints des Derniers Jours croit au même Jésus-Christ que les autres églises chrétiennes, mais nous croyons que Dieu a rétabli Son Église originale avec des prophètes vivants, l\'autorité de la prêtrise et des écritures supplémentaires comme le Livre de Mormon. Nous croyons en la révélation continue et que les familles peuvent être ensemble pour toujours.',
      pt: 'A Igreja de Jesus Cristo dos Santos dos Últimos Dias acredita no mesmo Jesus Cristo que outras igrejas cristãs, mas acreditamos que Deus restaurou Sua Igreja original com profetas vivos, autoridade do sacerdócio e escritura adicional como o Livro de Mórmon. Acreditamos na revelação contínua e que as famílias podem estar juntas para sempre.',
    },
  },
  {
    id: 'q4',
    question: {
      en: 'What happens if I make mistakes after being baptized?',
      es: '¿Qué pasa si cometo errores después de bautizarme?',
      fr: 'Que se passe-t-il si je fais des erreurs après mon baptême?',
      pt: 'O que acontece se eu cometer erros depois de ser batizado?',
    },
    answer: {
      en: 'Making mistakes is part of being human. The gospel teaches us about repentance, which is the process of turning away from sin and turning toward Christ. Through sincere repentance, we can be forgiven and continue to grow. The sacrament each week helps us renew our covenants and receive forgiveness.',
      es: 'Cometer errores es parte de ser humano. El evangelio nos enseña sobre el arrepentimiento, que es el proceso de alejarse del pecado y acercarse a Cristo. A través del arrepentimiento sincero, podemos ser perdonados y continuar creciendo. El sacramento cada semana nos ayuda a renovar nuestros convenios y recibir perdón.',
      fr: 'Faire des erreurs fait partie de l\'être humain. L\'Évangile nous enseigne la repentance, qui est le processus de se détourner du péché et de se tourner vers le Christ. Grâce à une repentance sincère, nous pouvons être pardonnés et continuer à grandir. La Sainte-Cène chaque semaine nous aide à renouveler nos alliances et à recevoir le pardon.',
      pt: 'Cometer erros faz parte de ser humano. O evangelho nos ensina sobre o arrependimento, que é o processo de se afastar do pecado e se voltar para Cristo. Através do arrependimento sincero, podemos ser perdoados e continuar crescendo. O sacramento toda semana nos ajuda a renovar nossos convênios e receber perdão.',
    },
  },
  {
    id: 'q5',
    question: {
      en: 'Do I have to give up everything I enjoy to be a member?',
      es: '¿Tengo que renunciar a todo lo que disfruto para ser miembro?',
      fr: 'Dois-je renoncer à tout ce que j\'aime pour être membre?',
      pt: 'Tenho que desistir de tudo que gosto para ser membro?',
    },
    answer: {
      en: 'No! The gospel is about adding joy and meaning to your life, not taking away happiness. While there are commandments and standards (like the Word of Wisdom), these are designed to protect and bless you. Many members find that living the gospel brings more happiness, peace, and purpose than they had before.',
      es: '¡No! El evangelio se trata de agregar gozo y significado a tu vida, no de quitar la felicidad. Aunque hay mandamientos y estándares (como la Palabra de Sabiduría), estos están diseñados para protegerte y bendecirte. Muchos miembros encuentran que vivir el evangelio trae más felicidad, paz y propósito de lo que tenían antes.',
      fr: 'Non! L\'Évangile consiste à ajouter de la joie et du sens à votre vie, pas à enlever le bonheur. Bien qu\'il y ait des commandements et des normes (comme la Parole de Sagesse), ceux-ci sont conçus pour vous protéger et vous bénir. Beaucoup de membres constatent que vivre l\'Évangile apporte plus de bonheur, de paix et de but qu\'avant.',
      pt: 'Não! O evangelho é sobre adicionar alegria e significado à sua vida, não tirar a felicidade. Embora haja mandamentos e padrões (como a Palavra de Sabedoria), eles são projetados para protegê-lo e abençoá-lo. Muitos membros descobrem que viver o evangelho traz mais felicidade, paz e propósito do que tinham antes.',
    },
  },
  {
    id: 'q6',
    question: {
      en: 'Can I still be friends with people who aren\'t members?',
      es: '¿Puedo seguir siendo amigo de personas que no son miembros?',
      fr: 'Puis-je toujours être ami avec des personnes qui ne sont pas membres?',
      pt: 'Ainda posso ser amigo de pessoas que não são membros?',
    },
    answer: {
      en: 'Absolutely! Jesus Christ taught us to love everyone. Being a member of the Church doesn\'t mean you can\'t have friends from other faiths or backgrounds. In fact, loving and serving others is a core principle of the gospel. Your example of living the gospel can be a positive influence on others.',
      es: '¡Absolutamente! Jesucristo nos enseñó a amar a todos. Ser miembro de la Iglesia no significa que no puedas tener amigos de otras religiones o antecedentes. De hecho, amar y servir a otros es un principio fundamental del evangelio. Tu ejemplo de vivir el evangelio puede ser una influencia positiva en otros.',
      fr: 'Absolument! Jésus-Christ nous a enseigné à aimer tout le monde. Être membre de l\'Église ne signifie pas que vous ne pouvez pas avoir d\'amis d\'autres religions ou origines. En fait, aimer et servir les autres est un principe fondamental de l\'Évangile. Votre exemple de vivre l\'Évangile peut être une influence positive sur les autres.',
      pt: 'Absolutamente! Jesus Cristo nos ensinou a amar todos. Ser membro da Igreja não significa que você não possa ter amigos de outras religiões ou origens. Na verdade, amar e servir aos outros é um princípio fundamental do evangelho. Seu exemplo de viver o evangelho pode ser uma influência positiva em outros.',
    },
  },
];

