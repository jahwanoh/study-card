import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipCard from './FlipCard';
import { Card, CardResponse, StudySession } from '../types';
import { chapter1_1 } from '../data/chapter1_1';
import './StudyScreen.css';

interface StudyScreenProps {
  onComplete: (session: StudySession) => void;
  onBack: () => void;
}

const StudyScreen: React.FC<StudyScreenProps> = ({ onComplete, onBack }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [session, setSession] = useState<StudySession>({
    chapterId: '1.1',
    startedAt: new Date(),
    knownCards: [],
    unsureCards: [],
    currentCardIndex: 0,
    totalCards: chapter1_1.cards.length,
  });

  const currentCard: Card = chapter1_1.cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / chapter1_1.cards.length) * 100;

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
    if (currentCardIndex === chapter1_1.cards.length - 1) {
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
          <h2>Chapter {chapter1_1.chapter}</h2>
          <p>{chapter1_1.title}</p>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-text">
          Card {currentCardIndex + 1} of {chapter1_1.cards.length}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCardIndex}
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