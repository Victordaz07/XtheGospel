/**
 * Featured Content Data Model
 * 
 * Gospel-centered, missionary-focused content for the Featured Content section.
 * All content is designed to help members live and share the gospel.
 */

export interface FeaturedContentItem {
  id: string;
  titleKey: string;        // i18n key for title
  descriptionKey: string;  // i18n key for description
  topicTagKey: string;     // i18n key for topic tag
  estMinutes: number;
  targetRole: 'investigator' | 'missionary' | 'member';
  targetRoute: string;
  imageType: 'doctrine_of_christ' | 'new_converts' | 'temple_preparation' | 'member_missionary' | 'scriptures' | 'service' | 'inspiration' | 'leadership';
}

export const featuredContentItems: FeaturedContentItem[] = [
  // Lote 1 — Doctrina de Cristo
  {
    id: 'doctrine-faith-daily',
    titleKey: 'featured.doctrineFaithDaily.title',
    descriptionKey: 'featured.doctrineFaithDaily.description',
    topicTagKey: 'featured.tags.doctrineOfChrist',
    estMinutes: 5,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'doctrine_of_christ',
  },
  {
    id: 'doctrine-repent-joy',
    titleKey: 'featured.doctrineRepentJoy.title',
    descriptionKey: 'featured.doctrineRepentJoy.description',
    topicTagKey: 'featured.tags.doctrineOfChrist',
    estMinutes: 6,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'doctrine_of_christ',
  },
  {
    id: 'covenants-transform',
    titleKey: 'featured.covenantsTransform.title',
    descriptionKey: 'featured.covenantsTransform.description',
    topicTagKey: 'featured.tags.covenants',
    estMinutes: 4,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'doctrine_of_christ',
  },
  {
    id: 'doctrine-endure',
    titleKey: 'featured.doctrineEndure.title',
    descriptionKey: 'featured.doctrineEndure.description',
    topicTagKey: 'featured.tags.perseverance',
    estMinutes: 7,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'doctrine_of_christ',
  },
  // Lote 2 — Obra Misional para Miembros
  {
    id: 'practice-open-conversations',
    titleKey: 'featured.practiceOpenConversations.title',
    descriptionKey: 'featured.practiceOpenConversations.description',
    topicTagKey: 'featured.tags.compassion',
    estMinutes: 4,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'member_missionary',
  },
  {
    id: 'practice-bear-testimony',
    titleKey: 'featured.practiceBearTestimony.title',
    descriptionKey: 'featured.practiceBearTestimony.description',
    topicTagKey: 'featured.tags.testimony',
    estMinutes: 5,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'member_missionary',
  },
  {
    id: 'resources-home-missionary',
    titleKey: 'featured.resourcesHomeMissionary.title',
    descriptionKey: 'featured.resourcesHomeMissionary.description',
    topicTagKey: 'featured.tags.home',
    estMinutes: 6,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'member_missionary',
  },
  {
    id: 'practice-accompany-missionaries',
    titleKey: 'featured.practiceAccompanyMissionaries.title',
    descriptionKey: 'featured.practiceAccompanyMissionaries.description',
    topicTagKey: 'featured.tags.missionaries',
    estMinutes: 7,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'member_missionary',
  },
  // Lote 3 — Cuidado de Conversos
  {
    id: 'converts-first-needs',
    titleKey: 'featured.convertsFirstNeeds.title',
    descriptionKey: 'featured.convertsFirstNeeds.description',
    topicTagKey: 'featured.tags.newConverts',
    estMinutes: 4,
    targetRole: 'member',
    targetRoute: '/member/convertidos',
    imageType: 'new_converts',
  },
  {
    id: 'converts-first-sunday',
    titleKey: 'featured.convertsFirstSunday.title',
    descriptionKey: 'featured.convertsFirstSunday.description',
    topicTagKey: 'featured.tags.accompaniment',
    estMinutes: 5,
    targetRole: 'member',
    targetRoute: '/member/convertidos',
    imageType: 'new_converts',
  },
  {
    id: 'converts-friendship-circle',
    titleKey: 'featured.convertsFriendshipCircle.title',
    descriptionKey: 'featured.convertsFriendshipCircle.description',
    topicTagKey: 'featured.tags.integration',
    estMinutes: 6,
    targetRole: 'member',
    targetRoute: '/member/convertidos',
    imageType: 'new_converts',
  },
  {
    id: 'converts-teach-prayer',
    titleKey: 'featured.convertsTeachPrayer.title',
    descriptionKey: 'featured.convertsTeachPrayer.description',
    topicTagKey: 'featured.tags.prayer',
    estMinutes: 4,
    targetRole: 'member',
    targetRoute: '/member/convertidos',
    imageType: 'new_converts',
  },
  // Lote 4 — Escrituras y Revelación Personal
  {
    id: 'study-today',
    titleKey: 'featured.studyToday.title',
    descriptionKey: 'featured.studyToday.description',
    topicTagKey: 'featured.tags.scriptures',
    estMinutes: 3,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'scriptures',
  },
  {
    id: 'study-recognize-spirit',
    titleKey: 'featured.studyRecognizeSpirit.title',
    descriptionKey: 'featured.studyRecognizeSpirit.description',
    topicTagKey: 'featured.tags.revelation',
    estMinutes: 6,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'scriptures',
  },
  {
    id: 'study-scriptures-hard-times',
    titleKey: 'featured.studyScripturesHardTimes.title',
    descriptionKey: 'featured.studyScripturesHardTimes.description',
    topicTagKey: 'featured.tags.strength',
    estMinutes: 6,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'scriptures',
  },
  {
    id: 'practice-teach-with-scripture',
    titleKey: 'featured.practiceTeachWithScripture.title',
    descriptionKey: 'featured.practiceTeachWithScripture.description',
    topicTagKey: 'featured.tags.teaching',
    estMinutes: 5,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'scriptures',
  },
  // Lote 5 — Templo y Convenios
  {
    id: 'temple-why-matters',
    titleKey: 'featured.templeWhyMatters.title',
    descriptionKey: 'featured.templeWhyMatters.description',
    topicTagKey: 'featured.tags.temple',
    estMinutes: 5,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'temple_preparation',
  },
  {
    id: 'temple-prepare-recommendation',
    titleKey: 'featured.templePrepareRecommendation.title',
    descriptionKey: 'featured.templePrepareRecommendation.description',
    topicTagKey: 'featured.tags.recommendation',
    estMinutes: 6,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'temple_preparation',
  },
  {
    id: 'temple-first-time',
    titleKey: 'featured.templeFirstTime.title',
    descriptionKey: 'featured.templeFirstTime.description',
    topicTagKey: 'featured.tags.temple',
    estMinutes: 7,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'temple_preparation',
  },
  {
    id: 'temple-help-others',
    titleKey: 'featured.templeHelpOthers.title',
    descriptionKey: 'featured.templeHelpOthers.description',
    topicTagKey: 'featured.tags.service',
    estMinutes: 8,
    targetRole: 'member',
    targetRoute: '/member/study',
    imageType: 'temple_preparation',
  },
  // Lote 6 — Motivación Espiritual
  {
    id: 'inspiration-be-light',
    titleKey: 'featured.inspirationBeLight.title',
    descriptionKey: 'featured.inspirationBeLight.description',
    topicTagKey: 'featured.tags.inspiration',
    estMinutes: 2,
    targetRole: 'member',
    targetRoute: '/member/home',
    imageType: 'inspiration',
  },
  {
    id: 'inspiration-christian-action',
    titleKey: 'featured.inspirationChristianAction.title',
    descriptionKey: 'featured.inspirationChristianAction.description',
    topicTagKey: 'featured.tags.action',
    estMinutes: 2,
    targetRole: 'member',
    targetRoute: '/member/home',
    imageType: 'inspiration',
  },
  {
    id: 'inspiration-daily-pace',
    titleKey: 'featured.inspirationDailyPace.title',
    descriptionKey: 'featured.inspirationDailyPace.description',
    topicTagKey: 'featured.tags.patience',
    estMinutes: 3,
    targetRole: 'member',
    targetRoute: '/member/home',
    imageType: 'inspiration',
  },
  {
    id: 'inspiration-one-minute',
    titleKey: 'featured.inspirationOneMinute.title',
    descriptionKey: 'featured.inspirationOneMinute.description',
    topicTagKey: 'featured.tags.christ',
    estMinutes: 1,
    targetRole: 'member',
    targetRoute: '/member/home',
    imageType: 'inspiration',
  },
  // Lote 7 — Referencias y Servicio
  {
    id: 'practice-share-message',
    titleKey: 'featured.practiceShareMessage.title',
    descriptionKey: 'featured.practiceShareMessage.description',
    topicTagKey: 'featured.tags.references',
    estMinutes: 3,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'service',
  },
  {
    id: 'practice-discernment',
    titleKey: 'featured.practiceDiscernment.title',
    descriptionKey: 'featured.practiceDiscernment.description',
    topicTagKey: 'featured.tags.discernment',
    estMinutes: 5,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'service',
  },
  {
    id: 'practice-invite',
    titleKey: 'featured.practiceInvite.title',
    descriptionKey: 'featured.practiceInvite.description',
    topicTagKey: 'featured.tags.invite',
    estMinutes: 4,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'service',
  },
  {
    id: 'practice-service-miracles',
    titleKey: 'featured.practiceServiceMiracles.title',
    descriptionKey: 'featured.practiceServiceMiracles.description',
    topicTagKey: 'featured.tags.service',
    estMinutes: 3,
    targetRole: 'member',
    targetRoute: '/member/support',
    imageType: 'service',
  },
  // Lote 8 — Para Líderes
  {
    id: 'leaders-strengthen-fhe',
    titleKey: 'featured.leadersStrengthenFhe.title',
    descriptionKey: 'featured.leadersStrengthenFhe.description',
    topicTagKey: 'featured.tags.leadership',
    estMinutes: 5,
    targetRole: 'member',
    targetRoute: '/member/convertidos',
    imageType: 'leadership',
  },
  {
    id: 'leaders-converts-culture',
    titleKey: 'featured.leadersConvertsCulture.title',
    descriptionKey: 'featured.leadersConvertsCulture.description',
    topicTagKey: 'featured.tags.leadership',
    estMinutes: 7,
    targetRole: 'member',
    targetRoute: '/member/convertidos',
    imageType: 'leadership',
  },
];

/**
 * Get a random selection of featured content items
 * @param count Number of items to return (default: 2)
 * @returns Array of FeaturedContentItem
 */
export function getRandomFeaturedContent(count: number = 2): FeaturedContentItem[] {
  const shuffled = [...featuredContentItems].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get featured content by tag/category
 */
export function getFeaturedContentByTag(tagKey: string): FeaturedContentItem[] {
  return featuredContentItems.filter(item => item.topicTagKey === tagKey);
}

