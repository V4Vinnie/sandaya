import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Home, TrendingDown, Calendar } from "lucide-react";

type DayTransitionScreenProps = {
  day: number;
  emptyBungalows: number;
  occupiedBungalows: number;
  totalBungalows: number;
  penalty: number;
  onContinue: () => void;
};

export const DayTransitionScreen = ({
  day,
  emptyBungalows,
  occupiedBungalows,
  totalBungalows,
  penalty,
  onContinue,
}: DayTransitionScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-md w-full mx-4 p-8 space-y-6 animate-scale-in">
        <div className="text-center space-y-2">
          <Calendar className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-3xl font-bold">Day {day} Ended</h2>
          <p className="text-muted-foreground">Time's up! Here's your summary:</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-primary" />
              <span className="font-medium">Occupied Bungalows</span>
            </div>
            <span className="text-2xl font-bold text-primary">{occupiedBungalows}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-destructive" />
              <span className="font-medium">Empty Bungalows</span>
            </div>
            <span className="text-2xl font-bold text-destructive">{emptyBungalows}</span>
          </div>

          {penalty > 0 && (
            <div className="flex items-center justify-between p-4 bg-destructive/20 rounded-lg border-2 border-destructive/50">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-destructive" />
                <span className="font-medium">Penalty</span>
              </div>
              <span className="text-2xl font-bold text-destructive">-{penalty}</span>
            </div>
          )}
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-center text-sm text-muted-foreground">
            Day {day + 1} will be faster! ⚡
          </p>
          <Button onClick={onContinue} className="w-full" size="lg">
            Continue to Day {day + 1}
          </Button>
        </div>
      </Card>
    </div>
  );
};
