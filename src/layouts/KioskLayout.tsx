import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useIdle } from "react-use";
import { Home } from "lucide-react";

export default function KioskLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  
  // 120,000ms = 2 minutes
  const isIdle = useIdle(120000);

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

  // Auto-reset to standby page if idle
  useEffect(() => {
    if (isIdle && location.pathname !== '/kiosk') {
      navigate('/kiosk');
    }
  }, [isIdle, location.pathname, navigate]);

  const showHomeButton = location.pathname !== '/kiosk';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div 
        ref={containerRef}
        className="bg-gray-50 relative overflow-hidden shadow-2xl rounded-3xl flex flex-col"
        style={{ 
          width: '900px', 
          height: '1440px', 
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className="flex-1 relative overflow-hidden">
          <Outlet />
        </div>

        {showHomeButton && (
          <button
            onClick={() => navigate('/kiosk')}
            className="absolute top-6 right-6 px-5 py-2.5 bg-orange-500 shadow-xl rounded-full flex items-center justify-center gap-2 text-white active:scale-95 transition-all z-[100] border-2 border-white"
          >
            <Home size={20} />
            <span className="text-base font-bold">返回待机</span>
          </button>
        )}
      </div>
    </div>
  );
}
