import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ThermalReceipt from "../components/ThermalReceipt";

export default function ReceiptSample() {
  const mockData = {
    orderNo: "A052",
    orderer: "张三",
    department: "研发部",
    orderId: "DD20231027001",
    stallName: "大众快餐",
    pickupMethod: "取餐柜",
    paymentMethod: "人脸支付",
    pickupTime: "2023-10-27 12:15:00",
    items: [
      { 
        name: "招牌红烧肉", count: 1, price: 18, amount: 18,
        nutrition: { energy: 450 }
      },
      { 
        name: "清炒时蔬", count: 1, price: 8, amount: 8,
        nutrition: { energy: 80 }
      }
    ],
    orderAmount: 26,
    discountAmount: 2.50,
    actualAmount: 23.50,
    totalNutrition: {
      energy: 530,
      protein: 14,
      fat: 38,
      carbs: 25,
      fiber: 4
    },
    time: "2023-10-27 12:05:32",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="w-full max-w-4xl px-8 flex items-center justify-between mb-8">
        <Link 
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
        >
          <ArrowLeft size={20} />
          返回首页
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">打印小票样例</h1>
        <div className="w-24"></div>
      </div>

      <div className="bg-gray-200 p-8 rounded-xl shadow-inner border border-gray-300">
        <ThermalReceipt data={mockData} />
      </div>
    </div>
  );
}
