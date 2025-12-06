import { useEffect } from 'react';
import { useBotStore } from '../state/botStore';

/**
 * Custom hook for bot management
 * Handles auto-update lifecycle
 */
export const useBots = () => {
  const { bots, updateBots, refreshNonBusyBots, startAutoUpdate, stopAutoUpdate, getStats } = useBotStore();

  useEffect(() => {
    // Start auto-update when component mounts
    startAutoUpdate();
    
    // Cleanup on unmount
    return () => {
      stopAutoUpdate();
    };
  }, [startAutoUpdate, stopAutoUpdate]);

  return {
    bots,
    updateBots,
    refreshNonBusyBots, // Expose refresh method that preserves busy bots
    stats: getStats(),
  };
};

