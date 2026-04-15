import { useState, useEffect } from "react";
import { WifiOff, Clock } from "lucide-react";

export default function S02_Offline() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white font-sans relative">
      {/* Top Bar 120px */}
      <div className="h-[120px] bg-gray-800 px-12 flex items-center justify-between shrink-0 border-b border-gray-700 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-8">
          <h1 className="text-5xl font-bold text-gray-500 tracking-wider">未来智慧食堂</h1>
        </div>
        
        <div className="flex items-center gap-3 text-3xl font-mono text-gray-500">
          <Clock size={32} />
          {time.toLocaleTimeString('zh-CN', { hour12: false })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center mb-12 border-4 border-gray-700">
          <WifiOff size={96} className="text-gray-500" />
        </div>
        
        <h2 className="text-6xl font-bold text-gray-300 mb-6 tracking-wider">
          当前叫号大屏连接异常
        </h2>
        
        <p className="text-4xl text-gray-500">
          请留意窗口通知或联系工作人员
        </p>
      </div>
    </div>
  );
}
