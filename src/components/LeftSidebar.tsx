import React from 'react';

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ className = '' }) => {
  return (
    <div
      className={`hidden md:block mt-14 fixed left-0 top-0 h-full w-64 bg-white border-r border-black/10 z-20 ${className}`}
    >
      <div className="flex flex-col h-full p-6">
        <p>hi</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
