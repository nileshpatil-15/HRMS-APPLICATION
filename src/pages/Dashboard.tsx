import { useContext, useEffect } from "react";
import Sidenav from "../components/Navigation/Sidenav";
import ProfileView from "../components/ProfileView/ProfileView";
import MiddleDashboard from "./employee/dashboard/MiddleDashboard";
import ApiServices from "../services/APIServices";
import TodoListResponse, { TaskListData } from "../types/ApiSchema";
import { EmployeeContext } from "../context/EmployeeContext";
import { toast } from "react-toastify";
import Menubar from "../components/menubar/Menubar";
// import Timesheet from "../components/Timesheet/Timesheet";
function Dashboard() {
  const { setTodoList, setToDoList, setTodoFetching } =
    useContext(EmployeeContext);
  useEffect(() => {
    ApiServices.getToDoList((response: TodoListResponse) => {

      if (response.data.Todo ) {
        const todoList = response.data.Todo || [];
        setTodoList(todoList);
      } else {
        toast("Something went wrong while fetching todo list!");
      }
    });
  }, [setTodoList]);
  return (
    <div className="grid grid-cols-12 ">
      <div className="bg-purple-50 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-100 col-span-12 md:col-span-9">
        <div className="grid grid-cols-12">
          <div className="bg-white  col-span-12 md:col-span-1">
            <div className="hidden md:block">
              <Sidenav />
            </div>
            <div className="md:hidden">
              <Menubar />
            </div>
          </div>
          <div className="col-span-12 md:col-span-11 ">
            <MiddleDashboard />
            {/* <Timesheet /> */}
          </div>
        </div>
      </div>

      <div
        className={`col-span-12 md:col-span-3 max-[769px]:hidden
        }`}
      >
        <ProfileView />
      </div>
    </div>
  );
}

export default Dashboard;

