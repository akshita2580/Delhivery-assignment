import React from 'react';
import { useTaskStore } from '../state/taskStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ListTodo, Trash2, Clock, MapPin } from 'lucide-react';

/**
 * Task Queue Page
 * Displays pending tasks (only shows unassigned tasks)
 */
export const TaskQueuePage = () => {
  const { tasks, clearQueue, getStats } = useTaskStore();
  const stats = getStats();

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority] || colors.medium;
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Task Queue</h1>
          <p className="text-gray-600 mt-2">
            Pending tasks waiting for bot assignment
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Pending Tasks</p>
            <p className="text-2xl font-bold text-primary-600">{stats.pending}</p>
          </div>
          {tasks.length > 0 && (
            <Button
              variant="danger"
              onClick={clearQueue}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Queue
            </Button>
          )}
        </div>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <ListTodo className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              No Pending Tasks
            </p>
            <p className="text-gray-500">
              All tasks have been assigned or the queue is empty.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Task #{task.id.split('-')[1]}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Pickup</p>
                        <p className="font-medium text-gray-800">{task.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Drop</p>
                        <p className="font-medium text-gray-800">{task.drop}</p>
                      </div>
                    </div>
                  </div>

                  {task.comments && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">Comments</p>
                      <p className="text-gray-800">{task.comments}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Created at {formatTime(task.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

