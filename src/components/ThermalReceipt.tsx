import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export interface ThermalReceiptData {
  orderNo: string;
  orderer: string;
  department: string;
  orderId: string;
  stallName: string;
  pickupMethod: string;
  paymentMethod: string;
  pickupTime: string;
  items: Array<{ 
    name: string; 
    count: number; 
    price: number; 
    amount: number;
    nutrition: {
      energy: number;
    };
  }>;
  orderAmount: number;
  discountAmount: number;
  actualAmount: number;
  totalNutrition: {
    energy: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  };
  time: string;
}

export default function ThermalReceipt({ data }: { data: ThermalReceiptData }) {
  // Typical thermal printer layout (e.g. 58mm or 80mm), using 300px for web preview
  return (
    <div className="w-[320px] bg-white text-black font-mono p-6 mx-auto border border-gray-200 shadow-2xl relative">
      {/* Top jagged edge simulation */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNSwxMCAxMCwwIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+')] -mt-2 bg-repeat-x"></div>

      {/* Header */}
      <div className="text-center mb-5 border-b-[3px] border-black pb-3 mt-2">
        <h2 className="text-2xl font-bold tracking-widest">智慧营养食堂</h2>
      </div>

      {/* Stall & Large Order Number */}
      <div className="text-center mb-5 border-b-2 border-dashed border-gray-400 pb-5">
        <h3 className="text-2xl font-bold mb-4 border-b-2 border-gray-800 inline-block px-4 pb-1">{data.stallName}</h3>
        <h1 className="text-6xl font-black tracking-tighter">{data.orderNo}</h1>
      </div>

      {/* Pickup Info Group */}
      <div className="border-2 border-gray-800 p-2 mb-5 space-y-1">
        <div className="flex justify-between items-center font-bold">
          <span>取餐方式：</span>
          <span className="text-lg">{data.pickupMethod}</span>
        </div>
        <div className="flex justify-between items-center font-bold">
          <span>取餐时间：</span>
          <span className="text-[13px]">{data.pickupTime}</span>
        </div>
      </div>

      {/* Meta Info */}
      <div className="space-y-1 text-sm mb-4">
        <div className="flex justify-between">
          <span>支付方式：</span>
          <span>{data.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span>订餐时间：</span>
          <span className="text-xs self-center">{data.time}</span>
        </div>
        <div className="flex justify-between">
          <span>订单编号：</span>
          <span className="text-xs self-center">{data.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span>订餐人：</span>
          <span>{data.orderer}</span>
        </div>
        <div className="flex justify-between">
          <span>部门：</span>
          <span>{data.department}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 mb-2 mt-4"></div>

      {/* Table Header */}
      <div className="flex justify-between text-xs font-bold mb-2">
        <span className="w-1/2">品名</span>
        <span className="w-1/4 text-center">数量</span>
        <span className="w-1/4 text-right">金额</span>
      </div>

      {/* Items */}
      <div className="space-y-4 text-sm mb-4">
        {data.items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between items-start mb-1">
              <span className="w-1/2 break-words leading-tight">{item.name}</span>
              <span className="w-1/4 text-center">x{item.count}</span>
              <span className="w-1/4 text-right">{item.amount.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-gray-500 leading-tight">
              能量: {item.nutrition.energy} kcal
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-400 mb-3"></div>

      {/* Totals */}
      <div className="space-y-1 mb-5">
        <div className="flex justify-between items-center text-sm">
          <span>订单金额</span>
          <span>¥{data.orderAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>优惠金额</span>
          <span>-¥{data.discountAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center font-bold text-xl mt-2 pt-2 border-t border-dashed border-gray-400">
          <span>实付金额</span>
          <span>¥{data.actualAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Total Nutrition Info */}
      <div className="mb-5">
        <p className="text-xs font-bold mb-1">【本单营养汇总】</p>
        <div className="text-[11px] text-gray-700 leading-relaxed bg-gray-50 p-2 border border-dashed border-gray-300 rounded">
          能量 {data.totalNutrition.energy} kcal | 蛋白质 {data.totalNutrition.protein} g<br/>
          脂肪 {data.totalNutrition.fat} g | 碳水 {data.totalNutrition.carbs} g | 纤维 {data.totalNutrition.fiber} g
        </div>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center justify-center mb-6 pt-5 border-t border-black border-dashed">
        <QRCodeSVG 
          value={`https://smart-canteen.local/order/${data.orderId}`} 
          size={140}
          level="M"
        />
        <span className="text-xs mt-3">{data.orderId}</span>
      </div>

      {/* Footer */}
      <div className="text-center text-xs space-y-1">
        <p className="font-bold text-sm">请留意大屏叫号</p>
        <p>祝您用餐愉快，营养每一天！</p>
      </div>

      {/* Bottom jagged edge simulation */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDUsMCAxMCwxMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==')] -mb-2 bg-repeat-x"></div>
    </div>
  );
}
