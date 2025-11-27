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

export const memberStudyModulesEn: StudyModule[] = [
  {
    id: 'member_doctrine_of_christ',
    title: 'The Doctrine of Christ in Daily Life',
    subtitle: 'Faith, repentance, covenants, and enduring — as a member, not only as a friend of the Church.',
    description:
      'Help ward members see the Doctrine of Christ as a continuous cycle, not as a one-time event of baptism or a mission. The goal is that members feel responsible for applying this doctrine in their own lives and helping others do the same, supporting missionary work and preparing for the Second Coming.',
    levelRecommended: 1,
    sections: [
      {
        id: 'faith_in_christ_action',
        title: 'Faith in Jesus Christ that Leads to Action',
        summary:
          'True faith is not just believing that Christ exists, but trusting Him enough to act, change, and open our mouth to testify.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. What does it really mean to have faith in Christ as a member?',
          },
          {
            type: 'paragraph',
            text: 'Faith in Jesus Christ is not only accepting that He is the Son of God. It is trusting His character so much that we are willing to risk comfort, prestige, and time to follow Him.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Assumes that the Lord is already preparing people around you.',
              'Prays with expectation to receive impressions about whom to serve, invite, or comfort.',
              'Sees commandments as opportunities to show love, not as a cold checklist of rules.',
              'Trusts that the Savior can change hearts, beginning with your own.',
              'Keeps acting in missionary work even when the ward seems cold or uninterested.',
            ],
          },
          {
            type: 'heading',
            text: '2. Faith that turns into concrete steps',
          },
          {
            type: 'paragraph',
            text: 'Faith that never changes your schedule is just a nice idea. Faith in Christ, for a member, shows up in very specific ways.',
          },
          {
            type: 'heading',
            text: 'At home',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Family gatherings where missionaries, converts, and friends of the Church are talked about naturally.',
              'Prayers where people are mentioned by name.',
              'Children and youth seeing that sharing the gospel is a normal topic at home.',
            ],
          },
          {
            type: 'heading',
            text: 'In the ward',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Willing to receive missionary assignments without taking offense or making excuses.',
              'Arriving early to the chapel to look for newcomers or visitors and sit near them.',
              'Volunteering to accompany the missionaries in key lessons, even when it means adjusting your schedule.',
            ],
          },
          {
            type: 'heading',
            text: 'In everyday life',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Keeping a mental or written list of people you are praying for, waiting for the right moment to share the gospel.',
              'Being aware that any normal conversation can become spiritual if prompted by the Spirit.',
              'Not hiding that you are a member of the Church at work or at school.',
            ],
          },
          {
            type: 'heading',
            text: '3. Common obstacles to missionary faith',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Fear of rejection: "If I invite, they will get upset."',
              'Perfectionism: "I don\'t know enough to explain it well."',
              'Social shame: "I don\'t want them to think I\'m fanatical."',
              'Past negative experiences: rejections, friends who pulled away after an invitation.',
            ],
          },
          {
            type: 'paragraph',
            text: 'The gospel teaches that faith grows by acting, not by waiting until we feel ready. Members who choose to act despite fear are truly living the Doctrine of Christ.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Nephi 25:26', 'Ether 12:6', 'James 2:17–18'],
          manuals: ['Preach My Gospel, chapter 3, "The Doctrine of Christ"', 'Come, Follow Me — lessons about faith in Christ'],
          talks: ['Elder Dieter F. Uchtdorf — messages about faith and trust in the Lord'],
        }),
      },
      {
        id: 'continuous_repentance',
        title: 'Ongoing Repentance: What It Looks Like in a Member',
        summary:
          'Repentance is not only for great sins; it is the daily process of adjusting the heart toward Christ and letting Him change us.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. Repentance is not punishment, it is a privilege',
          },
          {
            type: 'paragraph',
            text: 'For many members, the word "repentance" sounds dramatic and reserved for serious sins. But true discipleship is measured by how often we adjust our course, not by how many times we fall.',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Humbly recognizing that we can still become more like Christ.',
              'Accepting correction without excuses or blaming others.',
              'Rejoicing that the Lord shows us our blind spots.',
            ],
          },
          {
            type: 'heading',
            text: '2. A daily pattern of repentance for a missionary-minded member',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Review the day with the Lord: what pleased Him, and what opportunities you missed.',
              'Recognize specific mistakes without generalizing or attacking yourself.',
              'Express sincere sorrow but also full confidence in the Atonement.',
              'Create a clear plan for tomorrow: a call, a visit, an apology, a concrete act of service.',
              'Get up again without staying trapped in guilt.',
            ],
          },
          {
            type: 'heading',
            text: '3. Repentance and the sacrament',
          },
          {
            type: 'paragraph',
            text: 'The sacrament is the weekly laboratory of ongoing repentance. Members who live the Doctrine of Christ arrive early and reverently, listen to the prayers with real intent, and leave the meeting with a specific decision for that week.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Helaman 5:10–11', 'Mosiah 4:2–3', 'Doctrine and Covenants 58:42–43'],
          manuals: ['Preach My Gospel, chapter 3 — teachings on faith and repentance'],
          talks: [],
        }),
      },
      {
        id: 'endure_to_the_end',
        title: 'Enduring to the End in a Distracted World',
        summary:
          'Enduring is not hanging on bored and tired; it is moving forward with purpose, bearing one another\'s burdens and keeping covenants.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. The challenge: staying faithful when everything competes for our attention',
          },
          {
            type: 'paragraph',
            text: 'Today we do not need to openly deny the faith to drift away from the gospel. Being distracted is enough: hours on social media, little time in the scriptures; energy for news and entertainment, but little desire to serve.',
          },
          {
            type: 'heading',
            text: '2. Spiritual anchors that keep us steady',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Sincere prayer morning and night, even if brief.',
              'At least one meaningful verse a day, read with the intent to apply it.',
              'A deliberate act of kindness every day.',
              'Renewing covenants in the sacrament with a key phrase for the week (for example, "I will look for the one who is alone").',
              'Keeping a simple record of missionary service: visits, lessons attended, calls to converts.',
              'Surrounding yourself with friends who push you toward the temple, not toward spiritual lukewarmness.',
            ],
          },
          {
            type: 'heading',
            text: '3. Enduring in missionary work, not only in attendance',
          },
          {
            type: 'paragraph',
            text: 'Enduring to the end includes enduring in the Lord\'s work. There is no spiritual retirement: we keep learning, testifying, and supporting converts and missionaries.',
          },
        ]),
        references: convertReferences({
          scriptures: ['2 Nephi 31:20', '3 Nephi 27:16–22', 'Doctrine and Covenants 14:7'],
          manuals: [],
          talks: [],
        }),
      },
    ],
  },
  {
    id: 'member_new_converts_temple',
    title: 'Caring for New Converts and Preparing for the Temple',
    subtitle: 'Walking with them beyond baptism.',
    description:
      'A new convert is a soul who has made a covenant but is still learning to walk spiritually. The first months are decisive: their roots of faith are tender and need light, nourishment, and a safe environment.',
    levelRecommended: 2,
    sections: [
      {
        id: 'convert_care_principles',
        title: 'Principles for Caring for New Converts',
        summary:
          'Baptism is not the end; it is the beginning. A new convert is a soul who has made a covenant but is still learning to walk spiritually.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. Baptism is not the end; it is the beginning',
          },
          {
            type: 'paragraph',
            text: 'A new convert is a soul who has made a covenant but is still learning to walk spiritually. The first months are decisive: their roots of faith are tender and need light, nourishment, and a safe environment.',
          },
          {
            type: 'heading',
            text: 'Eternal principles for caring for them',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Constant, genuine love: more real friends than formal visits.',
              'Normalize questions: doubts do not destroy faith; silence does.',
              'Involve them in simple service so they feel part of the family.',
              'Help them build a circle of friends inside the Church.',
            ],
          },
          {
            type: 'heading',
            text: 'What does good follow-up look like?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'You contact them during the week, not only on Sunday.',
              'You ask how their Book of Mormon reading is going.',
              'You pray for them by name.',
              'You sit with them in the chapel.',
              'You introduce them to other ward members.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Moroni 6:4'],
          manuals: ['Preach My Gospel, chapter 13 — Helping New Converts Stay Active'],
          talks: ['Elder Jeffrey R. Holland — "The First Great Commandment"'],
        }),
      },
      {
        id: 'auxiliary_roles_callings',
        title: 'Role of Auxiliary Organizations and Example Callings',
        summary:
          'The Church has an inspired design to sustain converts. Every member is edified by faith and must be fully integrated into the body of the Church.',
        estimatedMinutes: 16,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. The Church is designed to sustain converts',
          },
          {
            type: 'paragraph',
            text: 'The Lord organizes His Church so that every member may be edified by faith. A convert should not depend only on the missionaries or on one leader; they should be fully integrated into the body of the Church.',
          },
          {
            type: 'heading',
            text: 'Key roles in the first three months',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Relief Society: spiritual and emotional support, friendship, personalized teaching about the baptismal covenant.',
              'Elders quorum: invite to serve, teach priesthood responsibilities when appropriate, accompany in spiritual goals.',
              'Children and youth organizations: social integration, activities, wholesome friendships, and spiritual tutoring for child or youth converts.',
            ],
          },
          {
            type: 'heading',
            text: 'Simple callings ideal for new converts',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Greeter at the door.',
              'Helper in activities.',
              'Handing out programs.',
              'Helping prepare the sacrament (if holding the appropriate priesthood).',
              'Offering prayers in meetings.',
              'Helping with building cleaning or technology.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Golden rule: a new convert should receive an appropriate calling within the first four weeks.',
          },
        ]),
        references: convertReferences({
          scriptures: ['Ephesians 4:12'],
          manuals: ['General Handbook — principles on member care and callings'],
          talks: ['Elder Dieter F. Uchtdorf — "The Way of the Disciple"'],
        }),
      },
      {
        id: 'priesthood_and_temple',
        title: 'First Steps with the Priesthood and the Temple',
        summary:
          'A newly baptized man begins a journey toward receiving the Aaronic Priesthood and later the Melchizedek Priesthood. He needs to move forward with clarity, peace, and support.',
        estimatedMinutes: 18,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: '1. Priesthood: to protect, bless, and serve',
          },
          {
            type: 'paragraph',
            text: 'A newly baptized man begins a journey toward receiving the Aaronic Priesthood and later the Melchizedek Priesthood. He needs to move forward with clarity, peace, and support.',
          },
          {
            type: 'heading',
            text: 'What the priesthood is — and what it is not',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'It is God\'s authority to bless, teach, baptize, comfort, and preside under revelation.',
              'It is not rank, control, human privilege, or personal power.',
            ],
          },
          {
            type: 'heading',
            text: 'Important conversations before ordination',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Law of chastity.',
              'Word of Wisdom.',
              'Tithing.',
              'Temple recommend.',
              'Christian service and personal prayer.',
            ],
          },
          {
            type: 'heading',
            text: '2. Preparing for the first time in the temple',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'The temple is a house of faith, a place of eternal covenants, and a celestial school.',
              'They should know what to expect emotionally: peace, light, and love.',
              'They should know how to dress: modest, simple, and neat clothing.',
              'They should not go alone; let it be a special day with ward friends.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Psalm 24:3–4'],
          manuals: ['General Handbook — chapters on temple preparation'],
          talks: ['President Russell M. Nelson — "The Temple and Your Spiritual Foundation"'],
        }),
      },
    ],
  },
  {
    id: 'member_working_with_missionaries',
    title: 'Working Shoulder to Shoulder with the Missionaries',
    subtitle: 'From spectator member to trusted companion.',
    description:
      'Missionaries are not called to do the work alone. The Lord has always used companions: Moses–Aaron, Alma–Amulek, Nephi–Lehi. In modern missionary work, the member is the third companion.',
    levelRecommended: 2,
    sections: [
      {
        id: 'principles_with_missionaries',
        title: 'Principles for Working with the Missionaries',
        summary:
          'Full-time missionaries have authority to teach and gather Israel. Members have daily access to their neighbors, co-workers, family members, and friends.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introduction',
          },
          {
            type: 'paragraph',
            text: 'Missionaries are not called to do the work alone. The Lord has always used companions: Moses–Aaron, Alma–Amulek, Nephi–Lehi. In modern missionary work, the member is the third companion.',
          },
          {
            type: 'heading',
            text: 'What does it mean to be their companion?',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Lives attentive to impressions: recognizes promptings like "Call them", "Invite them", "Listen to them".',
              'Loves without an agenda: walks with people with respect and authenticity, shares truth as a friend.',
              'Sees missionaries as companions, not as "employees" of the Church.',
              'Is willing to get hands dirty: attends lessons, prepares the spiritual atmosphere, cares about the person beyond the appointment.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Doctrine and Covenants 11:21'],
          manuals: ['Preach My Gospel, chapter 9 — Finding People to Teach'],
          talks: ['Elder David A. Bednar — "Come and See"'],
        }),
      },
      {
        id: 'inspired_referrals',
        title: 'How to Prepare and Offer Inspired Referrals',
        summary:
          'A referral is not a name on a list; it is a person loved by God. The Savior often worked through personal recommendations, and that pattern continues today.',
        estimatedMinutes: 14,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introduction',
          },
          {
            type: 'paragraph',
            text: 'A referral is not a name on a list; it is a person loved by God. The Savior often worked through personal recommendations, and that pattern continues today.',
          },
          {
            type: 'heading',
            text: 'Principles for inspired referrals',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Do not give random names that missionaries cannot contact with prior preparation.',
              'Talk with the person before giving their name: explain who the missionaries are and what they will do.',
              'Prepare the ground by sharing a hymn, scripture, or testimony before the visit.',
              'Accompany the missionaries to the lesson whenever possible.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Alma 17:2–3'],
          manuals: ['Preach My Gospel, chapter 3 — Teaching by the Spirit'],
          talks: ['President Russell M. Nelson — teachings on the gathering of Israel'],
        }),
      },
      {
        id: 'after_each_lesson',
        title: 'Supporting after Every Lesson',
        summary:
          'Baptism is a beginning, not a finish line. A new convert stays strong when someone walks with them. Missionaries teach; members provide the community of the Church.',
        estimatedMinutes: 12,
        content: blocksToMarkdown([
          {
            type: 'heading',
            text: 'Introduction',
          },
          {
            type: 'paragraph',
            text: 'Baptism is a beginning, not a finish line. A new convert stays strong when someone walks with them. Missionaries teach; members provide the community of the Church.',
          },
          {
            type: 'heading',
            text: 'Principles for accompanying after each lesson',
          },
          {
            type: 'list',
            style: 'bullet',
            items: [
              'Re-teach in your own words what was discussed and ask how they felt living it.',
              'Invite participation: read scriptures together, attend activities, introduce new ward friends.',
              'Be the first line of support: remind them of commitments, clarify simple doctrine, confirm testimonies.',
              'Help their transition toward the temple: explain interviews, covenants, and the peace of the temple.',
            ],
          },
        ]),
        references: convertReferences({
          scriptures: ['Mosiah 18:21'],
          manuals: ['Preach My Gospel, chapter 13 — Retention of New Converts'],
          talks: ['Elder Dieter F. Uchtdorf — "One by One"'],
        }),
      },
    ],
  },
];
