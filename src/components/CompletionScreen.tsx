import React from 'react';
import { motion } from 'framer-motion';
import { StudySession } from '../types';
import { chapter1_1 } from '../data/chapter1_1';
import './CompletionScreen.css';

interface CompletionScreenProps {
  session: StudySession;
  onReview: () => void;
  onHome: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ session, onReview, onHome }) => {
  const knownCount = session.knownCards.length;
  const unsureCount = session.unsureCards.length;
  const successRate = Math.round((knownCount / chapter1_1.cards.length) * 100);

  const getEncouragement = () => {
    if (successRate === 100) return "Perfect! You know everything! 🎉";
    if (successRate >= 80) return "Excellent work! Almost there! 💪";
    if (successRate >= 60) return "Good progress! Keep it up! 👍";
    if (successRate >= 40) return "Nice start! Practice makes perfect! 📚";
    return "Keep studying! You'll get there! 💡";
  };

  return (
    <div className="completion-screen">
      <motion.div
        className="completion-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="completion-header">
          <motion.div
            className="check-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.div>
          <h1>Chapter Complete!</h1>
          <p>{getEncouragement()}</p>
        </div>

        <div className="stats-container">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="stat-number known">{knownCount}</div>
            <div className="stat-label">Cards Known</div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="stat-number unsure">{unsureCount}</div>
            <div className="stat-label">Cards Unsure</div>
          </motion.div>
        </div>

        <motion.div
          className="success-rate"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="rate-label">Success Rate</div>
          <div className="rate-value">{successRate}%</div>
          <div className="rate-bar">
            <motion.div
              className="rate-fill"
              initial={{ width: 0 }}
              animate={{ width: `${successRate}%` }}
              transition={{ delay: 0.9, duration: 1 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {unsureCount > 0 && (
            <button className="review-button" onClick={onReview}>
              Review Unsure Cards ({unsureCount})
            </button>
          )}
          <button className="home-button" onClick={onHome}>
            Back to Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompletionScreen;