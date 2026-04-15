import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Store } from "lucide-react";

const REGIONS = [
  {
    id: 'R1', name: 'A区',
    restaurants: [
      {
        id: 'RES1', name: '第一食堂',
        stalls: [
          { id: 1, name: "特色面食", desc: "手工拉面、刀削面", color: "bg-red-50 text-red-600", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&q=80" },
          { id: 2, name: "大众快餐", desc: "两荤一素、三荤一素", color: "bg-blue-50 text-blue-600", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
        ]
      },
      {
        id: 'RES2', name: '第二食堂',
        stalls: [
          { id: 3, name: "风味小吃", desc: "肉夹馍、凉皮", color: "bg-yellow-50 text-yellow-600", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80" },
        ]
      }
    ]
  },
  {
    id: 'R2', name: 'B区',
    restaurants: [
      {
        id: 'RES3', name: '第三食堂',
        stalls: [
          { id: 4, name: "健康轻食", desc: "沙拉、减脂餐", color: "bg-green-50 text-green-600", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
          { id: 5, name: "精品小炒", desc: "现点现炒", color: "bg-purple-50 text-purple-600", image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&q=80" },
        ]
      }
    ]
  }
];

export default function K02_Home() {
  const navigate = useNavigate();
  const [activeRegionId, setActiveRegionId] = useState(REGIONS[0].id);
  
  const activeRegion = REGIONS.find(r => r.id === activeRegionId) || REGIONS[0];
  const [activeRestaurantId, setActiveRestaurantId] = useState(activeRegion.restaurants[0].id);
  const activeRestaurant = activeRegion.restaurants.find(r => r.id === activeRestaurantId) || activeRegion.restaurants[0];

  const handleRegionChange = (regionId: string) => {
    setActiveRegionId(regionId);
    const region = REGIONS.find(r => r.id === regionId);
    if (region && region.restaurants.length > 0) {
      setActiveRestaurantId(region.restaurants[0].id);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Top 140px */}
      <div className="h-[140px] bg-white px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
        <button 
          onClick={() => navigate('/kiosk')}
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 bg-gray-100 px-6 py-4 rounded-full text-xl font-medium active:bg-gray-200"
        >
          <ArrowLeft size={28} />
          返回待机
        </button>
        
        <div className="text-2xl font-bold text-gray-900">
          午餐时段 <span className="text-orange-500 ml-2">11:00 - 13:30</span>
        </div>

        <button 
          onClick={() => navigate('/kiosk/orders')}
          className="flex items-center gap-3 text-blue-600 bg-blue-50 px-6 py-4 rounded-full text-xl font-medium active:bg-blue-100"
        >
          <Search size={28} />
          查询订单
        </button>
      </div>

      {/* Stalls Area */}
      <div className="flex-1 px-8 pt-6 flex flex-col min-h-0">
        <div className="flex items-center gap-3 mb-4">
          <Store className="text-orange-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">选择档口</h2>
        </div>

        {/* Level 1: Regions */}
        <div className="flex gap-4 mb-4 overflow-x-auto hide-scrollbar shrink-0">
          {REGIONS.map(region => (
            <button
              key={region.id}
              onClick={() => handleRegionChange(region.id)}
              className={`px-8 py-3 rounded-full text-xl font-bold whitespace-nowrap transition-colors ${
                activeRegionId === region.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Level 2: Restaurants */}
        <div className="flex gap-8 mb-6 border-b border-gray-200 overflow-x-auto hide-scrollbar shrink-0">
          {activeRegion.restaurants.map(rest => (
            <button
              key={rest.id}
              onClick={() => setActiveRestaurantId(rest.id)}
              className={`pb-4 text-2xl font-bold whitespace-nowrap border-b-4 transition-colors ${
                activeRestaurantId === rest.id
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {rest.name}
            </button>
          ))}
        </div>
        
        {/* Level 3: Stalls Grid */}
        <div className="grid grid-cols-2 gap-6 flex-1 overflow-y-auto pb-4 hide-scrollbar">
          {activeRestaurant.stalls.map((stall) => (
            <div 
              key={stall.id}
              onClick={() => navigate(`/kiosk/stall/${stall.id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="h-40 w-full relative shrink-0">
                <img src={stall.image} alt={stall.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{stall.name}</h3>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-lg text-gray-500">{stall.desc}</p>
                <div className="flex justify-end mt-4">
                  <div className={`px-4 py-2 rounded-full text-base font-medium ${stall.color}`}>
                    进入点餐
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom 160px */}
      <div className="h-[160px] px-8 flex items-center justify-center text-gray-400 text-xl shrink-0">
        <p>温馨提示：请确认您选择的档口，跨档口点餐需分开结算</p>
      </div>
    </div>
  );
}
