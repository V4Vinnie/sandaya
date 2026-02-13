import { useGame } from "@/contexts/GameContext";
import { Card } from "./ui/card";
import { Trophy, Home, Clock } from "lucide-react";

export const GameHUD = () => {
  const { score, bungalows, gameWon, gameLost, timeRemaining, day } = useGame();
  const totalBungalows = bungalows.length;
  const occupiedBungalows = bungalows.filter((b) => b.occupied).length;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const isLowTime = timeRemaining < 60;

  return (
    <div className="flex flex-col gap-2">
      <Card className="px-3 py-2 flex items-center gap-2 bg-card/90 backdrop-blur-sm">
        <div className="text-lg font-bold">Day {day}</div>
      </Card>

      <Card className={`px-3 py-2 flex items-center gap-2 bg-card/90 backdrop-blur-sm transition-colors ${
        isLowTime && !gameWon && !gameLost ? 'bg-destructive text-destructive-foreground animate-pulse' : ''
      }`}>
        <Clock className="w-5 h-5" />
        <div className="text-lg font-bold font-mono">{timeString}</div>
      </Card>

      <Card className="px-3 py-2 flex items-center gap-2 bg-card/90 backdrop-blur-sm">
        <Trophy className="w-5 h-5 text-accent" />
        <div className="text-lg font-bold">{score}</div>
      </Card>

      <Card className="px-3 py-2 flex items-center gap-2 bg-card/90 backdrop-blur-sm">
        <Home className="w-5 h-5 text-secondary" />
        <div className="text-lg font-bold">
          {occupiedBungalows}/{totalBungalows}
        </div>
      </Card>

      {gameWon && (
        <Card className="px-3 py-2 bg-accent/90 text-accent-foreground backdrop-blur-sm animate-pulse">
          <div className="text-sm font-bold">🎉 Win!</div>
        </Card>
      )}

      {gameLost && (
        <Card className="px-3 py-2 bg-destructive/90 text-destructive-foreground backdrop-blur-sm">
          <div className="text-sm font-bold">⏰ Time's Up!</div>
        </Card>
      )}
    </div>
  );
};
