import { create } from 'zustand';

/**
 * Task Store - Manages task allocation and queue
 * Handles task creation, queue management, and auto-assignment simulation
 */
export const useTaskStore = create((set, get) => ({
  tasks: [],
  assignedTasks: [],
  removalInterval: null,
  
  // Add new task to queue
  addTask: (taskData) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
    
    return newTask;
  },
  
  // Assign task (removes specific task by ID, or first task if no ID provided)
  assignTask: (taskId = null) => {
    let assignedTask = null;
    
    set((state) => {
      if (state.tasks.length === 0) return state;
      
      let removedTask;
      let remainingTasks;
      
      if (taskId) {
        // Remove specific task by ID
        const taskIndex = state.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return state;
        
        removedTask = state.tasks[taskIndex];
        remainingTasks = state.tasks.filter((_, i) => i !== taskIndex);
      } else {
        // Remove first task (oldest)
        [removedTask, ...remainingTasks] = state.tasks;
      }
      
      assignedTask = { ...removedTask, status: 'assigned', assignedAt: new Date().toISOString() };
      
      return {
        tasks: remainingTasks,
        assignedTasks: [...state.assignedTasks, assignedTask],
      };
    });
    
    return assignedTask;
  },
  
  // Remove task from queue (legacy method - kept for compatibility)
  removeTask: () => {
    get().assignTask();
  },
  
  // Start auto-removal interval (only removes if no idle bots exist)
  // This is now handled manually when tasks are created
  startAutoRemoval: () => {
    // Auto-removal disabled - tasks are assigned immediately when created
    // This method kept for compatibility but does nothing
  },
  
  // Stop auto-removal interval
  stopAutoRemoval: () => {
    const interval = get().removalInterval;
    if (interval) {
      clearInterval(interval);
      set({ removalInterval: null });
    }
  },
  
  // Clear all tasks
  clearQueue: () => {
    set({ tasks: [], assignedTasks: [] });
  },
  
  // Get task statistics
  getStats: () => {
    const tasks = get().tasks;
    return {
      pending: tasks.length,
      assigned: get().assignedTasks.length,
      total: tasks.length + get().assignedTasks.length,
    };
  },
}));

