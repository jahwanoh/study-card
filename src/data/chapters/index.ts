import { Chapter } from '../../types';
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';

export const chapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
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
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
};