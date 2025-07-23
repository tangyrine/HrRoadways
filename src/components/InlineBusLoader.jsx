import React from 'react';
import { motion } from 'framer-motion';

const InlineBusLoader = ({ 
  size = 'small', 
  color = '#667eea',
  message,
  className = ''
}) => {
  const sizeMap = {
    tiny: { width: 30, height: 15 },
    small: { width: 40, height: 20 },
    medium: { width: 60, height: 30 }
  };

  const dimensions = sizeMap[size];

  const busVariants = {
    animate: {
      x: [0, 50, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const wheelVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const dotsVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`inline-bus-loader ${className}`} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '10px',
      padding: '10px'
    }}>
      <div style={{ 
        position: 'relative', 
        width: dimensions.width + 60, 
        height: dimensions.height + 10,
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Simple road line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#ddd',
          borderRadius: '1px'
        }}>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '20px',
              height: '100%',
              background: color,
              borderRadius: '1px'
            }}
            animate={{
              x: [0, dimensions.width + 40, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Simplified bus */}
        <motion.div
          variants={busVariants}
          animate="animate"
          style={{
            position: 'relative',
            width: dimensions.width,
            height: dimensions.height,
            zIndex: 2
          }}
        >
          {/* Bus body */}
          <div style={{
            width: '100%',
            height: '70%',
            background: color,
            borderRadius: `${dimensions.height * 0.1}px`,
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {/* Windows */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: '25%',
              height: '40%',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '1px'
            }} />
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '45%',
              width: '25%',
              height: '40%',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '1px'
            }} />
          </div>

          {/* Wheels */}
          <motion.div
            variants={wheelVariants}
            animate="animate"
            style={{
              position: 'absolute',
              bottom: '-15%',
              left: '15%',
              width: `${dimensions.height * 0.4}px`,
              height: `${dimensions.height * 0.4}px`,
              background: '#333',
              borderRadius: '50%',
              border: '1px solid #555'
            }}
          />
          <motion.div
            variants={wheelVariants}
            animate="animate"
            style={{
              position: 'absolute',
              bottom: '-15%',
              right: '15%',
              width: `${dimensions.height * 0.4}px`,
              height: `${dimensions.height * 0.4}px`,
              background: '#333',
              borderRadius: '50%',
              border: '1px solid #555'
            }}
          />
        </motion.div>
      </div>

      {/* Loading dots */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            style={{
              width: '4px',
              height: '4px',
              background: color,
              borderRadius: '50%'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
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

      {/* Message */}
      {message && (
        <motion.div
          variants={dotsVariants}
          animate="animate"
          style={{
            fontSize: size === 'tiny' ? '10px' : size === 'small' ? '12px' : '14px',
            color: '#666',
            fontWeight: '500',
            textAlign: 'center'
          }}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
};

export default InlineBusLoader;
