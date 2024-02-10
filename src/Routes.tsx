import { RouteObject, useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TimesheetDashboard from "./components/Timesheet/Timesheet";
import Login from "./pages/login/Login";
function AppRoutes() {
  const routes: RouteObject[] = [
    { path: "/", element: <Login /> },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/timesheetdashboard",
      element: <TimesheetDashboard/>,
    }
  ];

  return useRoutes(routes);
}

export default AppRoutes;
