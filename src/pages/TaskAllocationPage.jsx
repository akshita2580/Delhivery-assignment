import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../state/taskStore';
import { useBotStore } from '../state/botStore';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

/**
 * Task Allocation Page
 * Form to create and allocate new tasks
 */
export const TaskAllocationPage = () => {
  const navigate = useNavigate();
  const { addTask, assignTask } = useTaskStore();
  const { assignTaskToBot } = useBotStore();
  
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    priority: 'medium',
    comments: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [assignedBot, setAssignedBot] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.pickup.trim()) {
      newErrors.pickup = 'Pickup location is required';
    }
    
    if (!formData.drop.trim()) {
      newErrors.drop = 'Drop location is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setAssignedBot(null);
    
    // Add task to store
    const newTask = addTask({
      pickup: formData.pickup,
      drop: formData.drop,
      priority: formData.priority,
      comments: formData.comments,
    });

    // Automatically assign task to best available bot
    // Try to assign to bot first (this checks for available bots)
    const bot = assignTaskToBot(newTask);
    
    if (bot) {
      // Bot assigned successfully - remove the specific task from queue
      assignTask(newTask.id);
      setAssignedBot(bot);
      setSuccessMessage(`Task assigned successfully to ${bot.name}!`);
    } else {
      // No available bot - task remains in queue
      setSuccessMessage('Task created! No bots available, task added to queue.');
    }

    // Reset form
    setFormData({
      pickup: '',
      drop: '',
      priority: 'medium',
      comments: '',
    });
    
    setLoading(false);
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage(null);
      setAssignedBot(null);
    }, 5000);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Allocate Task</h1>
        <p className="text-gray-600 mt-2">Create a new task for bot assignment</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-100 rounded-lg">
                <PlusCircle className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Task Details</h2>
            </div>

            {successMessage && (
              <div className={`p-4 rounded-lg border-2 ${
                assignedBot 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="font-medium">{successMessage}</p>
                </div>
                {assignedBot && (
                  <p className="text-sm mt-1 ml-7">
                    Bot Status: <span className="font-semibold">{assignedBot.status.toUpperCase()}</span> | 
                    Battery: <span className="font-semibold">{assignedBot.battery}%</span>
                  </p>
                )}
              </div>
            )}

            <Input
              label="Pickup Location"
              value={formData.pickup}
              onChange={(e) => handleChange('pickup', e.target.value)}
              placeholder="Enter pickup address"
              error={errors.pickup}
              required
            />

            <Input
              label="Drop Location"
              value={formData.drop}
              onChange={(e) => handleChange('drop', e.target.value)}
              placeholder="Enter drop address"
              error={errors.drop}
              required
            />

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comments (Optional)
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => handleChange('comments', e.target.value)}
                placeholder="Additional notes or instructions..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Task'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/tasks/queue')}
              >
                View Queue
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

