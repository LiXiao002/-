import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Trash2, Minus, Plus, AlertTriangle, ShoppingCart } from "lucide-react";

const INITIAL_CART = [
  { id: 1, name: "招牌红烧肉", price: 18, count: 1, image: "https://images.unsplash.com/photo-1588897056659-4e98fac41bf6?w=400&q=80" },
  { id: 2, name: "清炒时蔬", price: 8, count: 1, image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&q=80" },
];

export default function K05_Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use the cart passed from the previous page, or fallback to INITIAL_CART for direct visits
  const initialCart = location.state?.cart || INITIAL_CART;
  const [cart, setCart] = useState<any[]>(initialCart);
  const [pickupMethod, setPickupMethod] = useState<'dine-in' | 'take-out'>('dine-in');

  const PACKAGING_FEE = 1;
  const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const total = itemsTotal + (pickupMethod === 'take-out' ? PACKAGING_FEE : 0);
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

  const updateCount = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newCount = Math.max(0, item.count + delta);
        return { ...item, count: newCount };
      }
      return item;
    }).filter(item => item.count > 0));
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Top 140px */}
      <div className="h-[140px] bg-white px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 bg-gray-100 px-6 py-4 rounded-full text-xl font-medium active:bg-gray-200"
        >
          <ArrowLeft size={28} />
          继续点餐
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">确认订单</h1>
          <p className="text-lg text-gray-500 mt-1">大众快餐</p>
        </div>

        <button 
          onClick={() => setCart([])}
          className="flex items-center gap-2 text-red-500 bg-red-50 px-6 py-4 rounded-full text-xl font-medium active:bg-red-100"
        >
          <Trash2 size={24} />
          清空
        </button>
      </div>

      {/* Middle 920px */}
      <div className="h-[920px] p-8 overflow-y-auto">
        {/* Pickup Method Selection */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">取餐方式</h3>
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setPickupMethod('dine-in')}
              className={`py-6 rounded-2xl text-2xl font-bold border-2 transition-all ${
                pickupMethod === 'dine-in'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-100 bg-gray-50 text-gray-500'
              }`}
            >
              堂食
            </button>
            <button
              onClick={() => setPickupMethod('take-out')}
              className={`py-6 rounded-2xl text-2xl font-bold border-2 transition-all ${
                pickupMethod === 'take-out'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-100 bg-gray-50 text-gray-500'
              }`}
            >
              自提/打包
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <ShoppingCart size={80} className="mb-6 opacity-20" />
            <p className="text-2xl">购物车是空的</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-6 items-center">
                <img src={item.image} alt={item.name} className="w-32 h-32 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <div className="text-2xl font-bold text-red-500">¥{item.price}</div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 rounded-full p-2 border border-gray-100">
                  <button 
                    onClick={() => updateCount(item.id, -1)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm active:scale-95"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="text-2xl font-bold w-10 text-center">{item.count}</span>
                  <button 
                    onClick={() => updateCount(item.id, 1)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm active:scale-95"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            ))}

            {/* Packaging Fee Item */}
            {pickupMethod === 'take-out' && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-100 flex gap-6 items-center animate-in slide-in-from-top-4 duration-300">
                <div className="w-32 h-32 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                  <ShoppingCart size={48} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">打包费</h3>
                  <p className="text-gray-500">自提/打包自动增加</p>
                </div>
                <div className="flex items-center gap-4 px-6">
                  <div className="text-2xl font-bold text-red-500">¥{PACKAGING_FEE.toFixed(2)}</div>
                  <div className="text-gray-400 text-xl ml-4">x1</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom 380px */}
      <div className="h-[380px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[3rem] p-8 flex flex-col shrink-0">
        <div className="bg-orange-50 text-orange-600 p-4 rounded-2xl flex items-start gap-3 mb-8">
          <AlertTriangle size={24} className="shrink-0 mt-1" />
          <p className="text-lg">请确认您的订单信息。支付完成后，请留意大屏叫号或凭取餐号到对应档口取餐。</p>
        </div>

        <div className="flex justify-between items-end mb-8">
          <div className="text-gray-500 text-2xl">
            共 <span className="text-gray-900 font-bold mx-1">{totalCount}</span> 件商品
          </div>
          <div className="text-right">
            <div className="text-gray-500 text-xl mb-1">应付金额</div>
            <div className="text-5xl font-bold text-red-500">¥{total.toFixed(2)}</div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/kiosk/pay')}
          disabled={cart.length === 0}
          className={`w-full py-6 rounded-full text-3xl font-bold shadow-xl transition-all active:scale-[0.98] ${
            cart.length > 0 
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30' 
              : 'bg-gray-200 text-gray-400 shadow-none'
          }`}
        >
          确认并支付
        </button>
      </div>
    </div>
  );
}
