import { useState, useEffect } from "react";
import { Clock, Bell } from "lucide-react";

const PREPARING = ["A053", "A054", "A055", "A056", "A057", "A058", "A059", "A060"];
const READY = ["A048", "A049", "A050", "A051", "A052"];
const OVERDUE = ["A045"]; // 滞留订单

export default function S01_MainScreen() {
  const [time, setTime] = useState(new Date());
  const [callingNumber, setCallingNumber] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate a call every 10 seconds
  useEffect(() => {
    const callTimer = setInterval(() => {
      const randomNo = READY[Math.floor(Math.random() * READY.length)];
      setCallingNumber(randomNo);
      setTimeout(() => setCallingNumber(null), 5000);
    }, 10000);
    return () => clearInterval(callTimer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white font-sans relative overflow-hidden">
      {/* Calling Overlay */}
      {callingNumber && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="bg-orange-600 w-[1200px] h-[600px] rounded-[4rem] shadow-[0_0_100px_rgba(234,88,12,0.6)] border-8 border-white flex flex-col items-center justify-center p-12 text-center">
            <div className="flex items-center gap-8 mb-12">
              <Bell size={120} className="text-white animate-bounce" />
              <h2 className="text-[100px] font-black text-white tracking-widest">请取餐</h2>
            </div>
            <div className="text-[240px] font-black text-white font-mono leading-none mb-12 drop-shadow-2xl">
              {callingNumber}
            </div>
            <div className="text-6xl font-bold text-orange-100">
              请到 <span className="text-white underline underline-offset-8 decoration-white">大众快餐</span> 档口取餐
            </div>
          </div>
        </div>
      )}

      {/* Top Bar 120px */}
      <div className="h-[120px] bg-gray-800 px-12 flex items-center justify-between shrink-0 border-b border-gray-700">
        <div className="flex items-center gap-8">
          <h1 className="text-5xl font-bold text-white tracking-wider">智慧营养食堂</h1>
          <div className="h-12 w-px bg-gray-600" />
          <h2 className="text-4xl font-bold text-orange-500">大众快餐</h2>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="bg-gray-700 px-6 py-3 rounded-full text-2xl font-medium text-gray-300">
            午餐时段
          </div>
          <div className="flex items-center gap-3 text-3xl font-mono text-gray-300">
            <Clock size={32} />
            {time.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </div>
      </div>

      {/* Main Content 840px */}
      <div className="h-[840px] px-12 py-8 flex gap-10">
        
        {/* Left: Preparing */}
        <div className="flex-1 bg-gray-800/50 rounded-[2rem] border border-gray-700 flex flex-col overflow-hidden">
          <div className="h-[100px] bg-gray-800 flex items-center justify-center border-b border-gray-700 shrink-0">
            <h3 className="text-4xl font-bold text-gray-300 tracking-widest">正在备餐 PREPARING</h3>
          </div>
          <div className="flex-1 p-8 overflow-hidden">
            <div className="grid grid-cols-2 gap-6">
              {PREPARING.map((no, idx) => (
                <div key={idx} className="h-[120px] bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700">
                  <span className="text-[72px] font-bold text-gray-300 font-mono">{no}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Ready */}
        <div className="flex-1 bg-orange-900/20 rounded-[2rem] border border-orange-900/50 flex flex-col overflow-hidden relative">
          <div className="h-[100px] bg-orange-600 flex items-center justify-center shrink-0 shadow-lg z-10">
            <h3 className="text-4xl font-bold text-white tracking-widest flex items-center gap-4">
              <Bell size={40} className="animate-bounce" />
              请取餐 PLEASE PICK UP
            </h3>
          </div>
          <div className="flex-1 p-8 overflow-hidden">
            <div className="grid grid-cols-2 gap-6">
              {/* Overdue / High Priority */}
              {OVERDUE.map((no, idx) => (
                <div key={`overdue-${idx}`} className="h-[120px] bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] border-2 border-red-400 animate-pulse">
                  <span className="text-[72px] font-bold text-white font-mono">{no}</span>
                </div>
              ))}
              
              {/* Normal Ready */}
              {READY.map((no, idx) => (
                <div key={`ready-${idx}`} className="h-[120px] bg-orange-500/20 rounded-2xl flex items-center justify-center border border-orange-500/50">
                  <span className="text-[72px] font-bold text-orange-400 font-mono">{no}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar 120px */}
      <div className="h-[120px] bg-gray-800 px-12 flex items-center shrink-0 border-t border-gray-700">
        <div className="flex items-center gap-6 w-full">
          <div className="bg-orange-500 text-white px-6 py-2 rounded-xl text-2xl font-bold whitespace-nowrap">
            温馨提示
          </div>
          <div className="text-3xl text-gray-300 overflow-hidden flex-1">
            <p className="whitespace-nowrap animate-[marquee_20s_linear_infinite]">
              请留意屏幕叫号信息，听到语音播报后凭取餐号到对应窗口取餐。用餐结束后请将餐盘放至回收处，谢谢您的配合！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
