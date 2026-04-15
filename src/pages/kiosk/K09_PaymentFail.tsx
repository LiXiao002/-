import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";

export default function K09_PaymentFail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(10);
  
  const reason = location.state?.reason || "支付失败，请重试";

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/kiosk/home');
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Top 140px */}
      <div className="h-[140px] bg-white px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="w-[140px]"></div>
        <div className="text-3xl font-bold text-gray-900">
          支付结果
        </div>
        <div className="w-[140px]"></div>
      </div>

      {/* Middle 860px */}
      <div className="h-[860px] flex flex-col items-center justify-center">
        <div className="w-48 h-48 bg-red-50 rounded-full flex items-center justify-center mb-12">
          <XCircle size={100} className="text-red-500" />
        </div>
        
        <h2 className="text-5xl font-bold text-gray-900 mb-6">支付失败</h2>
        <p className="text-3xl text-red-500 font-medium mb-16">{reason}</p>

        <div className="flex gap-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-4 bg-white border-2 border-gray-200 text-gray-600 px-12 py-6 rounded-full text-2xl font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors w-64"
          >
            <RefreshCcw size={32} />
            重新支付
          </button>
          
          <button 
            onClick={() => navigate('/kiosk/home')}
            className="flex items-center justify-center gap-4 bg-gray-900 text-white px-12 py-6 rounded-full text-2xl font-bold hover:bg-gray-800 active:bg-gray-700 transition-colors w-64"
          >
            <ArrowLeft size={32} />
            返回首页
          </button>
        </div>
      </div>

      {/* Bottom 440px */}
      <div className="h-[440px] flex flex-col items-center justify-end pb-16">
        <p className="text-2xl text-gray-500">
          <span className="text-red-500 font-bold mx-2">{timeLeft}</span> 秒后自动返回首页
        </p>
      </div>
    </div>
  );
}
