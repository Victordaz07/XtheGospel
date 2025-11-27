export type LocalizedText = {
  en: string;
  es: string;
  fr: string;
  pt: string;
};

export type LocalizedScripture = {
  ref: string;
  text?: LocalizedText;
};

export type LocalizedQuiz = {
  question: LocalizedText;
  options: LocalizedText[];
  answerIndex: number;
};

export type Lesson = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  scriptures: LocalizedScripture[];
  quiz: LocalizedQuiz[];
};

export const LESSONS: Lesson[] = [
  {
    id: "L1",
    title: {
      en: "The Restoration of the Gospel of Jesus Christ",
      es: "La Restauración del Evangelio de Jesucristo",
      fr: "La Restauration de l'Évangile de Jésus-Christ",
      pt: "A Restauração do Evangelho de Jesus Cristo"
    },
    description: {
      en: "This lesson explains that God is our loving Heavenly Father, how He reveals His gospel through prophets, the Great Apostasy, and the Restoration through the Prophet Joseph Smith, including the Book of Mormon and how we can know the truth.",
      es: "Esta lección enseña que Dios es nuestro amoroso Padre Celestial, cómo revela Su evangelio por medio de profetas, la Gran Apostasía y la Restauración mediante el profeta José Smith, incluyendo el Libro de Mormón y cómo podemos saber la verdad.",
      fr: "Cette leçon explique que Dieu est notre Père céleste aimant, comment Il révèle Son évangile par des prophètes, la Grande Apostasie et la Restauration par le prophète Joseph Smith, y compris le Livre de Mormon et comment connaître la vérité.",
      pt: "Esta lição ensina que Deus é nosso amoroso Pai Celestial, como Ele revela Seu evangelho por meio de profetas, a Grande Apostasia e a Restauração por meio do profeta Joseph Smith, incluindo o Livro de Mórmon e como podemos saber a verdade."
    },
    scriptures: [
      { ref: "James 1:5" },
      { ref: "Joseph Smith—History 1:16–19" },
      { ref: "Amos 3:7" },
      { ref: "Moroni 10:3–5" }
    ],
    quiz: [
      {
        question: {
          en: "Why did Joseph Smith go to the grove to pray?",
          es: "¿Por qué fue José Smith a la arboleda a orar?",
          fr: "Pourquoi Joseph Smith est-il allé dans le bosquet pour prier ?",
          pt: "Por que Joseph Smith foi ao bosque para orar?"
        },
        options: [
          {
            en: "To ask God which church he should join",
            es: "Para preguntar a Dios a qué iglesia debía unirse",
            fr: "Pour demander à Dieu à quelle église il devait se joindre",
            pt: "Para perguntar a Deus a qual igreja deveria se filiar"
          },
          {
            en: "To ask for money and health",
            es: "Para pedir dinero y salud",
            fr: "Pour demander de l'argent et la santé",
            pt: "Para pedir dinheiro e saúde"
          },
          {
            en: "To escape from his family",
            es: "Para escapar de su familia",
            fr: "Pour fuir sa famille",
            pt: "Para fugir da família"
          },
          {
            en: "To become a priest in his church",
            es: "Para hacerse sacerdote en su iglesia",
            fr: "Pour devenir prêtre dans son église",
            pt: "Para tornar-se sacerdote em sua igreja"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What is the Book of Mormon?",
          es: "¿Qué es el Libro de Mormón?",
          fr: "Qu'est-ce que le Livre de Mormon ?",
          pt: "O que é o Livro de Mórmon?"
        },
        options: [
          {
            en: "Another testament of Jesus Christ, a record of ancient prophets in the Americas",
            es: "Otro testamento de Jesucristo, un registro de profetas antiguos en las Américas",
            fr: "Un autre témoignage de Jésus-Christ, un récit d'anciens prophètes sur le continent américain",
            pt: "Outro testamento de Jesus Cristo, um registro de antigos profetas nas Américas"
          },
          {
            en: "A history book about wars",
            es: "Un libro de historia sobre guerras",
            fr: "Un livre d'histoire sur les guerres",
            pt: "Um livro de história sobre guerras"
          },
          {
            en: "A replacement for the Bible",
            es: "Un reemplazo de la Biblia",
            fr: "Un remplaçant de la Bible",
            pt: "Um substituto da Bíblia"
          },
          {
            en: "A collection of church rules",
            es: "Una colección de reglas de la iglesia",
            fr: "Une collection de règles d'Église",
            pt: "Uma coleção de regras da igreja"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "How can we know if the Restoration is true?",
          es: "¿Cómo podemos saber si la Restauración es verdadera?",
          fr: "Comment pouvons-nous savoir si la Restauration est vraie ?",
          pt: "Como podemos saber se a Restauração é verdadeira?"
        },
        options: [
          {
            en: "By praying, studying the scriptures, and feeling the Holy Ghost",
            es: "Orando, estudiando las escrituras y sintiendo el Espíritu Santo",
            fr: "En priant, en étudiant les Écritures et en ressentant l'Esprit",
            pt: "Orando, estudando as escrituras e sentindo o Espírito Santo"
          },
          {
            en: "By trusting what others say without asking God",
            es: "Confiando en lo que otros dicen sin preguntar a Dios",
            fr: "En se fiant à ce que disent les autres sans demander à Dieu",
            pt: "Confiando no que os outros dizem sem perguntar a Deus"
          },
          {
            en: "By visiting all churches",
            es: "Visitando todas las iglesias",
            fr: "En visitant toutes les églises",
            pt: "Visitando todas as igrejas"
          },
          {
            en: "By waiting for a sign in the sky",
            es: "Esperando una señal en el cielo",
            fr: "En attendant un signe dans le ciel",
            pt: "Esperando um sinal no céu"
          }
        ],
        answerIndex: 0
      }
    ]
  },
  {
    id: "L2",
    title: {
      en: "The Plan of Salvation",
      es: "El Plan de Salvación",
      fr: "Le Plan de Salut",
      pt: "O Plano de Salvação"
    },
    description: {
      en: "This lesson presents God's eternal plan: our premortal life, the purpose of mortality, the Fall, the role of Jesus Christ and His Atonement, the world of spirits, the Resurrection, and the degrees of glory.",
      es: "Esta lección presenta el plan eterno de Dios: nuestra vida premortal, el propósito de la vida terrenal, la Caída, el papel de Jesucristo y Su Expiación, el mundo de los espíritus, la Resurrección y los grados de gloria.",
      fr: "Cette leçon présente le plan éternel de Dieu : notre vie prémortelle, le but de la vie terrestre, la Chute, le rôle de Jésus-Christ et de Son Expiation, le monde des esprits, la Résurrection et les degrés de gloire.",
      pt: "Esta lição apresenta o plano eterno de Deus: nossa vida pré-mortal, o propósito da vida terrena, a Queda, o papel de Jesus Cristo e Sua Expiação, o mundo dos espíritos, a Ressurreição e os graus de glória."
    },
    scriptures: [
      { ref: "Moses 1:39" },
      { ref: "2 Nephi 2:25" },
      { ref: "Alma 34:8–9" },
      { ref: "1 Corinthians 15:40–42" }
    ],
    quiz: [
      {
        question: {
          en: "Why did God send us to earth?",
          es: "¿Por qué nos envió Dios a la tierra?",
          fr: "Pourquoi Dieu nous a-t-Il envoyés sur la terre ?",
          pt: "Por que Deus nos enviou à terra?"
        },
        options: [
          {
            en: "To gain a body, be tested, and become more like Him",
            es: "Para obtener un cuerpo, ser probados y llegar a ser más como Él",
            fr: "Pour recevoir un corps, être éprouvés et devenir plus semblables à Lui",
            pt: "Para receber um corpo, ser provados e nos tornarmos mais semelhantes a Ele"
          },
          {
            en: "To suffer without purpose",
            es: "Para sufrir sin propósito",
            fr: "Pour souffrir sans but",
            pt: "Para sofrer sem propósito"
          },
          {
            en: "To be punished for Adam's sin",
            es: "Para ser castigados por el pecado de Adán",
            fr: "Pour être punis du péché d'Adam",
            pt: "Para ser punidos pelo pecado de Adão"
          },
          {
            en: "To live once and disappear",
            es: "Para vivir una vez y desaparecer",
            fr: "Pour vivre une fois et disparaître",
            pt: "Para viver uma vez e desaparecer"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What did the Fall of Adam and Eve make possible?",
          es: "¿Qué hizo posible la Caída de Adán y Eva?",
          fr: "Qu'est-ce que la Chute d'Adam et Ève a rendu possible ?",
          pt: "O que a Queda de Adão e Eva tornou possível?"
        },
        options: [
          {
            en: "Having families, choosing between good and evil, and needing Christ",
            es: "Tener familias, escoger entre el bien y el mal y necesitar a Cristo",
            fr: "Avoir des familles, choisir entre le bien et le mal et avoir besoin du Christ",
            pt: "Ter famílias, escolher entre o bem e o mal e precisar de Cristo"
          },
          {
            en: "Living without problems",
            es: "Vivir sin problemas",
            fr: "Vivre sans problèmes",
            pt: "Viver sem problemas"
          },
          {
            en: "Never dying",
            es: "Nunca morir",
            fr: "Ne jamais mourir",
            pt: "Nunca morrer"
          },
          {
            en: "Not being responsible for our choices",
            es: "No ser responsables de nuestras decisiones",
            fr: "Ne pas être responsables de nos choix",
            pt: "Não sermos responsáveis por nossas escolhas"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What happens after we die?",
          es: "¿Qué sucede después de morir?",
          fr: "Que se passe-t-il après la mort ?",
          pt: "O que acontece depois que morremos?"
        },
        options: [
          {
            en: "Our spirit goes to the spirit world to wait for the Resurrection",
            es: "Nuestro espíritu va al mundo de los espíritus y espera la Resurrección",
            fr: "Notre esprit va dans le monde des esprits en attendant la Résurrection",
            pt: "Nosso espírito vai para o mundo dos espíritos e aguarda a Ressurreição"
          },
          {
            en: "We cease to exist",
            es: "Dejamos de existir",
            fr: "Nous cessons d'exister",
            pt: "Deixamos de existir"
          },
          {
            en: "We become angels automatically",
            es: "Nos convertimos en ángeles automáticamente",
            fr: "Nous devenons automatiquement des anges",
            pt: "Viramos anjos automaticamente"
          },
          {
            en: "We reincarnate many times",
            es: "Reencarnamos muchas veces",
            fr: "Nous nous réincarnons plusieurs fois",
            pt: "Reencarnamos muitas veces"
          }
        ],
        answerIndex: 0
      }
    ]
  },
  {
    id: "L3",
    title: {
      en: "The Gospel of Jesus Christ",
      es: "El Evangelio de Jesucristo",
      fr: "L'Évangile de Jésus-Christ",
      pt: "O Evangelho de Jesus Cristo"
    },
    description: {
      en: "This lesson explains the doctrine of Christ: faith, repentance, baptism, the gift of the Holy Ghost, and enduring to the end through covenants and ordinances.",
      es: "Esta lección explica la doctrina de Cristo: la fe, el arrepentimiento, el bautismo, el don del Espíritu Santo y perseverar hasta el fin mediante convenios y ordenanzas.",
      fr: "Cette leçon explique la doctrine du Christ : la foi, le repentir, le baptême, le don du Saint-Esprit et persévérer jusqu'à la fin par des alliances et des ordonnances.",
      pt: "Esta lição explica a doutrina de Cristo: fé, arrependimento, batismo, dom do Espírito Santo e perseverar até o fim por meio de convênios e ordenanças."
    },
    scriptures: [
      { ref: "2 Nephi 31:17–21" },
      { ref: "Articles of Faith 1:4" },
      { ref: "Acts 2:37–38" }
    ],
    quiz: [
      {
        question: {
          en: "What is the first principle of the gospel?",
          es: "¿Cuál es el primer principio del evangelio?",
          fr: "Quel est le premier principe de l'Évangile ?",
          pt: "Qual é o primeiro princípio do evangelho?"
        },
        options: [
          {
            en: "Faith in the Lord Jesus Christ",
            es: "La fe en el Señor Jesucristo",
            fr: "La foi au Seigneur Jésus-Christ",
            pt: "A fé no Senhor Jesus Cristo"
          },
          {
            en: "Baptism by immersion",
            es: "El bautismo por inmersión",
            fr: "Le baptême par immersion",
            pt: "O batismo por imersão"
          },
          {
            en: "Keeping the commandments",
            es: "Guardar los mandamientos",
            fr: "Garder les commandements",
            pt: "Guardar os mandamentos"
          },
          {
            en: "Receiving the priesthood",
            es: "Recibir el sacerdocio",
            fr: "Recevoir la prêtrise",
            pt: "Receber o sacerdócio"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What is true repentance?",
          es: "¿Qué es el verdadero arrepentimiento?",
          fr: "Qu'est-ce que le vrai repentir ?",
          pt: "O que é o verdadeiro arrependimento?"
        },
        options: [
          {
            en: "A change of heart and behavior through Christ",
            es: "Un cambio de corazón y de conducta por medio de Cristo",
            fr: "Un changement de cœur et de comportement par le Christ",
            pt: "Uma mudança de coração e de comportamento por meio de Cristo"
          },
          {
            en: "Feeling sad without changing",
            es: "Sentirse triste sin cambiar",
            fr: "Être triste sans changer",
            pt: "Sentir-se triste sem mudar"
          },
          {
            en: "Hiding our sins",
            es: "Esconder nuestros pecados",
            fr: "Cacher nos péchés",
            pt: "Esconder nossos pecados"
          },
          {
            en: "Avoiding church meetings",
            es: "Evitar las reuniones de la iglesia",
            fr: "Éviter les réunions de l'Église",
            pt: "Evitar as reuniões da Igreja"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "Why do we need to endure to the end?",
          es: "¿Por qué debemos perseverar hasta el fin?",
          fr: "Pourquoi devons-nous persévérer jusqu'à la fin ?",
          pt: "Por que precisamos perseverar até o fim?"
        },
        options: [
          {
            en: "To remain faithful to our covenants and receive eternal life",
            es: "Para permanecer fieles a nuestros convenios y recibir la vida eterna",
            fr: "Pour rester fidèles à nos alliances et recevoir la vie éternelle",
            pt: "Para permanecer fiéis aos nossos convênios e receber a vida eterna"
          },
          {
            en: "Because God wants us to suffer more",
            es: "Porque Dios quiere que suframos más",
            fr: "Parce que Dieu veut que nous souffrions davantage",
            pt: "Porque Deus quer que soframos mais"
          },
          {
            en: "So we can earn God's love",
            es: "Para ganarnos el amor de Dios",
            fr: "Pour mériter l'amour de Dieu",
            pt: "Para ganhar o amor de Deus"
          },
          {
            en: "To impress other people",
            es: "Para impresionar a los demás",
            fr: "Pour impressionner les autres",
            pt: "Para impressionar as pessoas"
          }
        ],
        answerIndex: 0
      }
    ]
  },
  {
    id: "L4",
    title: {
      en: "The Commandments",
      es: "Los Mandamientos",
      fr: "Les Commandements",
      pt: "Os Mandamentos"
    },
    description: {
      en: "This lesson teaches why God gives commandments and explains key commandments such as the Ten Commandments, the Sabbath day, the Word of Wisdom, the law of chastity, honesty, tithing, service, and love for neighbor.",
      es: "Esta lección enseña por qué Dios da mandamientos y explica mandamientos clave como los Diez Mandamientos, el día de reposo, la Palabra de Sabiduría, la ley de castidad, la honestidad, el diezmo, el servicio y el amor al prójimo.",
      fr: "Cette leçon explique pourquoi Dieu donne des commandements et présente des commandements clés comme les Dix Commandements, le jour du sabbat, la Parole de Sagesse, la loi de chasteté, l'honnêteté, la dîme, le service et l'amour du prochain.",
      pt: "Esta lição ensina por que Deus dá mandamentos e explica mandamentos-chave como os Dez Mandamentos, o dia de repouso, a Palavra de Sabedoria, a lei de castidade, a honestidade, o dízimo, o serviço e o amor ao próximo."
    },
    scriptures: [
      { ref: "John 14:15" },
      { ref: "Mosiah 2:41" },
      { ref: "Doctrine and Covenants 89" }
    ],
    quiz: [
      {
        question: {
          en: "Why does God give commandments?",
          es: "¿Por qué Dios da mandamientos?",
          fr: "Pourquoi Dieu donne-t-Il des commandements ?",
          pt: "Por que Deus dá mandamentos?"
        },
        options: [
          {
            en: "To bless us and protect us",
            es: "Para bendecirnos y protegernos",
            fr: "Pour nous bénir et nous protéger",
            pt: "Para nos abençoar e proteger"
          },
          {
            en: "To limit our happiness",
            es: "Para limitar nuestra felicidad",
            fr: "Pour limiter notre bonheur",
            pt: "Para limitar nossa felicidade"
          },
          {
            en: "To test us without reason",
            es: "Para probarnos sin razón",
            fr: "Pour nous éprouver sans raison",
            pt: "Para nos testar sem motivo"
          },
          {
            en: "To favor some people",
            es: "Para favorecer a algunos",
            fr: "Pour favoriser certains",
            pt: "Para favorecer alguns"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What is the law of chastity?",
          es: "¿Qué es la ley de castidad?",
          fr: "Qu'est-ce que la loi de chasteté ?",
          pt: "O que é a lei de castidade?"
        },
        options: [
          {
            en: "Sexual relations only between a married man and woman",
            es: "Relaciones sexuales solo entre un hombre y una mujer casados",
            fr: "Les relations sexuelles uniquement entre un homme et une femme mariés",
            pt: "Relações sexuais apenas entre um homem e uma mulher casados"
          },
          {
            en: "Avoiding marriage",
            es: "Evitar el matrimonio",
            fr: "Éviter le mariage",
            pt: "Evitar o casamento"
          },
          {
            en: "Never talking about sexuality",
            es: "Nunca hablar de sexualidad",
            fr: "Ne jamais parler de sexualité",
            pt: "Nunca falar de sexualidade"
          },
          {
            en: "Being perfect without feelings",
            es: "Ser perfecto sin sentimientos",
            fr: "Être parfait sans sentiments",
            pt: "Ser perfeito sem sentimentos"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What is tithing?",
          es: "¿Qué es el diezmo?",
          fr: "Qu'est-ce que la dîme ?",
          pt: "O que é o dízimo?"
        },
        options: [
          {
            en: "Ten percent of our income given to the Lord's Church",
            es: "El diez por ciento de nuestros ingresos dado a la Iglesia del Señor",
            fr: "Dix pour cent de nos revenus donnés à l'Église du Seigneur",
            pt: "Dez por cento de nossa renda dada à Igreja do Senhor"
          },
          {
            en: "An optional offering",
            es: "Una ofrenda opcional",
            fr: "Une offrande optionnelle",
            pt: "Uma oferta opcional"
          },
          {
            en: "A tax from the government",
            es: "Un impuesto del gobierno",
            fr: "Un impôt du gouvernement",
            pt: "Um imposto do governo"
          },
          {
            en: "A tradition without meaning",
            es: "Una tradición sin significado",
            fr: "Une tradition sans signification",
            pt: "Uma tradição sem significado"
          }
        ],
        answerIndex: 0
      }
    ]
  },
  {
    id: "L5",
    title: {
      en: "Laws and Ordinances",
      es: "Leyes y Ordenanzas",
      fr: "Lois et Ordonnances",
      pt: "Leis e Ordenanças"
    },
    description: {
      en: "This lesson clarifies the difference between laws and ordinances and presents the priesthood authority, essential ordinances of the gospel, the sacrament, and a respectful overview of temple ordinances and the endowment.",
      es: "Esta lección aclara la diferencia entre leyes y ordenanzas y presenta la autoridad del sacerdocio, las ordenanzas esenciales del evangelio, la ordenanza de la Santa Cena y una explicación respetuosa de las ordenanzas del templo y la investidura.",
      fr: "Cette leçon clarifie la différence entre lois et ordonnances et présente l'autorité de la prêtrise, les ordonnances essentielles de l'Évangile, la Cène et un aperçu respectueux des ordonnances du temple et de l'investiture.",
      pt: "Esta lição esclarece a diferença entre leis e ordenanças e apresenta a autoridade do sacerdócio, as ordenanças essenciais do evangelho, a ordenança do sacramento e uma explicação respeitosa das ordenanças do templo e da investidura."
    },
    scriptures: [
      { ref: "Hebrews 5:4" },
      { ref: "Doctrine and Covenants 20:73–79" },
      { ref: "Doctrine and Covenants 84:20" }
    ],
    quiz: [
      {
        question: {
          en: "What is an ordinance?",
          es: "¿Qué es una ordenanza?",
          fr: "Qu'est-ce qu'une ordonnance ?",
          pt: "O que é uma ordenança?"
        },
        options: [
          {
            en: "A sacred act performed by priesthood authority",
            es: "Un acto sagrado realizado por la autoridad del sacerdocio",
            fr: "Un acte sacré accompli par l'autorité de la prêtrise",
            pt: "Um ato sagrado realizado pela autoridade do sacerdócio"
          },
          {
            en: "Any church activity",
            es: "Cualquier actividad de la iglesia",
            fr: "N'importe quelle activité d'Église",
            pt: "Qualquer atividade da igreja"
          },
          {
            en: "A personal opinion",
            es: "Una opinión personal",
            fr: "Une opinion personnelle",
            pt: "Uma opinião pessoal"
          },
          {
            en: "A civil law of the country",
            es: "Una ley civil del país",
            fr: "Une loi civile du pays",
            pt: "Uma lei civil do país"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "Who can perform saving ordinances?",
          es: "¿Quién puede realizar las ordenanzas de salvación?",
          fr: "Qui peut accomplir les ordonnances salvatrices ?",
          pt: "Quem pode realizar as ordenanças de salvação?"
        },
        options: [
          {
            en: "Those who hold proper priesthood authority",
            es: "Quienes poseen la debida autoridad del sacerdocio",
            fr: "Ceux qui détiennent la juste autorité de la prêtrise",
            pt: "Aqueles que possuem a devida autoridade do sacerdócio"
          },
          {
            en: "Anyone with good intentions",
            es: "Cualquiera con buenas intenciones",
            fr: "Toute personne ayant de bonnes intentions",
            pt: "Qualquer pessoa com boas intenções"
          },
          {
            en: "Religious leaders of any church",
            es: "Líderes religiosos de cualquier iglesia",
            fr: "Les dirigeants religieux de toute église",
            pt: "Líderes religiosos de qualquer igreja"
          },
          {
            en: "Only angels",
            es: "Solo los ángeles",
            fr: "Uniquement les anges",
            pt: "Apenas anjos"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What is the sacrament for?",
          es: "¿Para qué es la Santa Cena?",
          fr: "À quoi sert la Sainte-Cène ?",
          pt: "Para que serve o sacramento?"
        },
        options: [
          {
            en: "To remember Christ and renew our covenants",
            es: "Para recordar a Cristo y renovar nuestros convenios",
            fr: "Pour se souvenir du Christ et renouveler nos alliances",
            pt: "Para lembrar de Cristo e renovar nossos convênios"
          },
          {
            en: "To satisfy a church tradition",
            es: "Para cumplir una tradición de la iglesia",
            fr: "Pour satisfaire une tradition d'Église",
            pt: "Para cumprir uma tradição da igreja"
          },
          {
            en: "To show who is more spiritual",
            es: "Para mostrar quién es más espiritual",
            fr: "Pour montrer qui est le plus spirituel",
            pt: "Para mostrar quem é mais espiritual"
          },
          {
            en: "To replace baptism",
            es: "Para reemplazar el bautismo",
            fr: "Pour remplacer le baptême",
            pt: "Para substituir o batismo"
          }
        ],
        answerIndex: 0
      }
    ]
  },
  {
    id: "L6",
    title: {
      en: "Preparation for Baptism",
      es: "Preparación para el Bautismo",
      fr: "Préparation au Baptême",
      pt: "Preparação para o Batismo"
    },
    description: {
      en: "This lesson helps investigators understand what baptism is, the baptismal covenant, spiritual preparation, the interview, the day of baptism, life after baptism, and the gift of the Holy Ghost.",
      es: "Esta lección ayuda a los investigadores a comprender qué es el bautismo, el convenio bautismal, la preparación espiritual, la entrevista, el día del bautismo, la vida después del bautismo y el don del Espíritu Santo.",
      fr: "Cette leçon aide les personnes à comprendre ce qu'est le baptême, l'alliance baptismale, la préparation spirituelle, l'entretien, le jour du baptême, la vie après le baptême et le don du Saint-Esprit.",
      pt: "Esta lição ajuda os pesquisadores a entender o que é o batismo, o convênio batismal, a preparação espiritual, a entrevista, o dia do batismo, a vida após o batismo e o dom do Espírito Santo."
    },
    scriptures: [
      { ref: "Romans 6:3–4" },
      { ref: "Mosiah 18:8–10" },
      { ref: "Doctrine and Covenants 20:37" }
    ],
    quiz: [
      {
        question: {
          en: "What does baptism by immersion represent?",
          es: "¿Qué representa el bautismo por inmersión?",
          fr: "Que représente le baptême par immersion ?",
          pt: "O que o batismo por imersão representa?"
        },
        options: [
          {
            en: "The death and resurrection of Christ and a new life",
            es: "La muerte y resurrección de Cristo y una vida nueva",
            fr: "La mort et la résurrection du Christ et une vie nouvelle",
            pt: "A morte e ressurreição de Cristo e uma nova vida"
          },
          {
            en: "A simple tradition",
            es: "Una simple tradición",
            fr: "Une simple tradition",
            pt: "Uma simples tradição"
          },
          {
            en: "A way to join any religion",
            es: "Una forma de unirse a cualquier religión",
            fr: "Une façon de rejoindre n'importe quelle religion",
            pt: "Uma forma de entrar em qualquer religião"
          },
          {
            en: "A guarantee that we will never sin again",
            es: "Una garantía de que nunca pecaremos otra vez",
            fr: "Une garantie que nous ne pécherons plus jamais",
            pt: "Uma garantia de que nunca mais pecaremos"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What is the baptismal covenant?",
          es: "¿Qué es el convenio bautismal?",
          fr: "Qu'est-ce que l'alliance baptismale ?",
          pt: "O que é o convênio batismal?"
        },
        options: [
          {
            en: "To take upon us the name of Christ and keep His commandments",
            es: "Tomar sobre nosotros el nombre de Cristo y guardar Sus mandamientos",
            fr: "Prendre sur nous le nom du Christ et garder Ses commandements",
            pt: "Tomar sobre nós o nome de Cristo e guardar Seus mandamentos"
          },
          {
            en: "To be perfect immediately",
            es: "Ser perfectos de inmediato",
            fr: "Être parfaits immédiatement",
            pt: "Ser perfeitos imediatamente"
          },
          {
            en: "To avoid all responsibilities",
            es: "Evitar todas las responsabilidades",
            fr: "Éviter toutes les responsabilités",
            pt: "Evitar todas as responsabilidades"
          },
          {
            en: "To attend church once a year",
            es: "Asistir a la iglesia una vez al año",
            fr: "Aller à l'Église une fois par an",
            pt: "Ir à igreja uma vez por ano"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "Why is the baptismal interview important?",
          es: "¿Por qué es importante la entrevista bautismal?",
          fr: "Pourquoi l'entretien de baptême est-il important ?",
          pt: "Por que a entrevista batismal é importante?"
        },
        options: [
          {
            en: "To confirm our understanding, faith, and willingness to make covenants",
            es: "Para confirmar nuestro entendimiento, fe y disposición a hacer convenios",
            fr: "Pour confirmer notre compréhension, notre foi et notre volonté de faire des alliances",
            pt: "Para confirmar nosso entendimento, fé e disposição de fazer convênios"
          },
          {
            en: "To judge us harshly",
            es: "Para juzgarnos duramente",
            fr: "Pour nous juger durement",
            pt: "Para nos julgar severamente"
          },
          {
            en: "To test our memory",
            es: "Para probar nuestra memoria",
            fr: "Pour tester notre mémoire",
            pt: "Para testar nossa memória"
          },
          {
            en: "To decide if God loves us",
            es: "Para decidir si Dios nos ama",
            fr: "Pour décider si Dieu nous aime",
            pt: "Para decidir se Deus nos ama"
          }
        ],
        answerIndex: 0
      }
    ]
  },
  {
    id: "L7",
    title: {
      en: "Preparation for the Temple",
      es: "Preparación para el Templo",
      fr: "Préparation pour le Temple",
      pt: "Preparação para o Templo"
    },
    description: {
      en: "This lesson explains what the temple is, why it is important, how to live worthily, the temple recommend, a respectful overview of temple ordinances and covenants, and the blessings that come from temple worship.",
      es: "Esta lección explica qué es el templo, por qué es importante, cómo vivir dignamente, la recomendación para el templo, una explicación respetuosa de las ordenanzas y convenios del templo y las bendiciones que provienen de la adoración en el templo.",
      fr: "Cette leçon explique ce qu'est le temple, pourquoi il est important, comment vivre dignement, la recommandation pour le temple, un aperçu respectueux des ordonnances et alliances du temple et les bénédictions qui découlent du service au temple.",
      pt: "Esta lição explica o que é o templo, por que é importante, como viver dignamente, a recomendação para o templo, uma explicação respeitosa das ordenanças e convênios do templo e as bênçãos que vêm do serviço no templo."
    },
    scriptures: [
      { ref: "1 Corinthians 3:16–17" },
      { ref: "Doctrine and Covenants 109 (selected verses)" },
      { ref: "Doctrine and Covenants 124:39" }
    ],
    quiz: [
      {
        question: {
          en: "What is a temple in the restored Church?",
          es: "¿Qué es un templo en la Iglesia restaurada?",
          fr: "Qu'est-ce qu'un temple dans l'Église rétablie ?",
          pt: "O que é um templo na Igreja restaurada?"
        },
        options: [
          {
            en: "The house of the Lord, dedicated for sacred ordinances",
            es: "La casa del Señor, dedicada a ordenanzas sagradas",
            fr: "La maison du Seigneur, consacrée à des ordonnances sacrées",
            pt: "A casa do Senhor, dedicada a ordenanças sagradas"
          },
          {
            en: "A regular meetinghouse",
            es: "Un centro de reuniones común",
            fr: "Un simple bâtiment de réunion",
            pt: "Um prédio comum de reuniões"
          },
          {
            en: "A museum of church history",
            es: "Un museo de historia de la iglesia",
            fr: "Un musée d'histoire de l'Église",
            pt: "Um museu de história da Igreja"
          },
          {
            en: "A place only for leaders",
            es: "Un lugar solo para líderes",
            fr: "Un lieu réservé aux dirigeants",
            pt: "Um lugar só para líderes"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "What is required to enter the temple?",
          es: "¿Qué se requiere para entrar al templo?",
          fr: "Qu'est-ce qui est nécessaire pour entrer au temple ?",
          pt: "O que é necessário para entrar no templo?"
        },
        options: [
          {
            en: "A valid temple recommend and a worthy life",
            es: "Una recomendación vigente para el templo y una vida digna",
            fr: "Une recommandation de temple valable et une vie digne",
            pt: "Uma recomendação válida para o templo e uma vida digna"
          },
          {
            en: "A certain level of education",
            es: "Cierto nivel de educación",
            fr: "Un certain niveau d'études",
            pt: "Um certo nível de escolaridade"
          },
          {
            en: "A special payment",
            es: "Un pago especial",
            fr: "Un paiement spécial",
            pt: "Um pagamento especial"
          },
          {
            en: "Belonging to any religion",
            es: "Pertenecer a cualquier religión",
            fr: "Appartenir à n'importe quelle religion",
            pt: "Pertencer a qualquer religião"
          }
        ],
        answerIndex: 0
      },
      {
        question: {
          en: "Why should we prepare spiritually for the temple?",
          es: "¿Por qué debemos prepararnos espiritualmente para el templo?",
          fr: "Pourquoi devons-nous nous préparer spirituellement pour le temple ?",
          pt: "Por que devemos nos preparar espiritualmente para o templo?"
        },
        options: [
          {
            en: "Because the temple is a sacred place where we make eternal covenants",
            es: "Porque el templo es un lugar sagrado donde hacemos convenios eternos",
            fr: "Parce que le temple est un lieu sacré où nous faisons des alliances éternelles",
            pt: "Porque o templo é um lugar sagrado onde fazemos convênios eternos"
          },
          {
            en: "To impress others",
            es: "Para impresionar a los demás",
            fr: "Pour impressionner les autres",
            pt: "Para impressionar os outros"
          },
          {
            en: "To avoid other church responsibilities",
            es: "Para evitar otras responsabilidades en la iglesia",
            fr: "Pour éviter d'autres responsabilités dans l'Église",
            pt: "Para evitar outras responsabilidades na Igreja"
          },
          {
            en: "Because God loves only those who attend the temple",
            es: "Porque Dios solo ama a quienes asisten al templo",
            fr: "Parce que Dieu n'aime que ceux qui vont au temple",
            pt: "Porque Deus só ama quem vai ao templo"
          }
        ],
        answerIndex: 0
      }
    ]
  }
];
