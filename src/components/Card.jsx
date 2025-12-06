import React from 'react';

/**
 * Reusable Card Component
 * Used for displaying content in a card layout
 */
export const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

