import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Home, CheckCircle2 } from "lucide-react";
import { generateReceiptContent } from "../../lib/receipt";

export default function K07_Result() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Simulate printing
    const content = generateReceiptContent({
      orderNo: "A052",
      stallName: "大众快餐",
      items: [{ name: "招牌红烧肉", count: 1, price: 18 }, { name: "清炒时蔬", count: 1, price: 8 }],
      totalAmount: 26,
      time: new Date().toLocaleString(),
      pickupMethod: "堂食"
    });
    console.log("Printing receipt:\n", content);

    if (countdown <= 0) {
      navigate('/kiosk');
      return;
    }
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-y-auto hide-scrollbar">
      {/* Printing Notification Banner */}
      <div className="bg-[#7c9aff] text-white py-4 px-8 flex items-center justify-center gap-4 shrink-0">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span className="text-2xl font-medium">正在打印小票，请勿离开...</span>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center py-12 px-12">
        {/* Success Header */}
        <div className="flex items-center gap-4 text-[#00c853] mb-16">
          <CheckCircle2 size={64} strokeWidth={2.5} />
          <h1 className="text-6xl font-bold">支付成功</h1>
        </div>

        {/* Pickup Card */}
        <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden mb-8">
          <div className="h-4 bg-[#ff6d00]" />
          <div className="p-12 flex flex-col items-center">
            <p className="text-2xl text-gray-400 mb-6">您的取餐号</p>
            <div className="text-[140px] leading-none font-black text-[#ff6d00] mb-12 tracking-tighter">
              A052
            </div>
            
            <div className="w-full space-y-6 text-2xl">
              <div className="flex justify-between">
                <span className="text-gray-400">取餐档口</span>
                <span className="font-bold text-gray-800">大众快餐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">订单金额</span>
                <span className="font-bold text-gray-800">¥26.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">支付时间</span>
                <span className="font-bold text-gray-800">2023-10-27 12:05:32</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Section */}
        <div className="w-full max-w-3xl bg-[#f9fff9] rounded-[3rem] border-2 border-[#e0f2e0] p-12 flex flex-col items-center mb-8">
          <h2 className="text-4xl font-bold text-[#2e7d32] mb-4">您的餐盘</h2>
          <p className="text-2xl text-[#81c784] mb-12">彩色扇形代表本餐已摄入</p>

          <div className="relative mb-12">
            {/* Plate Container */}
            <div className="relative w-80 h-80 rounded-full border-[14px] border-white shadow-xl overflow-hidden bg-gray-100/50">
              {/* Vegetables (Green) - Top Left */}
              <div className="absolute inset-0 bg-[#4CAF50] origin-bottom-right" style={{ clipPath: 'polygon(50% 50%, 0 0, 50% 0, 50% 50%, 0 50%)' }}></div>
              <div className="absolute top-[20%] left-[20%] text-white font-bold text-2xl drop-shadow-sm z-10 flex flex-col items-center">
                <img src="https://img.icons8.com/color/96/broccoli.png" className="w-10 h-10 mb-1" referrerPolicy="no-referrer" />
                <span>蔬菜</span>
              </div>
              
              {/* Grains (Brown) - Top Right */}
              <div className="absolute inset-0 bg-[#A1887F] origin-bottom-left" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)' }}></div>
              <div className="absolute top-[35%] right-[15%] text-white font-bold text-2xl drop-shadow-sm z-10 flex flex-col items-center">
                <img src="https://img.icons8.com/color/96/bread.png" className="w-10 h-10 mb-1" referrerPolicy="no-referrer" />
                <span>谷薯</span>
              </div>
              
              {/* Meat/Protein (Orange) - Bottom Right */}
              <div className="absolute inset-0 bg-[#FF9800] origin-top-left" style={{ clipPath: 'polygon(50% 50%, 50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
              <div className="absolute bottom-[20%] right-[15%] text-white font-bold text-2xl drop-shadow-sm z-10 flex flex-col items-center">
                <img src="https://img.icons8.com/color/96/steak.png" className="w-10 h-10 mb-1" referrerPolicy="no-referrer" />
                <span>鱼肉蛋白</span>
              </div>
              
              {/* Fruits (Red/Pink) - Bottom Left */}
              <div className="absolute inset-0 bg-[#C2185B] origin-top-right" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%)' }}></div>
              <div className="absolute bottom-[20%] left-[25%] text-white font-bold text-2xl drop-shadow-sm z-10 flex flex-col items-center">
                <img src="https://img.icons8.com/color/96/strawberry.png" className="w-10 h-10 mb-1" referrerPolicy="no-referrer" />
                <span>水果</span>
              </div>

              {/* White separators */}
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-white -translate-y-1/2"></div>
              <div className="absolute top-0 left-1/2 w-1.5 h-full bg-white -translate-x-1/2"></div>
            </div>

            {/* Milk/Water Glass Icon */}
            <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-16 h-20 bg-blue-50 rounded-b-xl rounded-t-sm border-2 border-blue-100 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-[#90caf9] opacity-60"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/40 rounded-full"></div>
              </div>
              <span className="text-gray-500 text-xl mt-3 font-bold">奶/水</span>
            </div>
          </div>

          {/* Feedback Box */}
          <div className="w-full border-2 border-dashed border-[#ffe0b2] rounded-[2rem] py-6 px-10 text-center bg-white/80">
            <p className="text-3xl text-gray-700 leading-relaxed">
              ✨ 您本餐的<span className="font-bold text-[#ff6d00]">蛋白质</span>与<span className="font-bold text-[#2e7d32]">蔬菜</span>摄入很赞！<br/>
              建议补充一个<span className="font-bold text-[#d81b60]">小苹果</span>。
            </p>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="w-full max-w-3xl bg-[#fff8e1] text-[#ff6d00] py-6 rounded-[2rem] text-3xl font-bold text-center mb-16">
          请留意大屏叫号，凭取餐号到对应档口取餐
        </div>

        {/* Bottom Actions */}
        <div className="w-full max-w-3xl grid grid-cols-2 gap-8 mb-12">
          <button 
            onClick={() => navigate('/kiosk/orders')}
            className="bg-white border-2 border-gray-100 text-gray-600 py-8 rounded-full text-3xl font-bold flex items-center justify-center gap-4 shadow-sm active:bg-gray-50"
          >
            <Search size={36} />
            查看订单
          </button>
          <button 
            onClick={() => navigate('/kiosk')}
            className="bg-[#ff6d00] text-white py-8 rounded-full text-3xl font-bold flex items-center justify-center gap-4 shadow-xl shadow-orange-500/20 active:bg-orange-600"
          >
            <Home size={36} />
            返回首页
          </button>
        </div>

        <p className="text-2xl text-gray-400">
          {countdown} 秒后自动返回首页
        </p>
      </div>
    </div>
  );
}
