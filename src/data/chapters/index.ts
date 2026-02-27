import { Chapter } from '../../types';
import { chapter1_1 } from './chapter1_1';
import { chapter1_2 } from './chapter1_2';
import { chapter1_3 } from './chapter1_3';
import { chapter1_4 } from './chapter1_4';
import { chapter1_5 } from './chapter1_5';
import { chapter1_6 } from './chapter1_6';

export const chapters: Chapter[] = [
  chapter1_1,
  chapter1_2,
  chapter1_3,
  chapter1_4,
  chapter1_5,
  chapter1_6,
];

export const getChapter = (chapterId: string): Chapter | undefined => {
  return chapters.find(chapter => chapter.chapter === chapterId);
};

export const getAllChapters = (): Chapter[] => {
  return chapters;
};

export const getTotalCards = (): number => {
  return chapters.reduce((total, chapter) => total + chapter.cards.length, 0);
};

export const getChapterProgress = (chapterId: string, knownCards: string[]): number => {
  const chapter = getChapter(chapterId);
  if (!chapter) return 0;

  const chapterKnownCards = chapter.cards.filter(card => knownCards.includes(card.id));
  return Math.round((chapterKnownCards.length / chapter.cards.length) * 100);
};

export {
  chapter1_1,
  chapter1_2,
  chapter1_3,
  chapter1_4,
  chapter1_5,
  chapter1_6,
};