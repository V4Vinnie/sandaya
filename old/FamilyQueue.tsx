import { useGame } from "@/contexts/GameContext";
import { User } from "lucide-react";
import { Card } from "./ui/card";

export const FamilyQueue = () => {
  const { families, currentFamily } = useGame();

  return (
    <Card className="w-full p-4 bg-card/90 backdrop-blur-sm">
      {families.length === 0 ? (
        <p className="text-muted-foreground text-center py-2 text-sm">No families waiting...</p>
      ) : (
        <div className="flex gap-3 justify-center items-center">
          {families.slice(0, 2).map((family, index) => (
            <Card 
              key={family.id}
              className={`p-2 transition-all ${
                index === 0 
                  ? 'bg-primary text-primary-foreground scale-105 shadow-lg' 
                  : 'opacity-70'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border-2 flex-shrink-0"
                  style={{ 
                    backgroundColor: family.color,
                    borderColor: index === 0 ? 'currentColor' : 'transparent'
                  }}
                ></div>
                <div className="flex gap-0.5">
                  {Array.from({ length: family.size }).map((_, i) => (
                    <User key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};
