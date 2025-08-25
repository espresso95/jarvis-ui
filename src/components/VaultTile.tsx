import React from 'react';
import { useNavigate } from 'react-router-dom';

const VaultTile: React.FC = () => {
  const navigate = useNavigate();

  const handleDeposit = () => {
    navigate('/vault');
  };

  return (
    <div className="border border-black p-4 mb-4 bg-white mt-8">
      {/* Stats Row */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">TVL</p>
          <p className="text-sm font-medium text-gray-900">$100,000</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">APR</p>
          <p className="text-sm font-medium text-gray-900">34%</p>
        </div>
      </div>

      {/* Deposit Button */}
      <button
        onClick={handleDeposit}
        className="w-full bg-black text-white py-2 px-4 rounded-sm font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
      >
        Deposit
      </button>
    </div>
  );
};

export default VaultTile;
