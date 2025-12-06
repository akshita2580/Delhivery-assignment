import React from 'react';
import { Battery, Activity, Clock, Zap } from 'lucide-react';

/**
 * Bot Card Component
 * Displays individual bot information with status indicators
 */
export const BotCard = ({ bot }) => {
  const getStatusColor = (status) => {
    const colors = {
      idle: 'bg-green-100 text-green-800',
      busy: 'bg-blue-100 text-blue-800',
      charging: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getBatteryColor = (battery) => {
    if (battery > 60) return 'text-green-600';
    if (battery > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    return `${Math.floor(diffSecs / 3600)}h ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{bot.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bot.status)}`}>
          {bot.status.toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Battery className={`w-5 h-5 ${getBatteryColor(bot.battery)}`} />
          <span className="text-gray-700">
            <span className="font-semibold">{bot.battery}%</span> Battery
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700">
            Speed: <span className="font-semibold">{bot.speed} km/h</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          <span className="text-gray-700">
            Task: <span className="font-semibold">{bot.currentTask || 'Standby'}</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Updated {formatTime(bot.lastUpdated)}</span>
        </div>
      </div>
    </div>
  );
};

