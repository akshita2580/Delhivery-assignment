import { useTaskStore } from '../state/taskStore';

/**
 * Custom hook for task management
 * Tasks are now assigned immediately when created, no auto-removal needed
 */
export const useTasks = () => {
  const { tasks, addTask, assignTask, clearQueue, getStats } = useTaskStore();

  return {
    tasks,
    addTask,
    assignTask,
    clearQueue,
    stats: getStats(),
  };
};

