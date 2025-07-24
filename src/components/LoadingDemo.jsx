import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BusLoadingAnimation from './BusLoadingAnimation';
import InlineBusLoader from './InlineBusLoader';
import { useLoading } from '../contexts/LoadingContext';

const LoadingDemo = () => {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedMessage, setSelectedMessage] = useState('Loading amazing buses...');
  const { setGlobalLoadingState } = useLoading();

  const sizes = ['small', 'medium', 'large'];
  const variants = ['default', 'dark', 'sunset'];
  const messages = [
    'Loading amazing buses...',
    'Finding the best routes...',
    'Searching for available seats...',
    'Preparing your journey...',
    'Almost ready to go!'
  ];

  const handleGlobalLoadingTest = () => {
    setGlobalLoadingState(true, 'Testing global loading...');
    setTimeout(() => {
      setGlobalLoadingState(false);
    }, 3000);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}
      >
        Bus Loading Animations Demo
      </motion.h1>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '3rem'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Customize Animation</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#555' }}>
              Size:
            </label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '10px', 
                border: '2px solid #e2e8f0',
                fontSize: '1rem'
              }}
            >
              {sizes.map(size => (
                <option key={size} value={size}>{size.charAt(0).toUpperCase() + size.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#555' }}>
              Theme:
            </label>
            <select 
              value={selectedVariant} 
              onChange={(e) => setSelectedVariant(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '10px', 
                border: '2px solid #e2e8f0',
                fontSize: '1rem'
              }}
            >
              {variants.map(variant => (
                <option key={variant} value={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#555' }}>
              Message:
            </label>
            <select 
              value={selectedMessage} 
              onChange={(e) => setSelectedMessage(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '10px', 
                border: '2px solid #e2e8f0',
                fontSize: '1rem'
              }}
            >
              {messages.map(message => (
                <option key={message} value={message}>{message}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Main Loading Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '3rem'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333', textAlign: 'center' }}>
          Full Bus Loading Animation
        </h2>
        <BusLoadingAnimation 
          size={selectedSize}
          variant={selectedVariant}
          message={selectedMessage}
        />
      </motion.div>

      {/* Inline Loaders */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          marginBottom: '3rem'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333', textAlign: 'center' }}>
          Inline Bus Loaders
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: '#555' }}>Tiny</h3>
            <InlineBusLoader size="tiny" message="Loading..." />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: '#555' }}>Small</h3>
            <InlineBusLoader size="small" message="Searching..." color="#e53e3e" />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: '#555' }}>Medium</h3>
            <InlineBusLoader size="medium" message="Finding routes..." color="#38a169" />
          </div>
        </div>
      </motion.div>

      {/* Global Loading Test */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
          Global Loading Overlay
        </h2>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          Test the global loading overlay that covers the entire screen
        </p>
        <button
          onClick={handleGlobalLoadingTest}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Test Global Loading (3 seconds)
        </button>
      </motion.div>

      {/* Usage Examples */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{ 
          background: '#f7fafc', 
          padding: '2rem', 
          borderRadius: '20px', 
          marginTop: '3rem'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Usage Examples</h2>
        
        <div style={{ background: '#2d3748', color: '#e2e8f0', padding: '1.5rem', borderRadius: '10px', fontFamily: 'monospace' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>// Full loading animation</strong><br/>
            {`<BusLoadingAnimation size="large" variant="sunset" message="Loading..." />`}
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>// Inline loader</strong><br/>
            {`<InlineBusLoader size="small" color="#667eea" message="Searching..." />`}
          </div>
          
          <div>
            <strong>// Using loading context</strong><br/>
            {`const { showLoading, hideLoading } = useComponentLoading('my-component');`}<br/>
            {`showLoading('Custom message...');`}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingDemo;
