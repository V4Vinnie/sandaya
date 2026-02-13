import { useGame } from "@/contexts/GameContext";
import { useState, useEffect } from "react";

type PlayerProps = {
  gridSize: number;
};

export const Player = ({ gridSize }: PlayerProps) => {
  const { playerPosition } = useGame();
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setIsMoving(true);
    const timer = setTimeout(() => setIsMoving(false), 200);
    return () => clearTimeout(timer);
  }, [playerPosition]);

  return (
    <div
      className="absolute transition-all duration-200 ease-linear"
      style={{
        left: `${playerPosition.x * gridSize}px`,
        top: `${playerPosition.y * gridSize}px`,
        width: `${gridSize}px`,
        height: `${gridSize}px`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className={`w-10 h-10 bg-primary rounded-full border-4 border-primary-foreground shadow-lg relative ${isMoving ? 'animate-walk-bounce' : ''}`}>
          {/* Simple person icon */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary-foreground rounded-full"></div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-4 bg-primary-foreground rounded-t-full"></div>
        </div>
      </div>
    </div>
  );
};
