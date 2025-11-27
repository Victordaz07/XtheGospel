export const collectSequentialStrings = (t: (key: string) => string, baseKey: string): string[] => {
  const items: string[] = [];
  let index = 0;
  while (true) {
    const value = t(`${baseKey}.${index}`);
    if (!value || value === `${baseKey}.${index}`) break;
    items.push(value);
    index += 1;
  }
  return items;
};

export interface MemberSkillSection {
  id: string;
  title: string;
  summary: string;
  content: string;
}

const MEMBER_SKILL_SECTION_IDS = [
  'discipuloMisionero',
  'doctrinaDeCristo',
  'compartirElEvangelio',
  'invitaciones',
  'testimonio',
  'apoyoMisioneros',
  'cuidadoConversos',
];

export const getMemberSkillSections = (t: (key: string) => string): MemberSkillSection[] => {
  return MEMBER_SKILL_SECTION_IDS.map((id) => {
    const base = `member.skills.sections.${id}`;
    const title = t(`${base}.title`);
    if (!title || title === `${base}.title`) {
      return null;
    }
    return {
      id,
      title,
      summary: t(`${base}.summary`),
      content: t(`${base}.content`),
    };
  }).filter((section): section is MemberSkillSection => Boolean(section));
};

export interface MemberResourceGroup {
  title: string;
  references: string[];
  comment: string;
}

export interface MemberPropheticQuote {
  label: string;
  text: string;
  usage: string;
}

export interface MemberResourcesData {
  scriptureGroups: MemberResourceGroup[];
  propheticQuotes: MemberPropheticQuote[];
  familyIdeas: string[];
}

export const getMemberResourcesData = (t: (key: string) => string): MemberResourcesData => {
  const scriptureGroups: MemberResourceGroup[] = [];
  let index = 0;
  while (true) {
    const title = t(`member.resources.scriptureGroups.${index}.title`);
    if (!title || title === `member.resources.scriptureGroups.${index}.title`) break;
    const references: string[] = [];
    let refIndex = 0;
    while (true) {
      const reference = t(`member.resources.scriptureGroups.${index}.references.${refIndex}`);
      if (!reference || reference === `member.resources.scriptureGroups.${index}.references.${refIndex}`) break;
      references.push(reference);
      refIndex += 1;
    }
    scriptureGroups.push({
      title,
      references,
      comment: t(`member.resources.scriptureGroups.${index}.comment`),
    });
    index += 1;
  }

  const propheticQuotes: MemberPropheticQuote[] = [];
  index = 0;
  while (true) {
    const label = t(`member.resources.propheticQuotes.${index}.label`);
    if (!label || label === `member.resources.propheticQuotes.${index}.label`) break;
    propheticQuotes.push({
      label,
      text: t(`member.resources.propheticQuotes.${index}.text`),
      usage: t(`member.resources.propheticQuotes.${index}.usage`),
    });
    index += 1;
  }

  const familyIdeas = collectSequentialStrings(t, 'member.resources.familyIdeas');

  return {
    scriptureGroups,
    propheticQuotes,
    familyIdeas,
  };
};

export const getMemberSupportIdeas = (t: (key: string) => string) => {
  const howToHelp = collectSequentialStrings(t, 'member.supportMissionaries.howToHelpList');
  const attitudePoints = collectSequentialStrings(t, 'member.supportMissionaries.attitudeBlock.points');
  return {
    howToHelp,
    attitudePoints,
  };
};

const hasValue = (value: string, path: string) => value && value !== path;

const collectScriptures = (
  t: (key: string) => string,
  baseKey: string
): { ref: string; note: string }[] => {
  const scriptures: { ref: string; note: string }[] = [];
  let index = 0;
  while (true) {
    const refPath = `${baseKey}.${index}.ref`;
    const ref = t(refPath);
    if (!hasValue(ref, refPath)) break;
    scriptures.push({ ref, note: t(`${baseKey}.${index}.note`) });
    index += 1;
  }
  return scriptures;
};

const collectGuideSections = (
  t: (key: string) => string,
  baseKey: string
) => {
  const sections = [];
  let sectionIndex = 0;
  while (true) {
    const titlePath = `${baseKey}.${sectionIndex}.title`;
    const title = t(titlePath);
    if (!hasValue(title, titlePath)) break;
    const description = t(`${baseKey}.${sectionIndex}.description`);
    const id = t(`${baseKey}.${sectionIndex}.id`) || `section-${sectionIndex}`;

    const items = [];
    let itemIndex = 0;
    while (true) {
      const itemTitlePath = `${baseKey}.${sectionIndex}.items.${itemIndex}.title`;
      const itemTitle = t(itemTitlePath);
      if (!hasValue(itemTitle, itemTitlePath)) break;
      const itemBody = t(`${baseKey}.${sectionIndex}.items.${itemIndex}.body`);
      const practices = collectSequentialStrings(
        t,
        `${baseKey}.${sectionIndex}.items.${itemIndex}.practices`
      );
      const steps = collectSequentialStrings(
        t,
        `${baseKey}.${sectionIndex}.items.${itemIndex}.steps`
      );
      items.push({
        title: itemTitle,
        body: itemBody,
        practices: practices.length ? practices : undefined,
        steps: steps.length ? steps : undefined,
      });
      itemIndex += 1;
    }

    sections.push({
      id,
      title,
      description,
      items,
    });
    sectionIndex += 1;
  }
  return sections;
};

