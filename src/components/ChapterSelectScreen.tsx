import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserProgress } from '../types';
import { getAllChapters, getChapterProgress } from '../data/chapters';
import './ChapterSelectScreen.css';

interface ChapterSelectScreenProps {
  progress: UserProgress | null;
  onSelectChapter: (chapterId: string) => void;
  onBack: () => void;
}

const ChapterSelectScreen: React.FC<ChapterSelectScreenProps> = ({
  progress,
  onSelectChapter,
  onBack,
}) => {
  const chapters = getAllChapters();
  const [knownCards, setKnownCards] = useState<string[]>([]);

  useEffect(() => {
    if (progress) {
      // Collect all known cards from all sessions
      const allKnownCards = new Set<string>();
      progress.sessions.forEach(session => {
        session.knownCards.forEach(cardId => allKnownCards.add(cardId));
      });
      setKnownCards(Array.from(allKnownCards));
    }
  }, [progress]);

  const getChapterStats = (chapterId: string) => {
    const chapterProgress = getChapterProgress(chapterId, knownCards);
    const unsureCount = progress?.unsureCards[chapterId]?.length || 0;
    const isCompleted = chapterProgress === 100;
    const isLocked = false; // For now, all chapters are unlocked. Can implement sequential unlocking later.

    return { chapterProgress, unsureCount, isCompleted, isLocked };
  };

  return (
    <div className="chapter-select-screen">
      <div className="chapter-select-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1>Select a Chapter</h1>
      </div>

      <div className="chapters-grid">
        {chapters.map((chapter, index) => {
          const { chapterProgress, unsureCount, isCompleted, isLocked } = getChapterStats(chapter.chapter);

          return (
            <motion.div
              key={chapter.chapter}
              className={`chapter-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !isLocked && onSelectChapter(chapter.chapter)}
            >
              <div className="chapter-number">
                Chapter {chapter.chapter}
                {isCompleted && <span className="check-mark">✓</span>}
              </div>

              <h3 className="chapter-title">{chapter.title}</h3>
              <p className="chapter-description">{chapter.description}</p>

              <div className="chapter-stats">
                <div className="card-count">
                  {chapter.cards.length} cards
                </div>
                {unsureCount > 0 && (
                  <div className="unsure-count">
                    {unsureCount} to review
                  </div>
                )}
              </div>

              <div className="chapter-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${chapterProgress}%` }}
                  />
                </div>
                <div className="progress-text">{chapterProgress}% Complete</div>
              </div>

              {isLocked && (
                <div className="locked-overlay">
                  <span className="lock-icon">🔒</span>
                  <span className="lock-text">Complete previous chapters to unlock</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="total-progress"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3>Overall Progress</h3>
        <div className="total-stats">
          <div className="stat">
            <span className="stat-value">{knownCards.length}</span>
            <span className="stat-label">Cards Mastered</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {chapters.reduce((sum, ch) => sum + ch.cards.length, 0)}
            </span>
            <span className="stat-label">Total Cards</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {chapters.filter(ch => getChapterStats(ch.chapter).isCompleted).length}
            </span>
            <span className="stat-label">Chapters Completed</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChapterSelectScreen;