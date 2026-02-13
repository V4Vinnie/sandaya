import { useGame } from "@/contexts/GameContext";
import { Player } from "./Player";
import { BungalowHouse } from "./BungalowHouse";
import { FamilyQueue } from "./FamilyQueue";
import { GameHUD } from "./GameHUD";
import { MobileControls } from "./MobileControls";
import { Minimap } from "./Minimap";
import { DayTransitionScreen } from "./DayTransitionScreen";
import { useEffect, useRef } from "react";

const GRID_SIZE = 60;
const VIEWPORT_SIZE = 400;

export const GameBoard = () => {
  const { bungalows, playerPosition, showDayTransition, transitionData, day, continueToDayNext } = useGame();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate winding main road and side paths to bungalows
  
  // Create a more winding main road using multiple curves
  const mainRoadPath = `
    M 100 300
    Q 200 100, 400 200
    Q 600 300, 700 600
    Q 800 900, 1000 1000
    Q 1200 1100, 1400 900
    Q 1500 700, 1500 1400
  `;
  
  // Generate side paths from main road to each bungalow
  const sidePaths = bungalows.map((bungalow, index) => {
    const bungalowX = bungalow.position.x * GRID_SIZE + GRID_SIZE / 2;
    const bungalowY = bungalow.position.y * GRID_SIZE + GRID_SIZE / 2;
    
    // Calculate approximate position on the winding road based on bungalow index
    const roadProgress = index / (bungalows.length - 1);
    const roadX = 100 + roadProgress * 1400;
    const roadY = 200 + roadProgress * 1100 + Math.sin(roadProgress * Math.PI * 3) * 250;
    
    // Create more curved path from road to bungalow with offset control point
    const controlX = (roadX + bungalowX) / 2 + (Math.random() - 0.5) * 150;
    const controlY = (roadY + bungalowY) / 2 + (Math.random() - 0.5) * 150;
    
    return {
      id: `side-${index}`,
      path: `M ${roadX} ${roadY} Q ${controlX} ${controlY}, ${bungalowX} ${bungalowY}`
    };
  });

  // Auto-scroll to keep player centered in viewport
  useEffect(() => {
    if (scrollContainerRef.current) {
      const playerCenterX = playerPosition.x * GRID_SIZE + GRID_SIZE / 2;
      const playerCenterY = playerPosition.y * GRID_SIZE + GRID_SIZE / 2;
      
      const scrollX = playerCenterX - VIEWPORT_SIZE / 2;
      const scrollY = playerCenterY - VIEWPORT_SIZE / 2;
      
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, scrollX),
        top: Math.max(0, scrollY),
        behavior: 'smooth'
      });
    }
  }, [playerPosition]);

  return (
    <div className="absolute inset-0">
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-auto">
        <div className="relative bg-park-grass"
             style={{ width: '1600px', height: '1600px' }}>
          
          {/* Main road and side pathways to bungalows */}
          <svg className="absolute inset-0 pointer-events-none" width="1600" height="1600">
            {/* Main road */}
            <path
              d={mainRoadPath}
              stroke="#8B7355"
              strokeWidth="32"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Side paths to each bungalow */}
            {sidePaths.map(({ id, path }) => (
              <path
                key={id}
                d={path}
                stroke="#8B7355"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            ))}
          </svg>
          
          {/* Park decorations */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated trees scattered around */}
            <div className="absolute left-[200px] top-[150px] text-4xl animate-sway origin-bottom">🌳</div>
            <div className="absolute right-[200px] top-[300px] text-4xl animate-sway-delayed origin-bottom">🌳</div>
            <div className="absolute left-[400px] bottom-[200px] text-3xl animate-sway origin-bottom">🌲</div>
            <div className="absolute right-[300px] bottom-[400px] text-3xl animate-sway-delayed origin-bottom">🌲</div>
            <div className="absolute left-[800px] top-[500px] text-4xl animate-sway-delayed origin-bottom">🌳</div>
            <div className="absolute left-[1200px] bottom-[300px] text-3xl animate-sway origin-bottom">🌲</div>
            <div className="absolute right-[500px] top-[800px] text-4xl animate-sway origin-bottom">🌳</div>
            
            {/* Animated flowers scattered around */}
            <div className="absolute left-[300px] top-[400px] text-2xl animate-sway origin-bottom">🌺</div>
            <div className="absolute right-[600px] top-[200px] text-2xl animate-sway-delayed origin-bottom">🌸</div>
            <div className="absolute left-[600px] bottom-[500px] text-2xl animate-sway-delayed origin-bottom">🌻</div>
            <div className="absolute right-[400px] bottom-[600px] text-2xl animate-sway origin-bottom">🌷</div>
            <div className="absolute left-[1000px] top-[300px] text-xl animate-sway origin-bottom">🌼</div>
            <div className="absolute right-[800px] top-[600px] text-xl animate-sway-delayed origin-bottom">💐</div>
            <div className="absolute left-[700px] top-[900px] text-xl animate-sway-delayed origin-bottom">🌺</div>
            <div className="absolute right-[900px] bottom-[400px] text-xl animate-sway origin-bottom">🌸</div>
          </div>

        {/* Bungalows */}
        {bungalows.map((bungalow) => (
          <BungalowHouse key={bungalow.id} bungalow={bungalow} gridSize={GRID_SIZE} />
        ))}

        {/* Player */}
        <Player gridSize={GRID_SIZE} />

        {/* Instructions overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg max-w-[90%] z-20">
          <p className="text-xs sm:text-sm font-medium text-foreground text-center">Use WASD/Arrows • Walk to house • ENTER/SPACE to assign</p>
        </div>
        </div>
      </div>

      {/* Overlayed HUD - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <GameHUD />
      </div>

      {/* Overlayed Family Queue - Bottom Center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4">
        <FamilyQueue />
      </div>

      {/* Mobile Controls */}
      <MobileControls />

      {/* Minimap */}
      <Minimap />

      {/* Day Transition Screen */}
      {showDayTransition && transitionData && (
        <DayTransitionScreen
          day={day}
          emptyBungalows={transitionData.emptyBungalows}
          occupiedBungalows={transitionData.occupiedBungalows}
          totalBungalows={bungalows.length}
          penalty={transitionData.penalty}
          onContinue={continueToDayNext}
        />
      )}
    </div>
  );
};
