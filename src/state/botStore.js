import { create } from 'zustand';

/**
 * Bot Store - Manages bot data and status
 * Auto-updates bot status every 10 seconds
 */
export const useBotStore = create((set, get) => {
  // Initialize with 10 bots
  const generateBots = () => {
    const statuses = ['idle', 'busy', 'charging', 'error'];
    const tasks = ['Delivery Task #1', 'Pickup Task #2', 'Maintenance', 'Standby', null];
    
    return Array.from({ length: 10 }, (_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      // Ensure at least some bots start as idle
      const finalStatus = i < 5 ? 'idle' : status;
      const hasTask = finalStatus === 'busy';
      
      return {
        id: `bot-${i + 1}`,
        name: `Bot ${i + 1}`,
        battery: Math.floor(Math.random() * 100),
        status: finalStatus,
        currentTask: hasTask ? tasks[Math.floor(Math.random() * tasks.length)] : null,
        speed: Math.floor(Math.random() * 50) + 10,
        lastUpdated: new Date().toISOString(),
        location: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
      };
    });
  };

  return {
    bots: generateBots(),
    updateInterval: null,
    completionInterval: null,
    
    // Assign task to the best available bot
    assignTaskToBot: (task) => {
      const bots = get().bots;
      
      // Find idle bots first
      let availableBot = bots.find(bot => bot.status === 'idle');
      
      // If no idle bot, find bot with least battery usage (highest battery) or least busy
      if (!availableBot) {
        // Sort by battery level (descending) and status priority
        const sortedBots = [...bots]
          .filter(bot => bot.status !== 'error' && bot.status !== 'charging')
          .sort((a, b) => {
            // Prefer bots with higher battery
            if (b.battery !== a.battery) {
              return b.battery - a.battery;
            }
            // If battery same, prefer idle over busy
            if (a.status === 'idle' && b.status !== 'idle') return -1;
            if (b.status === 'idle' && a.status !== 'idle') return 1;
            return 0;
          });
        
        availableBot = sortedBots[0];
      }
      
      if (!availableBot) {
        return null; // No available bot
      }
      
      // Format task description
      const taskDescription = `${task.pickup} → ${task.drop}`;
      
      // Update bot with task assignment and completion timestamp (8 seconds)
      set((state) => ({
        bots: state.bots.map((bot) =>
          bot.id === availableBot.id
            ? {
                ...bot,
                status: 'busy',
                currentTask: taskDescription,
                taskAssignedAt: new Date().toISOString(),
                busyUntil: Date.now() + 8000, // Task completes in 8 seconds
                lastUpdated: new Date().toISOString(),
              }
            : bot
        ),
      }));
      
      return availableBot;
    },
    
    // Update a specific bot
    updateBot: (botId, changes) => {
      set((state) => ({
        bots: state.bots.map((bot) =>
          bot.id === botId ? { ...bot, ...changes, lastUpdated: new Date().toISOString() } : bot
        ),
      }));
    },
    
    // Check and complete tasks that have finished
    checkTaskCompletion: () => {
      set((state) => ({
        bots: state.bots.map((bot) => {
          // If bot is busy and task completion time has passed
          if (bot.status === 'busy' && bot.busyUntil && Date.now() >= bot.busyUntil) {
            return {
              ...bot,
              status: 'idle',
              currentTask: null,
              busyUntil: undefined,
              lastUpdated: new Date().toISOString(),
            };
          }
          return bot;
        }),
      }));
    },
    
    // Update all bots with random values (but NEVER overwrite busy bots)
    updateBots: () => {
      const statuses = ['idle', 'charging', 'error']; // Exclude 'busy' from random statuses
      const tasks = ['Delivery Task #1', 'Pickup Task #2', 'Maintenance', 'Standby', null];
      
      set((state) => ({
        bots: state.bots.map((bot) => {
          // NEVER modify busy bots - preserve status, currentTask, and busyUntil
          if (bot.status === 'busy') {
            return {
              ...bot,
              // Only optionally update battery/speed (small changes)
              battery: Math.max(0, Math.min(100, bot.battery + Math.floor(Math.random() * 6) - 3)),
              speed: Math.max(10, Math.min(60, bot.speed + Math.floor(Math.random() * 6) - 3)),
              lastUpdated: new Date().toISOString(),
              // Keep status, currentTask, and busyUntil unchanged
            };
          }
          
          // For non-busy bots, update normally
          return {
            ...bot,
            battery: Math.max(0, Math.min(100, bot.battery + Math.floor(Math.random() * 20) - 10)),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            currentTask: Math.random() > 0.3 ? tasks[Math.floor(Math.random() * tasks.length)] : bot.currentTask,
            speed: Math.floor(Math.random() * 50) + 10,
            lastUpdated: new Date().toISOString(),
          };
        }),
      }));
    },
    
    // Refresh only non-busy bots (for manual refresh button)
    refreshNonBusyBots: () => {
      const statuses = ['idle', 'charging', 'error']; // Exclude 'busy'
      const tasks = ['Delivery Task #1', 'Pickup Task #2', 'Maintenance', 'Standby', null];
      
      set((state) => ({
        bots: state.bots.map((bot) => {
          // Skip busy bots completely
          if (bot.status === 'busy') {
            return bot; // Return unchanged
          }
          
          // Only update non-busy bots
          return {
            ...bot,
            battery: Math.max(0, Math.min(100, bot.battery + Math.floor(Math.random() * 20) - 10)),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            currentTask: Math.random() > 0.3 ? tasks[Math.floor(Math.random() * tasks.length)] : bot.currentTask,
            speed: Math.floor(Math.random() * 50) + 10,
            lastUpdated: new Date().toISOString(),
          };
        }),
      }));
    },
    
    // Start auto-update interval
    startAutoUpdate: () => {
      // Start task completion checker (runs every second)
      const completionCheck = setInterval(() => {
        get().checkTaskCompletion();
      }, 1000); // Check every second
      
      // Start bot update interval (runs every 10 seconds)
      const updateCheck = setInterval(() => {
        get().updateBots();
      }, 10000); // Update every 10 seconds
      
      set({ 
        updateInterval: updateCheck,
        completionInterval: completionCheck,
      });
    },
    
    // Stop auto-update interval
    stopAutoUpdate: () => {
      const updateInterval = get().updateInterval;
      const completionInterval = get().completionInterval;
      
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      if (completionInterval) {
        clearInterval(completionInterval);
      }
      
      set({ 
        updateInterval: null,
        completionInterval: null,
      });
    },
    
    // Get bot statistics
    getStats: () => {
      const bots = get().bots;
      return {
        total: bots.length,
        active: bots.filter(b => b.status === 'busy').length,
        idle: bots.filter(b => b.status === 'idle').length,
        charging: bots.filter(b => b.status === 'charging').length,
        error: bots.filter(b => b.status === 'error').length,
      };
    },
  };
});

