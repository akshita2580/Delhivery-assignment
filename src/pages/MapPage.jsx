import React, { useState, useRef, useEffect } from 'react';
import { useBots } from '../hooks/useBots';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Upload, X } from 'lucide-react';

/**
 * Map Page (Bonus)
 * Allows SVG upload and displays bots as moving circles
 */
export const MapPage = () => {
  const { bots } = useBots();
  const [svgContent, setSvgContent] = useState(null);
  const [svgFile, setSvgFile] = useState(null);
  const [botPositions, setBotPositions] = useState([]);
  const svgContainerRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize bot positions when bots or SVG container changes
  useEffect(() => {
    if (bots.length > 0 && svgContainerRef.current) {
      const container = svgContainerRef.current;
      const rect = container.getBoundingClientRect();
      
      const positions = bots.map(() => ({
        x: Math.random() * (rect.width - 40) + 20,
        y: Math.random() * (rect.height - 40) + 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      }));
      
      setBotPositions(positions);
    }
  }, [bots.length, svgContent]);

  // Animation loop for moving bots
  useEffect(() => {
    if (botPositions.length === 0 || !svgContainerRef.current) return;

    const container = svgContainerRef.current;
    const rect = container.getBoundingClientRect();
    const radius = 15;

    const animate = () => {
      setBotPositions((prev) =>
        prev.map((pos) => {
          let newX = pos.x + pos.vx;
          let newY = pos.y + pos.vy;

          // Bounce off walls
          if (newX <= radius || newX >= rect.width - radius) {
            newX = pos.x;
            pos.vx = -pos.vx;
          }
          if (newY <= radius || newY >= rect.height - radius) {
            newY = pos.y;
            pos.vy = -pos.vy;
          }

          return {
            ...pos,
            x: newX,
            y: newY,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [botPositions.length]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      setSvgFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSvgContent(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid SVG file');
    }
  };

  const clearSvg = () => {
    setSvgContent(null);
    setSvgFile(null);
    setBotPositions([]);
  };

  const getStatusColor = (status) => {
    const colors = {
      idle: '#10b981',
      busy: '#3b82f6',
      charging: '#f59e0b',
      error: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Map View</h1>
        <p className="text-gray-600 mt-2">
          Upload an SVG map and visualize bots as moving circles
        </p>
      </div>

      <Card>
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors">
              <Upload className="w-5 h-5" />
              <span>Upload SVG Map</span>
              <input
                type="file"
                accept="image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {svgFile && (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">{svgFile.name}</span>
                <button
                  onClick={clearSvg}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          ref={svgContainerRef}
          className="w-full border-2 border-gray-300 rounded-lg bg-gray-50 relative overflow-hidden"
          style={{ minHeight: '600px', position: 'relative' }}
        >
          {svgContent ? (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                className="w-full h-full"
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
              {/* Render bots as moving circles */}
              {botPositions.map((pos, index) => {
                const bot = bots[index];
                if (!bot) return null;
                return (
                  <div
                    key={bot.id}
                    className="absolute rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      width: '30px',
                      height: '30px',
                      backgroundColor: getStatusColor(bot.status),
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.1s linear',
                    }}
                    title={`${bot.name} - ${bot.status} - ${bot.battery}%`}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <Upload className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-medium">No map uploaded</p>
                <p className="text-sm mt-2">
                  Upload an SVG file to visualize bots on the map
                </p>
              </div>
            </div>
          )}
        </div>

        {svgContent && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">Idle</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm">Busy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Charging</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">Error</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};


