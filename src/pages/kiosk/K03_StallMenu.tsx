import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Plus, Info, Trash2, Minus, ChevronUp, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import K04_DishDetail from "./K04_DishDetail";

const CATEGORIES = ["全部", "主食", "素菜", "荤菜", "蛋奶坚果", "汤饮", "水果"];

const DISHES = [
  { id: 1, name: "招牌红烧肉", price: 18, category: "荤菜", image: "https://images.unsplash.com/photo-1588897056659-4e98fac41bf6?w=400&q=80", tags: ["高蛋白", "推荐"], soldOut: false, nutrition: { energy: 350, protein: 25, fat: 28, carbs: 5, fiber: 0 } },
  { id: 2, name: "清炒时蔬", price: 8, category: "素菜", image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&q=80", tags: ["低脂", "素食"], soldOut: false, nutrition: { energy: 80, protein: 2, fat: 4, carbs: 8, fiber: 3 } },
  { id: 3, name: "糖醋排骨", price: 22, category: "荤菜", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", tags: ["招牌"], soldOut: true, nutrition: { energy: 420, protein: 22, fat: 30, carbs: 15, fiber: 0 } },
  { id: 4, name: "麻婆豆腐", price: 12, category: "素菜", image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80", tags: ["微辣"], soldOut: false, nutrition: { energy: 180, protein: 12, fat: 10, carbs: 6, fiber: 2 } },
  { id: 5, name: "番茄炒蛋", price: 10, category: "素菜", image: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?w=400&q=80", tags: ["家常"], soldOut: false, nutrition: { energy: 150, protein: 8, fat: 9, carbs: 10, fiber: 1 } },
  { id: 6, name: "紫菜蛋花汤", price: 5, category: "汤饮", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80", tags: ["清淡"], soldOut: false, nutrition: { energy: 45, protein: 3, fat: 2, carbs: 4, fiber: 0.5 } },
  { id: 7, name: "白米饭", price: 2, category: "主食", image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80", tags: [], soldOut: false, nutrition: { energy: 230, protein: 4, fat: 0.5, carbs: 50, fiber: 1 } },
  { id: 8, name: "坚果酸奶", price: 8, category: "蛋奶坚果", image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&q=80", tags: ["健康"], soldOut: false, nutrition: { energy: 160, protein: 6, fat: 8, carbs: 18, fiber: 2 } },
  { id: 9, name: "鲜切西瓜", price: 6, category: "水果", image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&q=80", tags: ["应季"], soldOut: false, nutrition: { energy: 60, protein: 1, fat: 0.2, carbs: 15, fiber: 1.5 } },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  count: number;
  nutrition: {
    energy: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  };
}

export default function K03_StallMenu() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("全部");
  
  // Sorting state
  const [sortMetric, setSortMetric] = useState<'energy' | 'carbs' | 'protein' | 'fat' | 'fiber'>('energy');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const cartNutrition = cart.reduce((acc, item) => ({
    energy: acc.energy + item.nutrition.energy * item.count,
    protein: acc.protein + item.nutrition.protein * item.count,
    fat: acc.fat + item.nutrition.fat * item.count,
    carbs: acc.carbs + item.nutrition.carbs * item.count,
    fiber: acc.fiber + item.nutrition.fiber * item.count,
  }), { energy: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 });

  const filteredAndSortedDishes = useMemo(() => {
    let result = selectedCategory === "全部" 
      ? [...DISHES] 
      : DISHES.filter(d => d.category === selectedCategory);

    result.sort((a, b) => {
      const valA = a.nutrition[sortMetric];
      const valB = b.nutrition[sortMetric];
      if (sortDirection === 'desc') {
        return valB - valA;
      } else {
        return valA - valB;
      }
    });

    return result;
  }, [selectedCategory, sortMetric, sortDirection]);

  const handleAddToCart = (dish: any, count: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, count: item.count + count } : item);
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, count, nutrition: dish.nutrition }];
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
          onClick={() => navigate('/kiosk')}
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 bg-gray-100 px-6 py-4 rounded-full text-xl font-medium active:bg-gray-200"
        >
          <ArrowLeft size={28} />
          返回
        </button>
        
        <div className="text-3xl font-bold text-gray-900">
          大众快餐
        </div>

        <div className="w-[200px]"></div> {/* Increased spacer for centering and to clear global button */}
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Categories Bar (Horizontal) */}
        <div className="bg-white border-b border-gray-100 flex overflow-x-auto hide-scrollbar shrink-0 px-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-6 text-2xl font-bold transition-colors relative whitespace-nowrap ${
                selectedCategory === cat
                  ? 'text-orange-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-orange-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar (Sorting Metrics) */}
          <div className="w-[180px] bg-gray-50 border-r border-gray-200 flex flex-col overflow-y-auto pb-[160px] hide-scrollbar shrink-0 p-4 gap-4">
            {[
              { id: 'energy', label: '热量' },
              { id: 'carbs', label: '碳水' },
              { id: 'protein', label: '蛋白质' },
              { id: 'fat', label: '脂肪' },
              { id: 'fiber', label: '膳食纤维' }
            ].map(metric => (
              <button
                key={metric.id}
                onClick={() => setSortMetric(metric.id as any)}
                className={`py-4 px-2 text-xl font-bold rounded-xl transition-all ${
                  sortMetric === metric.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>

          {/* List Area */}
          <div className="flex-1 overflow-y-auto p-8 pb-[200px] hide-scrollbar bg-gray-100">
            {/* Sort Direction Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button 
                  onClick={() => setSortDirection('desc')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg border text-lg font-bold transition-colors ${
                    sortDirection === 'desc' 
                      ? 'border-orange-500 text-orange-500 bg-orange-50' 
                      : 'border-gray-300 text-gray-600 bg-white'
                  }`}
                >
                  从高到低 <ArrowDown size={20} />
                </button>
                <button 
                  onClick={() => setSortDirection('asc')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg border text-lg font-bold transition-colors ${
                    sortDirection === 'asc' 
                      ? 'border-orange-500 text-orange-500 bg-orange-50' 
                      : 'border-gray-300 text-gray-600 bg-white'
                  }`}
                >
                  从低到高 <ArrowUp size={20} />
                </button>
              </div>
              <div className="text-gray-500 text-lg">每100g营养值</div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {filteredAndSortedDishes.map((dish) => (
                <div 
                  key={dish.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col ${dish.soldOut ? 'opacity-60 grayscale' : ''}`}
                  onClick={() => !dish.soldOut && setSelectedDish(dish)}
                >
                  <div className="h-48 w-full relative shrink-0">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    {dish.soldOut && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-gray-900 text-white px-6 py-2 rounded-full text-xl font-bold">已售罄</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 truncate">{dish.name}</h3>
                    
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-orange-500 font-bold">
                          <span className="text-sm">¥</span>
                          <span className="text-2xl">{dish.price}</span>
                          <span className="text-sm text-gray-400">/份</span>
                        </div>
                        {!dish.soldOut && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(dish, 1);
                            }}
                            className="bg-orange-500 text-white p-2 rounded-full active:bg-orange-600 transition-colors shadow-sm"
                          >
                            <Plus size={20} />
                          </button>
                        )}
                      </div>
                      <div className="text-gray-500 text-sm flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-md w-fit whitespace-nowrap">
                        ★ {dish.nutrition[sortMetric]}{sortMetric === 'energy' ? 'kcal' : 'g'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="flex items-baseline gap-4">
              <div className="text-4xl font-bold text-red-500">¥{cartTotal.toFixed(2)}</div>
              {cartCount > 0 && (
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex gap-3">
                  <span>能量: <span className="text-orange-600 font-bold">{cartNutrition.energy}</span> kcal</span>
                  <span>蛋白质: <span className="text-blue-600 font-bold">{cartNutrition.protein}</span>g</span>
                  <span>脂肪: <span className="text-yellow-600 font-bold">{cartNutrition.fat}</span>g</span>
                  <span>碳水: <span className="text-green-600 font-bold">{cartNutrition.carbs}</span>g</span>
                </div>
              )}
            </div>
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
