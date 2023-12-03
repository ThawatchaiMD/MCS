import { Route, Routes } from "react-router-dom";
import HistoricalData from "../containers/HistoricalData";
import Dashboard from "../containers/Dashboard";
import MyDevices from "../containers/MyDevices";
import Realtime from "../containers/Realtime";
import Customization from "../containers/Customization";
import EditDeviceInfo from "../containers/EditDeviceInfo";
import EnergyExport from "../containers/EnergyExport"
import SystemOverview from "../containers/SystemOverview";
import User
 from "../containers/User";
import Register from "../page/Register"
const AppRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default AppRoutes;
