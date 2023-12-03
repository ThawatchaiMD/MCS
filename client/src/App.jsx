import React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import ProtectRoute from "./components/ProtectRoute";
import MainLayout from "./Layout/MainLayout";

import HistoricalData from "./containers/HistoricalData";
import Dashboard from "./containers/Dashboard";
import MyDevices from "./containers/MyDevices";
import Realtime from "./containers/Realtime";
import EditDeviceInfo from "./containers/EditDeviceInfo";
import EnergyExport from "./containers/EnergyExport";
import SystemOverview from "./containers/SystemOverview";
import User from "./containers/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mydevices" element={<MyDevices />} />
            <Route path="/historicaldata" element={<HistoricalData />} />
            <Route path="/realtime" element={<Realtime />} />
            <Route path="/editdeviceinfo" element={<EditDeviceInfo />} />
            <Route path="/energyexport" element={<EnergyExport />} />
            <Route path="/systemoverview" element={<SystemOverview />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
