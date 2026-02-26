import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../types';
import './FlipCard.css';

interface FlipCardProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ card, isFlipped, onFlip }) => {
  return (
    <div className="flip-card-container" onClick={onFlip}>
      <motion.div
        className="flip-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div className="flip-card-face flip-card-front">
          <div className="card-label">Question</div>
          <div className="card-content">
            <p className="card-text">{card.front}</p>
          </div>
          <div className="card-hint">Tap to flip</div>
        </div>

        {/* Back of card */}
        <div className="flip-card-face flip-card-back">
          <div className="card-label">Answer</div>
          <div className="card-content">
            <p className="card-text">{card.back}</p>
          </div>
          <div className="difficulty-badge">{card.difficulty}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;