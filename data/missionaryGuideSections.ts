import type { LessonId } from './missionaryGuideLessons';

export interface MissionarySectionConfig {
  id: string;
  titleKey: string;
  goalKey?: string;
  descKey: string;
  scriptureRefKey?: string;
  scriptureMainKey?: string;
  scriptureExplanationKey?: string;
  questionsKeys?: string[];
  examplesKeys?: string[];
  dialoguesKeys?: string[];
  objectionsKeys?: string[];
}

// Mapeo de secciones para cada lección basado en el contenido premium ya integrado
export const missionarySectionsByLesson: Record<LessonId, MissionarySectionConfig[]> = {
  lesson_1_restoration: [
    {
      id: 'intro',
      titleKey: 'lesson1.intro',
      goalKey: 'lesson1.intro.goal',
      descKey: 'lesson1.intro.desc',
      scriptureRefKey: 'lesson1.intro.scriptureRef',
      scriptureMainKey: 'lesson1.intro.scriptureMain',
      scriptureExplanationKey: 'lesson1.intro.scriptureExplanation',
      questionsKeys: ['lesson1.intro.questions.0', 'lesson1.intro.questions.1'],
      examplesKeys: ['lesson1.intro.examples.0']
    },
    {
      id: 'christ_church',
      titleKey: 'lesson1.christ_church',
      goalKey: 'lesson1.christ_church.goal',
      descKey: 'lesson1.christ_church.desc',
      scriptureRefKey: 'lesson1.christ_church.scriptureRef',
      scriptureMainKey: 'lesson1.christ_church.scriptureMain',
      scriptureExplanationKey: 'lesson1.christ_church.scriptureExplanation',
      questionsKeys: ['lesson1.christ_church.questions.0', 'lesson1.christ_church.questions.1'],
      examplesKeys: ['lesson1.christ_church.examples.0']
    },
    {
      id: 'apostasy',
      titleKey: 'lesson1.apostasy',
      goalKey: 'lesson1.apostasy.goal',
      descKey: 'lesson1.apostasy.desc',
      scriptureRefKey: 'lesson1.apostasy.scriptureRef',
      scriptureMainKey: 'lesson1.apostasy.scriptureMain',
      scriptureExplanationKey: 'lesson1.apostasy.scriptureExplanation',
      questionsKeys: ['lesson1.apostasy.questions.0', 'lesson1.apostasy.questions.1'],
      examplesKeys: ['lesson1.apostasy.examples.0'],
      objectionsKeys: ['lesson1.apostasy.objections.0']
    },
    {
      id: 'jose_smith_searches',
      titleKey: 'lesson1.jose_smith_searches',
      goalKey: 'lesson1.jose_smith_searches.goal',
      descKey: 'lesson1.jose_smith_searches.desc',
      scriptureRefKey: 'lesson1.jose_smith_searches.scriptureRef',
      scriptureMainKey: 'lesson1.jose_smith_searches.scriptureMain',
      scriptureExplanationKey: 'lesson1.jose_smith_searches.scriptureExplanation',
      questionsKeys: ['lesson1.jose_smith_searches.questions.0', 'lesson1.jose_smith_searches.questions.1'],
      examplesKeys: ['lesson1.jose_smith_searches.examples.0']
    },
    {
      id: 'first_vision',
      titleKey: 'lesson1.first_vision',
      goalKey: 'lesson1.first_vision.goal',
      descKey: 'lesson1.first_vision.desc',
      scriptureRefKey: 'lesson1.first_vision.scriptureRef',
      scriptureMainKey: 'lesson1.first_vision.scriptureMain',
      scriptureExplanationKey: 'lesson1.first_vision.scriptureExplanation',
      questionsKeys: ['lesson1.first_vision.questions.0', 'lesson1.first_vision.questions.1', 'lesson1.first_vision.questions.2'],
      examplesKeys: ['lesson1.first_vision.examples.0'],
      dialoguesKeys: ['lesson1.first_vision.dialogues.0']
    },
    {
      id: 'book_of_mormon',
      titleKey: 'lesson1.book_of_mormon',
      goalKey: 'lesson1.book_of_mormon.goal',
      descKey: 'lesson1.book_of_mormon.desc',
      scriptureRefKey: 'lesson1.book_of_mormon.scriptureRef',
      scriptureMainKey: 'lesson1.book_of_mormon.scriptureMain',
      scriptureExplanationKey: 'lesson1.book_of_mormon.scriptureExplanation',
      questionsKeys: ['lesson1.book_of_mormon.questions.0', 'lesson1.book_of_mormon.questions.1'],
      examplesKeys: ['lesson1.book_of_mormon.examples.0']
    },
    {
      id: 'priesthood_and_church_today',
      titleKey: 'lesson1.priesthood_and_church_today',
      goalKey: 'lesson1.priesthood_and_church_today.goal',
      descKey: 'lesson1.priesthood_and_church_today.desc',
      scriptureRefKey: 'lesson1.priesthood_and_church_today.scriptureRef',
      scriptureMainKey: 'lesson1.priesthood_and_church_today.scriptureMain',
      scriptureExplanationKey: 'lesson1.priesthood_and_church_today.scriptureExplanation',
      questionsKeys: ['lesson1.priesthood_and_church_today.questions.0', 'lesson1.priesthood_and_church_today.questions.1']
    },
    {
      id: 'objections',
      titleKey: 'lesson1.objections',
      goalKey: 'lesson1.objections.goal',
      descKey: 'lesson1.objections.desc',
      objectionsKeys: ['lesson1.objections.objections.0', 'lesson1.objections.objections.1', 'lesson1.objections.objections.2', 'lesson1.objections.objections.3']
    },
    {
      id: 'testimony_and_invitations',
      titleKey: 'lesson1.testimony_and_invitations',
      goalKey: 'lesson1.testimony_and_invitations.goal',
      descKey: 'lesson1.testimony_and_invitations.desc',
      scriptureRefKey: 'lesson1.testimony_and_invitations.scriptureRef',
      scriptureMainKey: 'lesson1.testimony_and_invitations.scriptureMain',
      questionsKeys: ['lesson1.testimony_and_invitations.questions.0', 'lesson1.testimony_and_invitations.questions.1', 'lesson1.testimony_and_invitations.questions.2', 'lesson1.testimony_and_invitations.questions.3']
    }
  ],
  lesson_2_plan_of_salvation: [
    {
      id: 'intro',
      titleKey: 'lesson2.intro',
      goalKey: 'lesson2.intro.goal',
      descKey: 'lesson2.intro.desc',
      scriptureRefKey: 'lesson2.intro.scriptureRef',
      scriptureMainKey: 'lesson2.intro.scriptureMain',
      scriptureExplanationKey: 'lesson2.intro.scriptureExplanation',
      questionsKeys: ['lesson2.intro.questions.0', 'lesson2.intro.questions.1'],
      examplesKeys: ['lesson2.intro.examples.0']
    },
    {
      id: 'premortal_life',
      titleKey: 'lesson2.premortal_life',
      goalKey: 'lesson2.premortal_life.goal',
      descKey: 'lesson2.premortal_life.desc',
      scriptureRefKey: 'lesson2.premortal_life.scriptureRef',
      scriptureMainKey: 'lesson2.premortal_life.scriptureMain',
      scriptureExplanationKey: 'lesson2.premortal_life.scriptureExplanation',
      questionsKeys: ['lesson2.premortal_life.questions.0', 'lesson2.premortal_life.questions.1'],
      examplesKeys: ['lesson2.premortal_life.examples.0']
    },
    {
      id: 'the_fall',
      titleKey: 'lesson2.the_fall',
      goalKey: 'lesson2.the_fall.goal',
      descKey: 'lesson2.the_fall.desc',
      scriptureRefKey: 'lesson2.the_fall.scriptureRef',
      scriptureMainKey: 'lesson2.the_fall.scriptureMain',
      scriptureExplanationKey: 'lesson2.the_fall.scriptureExplanation',
      questionsKeys: ['lesson2.the_fall.questions.0', 'lesson2.the_fall.questions.1'],
      examplesKeys: ['lesson2.the_fall.examples.0']
    },
    {
      id: 'earth_life',
      titleKey: 'lesson2.earth_life',
      goalKey: 'lesson2.earth_life.goal',
      descKey: 'lesson2.earth_life.desc',
      scriptureRefKey: 'lesson2.earth_life.scriptureRef',
      scriptureMainKey: 'lesson2.earth_life.scriptureMain',
      scriptureExplanationKey: 'lesson2.earth_life.scriptureExplanation',
      questionsKeys: ['lesson2.earth_life.questions.0', 'lesson2.earth_life.questions.1'],
      examplesKeys: ['lesson2.earth_life.examples.0']
    },
    {
      id: 'atonement_of_christ',
      titleKey: 'lesson2.atonement_of_christ',
      goalKey: 'lesson2.atonement_of_christ.goal',
      descKey: 'lesson2.atonement_of_christ.desc',
      scriptureRefKey: 'lesson2.atonement_of_christ.scriptureRef',
      scriptureMainKey: 'lesson2.atonement_of_christ.scriptureMain',
      scriptureExplanationKey: 'lesson2.atonement_of_christ.scriptureExplanation',
      questionsKeys: ['lesson2.atonement_of_christ.questions.0', 'lesson2.atonement_of_christ.questions.1'],
      examplesKeys: ['lesson2.atonement_of_christ.examples.0']
    },
    {
      id: 'spirit_world',
      titleKey: 'lesson2.spirit_world',
      goalKey: 'lesson2.spirit_world.goal',
      descKey: 'lesson2.spirit_world.desc',
      scriptureRefKey: 'lesson2.spirit_world.scriptureRef',
      scriptureMainKey: 'lesson2.spirit_world.scriptureMain',
      scriptureExplanationKey: 'lesson2.spirit_world.scriptureExplanation',
      questionsKeys: ['lesson2.spirit_world.questions.0', 'lesson2.spirit_world.questions.1'],
      examplesKeys: ['lesson2.spirit_world.examples.0']
    },
    {
      id: 'resurrection_judgment',
      titleKey: 'lesson2.resurrection_judgment',
      goalKey: 'lesson2.resurrection_judgment.goal',
      descKey: 'lesson2.resurrection_judgment.desc',
      scriptureRefKey: 'lesson2.resurrection_judgment.scriptureRef',
      scriptureMainKey: 'lesson2.resurrection_judgment.scriptureMain',
      scriptureExplanationKey: 'lesson2.resurrection_judgment.scriptureExplanation',
      questionsKeys: ['lesson2.resurrection_judgment.questions.0', 'lesson2.resurrection_judgment.questions.1']
    },
    {
      id: 'kingdoms_of_glory',
      titleKey: 'lesson2.kingdoms_of_glory',
      goalKey: 'lesson2.kingdoms_of_glory.goal',
      descKey: 'lesson2.kingdoms_of_glory.desc',
      scriptureRefKey: 'lesson2.kingdoms_of_glory.scriptureRef',
      scriptureMainKey: 'lesson2.kingdoms_of_glory.scriptureMain',
      scriptureExplanationKey: 'lesson2.kingdoms_of_glory.scriptureExplanation',
      questionsKeys: ['lesson2.kingdoms_of_glory.questions.0', 'lesson2.kingdoms_of_glory.questions.1']
    },
    {
      id: 'objections',
      titleKey: 'lesson2.objections',
      goalKey: 'lesson2.objections.goal',
      descKey: 'lesson2.objections.desc',
      objectionsKeys: ['lesson2.objections.objections.0', 'lesson2.objections.objections.1', 'lesson2.objections.objections.2']
    },
    {
      id: 'testimony_and_invitations',
      titleKey: 'lesson2.testimony_and_invitations',
      goalKey: 'lesson2.testimony_and_invitations.goal',
      descKey: 'lesson2.testimony_and_invitations.desc',
      scriptureRefKey: 'lesson2.testimony_and_invitations.scriptureRef',
      scriptureMainKey: 'lesson2.testimony_and_invitations.scriptureMain',
      questionsKeys: ['lesson2.testimony_and_invitations.questions.0', 'lesson2.testimony_and_invitations.questions.1', 'lesson2.testimony_and_invitations.questions.2', 'lesson2.testimony_and_invitations.questions.3']
    }
  ],
  lesson_3_gospel_of_jesus_christ: [
    {
      id: 'intro',
      titleKey: 'lesson3.intro',
      goalKey: 'lesson3.intro.goal',
      descKey: 'lesson3.intro.desc',
      scriptureRefKey: 'lesson3.intro.scriptureRef',
      scriptureMainKey: 'lesson3.intro.scriptureMain',
      scriptureExplanationKey: 'lesson3.intro.scriptureExplanation',
      questionsKeys: ['lesson3.intro.questions.0', 'lesson3.intro.questions.1'],
      examplesKeys: ['lesson3.intro.examples.0']
    },
    {
      id: 'faith_in_christ',
      titleKey: 'lesson3.faith_in_christ',
      goalKey: 'lesson3.faith_in_christ.goal',
      descKey: 'lesson3.faith_in_christ.desc',
      scriptureRefKey: 'lesson3.faith_in_christ.scriptureRef',
      scriptureMainKey: 'lesson3.faith_in_christ.scriptureMain',
      scriptureExplanationKey: 'lesson3.faith_in_christ.scriptureExplanation',
      questionsKeys: ['lesson3.faith_in_christ.questions.0', 'lesson3.faith_in_christ.questions.1'],
      examplesKeys: ['lesson3.faith_in_christ.examples.0']
    },
    {
      id: 'repentance',
      titleKey: 'lesson3.repentance',
      goalKey: 'lesson3.repentance.goal',
      descKey: 'lesson3.repentance.desc',
      scriptureRefKey: 'lesson3.repentance.scriptureRef',
      scriptureMainKey: 'lesson3.repentance.scriptureMain',
      scriptureExplanationKey: 'lesson3.repentance.scriptureExplanation',
      questionsKeys: ['lesson3.repentance.questions.0', 'lesson3.repentance.questions.1'],
      examplesKeys: ['lesson3.repentance.examples.0'],
      dialoguesKeys: ['lesson3.repentance.dialogues.0']
    },
    {
      id: 'baptism',
      titleKey: 'lesson3.baptism',
      goalKey: 'lesson3.baptism.goal',
      descKey: 'lesson3.baptism.desc',
      scriptureRefKey: 'lesson3.baptism.scriptureRef',
      scriptureMainKey: 'lesson3.baptism.scriptureMain',
      scriptureExplanationKey: 'lesson3.baptism.scriptureExplanation',
      questionsKeys: ['lesson3.baptism.questions.0', 'lesson3.baptism.questions.1'],
      examplesKeys: ['lesson3.baptism.examples.0'],
      objectionsKeys: ['lesson3.baptism.objections.0']
    },
    {
      id: 'gift_of_holy_ghost',
      titleKey: 'lesson3.gift_of_holy_ghost',
      goalKey: 'lesson3.gift_of_holy_ghost.goal',
      descKey: 'lesson3.gift_of_holy_ghost.desc',
      scriptureRefKey: 'lesson3.gift_of_holy_ghost.scriptureRef',
      scriptureMainKey: 'lesson3.gift_of_holy_ghost.scriptureMain',
      scriptureExplanationKey: 'lesson3.gift_of_holy_ghost.scriptureExplanation',
      questionsKeys: ['lesson3.gift_of_holy_ghost.questions.0', 'lesson3.gift_of_holy_ghost.questions.1'],
      examplesKeys: ['lesson3.gift_of_holy_ghost.examples.0']
    },
    {
      id: 'endure_to_the_end',
      titleKey: 'lesson3.endure_to_the_end',
      goalKey: 'lesson3.endure_to_the_end.goal',
      descKey: 'lesson3.endure_to_the_end.desc',
      scriptureRefKey: 'lesson3.endure_to_the_end.scriptureRef',
      scriptureMainKey: 'lesson3.endure_to_the_end.scriptureMain',
      scriptureExplanationKey: 'lesson3.endure_to_the_end.scriptureExplanation',
      questionsKeys: ['lesson3.endure_to_the_end.questions.0', 'lesson3.endure_to_the_end.questions.1'],
      examplesKeys: ['lesson3.endure_to_the_end.examples.0']
    },
    {
      id: 'objections',
      titleKey: 'lesson3.objections',
      goalKey: 'lesson3.objections.goal',
      descKey: 'lesson3.objections.desc',
      objectionsKeys: ['lesson3.objections.objections.0', 'lesson3.objections.objections.1', 'lesson3.objections.objections.2']
    },
    {
      id: 'testimony_and_invitations',
      titleKey: 'lesson3.testimony_and_invitations',
      goalKey: 'lesson3.testimony_and_invitations.goal',
      descKey: 'lesson3.testimony_and_invitations.desc',
      scriptureRefKey: 'lesson3.testimony_and_invitations.scriptureRef',
      scriptureMainKey: 'lesson3.testimony_and_invitations.scriptureMain',
      questionsKeys: ['lesson3.testimony_and_invitations.questions.0', 'lesson3.testimony_and_invitations.questions.1', 'lesson3.testimony_and_invitations.questions.2', 'lesson3.testimony_and_invitations.questions.3']
    }
  ],
  lesson_4_commandments: [
    {
      id: 'intro',
      titleKey: 'lesson4.intro',
      goalKey: 'lesson4.intro.goal',
      descKey: 'lesson4.intro.desc',
      scriptureRefKey: 'lesson4.intro.scriptureRef',
      scriptureMainKey: 'lesson4.intro.scriptureMain',
      scriptureExplanationKey: 'lesson4.intro.scriptureExplanation',
      questionsKeys: ['lesson4.intro.questions.0', 'lesson4.intro.questions.1'],
      examplesKeys: ['lesson4.intro.examples.0']
    },
    {
      id: 'prophets_modern_revelation',
      titleKey: 'lesson4.prophets_modern_revelation',
      goalKey: 'lesson4.prophets_modern_revelation.goal',
      descKey: 'lesson4.prophets_modern_revelation.desc',
      scriptureRefKey: 'lesson4.prophets_modern_revelation.scriptureRef',
      scriptureMainKey: 'lesson4.prophets_modern_revelation.scriptureMain',
      scriptureExplanationKey: 'lesson4.prophets_modern_revelation.scriptureExplanation',
      questionsKeys: ['lesson4.prophets_modern_revelation.questions.0', 'lesson4.prophets_modern_revelation.questions.1'],
      examplesKeys: ['lesson4.prophets_modern_revelation.examples.0']
    },
    {
      id: 'pray_daily',
      titleKey: 'lesson4.pray_daily',
      goalKey: 'lesson4.pray_daily.goal',
      descKey: 'lesson4.pray_daily.desc',
      scriptureRefKey: 'lesson4.pray_daily.scriptureRef',
      scriptureMainKey: 'lesson4.pray_daily.scriptureMain',
      scriptureExplanationKey: 'lesson4.pray_daily.scriptureExplanation',
      questionsKeys: ['lesson4.pray_daily.questions.0', 'lesson4.pray_daily.questions.1'],
      examplesKeys: ['lesson4.pray_daily.examples.0']
    },
    {
      id: 'scripture_study',
      titleKey: 'lesson4.scripture_study',
      goalKey: 'lesson4.scripture_study.goal',
      descKey: 'lesson4.scripture_study.desc',
      scriptureRefKey: 'lesson4.scripture_study.scriptureRef',
      scriptureMainKey: 'lesson4.scripture_study.scriptureMain',
      scriptureExplanationKey: 'lesson4.scripture_study.scriptureExplanation',
      questionsKeys: ['lesson4.scripture_study.questions.0', 'lesson4.scripture_study.questions.1'],
      examplesKeys: ['lesson4.scripture_study.examples.0']
    },
    {
      id: 'sabbath_day',
      titleKey: 'lesson4.sabbath_day',
      goalKey: 'lesson4.sabbath_day.goal',
      descKey: 'lesson4.sabbath_day.desc',
      scriptureRefKey: 'lesson4.sabbath_day.scriptureRef',
      scriptureMainKey: 'lesson4.sabbath_day.scriptureMain',
      scriptureExplanationKey: 'lesson4.sabbath_day.scriptureExplanation',
      questionsKeys: ['lesson4.sabbath_day.questions.0', 'lesson4.sabbath_day.questions.1'],
      examplesKeys: ['lesson4.sabbath_day.examples.0']
    },
    {
      id: 'law_of_chastity',
      titleKey: 'lesson4.law_of_chastity',
      goalKey: 'lesson4.law_of_chastity.goal',
      descKey: 'lesson4.law_of_chastity.desc',
      scriptureRefKey: 'lesson4.law_of_chastity.scriptureRef',
      scriptureMainKey: 'lesson4.law_of_chastity.scriptureMain',
      scriptureExplanationKey: 'lesson4.law_of_chastity.scriptureExplanation',
      questionsKeys: ['lesson4.law_of_chastity.questions.0', 'lesson4.law_of_chastity.questions.1'],
      examplesKeys: ['lesson4.law_of_chastity.examples.0'],
      objectionsKeys: ['lesson4.law_of_chastity.objections.0']
    },
    {
      id: 'word_of_wisdom',
      titleKey: 'lesson4.word_of_wisdom',
      goalKey: 'lesson4.word_of_wisdom.goal',
      descKey: 'lesson4.word_of_wisdom.desc',
      scriptureRefKey: 'lesson4.word_of_wisdom.scriptureRef',
      scriptureMainKey: 'lesson4.word_of_wisdom.scriptureMain',
      scriptureExplanationKey: 'lesson4.word_of_wisdom.scriptureExplanation',
      questionsKeys: ['lesson4.word_of_wisdom.questions.0', 'lesson4.word_of_wisdom.questions.1'],
      examplesKeys: ['lesson4.word_of_wisdom.examples.0']
    },
    {
      id: 'tithing',
      titleKey: 'lesson4.tithing',
      goalKey: 'lesson4.tithing.goal',
      descKey: 'lesson4.tithing.desc',
      scriptureRefKey: 'lesson4.tithing.scriptureRef',
      scriptureMainKey: 'lesson4.tithing.scriptureMain',
      scriptureExplanationKey: 'lesson4.tithing.scriptureExplanation',
      questionsKeys: ['lesson4.tithing.questions.0', 'lesson4.tithing.questions.1'],
      examplesKeys: ['lesson4.tithing.examples.0']
    },
    {
      id: 'chastity_additional_obedience',
      titleKey: 'lesson4.chastity_additional_obedience',
      goalKey: 'lesson4.chastity_additional_obedience.goal',
      descKey: 'lesson4.chastity_additional_obedience.desc',
      scriptureRefKey: 'lesson4.chastity_additional_obedience.scriptureRef',
      scriptureMainKey: 'lesson4.chastity_additional_obedience.scriptureMain',
      scriptureExplanationKey: 'lesson4.chastity_additional_obedience.scriptureExplanation',
      questionsKeys: ['lesson4.chastity_additional_obedience.questions.0', 'lesson4.chastity_additional_obedience.questions.1']
    },
    {
      id: 'objections',
      titleKey: 'lesson4.objections',
      goalKey: 'lesson4.objections.goal',
      descKey: 'lesson4.objections.desc',
      objectionsKeys: ['lesson4.objections.objections.0', 'lesson4.objections.objections.1', 'lesson4.objections.objections.2']
    },
    {
      id: 'testimony_and_invitations',
      titleKey: 'lesson4.testimony_and_invitations',
      goalKey: 'lesson4.testimony_and_invitations.goal',
      descKey: 'lesson4.testimony_and_invitations.desc',
      scriptureRefKey: 'lesson4.testimony_and_invitations.scriptureRef',
      scriptureMainKey: 'lesson4.testimony_and_invitations.scriptureMain',
      questionsKeys: ['lesson4.testimony_and_invitations.questions.0', 'lesson4.testimony_and_invitations.questions.1', 'lesson4.testimony_and_invitations.questions.2', 'lesson4.testimony_and_invitations.questions.3']
    }
  ],
  lesson_5_ordinances_and_covenants: [
    {
      id: 'intro',
      titleKey: 'lesson5.intro',
      goalKey: 'lesson5.intro.goal',
      descKey: 'lesson5.intro.desc',
      scriptureRefKey: 'lesson5.intro.scriptureRef',
      scriptureMainKey: 'lesson5.intro.scriptureMain',
      scriptureExplanationKey: 'lesson5.intro.scriptureExplanation',
      questionsKeys: ['lesson5.intro.questions.0', 'lesson5.intro.questions.1'],
      examplesKeys: ['lesson5.intro.examples.0']
    },
    {
      id: 'what_is_covenant',
      titleKey: 'lesson5.what_is_covenant',
      goalKey: 'lesson5.what_is_covenant.goal',
      descKey: 'lesson5.what_is_covenant.desc',
      scriptureRefKey: 'lesson5.what_is_covenant.scriptureRef',
      scriptureMainKey: 'lesson5.what_is_covenant.scriptureMain',
      scriptureExplanationKey: 'lesson5.what_is_covenant.scriptureExplanation',
      questionsKeys: ['lesson5.what_is_covenant.questions.0', 'lesson5.what_is_covenant.questions.1']
    },
    {
      id: 'baptism_and_confirmation_as_covenant',
      titleKey: 'lesson5.baptism_and_confirmation_as_covenant',
      goalKey: 'lesson5.baptism_and_confirmation_as_covenant.goal',
      descKey: 'lesson5.baptism_and_confirmation_as_covenant.desc',
      scriptureRefKey: 'lesson5.baptism_and_confirmation_as_covenant.scriptureRef',
      scriptureMainKey: 'lesson5.baptism_and_confirmation_as_covenant.scriptureMain',
      scriptureExplanationKey: 'lesson5.baptism_and_confirmation_as_covenant.scriptureExplanation',
      questionsKeys: ['lesson5.baptism_and_confirmation_as_covenant.questions.0', 'lesson5.baptism_and_confirmation_as_covenant.questions.1'],
      examplesKeys: ['lesson5.baptism_and_confirmation_as_covenant.examples.0']
    },
    {
      id: 'sacrament_renewal',
      titleKey: 'lesson5.sacrament_renewal',
      goalKey: 'lesson5.sacrament_renewal.goal',
      descKey: 'lesson5.sacrament_renewal.desc',
      scriptureRefKey: 'lesson5.sacrament_renewal.scriptureRef',
      scriptureMainKey: 'lesson5.sacrament_renewal.scriptureMain',
      scriptureExplanationKey: 'lesson5.sacrament_renewal.scriptureExplanation',
      questionsKeys: ['lesson5.sacrament_renewal.questions.0', 'lesson5.sacrament_renewal.questions.1'],
      examplesKeys: ['lesson5.sacrament_renewal.examples.0']
    },
    {
      id: 'priesthood_and_ordinances',
      titleKey: 'lesson5.priesthood_and_ordinances',
      goalKey: 'lesson5.priesthood_and_ordinances.goal',
      descKey: 'lesson5.priesthood_and_ordinances.desc',
      scriptureRefKey: 'lesson5.priesthood_and_ordinances.scriptureRef',
      scriptureMainKey: 'lesson5.priesthood_and_ordinances.scriptureMain',
      scriptureExplanationKey: 'lesson5.priesthood_and_ordinances.scriptureExplanation',
      questionsKeys: ['lesson5.priesthood_and_ordinances.questions.0', 'lesson5.priesthood_and_ordinances.questions.1'],
      examplesKeys: ['lesson5.priesthood_and_ordinances.examples.0']
    },
    {
      id: 'temple_and_eternal_family',
      titleKey: 'lesson5.temple_and_eternal_family',
      goalKey: 'lesson5.temple_and_eternal_family.goal',
      descKey: 'lesson5.temple_and_eternal_family.desc',
      scriptureRefKey: 'lesson5.temple_and_eternal_family.scriptureRef',
      scriptureMainKey: 'lesson5.temple_and_eternal_family.scriptureMain',
      scriptureExplanationKey: 'lesson5.temple_and_eternal_family.scriptureExplanation',
      questionsKeys: ['lesson5.temple_and_eternal_family.questions.0', 'lesson5.temple_and_eternal_family.questions.1'],
      examplesKeys: ['lesson5.temple_and_eternal_family.examples.0']
    },
    {
      id: 'living_covenants_daily',
      titleKey: 'lesson5.living_covenants_daily',
      goalKey: 'lesson5.living_covenants_daily.goal',
      descKey: 'lesson5.living_covenants_daily.desc',
      scriptureRefKey: 'lesson5.living_covenants_daily.scriptureRef',
      scriptureMainKey: 'lesson5.living_covenants_daily.scriptureMain',
      scriptureExplanationKey: 'lesson5.living_covenants_daily.scriptureExplanation',
      questionsKeys: ['lesson5.living_covenants_daily.questions.0', 'lesson5.living_covenants_daily.questions.1'],
      examplesKeys: ['lesson5.living_covenants_daily.examples.0']
    },
    {
      id: 'objections',
      titleKey: 'lesson5.objections',
      goalKey: 'lesson5.objections.goal',
      descKey: 'lesson5.objections.desc',
      objectionsKeys: ['lesson5.objections.objections.0', 'lesson5.objections.objections.1', 'lesson5.objections.objections.2']
    },
    {
      id: 'testimony_and_invitations',
      titleKey: 'lesson5.testimony_and_invitations',
      goalKey: 'lesson5.testimony_and_invitations.goal',
      descKey: 'lesson5.testimony_and_invitations.desc',
      scriptureRefKey: 'lesson5.testimony_and_invitations.scriptureRef',
      scriptureMainKey: 'lesson5.testimony_and_invitations.scriptureMain',
      questionsKeys: ['lesson5.testimony_and_invitations.questions.0', 'lesson5.testimony_and_invitations.questions.1', 'lesson5.testimony_and_invitations.questions.2', 'lesson5.testimony_and_invitations.questions.3']
    }
  ],
  lesson_6_laws_and_ordinances: [
    {
      id: 'intro',
      titleKey: 'lesson6.intro',
      goalKey: 'lesson6.intro.goal',
      descKey: 'lesson6.intro.desc',
      scriptureRefKey: 'lesson6.intro.scriptureRef',
      scriptureMainKey: 'lesson6.intro.scriptureMain',
      scriptureExplanationKey: 'lesson6.intro.scriptureExplanation',
      questionsKeys: ['lesson6.intro.questions.0', 'lesson6.intro.questions.1'],
      examplesKeys: ['lesson6.intro.examples.0']
    },
    {
      id: 'priesthood',
      titleKey: 'lesson6.priesthood',
      goalKey: 'lesson6.priesthood.goal',
      descKey: 'lesson6.priesthood.desc',
      scriptureRefKey: 'lesson6.priesthood.scriptureRef',
      scriptureMainKey: 'lesson6.priesthood.scriptureMain',
      scriptureExplanationKey: 'lesson6.priesthood.scriptureExplanation',
      questionsKeys: ['lesson6.priesthood.questions.0', 'lesson6.priesthood.questions.1'],
      examplesKeys: ['lesson6.priesthood.examples.0']
    },
    {
      id: 'missionary_work',
      titleKey: 'lesson6.missionary_work',
      goalKey: 'lesson6.missionary_work.goal',
      descKey: 'lesson6.missionary_work.desc',
      scriptureRefKey: 'lesson6.missionary_work.scriptureRef',
      scriptureMainKey: 'lesson6.missionary_work.scriptureMain',
      scriptureExplanationKey: 'lesson6.missionary_work.scriptureExplanation',
      questionsKeys: ['lesson6.missionary_work.questions.0', 'lesson6.missionary_work.questions.1'],
      examplesKeys: ['lesson6.missionary_work.examples.0']
    },
    {
      id: 'service_and_charity',
      titleKey: 'lesson6.service_and_charity',
      goalKey: 'lesson6.service_and_charity.goal',
      descKey: 'lesson6.service_and_charity.desc',
      scriptureRefKey: 'lesson6.service_and_charity.scriptureRef',
      scriptureMainKey: 'lesson6.service_and_charity.scriptureMain',
      scriptureExplanationKey: 'lesson6.service_and_charity.scriptureExplanation',
      questionsKeys: ['lesson6.service_and_charity.questions.0', 'lesson6.service_and_charity.questions.1'],
      examplesKeys: ['lesson6.service_and_charity.examples.0']
    },
    {
      id: 'temple_work',
      titleKey: 'lesson6.temple_work',
      goalKey: 'lesson6.temple_work.goal',
      descKey: 'lesson6.temple_work.desc',
      scriptureRefKey: 'lesson6.temple_work.scriptureRef',
      scriptureMainKey: 'lesson6.temple_work.scriptureMain',
      scriptureExplanationKey: 'lesson6.temple_work.scriptureExplanation',
      questionsKeys: ['lesson6.temple_work.questions.0', 'lesson6.temple_work.questions.1'],
      examplesKeys: ['lesson6.temple_work.examples.0']
    },
    {
      id: 'family_history',
      titleKey: 'lesson6.family_history',
      goalKey: 'lesson6.family_history.goal',
      descKey: 'lesson6.family_history.desc',
      scriptureRefKey: 'lesson6.family_history.scriptureRef',
      scriptureMainKey: 'lesson6.family_history.scriptureMain',
      scriptureExplanationKey: 'lesson6.family_history.scriptureExplanation',
      questionsKeys: ['lesson6.family_history.questions.0', 'lesson6.family_history.questions.1'],
      examplesKeys: ['lesson6.family_history.examples.0']
    },
    {
      id: 'endure_faithfully',
      titleKey: 'lesson6.endure_faithfully',
      goalKey: 'lesson6.endure_faithfully.goal',
      descKey: 'lesson6.endure_faithfully.desc',
      scriptureRefKey: 'lesson6.endure_faithfully.scriptureRef',
      scriptureMainKey: 'lesson6.endure_faithfully.scriptureMain',
      scriptureExplanationKey: 'lesson6.endure_faithfully.scriptureExplanation',
      questionsKeys: ['lesson6.endure_faithfully.questions.0', 'lesson6.endure_faithfully.questions.1']
    },
    {
      id: 'objections',
      titleKey: 'lesson6.objections',
      goalKey: 'lesson6.objections.goal',
      descKey: 'lesson6.objections.desc',
      objectionsKeys: ['lesson6.objections.objections.0', 'lesson6.objections.objections.1', 'lesson6.objections.objections.2']
    },
    {
      id: 'testimony_and_invitations',
      titleKey: 'lesson6.testimony_and_invitations',
      goalKey: 'lesson6.testimony_and_invitations.goal',
      descKey: 'lesson6.testimony_and_invitations.desc',
      scriptureRefKey: 'lesson6.testimony_and_invitations.scriptureRef',
      scriptureMainKey: 'lesson6.testimony_and_invitations.scriptureMain',
      questionsKeys: ['lesson6.testimony_and_invitations.questions.0', 'lesson6.testimony_and_invitations.questions.1', 'lesson6.testimony_and_invitations.questions.2', 'lesson6.testimony_and_invitations.questions.3']
    }
  ]
};

