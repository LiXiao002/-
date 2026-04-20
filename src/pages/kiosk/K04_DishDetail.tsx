import { useState } from "react";
import { X, Minus, Plus, AlertCircle } from "lucide-react";

interface DishDetailProps {
  dish: any;
  onClose: () => void;
  onAdd: (dish: any, count: number) => void;
}

export default function K04_DishDetail({ dish, onClose, onAdd }: DishDetailProps) {
  const [count, setCount] = useState(1);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content - 760x1080 */}
      <div className="relative w-[760px] h-[1080px] bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-14 h-14 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X size={32} />
        </button>

        {/* Image Area */}
        <div className="h-[460px] w-full relative shrink-0">
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-10 pb-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">{dish.name}</h2>
              <div className="flex gap-2">
                {dish.tags?.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-green-50 text-green-600 text-lg rounded-md border border-green-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-5xl font-bold text-red-500">
              ¥{dish.price}
            </div>
          </div>

          <p className="text-xl text-gray-500 mb-8 leading-relaxed">
            精选优质食材，传承经典做法。肥而不腻，入口即化，是本店的招牌必点菜品。搭配米饭食用风味更佳。
          </p>

          <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-100">
            <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <AlertCircle size={24} />
              营养成分 (每份)
            </h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-orange-100">
                <div className="text-sm text-gray-500">能量</div>
                <div className="text-xl font-bold text-orange-600">{dish.nutrition?.energy || 0}</div>
                <div className="text-xs text-gray-400 text-nowrap">kcal</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-orange-100">
                <div className="text-sm text-gray-500">蛋白质</div>
                <div className="text-xl font-bold text-blue-600">{dish.nutrition?.protein || 0}</div>
                <div className="text-xs text-gray-400">g</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-orange-100">
                <div className="text-sm text-gray-500">脂肪</div>
                <div className="text-xl font-bold text-yellow-600">{dish.nutrition?.fat || 0}</div>
                <div className="text-xs text-gray-400">g</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-orange-100">
                <div className="text-sm text-gray-500">碳水</div>
                <div className="text-xl font-bold text-green-600">{dish.nutrition?.carbs || 0}</div>
                <div className="text-xs text-gray-400">g</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">营养知识</h3>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <p className="text-lg text-blue-800 leading-relaxed">
                💡 <span className="font-bold">健康贴士：</span>
                {dish.category === '荤菜' ? '适量摄入优质蛋白有助于肌肉生长和修复，建议搭配富含膳食纤维的蔬菜食用。' : 
                 dish.category === '素菜' ? '蔬菜富含维生素和矿物质，低热量高纤维，有助于维持肠道健康和控制体重。' :
                 dish.category === '主食' ? '碳水化合物是人体主要的能量来源，建议粗细搭配，维持血糖稳定。' :
                 '均衡饮食是健康的基础，建议每餐包含谷薯类、蔬果类、畜禽鱼蛋奶类和大豆坚果类。'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar - Sticky */}
        <div className="p-10 pt-6 border-t border-gray-100 bg-white flex items-center justify-between shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-6">
            <span className="text-2xl text-gray-700 font-medium">数量</span>
            <div className="flex items-center gap-4 bg-gray-100 rounded-full p-2">
              <button 
                onClick={() => setCount(Math.max(1, count - 1))}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm active:scale-95"
              >
                <Minus size={28} />
              </button>
              <span className="text-3xl font-bold w-12 text-center">{count}</span>
              <button 
                onClick={() => setCount(count + 1)}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-sm active:scale-95"
              >
                <Plus size={28} />
              </button>
            </div>
          </div>

          <button 
            onClick={() => onAdd(dish, count)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 rounded-full text-3xl font-bold shadow-xl shadow-orange-500/30 active:scale-95 transition-transform"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
}
