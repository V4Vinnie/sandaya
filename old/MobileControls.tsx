import { useGame } from "@/contexts/GameContext";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const MobileControls = () => {
  const { movePlayer, bungalows, playerPosition, assignFamily } = useGame();

  const handleAction = () => {
    const nearbyBungalow = bungalows.find((b) => {
      const distance = Math.abs(b.position.x - playerPosition.x) + Math.abs(b.position.y - playerPosition.y);
      return distance <= 2;
    });
    
    if (nearbyBungalow) {
      assignFamily(nearbyBungalow.id);
    } else {
      toast.info("Walk closer to a bungalow!");
    }
  };

  return (
    <div className="md:hidden fixed bottom-20 left-4 z-30">
      <div className="flex flex-col gap-2">
        {/* D-Pad Controls */}
        <div className="grid grid-cols-3 gap-1 bg-card/90 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <div></div>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => movePlayer("up")}
            className="h-12 w-12"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <div></div>
          
          <Button
            size="icon"
            variant="secondary"
            onClick={() => movePlayer("left")}
            className="h-12 w-12"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="h-12 w-12"></div>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => movePlayer("right")}
            className="h-12 w-12"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div></div>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => movePlayer("down")}
            className="h-12 w-12"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
          <div></div>
        </div>

        {/* Action Button */}
        <Button
          size="lg"
          onClick={handleAction}
          className="w-full"
        >
          <Home className="h-5 w-5 mr-2" />
          Assign Family
        </Button>
      </div>
    </div>
  );
};
