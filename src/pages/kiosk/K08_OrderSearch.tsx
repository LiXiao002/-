import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Clock, CheckCircle2, XCircle } from "lucide-react";

const MOCK_ORDERS = [
  { id: "DD20231027001", no: "A052", stall: "大众快餐", status: "preparing", time: "2023-10-27 12:05:32", amount: 26 },
  { id: "DD20231027002", no: "B018", stall: "特色面食", status: "ready", time: "2023-10-27 11:45:10", amount: 15 },
  { id: "DD20231026089", no: "C092", stall: "健康轻食", status: "completed", time: "2023-10-26 12:30:00", amount: 32 },
];

export default function K08_OrderSearch() {
  const navigate = useNavigate();
  const [searchPhone, setSearchPhone] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'preparing': return <span className="text-orange-500 bg-orange-50 px-4 py-2 rounded-full flex items-center gap-2"><Clock size={20}/>备餐中</span>;
      case 'ready': return <span className="text-green-500 bg-green-50 px-4 py-2 rounded-full flex items-center gap-2"><CheckCircle2 size={20}/>待取餐</span>;
      case 'completed': return <span className="text-gray-500 bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2"><CheckCircle2 size={20}/>已完成</span>;
      default: return null;
    }
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
          返回
        </button>
        
        <div className="text-3xl font-bold text-gray-900">
          订单查询
        </div>

        <div className="w-[140px]"></div>
      </div>

      {/* Search Area 220px */}
      <div className="h-[220px] px-8 pt-8 shrink-0">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={32} />
            <input 
              type="text" 
              placeholder="请输入手机号后四位或订单号" 
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full h-20 bg-gray-50 rounded-2xl pl-20 pr-6 text-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setHasSearched(true)}
            className="bg-orange-500 text-white px-12 rounded-2xl text-2xl font-bold active:bg-orange-600 transition-colors"
          >
            查询
          </button>
        </div>
      </div>

      {/* Results Area 920px */}
      <div className="h-[920px] px-8 overflow-y-auto">
        {!hasSearched ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Search size={80} className="mb-6 opacity-20" />
            <p className="text-2xl">请输入信息查询您的订单</p>
          </div>
        ) : (
          <div className="space-y-6 pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">最近订单</h2>
            {MOCK_ORDERS.map(order => (
              <div key={order.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-orange-500">{order.no}</span>
                    <span className="text-2xl font-bold text-gray-900">{order.stall}</span>
                  </div>
                  <div className="text-xl font-medium">
                    {getStatusDisplay(order.status)}
                  </div>
                </div>
                
                <div className="space-y-4 text-xl text-gray-500">
                  <div className="flex justify-between">
                    <span>订单金额</span>
                    <span className="text-gray-900 font-bold">¥{order.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>支付时间</span>
                    <span>{order.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>订单编号</span>
                    <span className="text-gray-400 text-lg">{order.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom 160px */}
      <div className="h-[160px] px-8 flex items-center justify-center text-gray-400 text-xl shrink-0">
        <p>温馨提示：仅支持查询最近 3 天的订单记录</p>
      </div>
    </div>
  );
}
