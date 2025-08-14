import React, { useState, useEffect } from 'react';

interface CullCountdownProps {
  targetTimestamp: number;
  className?: string;
}

const CullCountdown: React.FC<CullCountdownProps> = ({
  targetTimestamp,
  className = 'text-agent-header animate-pulse',
}) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        );
      } else {
        setTimeLeft('00:00:00');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return <p className={className}>NEXT CULL: {timeLeft}</p>;
};

export default CullCountdown;
