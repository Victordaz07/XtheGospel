/**
 * Investigator Lessons Data
 * MVP: 4 core lessons for spiritual journey
 */

export type LessonStatus = 'not_started' | 'exploring' | 'completed';

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  hasAudio?: boolean;
  scriptureRef?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  sections: LessonSection[];
  reflectionPrompt: string;
}

export const lessons: Lesson[] = [
  {
    id: 'jesus-christ',
    title: 'Jesus Christ',
    subtitle: 'Our Savior and Redeemer',
    description: 'Learn about the central figure of our faith and His mission of love.',
    icon: '✝️',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'jc-1',
        title: 'Who is Jesus Christ?',
        content: 'Jesus Christ is the Son of God and the Savior of the world. He lived a perfect life, taught the gospel, and showed us how to return to our Heavenly Father.',
        hasAudio: true,
      },
      {
        id: 'jc-2',
        title: 'His Mission of Love',
        content: 'Through His Atonement, Jesus Christ made it possible for us to be forgiven of our sins and to live again after we die. His love is infinite and personal.',
        hasAudio: true,
        scriptureRef: 'John 3:16',
      },
      {
        id: 'jc-3',
        title: 'Following His Example',
        content: 'Jesus invites us to come unto Him, learn of Him, and follow His example. As we do, we find peace, purpose, and lasting joy.',
        hasAudio: true,
      },
    ],
    reflectionPrompt: 'How has learning about Jesus Christ touched your heart today?',
  },
  {
    id: 'plan-of-salvation',
    title: 'Plan of Salvation',
    subtitle: "God's Plan for You",
    description: "Discover God's loving plan for your eternal happiness and progression.",
    icon: '🌟',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'pos-1',
        title: 'Before We Were Born',
        content: 'We lived with God as His spirit children before coming to earth. We chose to follow His plan and come to earth to gain a body and learn.',
        hasAudio: true,
      },
      {
        id: 'pos-2',
        title: 'Life on Earth',
        content: 'Earth life is a time to learn, grow, and prepare to return to God. We experience joy and challenges that help us become more like Him.',
        hasAudio: true,
      },
      {
        id: 'pos-3',
        title: 'Life After Death',
        content: 'Death is not the end. Through Jesus Christ, we will all be resurrected and can live forever with our families and God.',
        hasAudio: true,
      },
    ],
    reflectionPrompt: 'What part of God\'s plan brings you the most hope?',
  },
  {
    id: 'restoration',
    title: 'The Restoration',
    subtitle: 'Truth Restored',
    description: "Learn how God restored His Church and gospel in our day.",
    icon: '🌅',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'res-1',
        title: 'The Great Apostasy',
        content: 'After Christ and His apostles died, the fullness of the gospel was lost from the earth. People changed many teachings and practices.',
        hasAudio: true,
      },
      {
        id: 'res-2',
        title: 'Joseph Smith\'s Prayer',
        content: 'In 1820, a young man named Joseph Smith wanted to know which church was true. He prayed and received a remarkable answer from God.',
        hasAudio: true,
      },
      {
        id: 'res-3',
        title: 'The Church Restored',
        content: 'Through Joseph Smith, God restored the true Church of Jesus Christ, including priesthood authority, scriptures, and sacred ordinances.',
        hasAudio: true,
      },
    ],
    reflectionPrompt: 'How do you feel about the idea that God still speaks to us today?',
  },
  {
    id: 'commandments',
    title: 'Living the Gospel',
    subtitle: 'Commandments and Blessings',
    description: 'Understand how living God\'s commandments brings happiness and peace.',
    icon: '💫',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'cmd-1',
        title: 'Commandments Show Love',
        content: 'God gives us commandments because He loves us. They are like guardrails that keep us safe and guide us to happiness.',
        hasAudio: true,
      },
      {
        id: 'cmd-2',
        title: 'Faith and Repentance',
        content: 'Having faith in Jesus Christ and repenting of our sins are the first steps toward receiving God\'s blessings. Repentance brings peace and a fresh start.',
        hasAudio: true,
      },
      {
        id: 'cmd-3',
        title: 'Baptism and the Holy Ghost',
        content: 'Baptism is the gate to the path leading to eternal life. After baptism, we receive the gift of the Holy Ghost to guide and comfort us.',
        hasAudio: true,
      },
    ],
    reflectionPrompt: 'Which commandment or principle would you like to learn more about?',
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getStatusLabel(status: LessonStatus): string {
  const labels: Record<LessonStatus, string> = {
    not_started: 'Not started',
    exploring: 'Exploring',
    completed: 'Completed',
  };
  return labels[status];
}

export function getStatusColor(status: LessonStatus): string {
  const colors: Record<LessonStatus, string> = {
    not_started: '#94A3B8',
    exploring: '#F59E0B',
    completed: '#10B981',
  };
  return colors[status];
}
