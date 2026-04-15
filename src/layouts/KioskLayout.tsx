import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function KioskLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleX = windowWidth / 900;
      const scaleY = windowHeight / 1440;
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
        className="bg-gray-50 relative overflow-hidden shadow-2xl rounded-3xl"
        style={{ 
          width: '900px', 
          height: '1440px', 
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
