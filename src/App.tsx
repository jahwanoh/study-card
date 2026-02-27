import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import ChapterSelectScreen from './components/ChapterSelectScreen';
import StudyScreen from './components/StudyScreen';
import CompletionScreen from './components/CompletionScreen';
import { UserProgress, StudySession } from './types';
import { getChapter } from './data/chapters';
import './App.css';

type Screen = 'home' | 'chapters' | 'study' | 'review' | 'completion';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('1.1');
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [lastSession, setLastSession] = useState<StudySession | null>(null);
  const [reviewMode, setReviewMode] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('user_progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress) {
      localStorage.setItem('user_progress', JSON.stringify(progress));
    }
  }, [progress]);

  const handleSelectChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setReviewMode(false);
    setCurrentScreen('study');
  };

  const handleStartStudy = () => {
    setCurrentScreen('chapters');
  };

  const handleStartReview = () => {
    setReviewMode(true);
    setCurrentScreen('study');
  };

  const handleStudyComplete = (session: StudySession) => {
    setLastSession(session);

    // Update progress
    const newProgress: UserProgress = progress || {
      chaptersCompleted: [],
      totalCardsStudied: 0,
      sessions: [],
      unsureCards: {},
    };

    newProgress.sessions.push(session);
    newProgress.totalCardsStudied += session.knownCards.length + session.unsureCards.length;

    // Update unsure cards
    if (reviewMode) {
      // In review mode, only keep cards that are still unsure
      const currentUnsure = newProgress.unsureCards[session.chapterId] || [];
      const stillUnsure = currentUnsure.filter(cardId =>
        session.unsureCards.includes(cardId)
      );
      newProgress.unsureCards[session.chapterId] = stillUnsure;
    } else {
      // In normal study mode, replace with new unsure cards
      newProgress.unsureCards[session.chapterId] = session.unsureCards;
    }

    // Mark chapter as completed if all cards are known
    const chapter = getChapter(session.chapterId);
    if (chapter && session.knownCards.length === chapter.cards.length) {
      if (!newProgress.chaptersCompleted.includes(session.chapterId)) {
        newProgress.chaptersCompleted.push(session.chapterId);
      }
    }

    setProgress(newProgress);
    setCurrentScreen('completion');
  };

  const handleReviewFromCompletion = () => {
    setReviewMode(true);
    setCurrentScreen('study');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setReviewMode(false);
  };

  const handleBackToChapters = () => {
    setCurrentScreen('chapters');
    setReviewMode(false);
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <HomeScreen
            key="home"
            progress={progress}
            onStartStudy={handleStartStudy}
            onStartReview={handleStartReview}
          />
        )}

        {currentScreen === 'chapters' && (
          <ChapterSelectScreen
            key="chapters"
            progress={progress}
            onSelectChapter={handleSelectChapter}
            onBack={handleBackToHome}
          />
        )}

        {currentScreen === 'study' && (
          <StudyScreen
            key={`study-${selectedChapterId}`}
            chapterId={selectedChapterId}
            reviewMode={reviewMode}
            onComplete={handleStudyComplete}
            onBack={handleBackToChapters}
          />
        )}

        {currentScreen === 'completion' && lastSession && (
          <CompletionScreen
            key="completion"
            session={lastSession}
            onReview={handleReviewFromCompletion}
            onHome={handleBackToHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;