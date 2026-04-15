import { useNavigate } from "react-router-dom";
import { Utensils, ChevronRight, Volume2 } from "lucide-react";

export default function K01_Standby() {
  const navigate = useNavigate();

  return (
    <div 
      className="w-full h-full flex flex-col bg-white"
      onClick={() => navigate('/kiosk/home')}
    >
      {/* Top 180px: Restaurant Name + Current Meal */}
      <div className="h-[180px] flex items-center justify-between px-12 pt-8">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center justify-center text-[#E85D22]">
            <svg width="120" height="60" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* CPT Cursive-like approximation */}
              <text x="10" y="45" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="48" fontWeight="bold" fill="#E85D22" fontStyle="italic">CPT</text>
              {/* 康比特 Bold sans-serif */}
              <text x="10" y="90" fontFamily="sans-serif" fontSize="42" fontWeight="900" fill="#E85D22">康比特</text>
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">智慧营养食堂</h1>
            <p className="text-xl text-gray-500 mt-2">Smart Nutrition Canteen</p>
          </div>
        </div>
        <div className="bg-orange-100 text-orange-600 px-8 py-4 rounded-full text-2xl font-medium">
          午餐时段 11:00 - 13:30
        </div>
      </div>

      {/* Middle 760px: Main Visual */}
      <div className="h-[760px] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-white -z-10" />
        
        <div className="w-[600px] h-[400px] bg-orange-100 rounded-[3rem] mb-12 flex items-center justify-center overflow-hidden relative shadow-inner">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
            alt="Delicious food" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/20" />
          <h2 className="absolute text-white text-6xl font-bold tracking-wider drop-shadow-lg">
            美味不用等
          </h2>
        </div>

        <button 
          className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-full px-20 py-8 text-4xl font-bold shadow-xl shadow-orange-500/30 flex items-center gap-4 transition-transform active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/kiosk/home');
          }}
        >
          开始点餐
          <ChevronRight size={48} className="animate-pulse" />
        </button>
      </div>

      {/* Bottom 500px */}
      <div className="h-[500px] flex flex-col justify-end pb-16 px-12">
        <div className="text-center text-gray-400 text-xl">
          <p>请妥善保管好您的随身物品</p>
          <p className="mt-2 text-lg">v2.1.0</p>
        </div>
      </div>
    </div>
  );
}
