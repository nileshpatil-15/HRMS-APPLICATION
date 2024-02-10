import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./auth/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import TimesheetDashboard from "./pages/TimesheetDashboard";
import Settings from "./pages/settings/Settings";
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="timesheet" element={<TimesheetDashboard />} />

            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
