export interface Card {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'essential' | 'moderate' | 'advanced';
}

export interface Chapter {
  chapter: string;
  title: string;
  description: string;
  cards: Card[];
}

export interface StudySession {
  chapterId: string;
  startedAt: Date;
  completedAt?: Date;
  knownCards: string[];
  unsureCards: string[];
  currentCardIndex: number;
  totalCards: number;
}

export interface UserProgress {
  chaptersCompleted: string[];
  totalCardsStudied: number;
  sessions: StudySession[];
  unsureCards: {
    [chapterId: string]: string[];
  };
}

export type CardResponse = 'know' | 'unsure';