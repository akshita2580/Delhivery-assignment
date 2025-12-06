import React from 'react';
import { useBots } from '../hooks/useBots';
import { useTaskStore } from '../state/taskStore';
import { Card } from '../components/Card';
import { 
  Bot, 
  Activity, 
  Battery, 
  AlertCircle, 
  Clock,
  TrendingUp 
} from 'lucide-react';

/**
 * Dashboard Page
 * Displays summary statistics and overview
 */
export const DashboardPage = () => {
  const { stats: botStats } = useBots();
  const { getStats } = useTaskStore();
  const taskStats = getStats();

  const statCards = [
    {
      title: 'Total Bots',
      value: botStats.total,
      icon: Bot,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Tasks',
      value: botStats.active,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Idle Bots',
      value: botStats.idle,
      icon: Battery,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Bots in Error',
      value: botStats.error,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Pending Tasks',
      value: taskStats.pending,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Assigned Tasks',
      value: taskStats.assigned,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your bot management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-full`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Bots</span>
              <span className="font-semibold">{botStats.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Bots</span>
              <span className="font-semibold text-green-600">{botStats.active}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Charging Bots</span>
              <span className="font-semibold text-yellow-600">{botStats.charging}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Error Bots</span>
              <span className="font-semibold text-red-600">{botStats.error}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Task Overview
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Tasks</span>
              <span className="font-semibold">{taskStats.pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Assigned Tasks</span>
              <span className="font-semibold text-blue-600">{taskStats.assigned}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Tasks</span>
              <span className="font-semibold">{taskStats.total}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};


