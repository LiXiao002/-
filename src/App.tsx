/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import KioskLayout from "./layouts/KioskLayout";
import ScreenLayout from "./layouts/ScreenLayout";

// Kiosk Pages
import K01_Standby from "./pages/kiosk/K01_Standby";
import K02_Home from "./pages/kiosk/K02_Home";
import K03_StallMenu from "./pages/kiosk/K03_StallMenu";
import K05_Cart from "./pages/kiosk/K05_Cart";
import K06_Payment from "./pages/kiosk/K06_Payment";
import K07_Result from "./pages/kiosk/K07_Result";
import K08_OrderSearch from "./pages/kiosk/K08_OrderSearch";
import K09_PaymentFail from "./pages/kiosk/K09_PaymentFail";

// Screen Pages
import S01_MainScreen from "./pages/screen/S01_MainScreen";
import S02_Offline from "./pages/screen/S02_Offline";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        <Route path="/kiosk" element={<KioskLayout />}>
          <Route index element={<K01_Standby />} />
          <Route path="home" element={<K02_Home />} />
          <Route path="stall/:id" element={<K03_StallMenu />} />
          <Route path="cart" element={<K05_Cart />} />
          <Route path="pay" element={<K06_Payment />} />
          <Route path="result" element={<K07_Result />} />
          <Route path="fail" element={<K09_PaymentFail />} />
          <Route path="orders" element={<K08_OrderSearch />} />
        </Route>

        <Route path="/screen" element={<ScreenLayout />}>
          <Route index element={<S01_MainScreen />} />
          <Route path="offline" element={<S02_Offline />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

