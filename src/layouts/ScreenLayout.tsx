import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function ScreenLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleX = windowWidth / 1920;
      const scaleY = windowHeight / 1080;
      setScale(Math.min(scaleX, scaleY, 1));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div 
        ref={containerRef}
        className="bg-gray-900 relative overflow-hidden shadow-2xl text-white"
        style={{ 
          width: '1920px', 
          height: '1080px', 
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
