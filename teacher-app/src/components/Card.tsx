import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface p-6 rounded-2xl shadow-xl border border-gray-800 ${className}`}>
      {children}
    </div>
  );
};

export default Card;