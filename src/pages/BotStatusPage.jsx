import React from 'react';
import { useBots } from '../hooks/useBots';
import { BotCard } from '../components/BotCard';
import { RefreshCw } from 'lucide-react';

/**
 * Bot Status Page
 * Displays all bots with auto-updating status every 10 seconds
 */
export const BotStatusPage = () => {
  const { bots, refreshNonBusyBots } = useBots();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Bot Status</h1>
          <p className="text-gray-600 mt-2">
            Real-time bot monitoring (updates every 10 seconds, tasks complete in 8 seconds)
          </p>
        </div>
        <button
          onClick={refreshNonBusyBots}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh Now</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>

      {bots.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bots available</p>
        </div>
      )}
    </div>
  );
};

