/**
 * New Member Guide Topics
 * Sprint 5 - Real content for the covenanted stage
 * 
 * No gamification, no numeric progress, no locked/completed status.
 * Pastoral, inviting language throughout.
 */

export interface GuideSection {
  title: string;
  content: string;
}

export interface GuideTopic {
  id: string;
  title: string;
  subtitle: string;
  category: 'worship' | 'covenant-living' | 'ordinances' | 'belonging';
  sections: GuideSection[];
  reflectionPrompt: string;
}

export const guideTopics: GuideTopic[] = [
  // ═══════════════════════════════════════════════════════════════
  // WORSHIP WITH THE WARD
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sacrament-meeting',
    title: 'Sacrament Meeting',
    subtitle: 'The heart of Sunday worship',
    category: 'worship',
    sections: [
      {
        title: 'What happens in sacrament meeting',
        content: 'Sacrament meeting is the most sacred meeting of the week. We gather as a ward family to partake of the sacrament, renewing our baptismal covenants. Members share talks and testimonies, and we sing hymns together. It typically lasts about an hour.',
      },
      {
        title: 'The sacrament ordinance',
        content: 'The sacrament is blessed and passed by priesthood holders. As you partake of the bread and water, you remember Jesus Christ, His sacrifice, and your commitment to follow Him. This is a time for personal reflection and spiritual renewal.',
      },
      {
        title: 'How to participate',
        content: 'Come with a prayerful heart. During the sacrament, reflect on your week and how you can draw closer to the Savior. Listen to the speakers with an open mind. You may be asked to give a talk someday—this is a wonderful opportunity to share your testimony.',
      },
    ],
    reflectionPrompt: 'What do you feel when you partake of the sacrament? How does it help you remember the Savior?',
  },
  {
    id: 'come-follow-me',
    title: 'Come, Follow Me',
    subtitle: 'Scripture study at home and at church',
    category: 'worship',
    sections: [
      {
        title: 'A unified study program',
        content: 'Come, Follow Me is the Church\'s curriculum for personal and family scripture study. Each week, members around the world study the same scriptures, creating a shared spiritual experience.',
      },
      {
        title: 'Sunday School and other classes',
        content: 'After sacrament meeting, you\'ll attend Sunday School where the Come, Follow Me lesson is discussed. This is a chance to learn from others and share your own insights. There are also classes for Relief Society, Elders Quorum, Young Women, and Primary.',
      },
      {
        title: 'Studying at home',
        content: 'The real power of Come, Follow Me is in your personal and family study throughout the week. Even a few minutes each day can bring the Spirit into your home. The Church app has resources to help you study.',
      },
    ],
    reflectionPrompt: 'What scripture or principle from your recent study has touched your heart?',
  },
  {
    id: 'ministering',
    title: 'Ministering',
    subtitle: 'Caring for one another as Christ would',
    category: 'worship',
    sections: [
      {
        title: 'What is ministering?',
        content: 'Ministering is the Savior\'s way of caring for others. Rather than formal visits, it\'s about genuine friendship and being there when someone needs help. You\'ll be assigned ministering brothers or sisters who will reach out to you.',
      },
      {
        title: 'You will also minister to others',
        content: 'As you settle into your ward, you\'ll be given the opportunity to minister to other members. This might feel new, but it\'s simply about being a friend—checking in, listening, and helping when you can.',
      },
      {
        title: 'No pressure, just love',
        content: 'Ministering isn\'t about reporting or checking boxes. It\'s about following the Spirit and loving others the way the Savior would. Start small—a text message, a prayer for someone, or a kind word can make a difference.',
      },
    ],
    reflectionPrompt: 'How have you felt the care of others in your life? How might you share that care with someone else?',
  },

  // ═══════════════════════════════════════════════════════════════
  // COVENANT LIVING
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'personal-prayer',
    title: 'Personal Prayer',
    subtitle: 'Your direct line to Heavenly Father',
    category: 'covenant-living',
    sections: [
      {
        title: 'Prayer is a conversation',
        content: 'Prayer is how we communicate with our Heavenly Father. He knows you personally and wants to hear from you. You can pray anytime, anywhere—not just morning and night, but throughout your day.',
      },
      {
        title: 'How to pray',
        content: 'Address Heavenly Father, express gratitude, share your thoughts and concerns, ask for guidance and blessings, and close in the name of Jesus Christ. There\'s no perfect formula—just speak from your heart.',
      },
      {
        title: 'Listening for answers',
        content: 'Answers to prayer often come as feelings of peace, clarity, or gentle impressions. Sometimes answers come through scriptures, other people, or simply a sense of direction. Be patient—God\'s timing is perfect.',
      },
    ],
    reflectionPrompt: 'When have you felt that Heavenly Father heard your prayers? What helps you feel close to Him?',
  },
  {
    id: 'scripture-study',
    title: 'Scripture Study',
    subtitle: 'Hearing God\'s voice through His word',
    category: 'covenant-living',
    sections: [
      {
        title: 'Why study the scriptures?',
        content: 'The scriptures contain the words of prophets and the teachings of Jesus Christ. They help us understand God\'s plan, find answers to our questions, and feel the Spirit. Regular study brings lasting peace.',
      },
      {
        title: 'Building a habit',
        content: 'Start with just a few verses each day. Consistency matters more than quantity. Many find it helpful to study at the same time each day—morning, during lunch, or before bed. The Church app makes it easy to read anywhere.',
      },
      {
        title: 'The standard works',
        content: 'We study the Bible, the Book of Mormon, the Doctrine and Covenants, and the Pearl of Great Price. Each contains unique insights. The Book of Mormon is especially powerful for feeling the Spirit and coming closer to Christ.',
      },
    ],
    reflectionPrompt: 'What scripture has recently spoken to your heart? How do you feel when you study God\'s word?',
  },
  {
    id: 'sabbath-day',
    title: 'The Sabbath Day',
    subtitle: 'A day of rest and renewal',
    category: 'covenant-living',
    sections: [
      {
        title: 'A gift from God',
        content: 'The Sabbath is a day set apart to rest from worldly concerns and focus on spiritual things. It\'s not a list of restrictions but an opportunity to draw closer to God and strengthen family relationships.',
      },
      {
        title: 'How to keep the Sabbath',
        content: 'Attend church meetings, spend time with family, study the scriptures, visit those in need, and rest from regular work. Ask yourself: "What can I do today to make this a delight and draw closer to the Lord?"',
      },
      {
        title: 'Finding your rhythm',
        content: 'Every family and individual keeps the Sabbath a little differently. The key is to make it a day that feels different—more peaceful, more focused on what matters most. Over time, you\'ll find what works for you.',
      },
    ],
    reflectionPrompt: 'What activities help you feel the Spirit on the Sabbath? How can you make Sunday a day of renewal?',
  },
  {
    id: 'tithing-offerings',
    title: 'Tithing & Offerings',
    subtitle: 'Trusting God with our resources',
    category: 'covenant-living',
    sections: [
      {
        title: 'What is tithing?',
        content: 'Tithing is the donation of one-tenth of our income to the Lord. It\'s an ancient principle that blesses both the giver and the Church. Tithing funds are used to build temples, support missionary work, and help those in need.',
      },
      {
        title: 'A principle of faith',
        content: 'Paying tithing requires faith—trusting that God will provide. The Lord has promised to "open the windows of heaven" to those who pay tithing. Many members testify of unexpected blessings that come from this obedience.',
      },
      {
        title: 'Other offerings',
        content: 'Fast offerings help care for the poor and needy. Other donations support missionary work, humanitarian aid, and temple construction. All giving is voluntary and between you and the Lord.',
      },
    ],
    reflectionPrompt: 'How do you feel about trusting God with your resources? What blessings have you noticed from giving?',
  },

  // ═══════════════════════════════════════════════════════════════
  // ORDINANCES & TEMPLE PREPARATION
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'confirmation-gift',
    title: 'Your Confirmation',
    subtitle: 'The gift of the Holy Ghost',
    category: 'ordinances',
    sections: [
      {
        title: 'What happened at confirmation',
        content: 'After your baptism, you were confirmed a member of the Church and given the gift of the Holy Ghost. This is one of the greatest gifts you can receive—a constant companion to guide, comfort, and testify of truth.',
      },
      {
        title: 'Living worthy of the Spirit',
        content: 'The Holy Ghost can be with you always, but He speaks in a still, small voice. To hear Him, we strive to live righteously, keep our covenants, and create quiet moments for spiritual impressions.',
      },
      {
        title: 'Recognizing the Spirit',
        content: 'The Spirit often speaks through feelings of peace, love, clarity, or gentle promptings. Over time, you\'ll learn to recognize His voice. Trust those impressions—they are real.',
      },
    ],
    reflectionPrompt: 'How have you felt the Holy Ghost in your life since your confirmation?',
  },
  {
    id: 'renewing-covenants',
    title: 'Renewing Covenants',
    subtitle: 'The sacrament as weekly renewal',
    category: 'ordinances',
    sections: [
      {
        title: 'Why we take the sacrament weekly',
        content: 'Each week, the sacrament gives us a chance to renew our baptismal covenants. We promise again to remember Christ, keep His commandments, and take His name upon us. In return, we\'re promised His Spirit.',
      },
      {
        title: 'Preparing your heart',
        content: 'Come to sacrament meeting with a repentant heart. Think about your week—where you fell short, where you succeeded, and how you can do better. The sacrament is a time to start fresh.',
      },
      {
        title: 'A sacred moment',
        content: 'During the sacrament, try to focus entirely on the Savior. Let go of distractions. This is your personal time with Him, a moment to feel His love and recommit to following Him.',
      },
    ],
    reflectionPrompt: 'What do you think about during the sacrament? How does it help you feel renewed?',
  },
  {
    id: 'temple-preparation',
    title: 'Temple Preparation',
    subtitle: 'Looking forward to sacred ordinances',
    category: 'ordinances',
    sections: [
      {
        title: 'The temple is a house of God',
        content: 'Temples are sacred buildings where we make covenants with God and perform ordinances for ourselves and our ancestors. The temple is a place of peace, revelation, and eternal promises.',
      },
      {
        title: 'Preparing to enter',
        content: 'New members typically wait at least a year before receiving their endowment. During this time, focus on keeping your covenants, attending church, and growing in the gospel. Your bishop will help you know when you\'re ready.',
      },
      {
        title: 'Temple recommend',
        content: 'To enter the temple, you\'ll need a temple recommend. This involves an interview with your bishop and stake president about your faith and worthiness. It\'s a sacred privilege to hold a recommend.',
      },
    ],
    reflectionPrompt: 'What do you look forward to about attending the temple? How are you preparing spiritually?',
  },

  // ═══════════════════════════════════════════════════════════════
  // BELONGING & SUPPORT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'finding-friends',
    title: 'Finding Friends',
    subtitle: 'Building relationships in your ward',
    category: 'belonging',
    sections: [
      {
        title: 'Your ward family',
        content: 'Your ward is more than a congregation—it\'s a family. These are people who will support you, celebrate with you, and help you through hard times. Building friendships takes time, but it\'s worth the effort.',
      },
      {
        title: 'Ways to connect',
        content: 'Attend ward activities, volunteer to help with events, join a class or group, or simply introduce yourself to someone new each Sunday. Many wards have activities during the week—these are great opportunities to connect.',
      },
      {
        title: 'Be patient with yourself',
        content: 'It\'s normal to feel like an outsider at first. Everyone was new once. Keep showing up, keep being yourself, and friendships will form naturally. The Lord will help you find your place.',
      },
    ],
    reflectionPrompt: 'Who in your ward has made you feel welcome? How can you reach out to others?',
  },
  {
    id: 'asking-for-help',
    title: 'Asking for Help',
    subtitle: 'You don\'t have to do this alone',
    category: 'belonging',
    sections: [
      {
        title: 'It\'s okay to need help',
        content: 'Everyone needs help sometimes—spiritually, emotionally, or temporally. The Church has resources and people ready to support you. Asking for help is a sign of strength, not weakness.',
      },
      {
        title: 'Who to talk to',
        content: 'Your bishop is there to help with spiritual concerns and can connect you with resources. Your ministering brothers or sisters are also there for you. Relief Society and Elders Quorum leaders can help coordinate support.',
      },
      {
        title: 'Temporal and emotional support',
        content: 'If you\'re struggling financially, the Church has welfare resources. If you\'re struggling emotionally, there are counseling services available. You are not alone—your ward family wants to help.',
      },
    ],
    reflectionPrompt: 'Is there something you\'ve been hesitant to ask for help with? Who might you reach out to?',
  },
];

/**
 * Get all topics
 */
export function getAllGuideTopics(): GuideTopic[] {
  return guideTopics;
}

/**
 * Get topic by ID
 */
export function getGuideTopicById(id: string): GuideTopic | undefined {
  return guideTopics.find((topic) => topic.id === id);
}

/**
 * Get topics by category
 */
export function getGuideTopicsByCategory(category: GuideTopic['category']): GuideTopic[] {
  return guideTopics.filter((topic) => topic.category === category);
}

/**
 * Category display names
 */
export const categoryLabels: Record<GuideTopic['category'], string> = {
  worship: 'Worship with the Ward',
  'covenant-living': 'Covenant Living',
  ordinances: 'Ordinances & Temple',
  belonging: 'Belonging & Support',
};
