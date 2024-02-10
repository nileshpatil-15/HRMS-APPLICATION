import React, { useState } from "react";
import { Timesheet, TodoByDate, timesheetDetail ,timeshee, timesheetDetailsInterface} from "../../types/ApiSchema";
import moment from "moment";
import { useContext, useEffect } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { Utils } from "../../services/Utils";
import ApiServices from "../../services/APIServices";

interface props{
 
  recentClockIndetails:timesheetDetail
}

const RecentClockinDetail:React.FC<props>=(props) => {
  const { toDoListByDate } = useContext(EmployeeContext);
  const {recentClockIndetails}=props
  const [toDoListByDateOriginal, setOriginalTodoListByDate] = useState<
    TodoByDate[] 
  >([]) 
  // useEffect(() => {
  //   ApiServices.getTimeSheetDetails(clickedRecentClockinDate ,(response:timesheetDetailsInterface)=>{
  //   if(response?.statusCode===200){
  //     const result=Utils.filterTimesheetBySameTodoId(response?.data?.Timesheet)
  //     setRecentClockIndetails(result)
  //   } 
  //   })
  
  // }, [clickedRecentClockinDate]) 

  const calculateTotalTime = (timesheets: Timesheet[]) => {
    let totalTime = 0;

    timesheets &&
      timesheets.forEach((timesheet: Timesheet) => {
        const startTime = moment(timesheet.start_time);
        const endTime = moment(timesheet.end_time);
        const duration = moment.duration(endTime.diff(startTime));

        totalTime += duration.asMinutes();
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalHours = Math.floor(totalTime / 60);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const remainingMinutes = totalTime % 60;
    return `${totalHours}hr  ${remainingMinutes}min`;
  }

  const sortedToDoList = toDoListByDateOriginal.sort((a, b) => {
    const taskStatusA = Number(a.Task_Status);
    const taskStatusB = Number(b.Task_Status);

    return taskStatusA - taskStatusB;
  });
  
  return (
    <>
      <div>
        <div className=" overflow-y-scroll">
          <div className="bg-[rgba(239,239,255,0.3)] rounded-xl">
              <div className="p-2 flex" >
                <div className="">
                  <div
                    className={`w-[10px] mt-2 mr-1  h-[10px] rounded-full  ${
                      recentClockIndetails?.taskStatus === "1"
                        ? "bg-[#9a98f9]"
                        : "bg-[#00BE35]"
                    }`}
                  ></div>
                </div>
                <div className="">
                  <div className="ml-3 font-montserrat">
                    <p
                      className="text-sm text-neutral-950"
                      dangerouslySetInnerHTML={{ __html: recentClockIndetails?.task }}
                    >
                      {/* {todo.Task.charAt(0).toUpperCase() + todo.Task.slice(1)} */}
                    </p>
                    {/* <p className="pl-1 text-[11px] text-[#8E8E8E]">
                      {todo?.project_id?.project_name}|
                      {calculateTotalTime(todo?.timesheets)}
                    </p> */}
                  </div>
                  <div className="pl-2">
                    <ul className="ml-3 list-disc">
                      {recentClockIndetails?.timesheet?.map((time, index) => (
                        <li
                          key={index}
                          className="text-[#8E8E8E] font-montserrat  "
                        >
                          <div className="flex items-center ">
                            <span className="text-[11px] text-[#8E8E8E] hover:text-neutral-950">
                              {Utils.ConvertTimeToTime(
                                time?.start_time,
                                time?.end_time
                              )}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentClockinDetail;
