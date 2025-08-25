import React, { useState } from 'react';

const ConnectWalletButton: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnected) {
      setIsConnected(false);
      return;
    }

    setIsConnecting(true);
    
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1500);
  };

  if (isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-sm transition-colors duration-200 text-sm"
      >
        Connected
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-3 rounded-sm transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton;
