import { Link } from "react-router-dom";
import { Monitor, Smartphone } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            智慧食堂终端系统
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            请选择要预览的终端界面
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mt-12">
          <Link
            to="/kiosk"
            className="relative group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-500 flex flex-col items-center text-center"
          >
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">点餐机终端</h2>
            <p className="text-gray-500">
              竖屏 900×1440<br />
              包含待机、点餐、支付等完整流程
            </p>
          </Link>

          <Link
            to="/screen"
            className="relative group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-indigo-500 flex flex-col items-center text-center"
          >
            <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Monitor className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">档口叫号大屏</h2>
            <p className="text-gray-500">
              横屏 1920×1080<br />
              包含叫号主屏与离线兜底页
            </p>
          </Link>

          <Link
            to="/receipt-sample"
            className="relative group bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-green-500 flex flex-col items-center text-center sm:col-span-2 md:col-span-1 md:col-start-1 md:col-end-3 max-w-md mx-auto w-full"
          >
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 14h12v8H6z"></path></svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">打印小票样例</h2>
            <p className="text-gray-500">
              热敏打印机小票样式预览<br />
              (58mm/80mm 宽幅参考)
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
