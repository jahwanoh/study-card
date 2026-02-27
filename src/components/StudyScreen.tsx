import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipCard from './FlipCard';
import { Card, CardResponse, StudySession } from '../types';
import { getChapter } from '../data/chapters';
import './StudyScreen.css';

interface StudyScreenProps {
  chapterId: string;
  reviewMode?: boolean;
  onComplete: (session: StudySession) => void;
  onBack: () => void;
}

const StudyScreen: React.FC<StudyScreenProps> = ({
  chapterId,
  reviewMode = false,
  onComplete,
  onBack
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [session, setSession] = useState<StudySession>({
    chapterId: chapterId,
    startedAt: new Date(),
    knownCards: [],
    unsureCards: [],
    currentCardIndex: 0,
    totalCards: 0,
  });

  const chapter = getChapter(chapterId);

  useEffect(() => {
    if (chapter) {
      let studyCards = chapter.cards;

      // In review mode, only show unsure cards
      if (reviewMode) {
        const savedProgress = localStorage.getItem('user_progress');
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          const unsureCardIds = progress.unsureCards[chapterId] || [];
          studyCards = chapter.cards.filter(card => unsureCardIds.includes(card.id));
        }
      }

      setCards(studyCards);
      setSession(prev => ({
        ...prev,
        chapterId: chapterId,
        totalCards: studyCards.length,
      }));
    }
  }, [chapter, chapterId, reviewMode]);

  if (!chapter || cards.length === 0) {
    return (
      <div className="study-screen">
        <div className="study-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <div className="chapter-info">
            <h2>No cards to study</h2>
            <p>{reviewMode ? 'No cards to review' : 'Chapter not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentCard: Card = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (response: CardResponse) => {
    const updatedSession = { ...session };

    if (response === 'know') {
      updatedSession.knownCards.push(currentCard.id);
    } else {
      updatedSession.unsureCards.push(currentCard.id);
    }

    updatedSession.currentCardIndex = currentCardIndex + 1;
    setSession(updatedSession);

    // Check if this was the last card
    if (currentCardIndex === cards.length - 1) {
      updatedSession.completedAt = new Date();
      onComplete(updatedSession);
    } else {
      // Move to next card with animation
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
      }, 300);
    }
  };

  return (
    <div className="study-screen">
      <div className="study-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="chapter-info">
          <h2>Chapter {chapter.chapter}</h2>
          <p>{chapter.title}</p>
          {reviewMode && <p className="review-mode-badge">Review Mode</p>}
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-text">
          Card {currentCardIndex + 1} of {cards.length}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${chapterId}-${currentCardIndex}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="card-wrapper"
        >
          <FlipCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </motion.div>
      </AnimatePresence>

      {isFlipped && (
        <motion.div
          className="response-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className="response-button know-button"
            onClick={() => handleResponse('know')}
          >
            <span className="button-icon">✓</span>
            <span>I Know This</span>
          </button>
          <button
            className="response-button unsure-button"
            onClick={() => handleResponse('unsure')}
          >
            <span className="button-icon">?</span>
            <span>Not Sure</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default StudyScreen;