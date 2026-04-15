import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Plus, Info, Trash2, Minus, ChevronUp, ChevronDown } from "lucide-react";
import K04_DishDetail from "./K04_DishDetail";

const CATEGORIES = ["全部", "主食", "素菜", "荤菜", "蛋奶坚果", "汤饮", "水果"];

const DISHES = [
  { id: 1, name: "招牌红烧肉", price: 18, category: "荤菜", image: "https://images.unsplash.com/photo-1588897056659-4e98fac41bf6?w=400&q=80", tags: ["高蛋白", "推荐"], soldOut: false },
  { id: 2, name: "清炒时蔬", price: 8, category: "素菜", image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&q=80", tags: ["低脂", "素食"], soldOut: false },
  { id: 3, name: "糖醋排骨", price: 22, category: "荤菜", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", tags: ["招牌"], soldOut: true },
  { id: 4, name: "麻婆豆腐", price: 12, category: "素菜", image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80", tags: ["微辣"], soldOut: false },
  { id: 5, name: "番茄炒蛋", price: 10, category: "素菜", image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=400&q=80", tags: ["家常"], soldOut: false },
  { id: 6, name: "紫菜蛋花汤", price: 5, category: "汤饮", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", tags: ["清淡"], soldOut: false },
  { id: 7, name: "白米饭", price: 2, category: "主食", image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80", tags: [], soldOut: false },
  { id: 8, name: "坚果酸奶", price: 8, category: "蛋奶坚果", image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&q=80", tags: ["健康"], soldOut: false },
  { id: 9, name: "鲜切西瓜", price: 6, category: "水果", image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&q=80", tags: ["应季"], soldOut: false },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  count: number;
}

export default function K03_StallMenu() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const filteredDishes = selectedCategory === "全部" 
    ? DISHES 
    : DISHES.filter(d => d.category === selectedCategory);

  const handleAddToCart = (dish: any, count: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, count: item.count + count } : item);
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, count }];
    });
  };

  const updateCartItem = (id: number, delta: number) => {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item.id === id) {
          return { ...item, count: Math.max(0, item.count + delta) };
        }
        return item;
      }).filter(item => item.count > 0);
      
      if (newCart.length === 0) setIsCartOpen(false);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 relative overflow-hidden">
      {/* Top 140px */}
      <div className="h-[140px] bg-white px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
        <button 
          onClick={() => navigate('/kiosk/home')}
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 bg-gray-100 px-6 py-4 rounded-full text-xl font-medium active:bg-gray-200"
        >
          <ArrowLeft size={28} />
          返回
        </button>
        
        <div className="text-3xl font-bold text-gray-900">
          大众快餐
        </div>

        <div className="w-[140px]"></div> {/* Spacer for centering */}
      </div>

      {/* Main Area (Sidebar + List) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[200px] bg-white border-r border-gray-100 flex flex-col overflow-y-auto pb-[160px] hide-scrollbar z-0 shrink-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-8 text-2xl font-bold transition-colors relative ${
                selectedCategory === cat
                  ? 'text-orange-500 bg-orange-50/50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {selectedCategory === cat && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 rounded-r-full" />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* List Area */}
        <div className="flex-1 overflow-y-auto p-8 pb-[200px] hide-scrollbar bg-gray-50">
          <div className="grid grid-cols-2 gap-6">
            {filteredDishes.map((dish) => (
              <div 
                key={dish.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col ${dish.soldOut ? 'opacity-60 grayscale' : ''}`}
                onClick={() => !dish.soldOut && setSelectedDish(dish)}
              >
                <div className="h-40 w-full relative shrink-0">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  {dish.soldOut && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-gray-900 text-white px-6 py-2 rounded-full text-xl font-bold">已售罄</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{dish.name}</h3>
                    <button className="text-gray-400 p-1 active:text-gray-600">
                      <Info size={24} />
                    </button>
                  </div>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {dish.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-green-50 text-green-600 text-sm rounded-md border border-green-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-3xl font-bold text-red-500">¥{dish.price}</span>
                    {!dish.soldOut && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(dish, 1);
                        }}
                        className="bg-orange-500 text-white p-3 rounded-full active:bg-orange-600 transition-colors"
                      >
                        <Plus size={28} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Popup Backdrop */}
      {isCartOpen && cartCount > 0 && (
        <div 
          className="absolute inset-0 bg-black/50 z-20"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Popup Panel */}
      <div 
        className={`absolute left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 transition-all duration-300 flex flex-col ${
          isCartOpen && cartCount > 0 ? 'bottom-[160px] opacity-100' : '-bottom-[100%] opacity-0 pointer-events-none'
        }`} 
        style={{ maxHeight: '600px' }}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-3xl shrink-0">
          <h3 className="text-2xl font-bold text-gray-900">已选菜品</h3>
          <button onClick={clearCart} className="text-gray-500 flex items-center gap-2 text-xl active:text-gray-700">
            <Trash2 size={24} /> 清空购物车
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-8 last:mb-0">
              <div className="text-2xl font-bold text-gray-900">{item.name}</div>
              <div className="flex items-center gap-8">
                <div className="text-2xl font-bold text-red-500 w-24 text-right">¥{(item.price * item.count).toFixed(2)}</div>
                <div className="flex items-center gap-4 bg-gray-100 rounded-full p-1">
                  <button onClick={() => updateCartItem(item.id, -1)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm active:scale-95">
                    <Minus size={24} />
                  </button>
                  <span className="text-2xl font-bold w-10 text-center">{item.count}</span>
                  <button onClick={() => updateCartItem(item.id, 1)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm active:scale-95">
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Cart Bar 160px */}
      <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-8 flex items-center justify-between z-40 rounded-t-3xl">
        <div 
          className="flex items-center gap-6 cursor-pointer"
          onClick={() => cartCount > 0 && setIsCartOpen(!isCartOpen)}
        >
          <div className="relative">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${cartCount > 0 ? 'bg-orange-500' : 'bg-gray-900'}`}>
              <ShoppingCart size={40} />
            </div>
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold border-2 border-white">
                {cartCount}
              </div>
            )}
          </div>
          <div>
            <div className="text-gray-500 text-xl mb-1 flex items-center gap-2">
              合计金额
              {cartCount > 0 && (
                isCartOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />
              )}
            </div>
            <div className="text-4xl font-bold text-red-500">¥{cartTotal.toFixed(2)}</div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/kiosk/cart', { state: { cart } })}
          disabled={cartCount === 0}
          className={`px-12 py-6 rounded-full text-3xl font-bold shadow-lg transition-colors ${
            cartCount > 0 
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30' 
              : 'bg-gray-200 text-gray-400 shadow-none'
          }`}
        >
          去结算
        </button>
      </div>

      {/* Detail Modal */}
      {selectedDish && (
        <K04_DishDetail 
          dish={selectedDish} 
          onClose={() => setSelectedDish(null)} 
          onAdd={(dish, count) => {
            handleAddToCart(dish, count);
            setSelectedDish(null);
          }}
        />
      )}
    </div>
  );
}
