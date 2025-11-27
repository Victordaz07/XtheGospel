import { MemberActivity } from './activitiesTypes';

export const memberActivitiesEn: MemberActivity[] = [
  {
    id: 'quiz-doctrina-de-cristo-basico',
    title: 'Quiz: The Doctrine of Christ in Action',
    type: 'scripture-quiz',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 8,
    description:
      'A quick quiz to review key points of the doctrine of Christ and how to live it daily.',
    studyHint:
      'If you get stuck, go back to the module “The Doctrine of Christ in Daily Life” and review the section summaries.',
    reward: {
      xp: 100,
      badge: 'doctrine-of-christ-level-1',
    },
    questions: [
      {
        id: 'dc-q1',
        prompt: 'Which option best describes faith in Jesus Christ for a ward member?',
        options: [
          'Believing that Jesus exists and attending church on Sundays.',
          'Trusting Him so much that you are willing to act, change, and open your mouth to testify.',
          'Feeling peace when listening to spiritual music.',
          'Knowing many scriptures by memory.',
        ],
        correctOptionIndex: 1,
        explanation:
          'True faith always leads to action. It is more than believing; it is trusting enough to obey and invite others.',
        scriptureReference: '2 Nephi 25:26',
      },
      {
        id: 'dc-q2',
        prompt: 'Which of the following is the best example of “continuous repentance”?',
        options: [
          'Confessing a serious sin once in your life.',
          'Feeling guilty every time you make a mistake.',
          'Frequently reviewing your life, adjusting behavior, and seeking to change with the Lord’s help.',
          'Avoiding thinking about your weaknesses so you do not get discouraged.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Continuous repentance is a joyful, daily process of change and adjustment toward Christ, not a one-time event.',
        scriptureReference: 'Alma 36',
      },
      {
        id: 'dc-q3',
        prompt: 'In a world full of distractions, “enduring to the end” mainly means:',
        options: [
          'Keep attending church even if everything feels routine.',
          'Just hanging on until Christ comes again.',
          'Continuing to come unto Christ again and again, renewing covenants and helping others do the same.',
          'Avoid talking about doubts or spiritual struggles.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Enduring is active: continuing to come unto Christ, renewing covenants, and sustaining others on the path.',
        scriptureReference: '2 Nephi 31:20',
      },
    ],
  },
  {
    id: 'escenarios-vida-real-misioneros',
    title: 'What Would You Do? (with the missionaries)',
    type: 'scenario-quiz',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 12,
    description:
      'Real-life scenarios to help you practice how you would respond as a member working with missionaries.',
    studyHint:
      'Always think in terms of principles: love, agency, personal revelation, and respect for the roles of missionaries and local leaders.',
    reward: {
      xp: 150,
      badge: 'trusted-companion',
    },
    questions: [
      {
        id: 'scen-m1',
        prompt:
          'Missionaries ask you to join a lesson with your friend who is going through a painful divorce. What is the most appropriate approach?',
        options: [
          'Speak most of the time because you know the situation better.',
          'Let the missionaries teach and add your testimony and support at key moments.',
          'Share many private details of the divorce so missionaries know everything.',
          'Always decline these lessons because they are “too sensitive”.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Your role is to support and testify, not to replace the missionaries or expose unnecessary details.',
      },
      {
        id: 'scen-m2',
        prompt:
          'You feel that an investigator is not ready for the baptismal date the missionaries have set. What should you do?',
        options: [
          'Complain about the missionaries to other members to vent.',
          'Tell the investigator directly to cancel the date as soon as possible.',
          'Share your impressions with the missionaries in private and, if needed, with the ward mission leader.',
          'Say nothing because missionaries always know more than you.',
        ],
        correctOptionIndex: 2,
        explanation:
          'Honest, respectful, and private communication with missionaries and leaders is the right way to handle such impressions.',
      },
    ],
  },
  {
    id: 'adivina-el-personaje-misional',
    title: 'Guess the Missionary Hero',
    type: 'character-guess',
    difficulty: 'easy',
    recommendedAfterModules: ['member_doctrine_of_christ'],
    estimatedMinutes: 7,
    description:
      'Guess which scripture character is being described and connect missionary principles with real examples.',
    studyHint:
      'Think about how each character lived the doctrine of Christ and opened their mouth to testify.',
    reward: {
      xp: 80,
      badge: 'scripture-hero-expert',
    },
    questions: [
      {
        id: 'char-1',
        prompt:
          'I was a prophet who invited my people to come unto Christ with joy. I preached much about repentance and saw many baptized at the waters of Mormon. Who am I?',
        options: ['Alma the Younger', 'Nephi', 'Mosiah', 'Enos'],
        correctOptionIndex: 0,
        explanation:
          'Alma the Younger powerfully preached repentance and saw many covenants made at the waters of Mormon.',
      },
      {
        id: 'char-2',
        prompt:
          'I was a missionary who taught a king and his people. Many laid down their weapons and were willing to die rather than break their covenants. Who am I?',
        options: ['Ammon', 'Mormon', 'Moroni', 'Helaman'],
        correctOptionIndex: 0,
        explanation:
          'Ammon taught King Lamoni and many Lamanites who later became the people of Anti-Nephi-Lehi.',
      },
    ],
  },
  {
    id: 'practica-companero-misional',
    title: 'Practice: Being the Missionaries’ Companion',
    type: 'companion-practice',
    difficulty: 'medium',
    recommendedAfterModules: ['member_working_with_missionaries'],
    estimatedMinutes: 15,
    description:
      'Guided practice to help you introduce friends, share testimony, and invite with love.',
    studyHint:
      'Don’t focus on sounding “perfect”. Focus on being clear, simple, and centered on Christ.',
    reward: {
      xp: 200,
      badge: 'field-companion',
    },
    questions: [
      {
        id: 'comp-1',
        prompt:
          'Imagine how you would present a friend to the missionaries in under 30 seconds. Then choose the option that best matches what you should do.',
        options: [
          'Just share their name and phone number.',
          'Briefly explain who they are, their spiritual situation, and why you feel the gospel could help.',
          'Tell their full personal history with many details.',
          'Simply say: “They’re my friend. Just call them.”',
        ],
        correctOptionIndex: 1,
        explanation:
          'A helpful introduction gives enough context for missionaries to teach with sensitivity, without invading privacy.',
      },
      {
        id: 'comp-2',
        prompt:
          'During a lesson, the investigator asks you: “Is it really worth sacrificing so much for the Church?” What response would be most helpful?',
        options: [
          'Give a long explanation about Church history.',
          'Say it’s not that hard once you get used to it.',
          'Share a brief personal experience where a sacrifice for the gospel brought peace and spiritual growth.',
          'Tell them to ask the missionaries later.',
        ],
        correctOptionIndex: 2,
        explanation:
          'A brief, Christ-centered personal testimony is usually more powerful than a purely intellectual explanation.',
      },
    ],
  },
  {
    id: 'desafios-de-servicio-misional',
    title: 'Missionary Service Challenges',
    type: 'service-challenge',
    difficulty: 'medium',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 10,
    description:
      'Simple, real-life challenges to immediately apply missionary principles in your ward and home.',
    studyHint:
      'Choose one or two challenges that you can really do this week. Don’t try to do everything at once.',
    reward: {
      xp: 250,
      badge: 'hands-in-the-harvest',
    },
    questions: [
      {
        id: 'serv-1',
        prompt: 'This week, choose at least ONE of these as your personal challenge:',
        options: [
          'Sit next to a new convert or visitor in sacrament meeting and introduce them to at least one other person.',
          'Send a short message of encouragement to a full-time or returned missionary.',
          'Pray by name for at least two people with whom you could share the gospel.',
          'Invite someone to a simple ward activity (not necessarily Sunday worship).',
        ],
        correctOptionIndex: 0,
        explanation:
          'There is no single “right” answer here; the invitation is to actually choose and complete at least one concrete challenge this week.',
      },
    ],
  },
  {
    id: 'reflexion-diario-misional-miembro',
    title: 'Reflection: My Member Missionary Journal',
    type: 'reflection-journal',
    difficulty: 'easy',
    recommendedAfterModules: [
      'member_doctrine_of_christ',
      'member_working_with_missionaries',
      'member_new_converts_temple',
    ],
    estimatedMinutes: 12,
    description:
      'A guided space to write about how the Lord is currently using you in gathering Israel.',
    studyHint:
      'Be honest. The Lord already knows where you are; this is for you to see it more clearly.',
    reward: {
      xp: 120,
      badge: 'gathering-journalist',
    },
    questions: [
      {
        id: 'refl-1',
        prompt:
          'Write (outside the app, in your physical or digital journal) a recent experience when you felt a prompting to serve, invite, or testify, even if it was very small.',
        explanation:
          'Then mark this activity as completed to remember that the Spirit is already working in your life.',
      },
      {
        id: 'refl-2',
        prompt:
          'Make a list of three names: one family member, one friend, and one person from your ward, neighborhood, or work. Write what you could do for each in the next two weeks.',
        explanation:
          'These names may become your first prayerfully prepared referrals.',
      },
    ],
  },
];

