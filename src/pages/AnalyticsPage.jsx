import React from 'react';
import { useBots } from '../hooks/useBots';
import { useTaskStore } from '../state/taskStore';
import { Card } from '../components/Card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

/**
 * Analytics Page
 * Displays charts and analytics for bots and tasks
 */
export const AnalyticsPage = () => {
  const { bots } = useBots();
  const { assignedTasks } = useTaskStore();

  // Bot workload distribution
  const workloadData = [
    { name: 'Idle', value: bots.filter(b => b.status === 'idle').length },
    { name: 'Busy', value: bots.filter(b => b.status === 'busy').length },
    { name: 'Charging', value: bots.filter(b => b.status === 'charging').length },
    { name: 'Error', value: bots.filter(b => b.status === 'error').length },
  ];

  // Battery level distribution
  const batteryRanges = [
    { range: '0-20%', count: bots.filter(b => b.battery <= 20).length },
    { range: '21-40%', count: bots.filter(b => b.battery > 20 && b.battery <= 40).length },
    { range: '41-60%', count: bots.filter(b => b.battery > 40 && b.battery <= 60).length },
    { range: '61-80%', count: bots.filter(b => b.battery > 60 && b.battery <= 80).length },
    { range: '81-100%', count: bots.filter(b => b.battery > 80).length },
  ];

  // Task completion trends (simulated)
  const taskTrends = [
    { day: 'Mon', completed: 12, pending: 5 },
    { day: 'Tue', completed: 19, pending: 8 },
    { day: 'Wed', completed: 15, pending: 10 },
    { day: 'Thu', completed: 22, pending: 6 },
    { day: 'Fri', completed: 18, pending: 9 },
    { day: 'Sat', completed: 14, pending: 7 },
    { day: 'Sun', completed: 10, pending: 4 },
  ];

  // Bot speed distribution
  const speedData = bots.map(bot => ({
    name: bot.name,
    speed: bot.speed,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-600 mt-2">Insights and statistics for your bot fleet</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bot Workload Distribution - Pie Chart */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Bot Workload Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={workloadData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {workloadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Battery Level Distribution - Bar Chart */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Battery Level Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={batteryRanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Task Completion Trends - Line Chart */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Task Completion Trends (Weekly)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bot Speed Distribution - Bar Chart */}
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Bot Speed Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={speedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="speed" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Bots</p>
          <p className="text-2xl font-bold text-gray-800">{bots.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Avg Battery</p>
          <p className="text-2xl font-bold text-gray-800">
            {Math.round(bots.reduce((sum, b) => sum + b.battery, 0) / bots.length)}%
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Avg Speed</p>
          <p className="text-2xl font-bold text-gray-800">
            {Math.round(bots.reduce((sum, b) => sum + b.speed, 0) / bots.length)} km/h
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Assigned Tasks</p>
          <p className="text-2xl font-bold text-gray-800">{assignedTasks.length}</p>
        </Card>
      </div>
    </div>
  );
};


