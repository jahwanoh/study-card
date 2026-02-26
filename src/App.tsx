import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeScreen from './components/HomeScreen';
import StudyScreen from './components/StudyScreen';
import CompletionScreen from './components/CompletionScreen';
import { UserProgress, StudySession } from './types';
import { chapter1_1 } from './data/chapter1_1';
import './App.css';

type Screen = 'home' | 'study' | 'review' | 'completion';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
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

  const handleStartStudy = () => {
    setReviewMode(false);
    setCurrentScreen('study');
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
      const currentUnsure = newProgress.unsureCards['1.1'] || [];
      const stillUnsure = currentUnsure.filter(cardId =>
        session.unsureCards.includes(cardId)
      );
      newProgress.unsureCards['1.1'] = stillUnsure;
    } else {
      // In normal study mode, replace with new unsure cards
      newProgress.unsureCards['1.1'] = session.unsureCards;
    }

    // Mark chapter as completed if all cards are known
    if (session.knownCards.length === chapter1_1.cards.length) {
      if (!newProgress.chaptersCompleted.includes('1.1')) {
        newProgress.chaptersCompleted.push('1.1');
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

        {currentScreen === 'study' && (
          <StudyScreen
            key="study"
            onComplete={handleStudyComplete}
            onBack={handleBackToHome}
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