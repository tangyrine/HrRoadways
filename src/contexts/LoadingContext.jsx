import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BusLoadingAnimation from '../components/BusLoadingAnimation';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  // Set loading state for a specific component/page
  const setLoading = useCallback((key, isLoading, message = 'Loading...') => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }));
    
    if (isLoading && message) {
      setLoadingMessage(message);
    }
  }, []);

  // Set global loading state
  const setGlobalLoadingState = useCallback((isLoading, message = 'Loading...') => {
    setGlobalLoading(isLoading);
    if (message) {
      setLoadingMessage(message);
    }
  }, []);

  // Check if any component is loading
  const isAnyLoading = useCallback(() => {
    return globalLoading || Object.values(loadingStates).some(state => state);
  }, [globalLoading, loadingStates]);

  // Get loading state for a specific key
  const isLoading = useCallback((key) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  // Clear all loading states
  const clearAllLoading = useCallback(() => {
    setLoadingStates({});
    setGlobalLoading(false);
  }, []);

  // Show loading with automatic timeout
  const showLoadingWithTimeout = useCallback((key, message, timeout = 5000) => {
    setLoading(key, true, message);
    
    const timeoutId = setTimeout(() => {
      setLoading(key, false);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [setLoading]);

  const value = {
    setLoading,
    setGlobalLoadingState,
    isLoading,
    isAnyLoading,
    clearAllLoading,
    showLoadingWithTimeout,
    globalLoading,
    loadingMessage,
    loadingStates
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {(globalLoading || isAnyLoading()) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="loading-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <BusLoadingAnimation 
                size="large" 
                message={loadingMessage}
                variant="default"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};

// Higher-order component for automatic loading states
export const withLoading = (WrappedComponent, loadingKey) => {
  return function WithLoadingComponent(props) {
    const { setLoading } = useLoading();
    
    const showLoading = useCallback((message) => {
      setLoading(loadingKey, true, message);
    }, [setLoading]);
    
    const hideLoading = useCallback(() => {
      setLoading(loadingKey, false);
    }, [setLoading]);

    return (
      <WrappedComponent 
        {...props} 
        showLoading={showLoading}
        hideLoading={hideLoading}
      />
    );
  };
};

// Hook for component-specific loading
export const useComponentLoading = (componentKey) => {
  const { setLoading, isLoading } = useLoading();
  
  const showLoading = useCallback((message) => {
    setLoading(componentKey, true, message);
  }, [setLoading, componentKey]);
  
  const hideLoading = useCallback(() => {
    setLoading(componentKey, false);
  }, [setLoading, componentKey]);
  
  const loading = isLoading(componentKey);
  
  return { showLoading, hideLoading, loading };
};

export default LoadingContext;
