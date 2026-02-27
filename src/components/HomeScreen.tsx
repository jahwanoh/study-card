import React from 'react';
import { motion } from 'framer-motion';
import { UserProgress } from '../types';
import { getTotalCards, getAllChapters } from '../data/chapters';
import './HomeScreen.css';

interface HomeScreenProps {
  progress: UserProgress | null;
  onStartStudy: () => void;
  onStartReview: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ progress, onStartStudy, onStartReview }) => {
  const calculateOverallProgress = () => {
    if (!progress || !progress.sessions) return 0;

    // Get all unique known cards across all chapters
    const allKnownCards = new Set<string>();
    progress.sessions.forEach(session => {
      session.knownCards.forEach(cardId => allKnownCards.add(cardId));
    });

    const totalCards = getTotalCards();
    return totalCards > 0 ? Math.round((allKnownCards.size / totalCards) * 100) : 0;
  };

  const getTotalUnsureCards = () => {
    if (!progress || !progress.unsureCards) return 0;

    let total = 0;
    Object.values(progress.unsureCards).forEach(cards => {
      total += cards.length;
    });
    return total;
  };

  const getCompletedChapters = () => {
    return progress?.chaptersCompleted?.length || 0;
  };

  const progressPercent = calculateOverallProgress();
  const unsureCount = getTotalUnsureCards();
  const completedChapters = getCompletedChapters();
  const totalChapters = getAllChapters().length;

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
            <span className="chapter-number">All Chapters</span>
            <h2 className="chapter-title">Complete Study Guide</h2>
          </div>

          <div className="chapter-description">
            Master all {totalChapters} chapters covering British values, history, geography, culture, and government
          </div>

          <div className="progress-info">
            <div className="progress-label">Overall Progress: {progressPercent}%</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="card-count">
              {completedChapters} of {totalChapters} chapters completed • {getTotalCards()} total cards
            </div>
          </div>

          <button className="start-button" onClick={onStartStudy}>
            Select Chapter to Study
          </button>
        </motion.div>

        {unsureCount > 0 && (
          <motion.div
            className="review-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3>Review All Unsure Cards</h3>
            <p>{unsureCount} cards to review across all chapters</p>
            <div className="review-note">
              Select a chapter to review specific cards
            </div>
            <button className="review-button" onClick={onStartStudy}>
              Go to Chapters
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
                <div className="stat-label">Overall Progress</div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="quick-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-button" onClick={onStartStudy}>
              📚 Browse Chapters
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;