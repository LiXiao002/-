import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Search, Home } from "lucide-react";

export default function K07_Result() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/kiosk');
      return;
    }
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Top 180px */}
      <div className="h-[180px] flex flex-col items-center justify-end pb-8 shrink-0">
        <div className="flex items-center gap-4 text-green-500">
          <CheckCircle2 size={56} />
          <h1 className="text-5xl font-bold">支付成功</h1>
        </div>
      </div>

      {/* Middle 760px */}
      <div className="h-[760px] px-12 flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 p-12 flex flex-col items-center relative overflow-hidden">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-orange-500" />
          
          <p className="text-2xl text-gray-500 mb-6">您的取餐号</p>
          <div className="text-[120px] leading-none font-bold text-orange-500 mb-8 tracking-tighter">
            A052
          </div>
          
          <div className="w-full h-px bg-gray-100 mb-8" />
          
          <div className="w-full space-y-4">
            <div className="flex justify-between text-2xl">
              <span className="text-gray-500">取餐档口</span>
              <span className="font-bold text-gray-900">大众快餐</span>
            </div>
            <div className="flex justify-between text-2xl">
              <span className="text-gray-500">订单金额</span>
              <span className="font-bold text-gray-900">¥26.00</span>
            </div>
            <div className="flex justify-between text-2xl">
              <span className="text-gray-500">支付时间</span>
              <span className="font-bold text-gray-900">2023-10-27 12:05:32</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 500px */}
      <div className="h-[500px] flex flex-col items-center justify-end pb-16 px-12">
        <div className="bg-orange-50 text-orange-600 px-8 py-6 rounded-2xl text-2xl font-medium mb-16 text-center w-full">
          请留意大屏叫号，凭取餐号到对应档口取餐
        </div>

        <div className="w-full grid grid-cols-2 gap-6 mb-8">
          <button 
            onClick={() => navigate('/kiosk/orders')}
            className="bg-white border-2 border-gray-200 text-gray-700 py-6 rounded-full text-2xl font-bold flex items-center justify-center gap-3 active:bg-gray-50"
          >
            <Search size={32} />
            查看订单
          </button>
          <button 
            onClick={() => navigate('/kiosk')}
            className="bg-orange-500 text-white py-6 rounded-full text-2xl font-bold flex items-center justify-center gap-3 active:bg-orange-600 shadow-xl shadow-orange-500/30"
          >
            <Home size={32} />
            返回首页
          </button>
        </div>

        <p className="text-xl text-gray-400">
          {countdown} 秒后自动返回首页
        </p>
      </div>
    </div>
  );
}
