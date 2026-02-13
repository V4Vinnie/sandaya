import { useGame, Bungalow } from "@/contexts/GameContext";
import { Home } from "lucide-react";
import { useState, useEffect } from "react";

type BungalowHouseProps = {
  bungalow: Bungalow;
  gridSize: number;
};

export const BungalowHouse = ({ bungalow, gridSize }: BungalowHouseProps) => {
  const { currentFamily, playerPosition } = useGame();
  const [justMoved, setJustMoved] = useState(false);
  const prevOccupied = bungalow.occupied;

  useEffect(() => {
    if (bungalow.occupied && !prevOccupied) {
      setJustMoved(true);
      const timer = setTimeout(() => setJustMoved(false), 1500); // Longer to show full animation
      return () => clearTimeout(timer);
    }
  }, [bungalow.occupied]);

  // Check if player is nearby (within 2 grid units)
  const distance = Math.abs(bungalow.position.x - playerPosition.x) + Math.abs(bungalow.position.y - playerPosition.y);
  const isNearby = distance <= 2;

  const isPerfectMatch = currentFamily && !bungalow.occupied && currentFamily.size === bungalow.beds && isNearby;
  const isOversizedMatch = currentFamily && !bungalow.occupied && bungalow.beds > currentFamily.size && isNearby;
  const isTooSmall = currentFamily && !bungalow.occupied && bungalow.beds < currentFamily.size && isNearby;

  return (
    <div
      className={`absolute transition-all duration-300 group ${
        isPerfectMatch ? "scale-110" : ""
      } ${isOversizedMatch ? "scale-105" : ""} ${isTooSmall ? "opacity-50" : ""}`}
      style={{
        left: `${bungalow.position.x * gridSize}px`,
        top: `${bungalow.position.y * gridSize}px`,
        width: `${gridSize * 1.5}px`,
        height: `${gridSize * 1.5}px`,
      }}
    >
      {/* House */}
      <div className="relative w-full h-full">
        {/* Roof */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[30px] border-transparent"
          style={{ borderBottomColor: bungalow.occupied ? bungalow.family?.color : "hsl(var(--bungalow-roof))" }}
        ></div>
        
        {/* Walls */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-bungalow-wall border-2 border-foreground/20 rounded-sm shadow-lg"
          style={{ backgroundColor: bungalow.occupied ? `${bungalow.family?.color}20` : undefined }}
        >
          {/* Door */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-7 bg-foreground/30 rounded-t-sm"></div>
          
          {/* Windows */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-primary/30 border border-foreground/20"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-primary/30 border border-foreground/20"></div>
        </div>

        {/* Status indicator */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-background shadow-lg flex items-center justify-center ${justMoved ? 'animate-celebrate' : ''}`}
             style={{ backgroundColor: bungalow.occupied ? "#4ade80" : "#fbbf24" }}>
          {bungalow.occupied ? (
            <span className="text-xs">✓</span>
          ) : (
            <Home className="w-3 h-3 text-foreground" />
          )}
        </div>

        {/* Family move-in animation */}
        {justMoved && bungalow.family && (
          <>
            {/* Family members walking in from the left */}
            {Array.from({ length: bungalow.family.size }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-walk-in"
                style={{
                  left: '-40px',
                  top: '50%',
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {i === 0 ? '👨' : i === 1 ? '👩' : i === 2 ? '👧' : i === 3 ? '👦' : '👶'}
              </div>
            ))}
            
            {/* Welcome message */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-bounce whitespace-nowrap">
              Welcome Home! 🏡
            </div>
          </>
        )}

        {/* Bed count indicator */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-background border-2 border-foreground/20 rounded-full px-2 py-0.5 shadow-lg">
          <span className="text-xs font-bold">{bungalow.beds} 🛏️</span>
        </div>

        {/* Visual feedback when player is nearby */}
        {isNearby && !bungalow.occupied && currentFamily && (
          <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded whitespace-nowrap font-semibold shadow-lg animate-bounce ${
            isPerfectMatch ? 'bg-green-600 text-white' :
            isOversizedMatch ? 'bg-yellow-600 text-white' :
            'bg-red-600 text-white'
          }`}>
            {isPerfectMatch ? 'Press ENTER (+10)' :
             isOversizedMatch ? `Press ENTER (+${Math.max(1, 10 - (bungalow.beds - currentFamily.size) * 3)})` :
             'TOO SMALL!'}
          </div>
        )}

        {/* Highlight for perfect matches */}
        {isPerfectMatch && (
          <div className="absolute inset-0 bg-green-500/30 rounded-lg animate-pulse ring-4 ring-green-500/50"></div>
        )}
        
        {/* Highlight for oversized matches (penalty) */}
        {isOversizedMatch && (
          <div className="absolute inset-0 bg-yellow-500/30 rounded-lg animate-pulse ring-4 ring-yellow-500/50"></div>
        )}
        
        {/* Highlight for too small (not allowed) */}
        {isTooSmall && (
          <div className="absolute inset-0 bg-red-500/30 rounded-lg ring-4 ring-red-500/50"></div>
        )}
      </div>
    </div>
  );
};
