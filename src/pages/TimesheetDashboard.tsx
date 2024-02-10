import Sidenav from "../components/Navigation/Sidenav";
import ProfileView from "../components/ProfileView/ProfileView";
import Timesheet from "../components/Timesheet/Timesheet";
import Menubar from "../components/menubar/Menubar";
function TimesheetDashboard() {
  return (
    <div className="" >
      <div className="grid grid-cols-12  ">
        <div className="bg-purple-50 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-100 col-span-12 md:col-span-9 ">
          <div className="grid grid-cols-12">
            <div className="bg-white col-span-12 md:col-span-1">
            <div className="hidden md:block ">
              <Sidenav  />

              </div>
          <div className="md:hidden">
          <Menubar/>

          </div>
            </div>
            <div className="col-span-12 md:col-span-11 pt-16 md:pt-0">
              <Timesheet />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <ProfileView />
        </div>
      </div>
    </div>
  );
}

export default TimesheetDashboard;
