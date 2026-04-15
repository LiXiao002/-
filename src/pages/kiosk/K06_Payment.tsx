import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, QrCode, ScanFace, Loader2 } from "lucide-react";

export default function K06_Payment() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showFaceScanner, setShowFaceScanner] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/kiosk/home');
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const handlePay = (method: string) => {
    setSelectedMethod(method);
    setIsPaying(true);
    
    if (method === 'face') {
      setShowFaceScanner(true);
      // Face scan takes a bit longer to show the animation
      timerRef.current = setTimeout(() => {
        navigate('/kiosk/result');
      }, 3000);
    } else {
      // Simulate other payment process
      timerRef.current = setTimeout(() => {
        navigate('/kiosk/result');
      }, 2000);
    }
  };

  const cancelPayment = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPaying(false);
    setSelectedMethod(null);
    setShowFaceScanner(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 relative">
      {/* Top 140px */}
      <div className="h-[140px] bg-white px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          disabled={isPaying}
          className={`flex items-center gap-3 px-6 py-4 rounded-full text-xl font-medium transition-colors ${
            isPaying ? 'text-gray-400 bg-gray-50' : 'text-gray-600 hover:text-gray-900 bg-gray-100 active:bg-gray-200'
          }`}
        >
          <ArrowLeft size={28} />
          返回修改
        </button>
        
        <div className="text-3xl font-bold text-gray-900">
          选择支付方式
        </div>

        <div className="w-[140px]"></div>
      </div>

      {/* Middle 860px */}
      <div className="h-[860px] p-12 flex flex-col items-center">
        <div className="text-center mb-16">
          <p className="text-2xl text-gray-500 mb-4">支付金额</p>
          <div className="text-7xl font-bold text-red-500">¥26.00</div>
        </div>

        <div className="w-full grid grid-cols-1 gap-6">
          <button 
            onClick={() => handlePay('card')}
            disabled={isPaying}
            className={`relative overflow-hidden bg-white p-8 rounded-[2rem] border-2 flex items-center gap-8 transition-all ${
              selectedMethod === 'card' ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-100 shadow-sm hover:border-orange-300'
            } ${isPaying && selectedMethod !== 'card' ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
              <CreditCard size={48} />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">刷饭卡支付</h3>
              <p className="text-xl text-gray-500">请将饭卡放置在读卡区</p>
            </div>
            {isPaying && selectedMethod === 'card' && (
              <Loader2 size={40} className="text-orange-500 animate-spin" />
            )}
          </button>

          <button 
            onClick={() => handlePay('qrcode')}
            disabled={isPaying}
            className={`relative overflow-hidden bg-white p-8 rounded-[2rem] border-2 flex items-center gap-8 transition-all ${
              selectedMethod === 'qrcode' ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-100 shadow-sm hover:border-orange-300'
            } ${isPaying && selectedMethod !== 'qrcode' ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shrink-0">
              <QrCode size={48} />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">扫码支付</h3>
              <p className="text-xl text-gray-500">支持微信 / 支付宝</p>
            </div>
            {isPaying && selectedMethod === 'qrcode' && (
              <Loader2 size={40} className="text-orange-500 animate-spin" />
            )}
          </button>

          <button 
            onClick={() => handlePay('face')}
            disabled={isPaying}
            className={`relative overflow-hidden bg-white p-8 rounded-[2rem] border-2 flex items-center gap-8 transition-all ${
              selectedMethod === 'face' ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-100 shadow-sm hover:border-orange-300'
            } ${isPaying && selectedMethod !== 'face' ? 'opacity-50 grayscale' : ''}`}
          >
            <div className="w-24 h-24 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center shrink-0">
              <ScanFace size={48} />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">刷脸支付</h3>
              <p className="text-xl text-gray-500">请正对屏幕上方摄像头</p>
            </div>
            {isPaying && selectedMethod === 'face' && !showFaceScanner && (
              <Loader2 size={40} className="text-orange-500 animate-spin" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom 440px */}
      <div className="h-[440px] flex flex-col items-center justify-end pb-16 px-12">
        {isPaying ? (
          <div className="text-center mb-12 animate-pulse">
            <p className="text-3xl text-orange-500 font-bold mb-4">正在确认支付...</p>
            <p className="text-xl text-gray-500">请勿离开，等待支付结果</p>
          </div>
        ) : (
          <div className="text-center mb-12">
            <p className="text-2xl text-gray-500 mb-4">
              支付倒计时 <span className="text-red-500 font-bold mx-2">{timeLeft}</span> 秒
            </p>
            <p className="text-xl text-gray-400">超时将自动取消订单并返回首页</p>
          </div>
        )}

        <button 
          onClick={isPaying ? cancelPayment : () => navigate('/kiosk/home')}
          className={`w-full py-6 rounded-full text-2xl font-bold transition-colors mb-6 ${
            isPaying 
              ? 'bg-white text-red-500 border-2 border-red-200 hover:bg-red-50 active:bg-red-100' 
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100'
          }`}
        >
          取消支付
        </button>

        {/* Debug Buttons for Simulation */}
        {!isPaying && (
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => navigate('/kiosk/fail', { state: { reason: '余额不足' } })}
              className="flex-1 py-4 rounded-full text-lg font-medium text-red-600 bg-red-50 border border-red-100 active:bg-red-100"
            >
              模拟: 余额不足
            </button>
            <button 
              onClick={() => navigate('/kiosk/fail', { state: { reason: '卡号不存在' } })}
              className="flex-1 py-4 rounded-full text-lg font-medium text-red-600 bg-red-50 border border-red-100 active:bg-red-100"
            >
              模拟: 卡号不存在
            </button>
          </div>
        )}
      </div>

      {/* Face Scanner Overlay */}
      {showFaceScanner && (
        <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md animate-in fade-in duration-300">
          <h2 className="text-4xl font-bold text-white mb-16 tracking-widest">请正对屏幕上方摄像头</h2>
          
          {/* Scanner Frame */}
          <div className="relative w-96 h-96">
            {/* Corner borders */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-orange-500 rounded-tl-[2rem]"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-orange-500 rounded-tr-[2rem]"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-orange-500 rounded-bl-[2rem]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-orange-500 rounded-br-[2rem]"></div>
            
            {/* Face outline / Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <ScanFace size={200} className="text-white" strokeWidth={1} />
            </div>

            {/* Scanning line animation */}
            <div className="absolute left-0 right-0 h-2 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,1)] animate-scan"></div>
          </div>

          <p className="text-2xl text-orange-400 mt-16 animate-pulse">正在识别面部信息...</p>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              cancelPayment();
            }}
            className="mt-20 px-12 py-4 rounded-full border-2 border-white/30 text-white/80 text-2xl hover:bg-white/10 active:bg-white/20 transition-colors"
          >
            取消识别
          </button>
        </div>
      )}
    </div>
  );
}
