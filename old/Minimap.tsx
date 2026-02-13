import { useGame } from "@/contexts/GameContext";
import { Card } from "./ui/card";

const MINIMAP_SIZE = 160;
const PARK_SIZE = 1600;
const SCALE = MINIMAP_SIZE / PARK_SIZE;
const GRID_SIZE = 60;

export const Minimap = () => {
  const { bungalows, playerPosition } = useGame();

  return (
    <Card className="absolute top-20 left-4 z-20 p-2 bg-card/90 backdrop-blur-sm">
      <div className="text-xs font-semibold mb-1 text-muted-foreground">Map</div>
      <div 
        className="relative bg-park-grass border-2 border-park-path"
        style={{ width: MINIMAP_SIZE, height: MINIMAP_SIZE }}
      >
        {/* Bungalows */}
        {bungalows.map((bungalow) => {
          const x = bungalow.position.x * GRID_SIZE * SCALE;
          const y = bungalow.position.y * GRID_SIZE * SCALE;
          
          return (
            <div
              key={bungalow.id}
              className={`absolute rounded-sm ${
                bungalow.occupied 
                  ? 'bg-accent' 
                  : 'bg-bungalow-roof'
              }`}
              style={{
                left: x,
                top: y,
                width: 6,
                height: 6,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
        
        {/* Player */}
        <div
          className="absolute bg-primary rounded-full border-2 border-primary-foreground animate-pulse"
          style={{
            left: playerPosition.x * GRID_SIZE * SCALE,
            top: playerPosition.y * GRID_SIZE * SCALE,
            width: 8,
            height: 8,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1 text-center">
        {bungalows.filter(b => b.occupied).length}/{bungalows.length}
      </div>
    </Card>
  );
};
