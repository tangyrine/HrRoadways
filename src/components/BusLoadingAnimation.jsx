import React from 'react';
import { motion } from 'framer-motion';
import '../styles/BusLoadingAnimation.css';

const BusLoadingAnimation = ({ 
  size = 'medium', 
  message = 'Loading...', 
  showMessage = true,
  variant = 'default' 
}) => {
  const sizeClasses = {
    small: 'bus-loading-small',
    medium: 'bus-loading-medium',
    large: 'bus-loading-large'
  };

  const busVariants = {
    animate: {
      x: [0, 300, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const wheelVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const roadVariants = {
    animate: {
      x: [-100, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const cloudVariants = {
    animate: {
      x: [0, 50, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`bus-loading-container ${sizeClasses[size]} bus-loading-${variant}`}>
      <div className="bus-loading-scene">
        {/* Background Elements */}
        <div className="bus-loading-background">
          {/* Clouds */}
          <motion.div 
            className="cloud cloud-1"
            variants={cloudVariants}
            animate="animate"
          >
            <div className="cloud-part"></div>
            <div className="cloud-part"></div>
            <div className="cloud-part"></div>
          </motion.div>
          
          <motion.div 
            className="cloud cloud-2"
            variants={cloudVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          >
            <div className="cloud-part"></div>
            <div className="cloud-part"></div>
          </motion.div>

          {/* Sun */}
          <motion.div 
            className="sun"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="sun-ray"></div>
            <div className="sun-ray"></div>
            <div className="sun-ray"></div>
            <div className="sun-ray"></div>
          </motion.div>
        </div>

        {/* Road */}
        <div className="road-container">
          <motion.div 
            className="road-lines"
            variants={roadVariants}
            animate="animate"
          >
            <div className="road-line"></div>
            <div className="road-line"></div>
            <div className="road-line"></div>
            <div className="road-line"></div>
          </motion.div>
        </div>

        {/* Bus */}
        <motion.div 
          className="bus-container"
          variants={busVariants}
          animate="animate"
        >
          <div className="bus-body">
            <div className="bus-roof"></div>
            <div className="bus-main">
              <div className="bus-window window-1"></div>
              <div className="bus-window window-2"></div>
              <div className="bus-window window-3"></div>
              <div className="bus-door"></div>
            </div>
            <div className="bus-bottom">
              <motion.div 
                className="bus-wheel wheel-front"
                variants={wheelVariants}
                animate="animate"
              ></motion.div>
              <motion.div 
                className="bus-wheel wheel-back"
                variants={wheelVariants}
                animate="animate"
              ></motion.div>
            </div>
          </div>
          
          {/* Exhaust smoke */}
          <motion.div 
            className="exhaust-smoke"
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 1.5],
              y: [0, -20, -40]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          ></motion.div>
        </motion.div>

        {/* Loading dots */}
        <div className="loading-dots">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="loading-dot"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Message */}
      {showMessage && (
        <motion.div 
          className="bus-loading-message"
          variants={textVariants}
          animate="animate"
        >
          {message}
        </motion.div>
      )}

      {/* Progress bar */}
      <div className="progress-container">
        <motion.div 
          className="progress-bar"
          animate={{
            width: ["0%", "100%", "0%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default BusLoadingAnimation;
