import React from 'react';

interface SnapScrollProps {
  children: React.ReactNode[];
}

const SnapScroll: React.FC<SnapScrollProps> = ({ children }) => {
  return <div className="scroll-container">{children}</div>;
};

export default SnapScroll;
