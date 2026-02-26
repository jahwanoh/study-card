import React from 'react';
import { motion } from 'framer-motion';
import { UserProgress } from '../types';
import { chapter1_1 } from '../data/chapter1_1';
import './HomeScreen.css';

interface HomeScreenProps {
  progress: UserProgress | null;
  onStartStudy: () => void;
  onStartReview: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ progress, onStartStudy, onStartReview }) => {
  const calculateProgress = () => {
    if (!progress || !progress.sessions) return 0;

    const chapter11Sessions = progress.sessions.filter(
      session => session.chapterId === '1.1' && session.completedAt
    );

    if (chapter11Sessions.length === 0) return 0;

    const lastSession = chapter11Sessions[chapter11Sessions.length - 1];
    const progressPercent = (lastSession.knownCards.length / chapter1_1.cards.length) * 100;

    return Math.round(progressPercent);
  };

  const getUnsureCount = () => {
    if (!progress || !progress.unsureCards) return 0;
    return progress.unsureCards['1.1']?.length || 0;
  };

  const progressPercent = calculateProgress();
  const unsureCount = getUnsureCount();

  return (
    <div className="home-screen">
      <div className="home-container">
        <motion.div
          className="home-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Life in the UK Study</h1>
          <p>Prepare for your test with flashcards</p>
        </motion.div>

        <motion.div
          className="chapter-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="chapter-header">
            <span className="chapter-number">Chapter 1.1</span>
            <h2 className="chapter-title">Values & Principles</h2>
          </div>

          <div className="chapter-description">
            {chapter1_1.description}
          </div>

          <div className="progress-info">
            <div className="progress-label">Progress: {progressPercent}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="card-count">{chapter1_1.cards.length} cards to study</div>
          </div>

          <button className="start-button" onClick={onStartStudy}>
            Start Study
          </button>
        </motion.div>

        {unsureCount > 0 && (
          <motion.div
            className="review-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3>Review Unsure Cards</h3>
            <p>{unsureCount} cards to review</p>
            <button className="review-button" onClick={onStartReview}>
              Review Now
            </button>
          </motion.div>
        )}

        {progress && progress.totalCardsStudied > 0 && (
          <motion.div
            className="stats-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3>Your Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{progress.totalCardsStudied}</div>
                <div className="stat-label">Cards Studied</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{progress.sessions.length}</div>
                <div className="stat-label">Study Sessions</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{progressPercent}%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;