import { useContext, useEffect, useState } from "react";
import ApiServices from "../../services/APIServices";
import TimesheetByDate from "./TimesheetByDate";
import {
  RecentClockInsResponse,
  ClockIn,
  getTimesheetDatesInterface,
  days,
} from "../../types/ApiSchema";
import { toast } from "react-toastify";
import TimesheetDetail from "./TimesheetDetail";
import TimesheetDates from "./TimesheetByDate";
import { EmployeeContext } from "../../context/EmployeeContext";
import Spinner from "react-spinner";
import { GlobalContext } from "../../context/GlobalContext";
import EmptyListLogo from "../../assets/images/empty-list-logo";
import moment from "moment";
function Timesheet() {
  // const [timesheetDates, setTimesheetDates] = useState<days[]>([]);
  const { timeSheetDate,timesheetDates,setTimesheetDates } = useContext(EmployeeContext);
  const {  loader,setLoader,isClockedIn} = useContext(GlobalContext);
  const [selectedTimesheetDate,setSelectedTimesheetDate]=useState(timesheetDates.length>0 ? timesheetDates[0].entry_date: moment().format('YYYY-MM-DD'))
// const [loader,setLoader]=useState(true)
  useEffect(() => {
    ApiServices.getTimesheetDates((response: getTimesheetDatesInterface) => {
      if (response.statusCode === 200) {
        setTimesheetDates(response?.data?.days);
        setLoader(false)
      } else {
        toast.error(response.message);
        setTimesheetDates([]);
      }
    });
  }, []);

  return (
    <div className="p-8  h-full">
      <div className="mb-4">
        <span className="text-[32px] font-semibold font-montserrat">
          My Timesheet
        </span>
      </div>

      {/* starts main container */}
      <div className={` bg-white${loader || timesheetDates.length<1 ? '  h-full flex justify-center items-center ':''}`}>
        {loader ?  (
          <Spinner
            style={{
              width: "40px", // Adjust the width as needed
              height: "40px", // Adjust the height as needed
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} 
          /> 
        ) : timesheetDates.length>0 ?

                <div className="grid grid-cols-4 divide-x">
            <div className="col-span-4 md:col-span-1 ">
              <div
                className="my-2 overflow-y-auto"
                style={{ height: "calc(100vh - 150px)" }}
              >
                <TimesheetDates dates={timesheetDates} />
              </div>
            </div>
            <div className="col-span-4 md:col-span-3 ">
              <div 
                className="my-2 overflow-y-auto hidden md:block"
                style={{ height: "calc(100vh - 150px)" }}
              >
                <TimesheetDetail date={timeSheetDate} />
              </div>
            </div>
          </div> :(
            <div className="flex justify-center flex-col items-center">
            <EmptyListLogo/>
            <p className="font-montserrat text-[#56556]">No Timesheets added</p>
            </div>
           
          )
        }

      </div>
    </div>
  );
}

export default Timesheet;