const collectAuxOrganizations = (
  t: (key: string) => string,
  baseKey: string
) => {
  const organizations = [];
  let index = 0;
  while (true) {
    const namePath = `${baseKey}.${index}.name`;
    const name = t(namePath);
    if (!hasValue(name, namePath)) break;
    const id = t(`${baseKey}.${index}.id`) || `org-${index}`;
    const focus = t(`${baseKey}.${index}.focus`);
    const ideas = collectSequentialStrings(t, `${baseKey}.${index}.ideas`);
    organizations.push({ id, name, focus, ideas });
    index += 1;
  }
  return organizations;
};

const collectPriesthoodTrack = (
  t: (key: string) => string,
  baseKey: string
) => {
  const title = t(`${baseKey}.title`);
  const objectives = collectSequentialStrings(t, `${baseKey}.objectives`);
  const lessons = [];
  let index = 0;
  while (true) {
    const lessonTitlePath = `${baseKey}.lessons.${index}.title`;
    const lessonTitle = t(lessonTitlePath);
    if (!hasValue(lessonTitle, lessonTitlePath)) break;
    lessons.push({
      title: lessonTitle,
      points: collectSequentialStrings(t, `${baseKey}.lessons.${index}.points`),
    });
    index += 1;
  }
  return { title, objectives, lessons };
};

const collectFlowSteps = (
  t: (key: string) => string,
  baseKey: string
) => {
  const steps = [];
  let index = 0;
  while (true) {
    const titlePath = `${baseKey}.${index}.title`;
    const title = t(titlePath);
    if (!hasValue(title, titlePath)) break;
    const id = t(`${baseKey}.${index}.id`) || `step-${index}`;
    const detail = t(`${baseKey}.${index}.detail`);
    steps.push({ id, title, detail });
    index += 1;
  }
  return steps;
};

export const getMemberConversionCareDeepData = (t: (key: string) => string) => {
  const base = 'member.conversionCare';
  const intro = {
    summary: t(`${base}.intro.summary`),
    doctrinalPoints: collectSequentialStrings(t, `${base}.intro.doctrinalPoints`),
    scriptures: collectScriptures(t, `${base}.intro.scriptures`),
  };

  const memberGuide = {
    title: t(`${base}.memberGuide.title`),
    sections: collectGuideSections(t, `${base}.memberGuide.sections`),
  };

  const auxiliaryGuide = {
    title: t(`${base}.auxiliaryGuide.title`),
    description: t(`${base}.auxiliaryGuide.description`),
    organizations: collectAuxOrganizations(t, `${base}.auxiliaryGuide.organizations`),
  };

  const callings = {
    title: t(`${base}.callingsForNewMembers.title`),
    description: t(`${base}.callingsForNewMembers.description`),
    principles: collectSequentialStrings(t, `${base}.callingsForNewMembers.principles`),
    goodCallings: collectSequentialStrings(t, `${base}.callingsForNewMembers.goodCallings`),
    callingsToDelay: collectSequentialStrings(
      t,
      `${base}.callingsForNewMembers.callingsToDelay`
    ),
  };

  const priesthoodPath = {
    title: t(`${base}.priesthoodPath.title`),
    description: t(`${base}.priesthoodPath.description`),
    aaronic: collectPriesthoodTrack(t, `${base}.priesthoodPath.aaronic`),
    melchizedek: collectPriesthoodTrack(t, `${base}.priesthoodPath.melchizedek`),
  };

  const templePreparation = {
    title: t(`${base}.templePreparation.title`),
    description: t(`${base}.templePreparation.description`),
    topics: collectSequentialStrings(t, `${base}.templePreparation.topics`),
    firstVisit: {
      title: t(`${base}.templePreparation.firstVisit.title`),
      points: collectSequentialStrings(t, `${base}.templePreparation.firstVisit.points`),
    },
  };

  const conversionFlow = {
    title: t(`${base}.conversionFlow.title`),
    description: t(`${base}.conversionFlow.description`),
    steps: collectFlowSteps(t, `${base}.conversionFlow.steps`),
  };

  return {
    title: t(`${base}.title`),
    subtitle: t(`${base}.subtitle`),
    intro,
    memberGuide,
    auxiliaryGuide,
    callings,
    priesthoodPath,
    templePreparation,
    conversionFlow,
  };
};

export const getMemberFriendReflectionQuestions = (t: (key: string) => string): string[] => {
  return collectSequentialStrings(t, 'member.friends.reflectionQuestions');
};

export const getMemberProfileFutureFields = (t: (key: string) => string): string[] => {
  return collectSequentialStrings(t, 'member.profilePrep.futureFields');
};

export const getMemberFriendDoctrinePoints = (t: (key: string) => string): string[] => {
  return collectSequentialStrings(t, 'member.friends.doctrineBlock.points');
};

