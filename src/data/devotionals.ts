import { LocalizedText } from './lessonsData';

export interface Devotional {
  id: string;
  scripture: {
    ref: string;
    text: LocalizedText;
  };
  application: LocalizedText;
  action: LocalizedText;
}

export const DEVOTIONALS: Devotional[] = [
  {
    id: 'd1',
    scripture: {
      ref: 'Juan 14:27',
      text: {
        en: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
        es: 'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón ni tenga miedo.',
        fr: 'Je vous laisse la paix, je vous donne ma paix. Je ne vous la donne pas comme le monde la donne. Que votre cœur ne se trouble point, et qu\'il n\'ait point de crainte.',
        pt: 'Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.'
      }
    },
    application: {
      en: 'The peace that comes from Jesus Christ is different from worldly peace. It is a deep, lasting peace that can calm our hearts even in difficult times.',
      es: 'La paz que viene de Jesucristo es diferente de la paz del mundo. Es una paz profunda y duradera que puede calmar nuestros corazones incluso en tiempos difíciles.',
      fr: 'La paix qui vient de Jésus-Christ est différente de la paix du monde. C\'est une paix profonde et durable qui peut apaiser nos cœurs même dans les moments difficiles.',
      pt: 'A paz que vem de Jesus Cristo é diferente da paz do mundo. É uma paz profunda e duradoura que pode acalmar nossos corações mesmo em tempos difíceis.'
    },
    action: {
      en: 'Take a moment today to pray and ask God for His peace. Trust that He is with you.',
      es: 'Tómate un momento hoy para orar y pedirle a Dios Su paz. Confía en que Él está contigo.',
      fr: 'Prenez un moment aujourd\'hui pour prier et demander à Dieu Sa paix. Faites confiance qu\'Il est avec vous.',
      pt: 'Reserve um momento hoje para orar e pedir a Deus Sua paz. Confie que Ele está com você.'
    }
  },
  {
    id: 'd2',
    scripture: {
      ref: 'Mateo 11:28',
      text: {
        en: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
        es: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.',
        fr: 'Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.',
        pt: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.'
      }
    },
    application: {
      en: 'Jesus invites us to come to Him when we feel burdened. He offers rest and relief from our struggles.',
      es: 'Jesús nos invita a venir a Él cuando nos sentimos agobiados. Él ofrece descanso y alivio de nuestras luchas.',
      fr: 'Jésus nous invite à venir à Lui lorsque nous nous sentons accablés. Il offre le repos et le soulagement de nos luttes.',
      pt: 'Jesus nos convida a vir a Ele quando nos sentimos sobrecarregados. Ele oferece descanso e alívio de nossas lutas.'
    },
    action: {
      en: 'Identify one burden you are carrying today and bring it to the Lord in prayer.',
      es: 'Identifica una carga que estás llevando hoy y preséntala al Señor en oración.',
      fr: 'Identifiez un fardeau que vous portez aujourd\'hui et apportez-le au Seigneur dans la prière.',
      pt: 'Identifique um fardo que você está carregando hoje e apresente-o ao Senhor em oração.'
    }
  },
  {
    id: 'd3',
    scripture: {
      ref: 'Moroni 10:5',
      text: {
        en: 'And by the power of the Holy Ghost ye may know the truth of all things.',
        es: 'Y por el poder del Espíritu Santo podréis conocer la verdad de todas las cosas.',
        fr: 'Et par le pouvoir du Saint-Esprit, vous pouvez connaître la vérité de toutes choses.',
        pt: 'E pelo poder do Espírito Santo podeis saber a verdade de todas as coisas.'
      }
    },
    application: {
      en: 'The Holy Ghost can help us know truth. When we seek with a sincere heart, God will answer our questions.',
      es: 'El Espíritu Santo puede ayudarnos a conocer la verdad. Cuando buscamos con corazón sincero, Dios responderá nuestras preguntas.',
      fr: 'Le Saint-Esprit peut nous aider à connaître la vérité. Lorsque nous cherchons avec un cœur sincère, Dieu répondra à nos questions.',
      pt: 'O Espírito Santo pode nos ajudar a conhecer a verdade. Quando buscamos com coração sincero, Deus responderá nossas perguntas.'
    },
    action: {
      en: 'Write down one question you have about the gospel. Pray about it with a sincere heart.',
      es: 'Escribe una pregunta que tengas sobre el evangelio. Ora al respecto con corazón sincero.',
      fr: 'Notez une question que vous avez sur l\'Évangile. Priez à ce sujet avec un cœur sincère.',
      pt: 'Anote uma pergunta que você tem sobre o evangelho. Ore sobre isso com coração sincero.'
    }
  },
  {
    id: 'd4',
    scripture: {
      ref: '2 Nefi 2:25',
      text: {
        en: 'Adam fell that men might be; and men are, that they might have joy.',
        es: 'Adán cayó para que los hombres existieran; y los hombres existen para que tengan gozo.',
        fr: 'Adam est tombé pour que les hommes soient; et les hommes sont, afin qu\'ils aient de la joie.',
        pt: 'Adão caiu para que os homens existissem; e os homens existem para que tenham alegria.'
      }
    },
    application: {
      en: 'The purpose of our existence is to have joy. Even through challenges, we can find joy in following Christ.',
      es: 'El propósito de nuestra existencia es tener gozo. Incluso a través de desafíos, podemos encontrar gozo al seguir a Cristo.',
      fr: 'Le but de notre existence est d\'avoir de la joie. Même à travers les défis, nous pouvons trouver la joie en suivant le Christ.',
      pt: 'O propósito de nossa existência é ter alegria. Mesmo através de desafios, podemos encontrar alegria ao seguir a Cristo.'
    },
    action: {
      en: 'Look for one moment of joy today, no matter how small. Thank God for it.',
      es: 'Busca un momento de gozo hoy, por pequeño que sea. Agradécele a Dios por él.',
      fr: 'Cherchez un moment de joie aujourd\'hui, aussi petit soit-il. Remerciez Dieu pour cela.',
      pt: 'Procure um momento de alegria hoje, por menor que seja. Agradeça a Deus por isso.'
    }
  },
  {
    id: 'd5',
    scripture: {
      ref: 'Alma 32:21',
      text: {
        en: 'And now as I said concerning faith—faith is not to have a perfect knowledge of things; therefore if ye have faith ye hope for things which are not seen, which are true.',
        es: 'Y ahora, como dije concerniente a la fe—la fe no es tener un conocimiento perfecto de las cosas; por tanto, si tenéis fe, tenéis esperanza en cosas que no se ven, las cuales son verdaderas.',
        fr: 'Et maintenant, comme je l\'ai dit concernant la foi—la foi n\'est pas d\'avoir une connaissance parfaite des choses; c\'est pourquoi, si vous avez la foi, vous espérez des choses qui ne se voient pas, qui sont vraies.',
        pt: 'E agora, como disse concernente à fé—a fé não é ter um conhecimento perfeito das coisas; portanto, se tendes fé, tendes esperança em coisas que não se veem, as quais são verdadeiras.'
      }
    },
    application: {
      en: 'Faith is not about knowing everything perfectly. It is about hoping and trusting in things we cannot see but that are true.',
      es: 'La fe no se trata de saber todo perfectamente. Se trata de esperar y confiar en cosas que no podemos ver pero que son verdaderas.',
      fr: 'La foi ne consiste pas à tout savoir parfaitement. Il s\'agit d\'espérer et de faire confiance à des choses que nous ne pouvons pas voir mais qui sont vraies.',
      pt: 'A fé não é saber tudo perfeitamente. É ter esperança e confiar em coisas que não podemos ver, mas que são verdadeiras.'
    },
    action: {
      en: 'Exercise faith today by taking one small step forward in your gospel learning, even if you don\'t have all the answers.',
      es: 'Ejercita la fe hoy dando un pequeño paso adelante en tu aprendizaje del evangelio, incluso si no tienes todas las respuestas.',
      fr: 'Exercez la foi aujourd\'hui en faisant un petit pas en avant dans votre apprentissage de l\'Évangile, même si vous n\'avez pas toutes les réponses.',
      pt: 'Exercite a fé hoje dando um pequeno passo à frente em seu aprendizado do evangelho, mesmo que não tenha todas as respostas.'
    }
  },
  {
    id: 'd6',
    scripture: {
      ref: '3 Nefi 18:21',
      text: {
        en: 'Pray in your families unto the Father, always in my name, that your wives and your children may be blessed.',
        es: 'Orad al Padre en vuestras familias, siempre en mi nombre, para que vuestras esposas y vuestros hijos sean bendecidos.',
        fr: 'Priez le Père dans vos familles, toujours en mon nom, afin que vos femmes et vos enfants soient bénis.',
        pt: 'Orai ao Pai em vossas famílias, sempre em meu nome, para que vossas mulheres e vossos filhos sejam abençoados.'
      }
    },
    application: {
      en: 'Prayer in our families brings blessings. When we pray together, we invite the Spirit into our homes.',
      es: 'La oración en nuestras familias trae bendiciones. Cuando oramos juntos, invitamos al Espíritu a nuestros hogares.',
      fr: 'La prière dans nos familles apporte des bénédictions. Lorsque nous prions ensemble, nous invitons l\'Esprit dans nos foyers.',
      pt: 'A oração em nossas famílias traz bênçãos. Quando oramos juntos, convidamos o Espírito para nossos lares.'
    },
    action: {
      en: 'If possible, pray with your family today. If not, pray for your family.',
      es: 'Si es posible, ora con tu familia hoy. Si no, ora por tu familia.',
      fr: 'Si possible, priez avec votre famille aujourd\'hui. Sinon, priez pour votre famille.',
      pt: 'Se possível, ore com sua família hoje. Se não, ore por sua família.'
    }
  },
  {
    id: 'd7',
    scripture: {
      ref: 'Mosíah 2:17',
      text: {
        en: 'And behold, I tell you these things that ye may learn wisdom; that ye may learn that when ye are in the service of your fellow beings ye are only in the service of your God.',
        es: 'Y he aquí, os digo estas cosas para que aprendáis sabiduría; para que sepáis que cuando os halláis al servicio de vuestros semejantes, solo estáis al servicio de vuestro Dios.',
        fr: 'Et voici, je vous dis ces choses afin que vous appreniez la sagesse; afin que vous sachiez que lorsque vous êtes au service de vos semblables, vous n\'êtes qu\'au service de votre Dieu.',
        pt: 'E eis que vos digo estas coisas para que aprendais sabedoria; para que saibais que quando estais a serviço de vossos semelhantes, estais apenas a serviço de vosso Deus.'
      }
    },
    application: {
      en: 'When we serve others, we are serving God. Service brings us closer to Christ and helps us feel His love.',
      es: 'Cuando servimos a otros, estamos sirviendo a Dios. El servicio nos acerca a Cristo y nos ayuda a sentir Su amor.',
      fr: 'Lorsque nous servons les autres, nous servons Dieu. Le service nous rapproche du Christ et nous aide à ressentir Son amour.',
      pt: 'Quando servimos aos outros, estamos servindo a Deus. O serviço nos aproxima de Cristo e nos ajuda a sentir Seu amor.'
    },
    action: {
      en: 'Look for one opportunity to serve someone today, even in a small way.',
      es: 'Busca una oportunidad para servir a alguien hoy, incluso de manera pequeña.',
      fr: 'Cherchez une occasion de servir quelqu\'un aujourd\'hui, même de manière modeste.',
      pt: 'Procure uma oportunidade de servir alguém hoje, mesmo que de forma pequena.'
    }
  }
];

// Función para obtener el devocional del día
export const getDailyDevotional = (): Devotional => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % DEVOTIONALS.length;
  return DEVOTIONALS[index];
};

