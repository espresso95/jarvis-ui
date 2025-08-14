import React from 'react';

interface TokenData {
  price: string;
  change: string;
}

interface TokenPriceProps {
  tokenData: TokenData;
}

const TokenPrice: React.FC<TokenPriceProps> = ({ tokenData }) => {
  return (
    <div className="mb-6">
      <p className="text-token-price-header">JARVIS PRICE</p>
      <div className="flex flex-row items-center">
        <p className="text-token-price">${tokenData.price}</p>
        <div className="bg-statuspending flex justify-center items-center ml-2">
          <p className="text-token-price-header p-1">
            {tokenData.change} (24h)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenPrice;
