/**
 * Type-safe member translation keys
 * 
 * This file provides type-safe access to member namespace translations.
 * Usage:
 *   import { useMemberT, MemberKey } from '../i18n/memberKeys';
 *   const { t } = useMemberT();
 *   const title = t('home.title'); // Type-safe!
 */

import { useI18n } from '../context/I18nContext';

/**
 * Union type of all member translation keys (without the "member." prefix)
 * This ensures type safety when using the member translation helper
 */
export type MemberKey =
  // Meta
  | 'meta.roleName'
  | 'meta.shortDescription'
  | 'meta.longDescription'
  | 'meta.futureProfileNote'
  // Home
  | 'home.title'
  | 'home.welcomeTitle'
  | 'home.welcomeSubtitle'
  | 'home.heroCallToAction'
  | 'home.cards.study.title'
  | 'home.cards.study.subtitle'
  | 'home.cards.study.cta'
  | 'home.cards.friends.title'
  | 'home.cards.friends.subtitle'
  | 'home.cards.friends.cta'
  | 'home.cards.support.title'
  | 'home.cards.support.subtitle'
  | 'home.cards.support.cta'
  | 'home.cards.conversionCare.title'
  | 'home.cards.conversionCare.subtitle'
  | 'home.cards.conversionCare.cta'
  // Devotional
  | 'devotional.title'
  | 'devotional.promptTitle'
  | 'devotional.description'
  | 'devotional.feltSomethingQuestion'
  | 'devotional.feltSomethingYes'
  | 'devotional.feltSomethingNo'
  | 'devotional.reflectionPlaceholder'
  | 'devotional.exampleScriptures'
  | 'devotional.exampleQuote'
  // Profile Prep
  | 'profilePrep.sectionTitle'
  | 'profilePrep.sectionDescription'
  | 'profilePrep.futureFieldsDescription'
  | 'profilePrep.futureFields'
  | 'profilePrep.motivationText'
  // Friends
  | 'friends.title'
  | 'friends.description'
  | 'friends.explanation'
  | 'friends.labels.name'
  | 'friends.labels.relationship'
  | 'friends.labels.spiritualSituation'
  | 'friends.labels.lastPositiveContact'
  | 'friends.labels.preparedLevel'
  | 'friends.labels.notes'
  | 'friends.labels.isPraying'
  | 'friends.labels.readyForMissionaries'
  | 'friends.preparedLevels.cold'
  | 'friends.preparedLevels.warm'
  | 'friends.preparedLevels.hot'
  | 'friends.spiritualNotesHint'
  | 'friends.reflectionQuestions'
  | 'friends.doctrineBlock.title'
  | 'friends.doctrineBlock.points'
  // Skills
  | 'skills.title'
  | 'skills.intro'
  | 'skills.sections.discipuloMisionero.title'
  | 'skills.sections.discipuloMisionero.summary'
  | 'skills.sections.discipuloMisionero.content'
  | 'skills.sections.doctrinaDeCristo.title'
  | 'skills.sections.doctrinaDeCristo.summary'
  | 'skills.sections.doctrinaDeCristo.content'
  | 'skills.sections.compartirElEvangelio.title'
  | 'skills.sections.compartirElEvangelio.summary'
  | 'skills.sections.compartirElEvangelio.content'
  | 'skills.sections.invitaciones.title'
  | 'skills.sections.invitaciones.summary'
  | 'skills.sections.invitaciones.content'
  | 'skills.sections.testimonio.title'
  | 'skills.sections.testimonio.summary'
  | 'skills.sections.testimonio.content'
  | 'skills.sections.apoyoMisioneros.title'
  | 'skills.sections.apoyoMisioneros.summary'
  | 'skills.sections.apoyoMisioneros.content'
  | 'skills.sections.cuidadoConversos.title'
  | 'skills.sections.cuidadoConversos.summary'
  | 'skills.sections.cuidadoConversos.content'
  // Resources
  | 'resources.title'
  | 'resources.intro'
  | 'resources.propheticQuotesTitle'
  | 'resources.familyIdeasTitle'
  | 'resources.scriptureGroups'
  | 'resources.propheticQuotes'
  | 'resources.familyIdeas'
  // Support Missionaries
  | 'supportMissionaries.title'
  | 'supportMissionaries.intro'
  | 'supportMissionaries.activitiesTitle'
  | 'supportMissionaries.howToHelpTitle'
  | 'supportMissionaries.form.name'
  | 'supportMissionaries.form.availability'
  | 'supportMissionaries.form.notes'
  | 'supportMissionaries.form.friendName'
  | 'supportMissionaries.form.contact'
  | 'supportMissionaries.howToHelpList'
  | 'supportMissionaries.attitudeBlock.title'
  | 'supportMissionaries.attitudeBlock.points'
  // Conversion Care
  | 'conversionCare.title'
  | 'conversionCare.intro'
  | 'conversionCare.principlesTitle'
  | 'conversionCare.actionsTitle'
  | 'conversionCare.principles'
  | 'conversionCare.simpleActions'
  // View Mode
  | 'viewMode.member'
  | 'viewMode.leader'
  | 'viewMode.helper'
  | 'viewMode.leaderLocked'
  | 'viewMode.badge.member'
  | 'viewMode.badge.leader'
  | 'viewMode.title'
  | 'viewMode.subtitle'
  // UI
  | 'ui.addFriend'
  | 'ui.editFriend'
  | 'ui.save'
  | 'ui.cancel'
  | 'ui.addInteraction'
  | 'ui.interactionPlaceholder'
  | 'ui.readyForMissionaries'
  | 'ui.friendListEmpty'
  | 'ui.activitiesComingSoon'
  | 'ui.offerCompanionship'
  | 'ui.sendReferral'
  | 'ui.comingSoon'
  | 'ui.newFriendTitle'
  | 'ui.actions'
  | 'ui.notes'
  | 'ui.yes'
  | 'ui.no';

/**
 * Type-safe member translation hook
 * 
 * @example
 * ```tsx
 * const { t } = useMemberT();
 * const title = t('home.title'); // Type-safe!
 * ```
 */
export const useMemberT = () => {
  const base = useI18n();
  return {
    /**
     * Type-safe translation function for member namespace
     * @param key - Member translation key (without "member." prefix)
     * @param vars - Optional variables for string interpolation
     */
    t: (key: MemberKey, vars?: Record<string, string | number>): string => {
      return base.t(`member.${key}`, vars);
    },
    locale: base.locale,
  };
};

/**
 * Helper function to get a member translation (for use outside React components)
 * Note: This requires access to the I18nContext, so prefer useMemberT() in components
 */
export function tMember(
  t: (path: string, vars?: Record<string, string | number>) => string,
  key: MemberKey,
  vars?: Record<string, string | number>
): string {
  return t(`member.${key}`, vars);
}

