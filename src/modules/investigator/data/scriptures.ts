/**
 * Investigator Scriptures Data
 * MVP: Daily scriptures for spiritual uplift
 */

export interface Scripture {
  id: string;
  reference: string;
  text: string;
  context?: string;
}

export const scriptures: Scripture[] = [
  {
    id: 'matthew-7-7',
    reference: 'Matthew 7:7',
    text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.',
    context: 'Jesus teaching about prayer',
  },
  {
    id: 'john-3-16',
    reference: 'John 3:16',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    context: 'Jesus speaking to Nicodemus',
  },
  {
    id: 'james-1-5',
    reference: 'James 1:5',
    text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
    context: 'James on seeking wisdom',
  },
  {
    id: 'moroni-10-4',
    reference: 'Moroni 10:4',
    text: 'And when ye shall receive these things, I would exhort you that ye would ask God, the Eternal Father, in the name of Christ, if these things are not true.',
    context: "Moroni's promise",
  },
  {
    id: 'john-14-6',
    reference: 'John 14:6',
    text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.',
    context: 'Jesus teaching the way to the Father',
  },
];

export function getScriptureById(id: string): Scripture | undefined {
  return scriptures.find((s) => s.id === id);
}

export function getScriptureByReference(reference: string): Scripture | undefined {
  return scriptures.find((s) => s.reference.toLowerCase() === reference.toLowerCase());
}

export function getDailyScripture(): Scripture {
  // Simple daily rotation based on day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return scriptures[dayOfYear % scriptures.length];
}

export function getHomeScripture(): Scripture {
  return getScriptureByReference('Matthew 7:7') || scriptures[0];
}

export function getLessonDetailScripture(): Scripture {
  return getScriptureByReference('John 3:16') || scriptures[1];
}
