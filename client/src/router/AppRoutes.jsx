import { Route, Routes } from "react-router-dom";
import HistoricalData from "../containers/HistoricalData";
import Dashboard from "../containers/Dashboard";
import User from "../containers/User";
import Register from "../page/Register"
import Procedure from "../containers/Procedure";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/historicaldata" element={<HistoricalData />} />
      <Route path="/procedure" element={<Procedure/>}/>
      <Route path="/user" element={<User />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
