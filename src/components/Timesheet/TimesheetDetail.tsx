import React, { useState } from "react";
import {
  Timesheet,
  TodoByDate,
  timesheetDetail,
  timesheetDetailsInterface,
} from "../../types/ApiSchema";
import moment from "moment";
import { useContext, useEffect } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { Utils } from "../../services/Utils";
// import { DeleteTime } from "../../constants/APIEndpoints";
import ApiServices from "../../services/APIServices";
import { toast } from "react-toastify";
import { timesheet } from "../../types/ApiSchema";
import EmptyListLogo from "../../assets/images/empty-list-logo";
import { GlobalContext } from "../../context/GlobalContext";
import Spinner from "react-spinner";
import Edit from "../../assets/logos/Edit";
import Delete from "../../assets/logos/Delete";
import Timepicker from "../molecules/Timepicker";
interface props {
  date: string;
}

const TimesheetDetail: React.FC<props> = ({ date }) => {
  const {  timeSheetDate,refreshTimesheetList,setRefreshTimesheetList } = useContext(EmployeeContext);
  const [ loader,setLoader ] = useState<boolean>(true);

  const [selectedTimesheetTodo, setSelectedTimesheetTodo] = useState<string|undefined>(undefined);
  const [timesheets, setTimesheets] = useState<timesheetDetail[]>([]);
  const [selectedEditTimesheet, setSelectedEditTimesheet] = useState<({startTime:string|null,endTime:string|null,timesheetId:string|null,todoId:string|null})>({
    startTime: null,
    endTime: null,
    timesheetId:null,
    todoId:null,
  });


  function calculateTotalTime(array) {
    let totalHours = 0;
    let totalMinutes = 0;

    array.forEach((entry) => {
      const startTime: Date = new Date(entry.start_time);
      const endTime: Date = new Date(entry.end_time);

      const timeDifference: number = endTime.getTime() - startTime.getTime();
      const hours: number = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes: number = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      totalHours += hours;
      totalMinutes += minutes;
    });

    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;

    const formattedTotalTime = `${totalHours} hours ${totalMinutes} minutes`;
    return formattedTotalTime;
  }

  // const formatTimeRange = (start, end) => {
  //   const startDate = new Date(start);
  //   const endDate = new Date(end);

  //   const formattedStartTime = startDate.toLocaleString("en-US", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   });

  //   const formattedEndTime = endDate.toLocaleString("en-US", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   });

  //   return `${formattedStartTime} - ${formattedEndTime}`;
  // };

  const handleAddtime = (Id: string|undefined ) => {
    setSelectedTimesheetTodo(Id);
  }

  const handleEditTimesheet = (id: string, start, end,todoId,timesheetId) => {

    setSelectedTimesheetTodo(todoId)
    setSelectedEditTimesheet({ startTime: start, endTime: end,timesheetId:timesheetId,todoId:todoId });

  };
  const handleDeleteTimesheet=(timesheetId:string)=>{
    ApiServices.DeleteTimesheet(timesheetId,(response:any)=>{
      if(response?.statusCode===200){
        toast.success(response.message)
        setRefreshTimesheetList(!refreshTimesheetList)
        setSelectedEditTimesheet({startTime:null,endTime:null,timesheetId:null,todoId:null})
      }
    })
  }

  console.log(loader,'called');
  useEffect(() => {
    
    
    ApiServices.getTimeSheetDetails(
      date,
      (response: timesheetDetailsInterface) => {
        if (response.statusCode === 200) {
   

          console.log(response?.data?.Timesheet)
          const result = Utils.filterTimesheetBySameTodoId(
            response?.data?.Timesheet
          );

          setTimesheets(result);
          setLoader(false);
        } else {
          toast.error(response.message);
          setTimesheets([]);
        }
      }
    );
  }, [timeSheetDate,refreshTimesheetList]);

  // console.log(selectedEditTimesheet?.timesheetId)
  console.log(loader,'kk')
  return (
    <>
      <div
        className={`${
          timesheets.length < 1 ? "flex justify-center items-center h-full" : ""
        }`}
      >
        {loader ? (
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
        ) : timesheets.length > 0 ? (
          <div className="overflow-y-auto">
            {timesheets.map((todo, index) => (
              <div
                className="py-2 px-4 flex justify-center items-start border-b"
                key={index}
              >
                <div className="">
                  <div
                    className={`w-[10px] mt-2 mr-1  h-[10px] rounded-full  ${
                      todo?.taskStatus === "1"
                        ? "bg-[#9a98f9]"
                        : todo?.taskStatus === "2"
                        ? "bg-[#00BE35]"
                        : "bg-[#FF7A7A]"
                    }`}
                  ></div>
                </div>

                <div className="px-4 flex-grow">
                  <div className="font-montserrat ">
                    <div className="flex justify-between w-full ">
                      <p className="text-md font-montserrat text-[#565656] font-[500] text-[17px]">
                        {todo?.task}
                      </p>
                      <button
                        onClick={() => handleAddtime( todo?.todoId)}
                        className="px-3  text-[13px] font-[700] text-[#6F6CFF] "
                      >
                        {(todo?.taskStatus === "3" ||
                          todo?.taskStatus === "1") &&
                          " + Add Time"}
                      </button>
                    </div>
                    <p className="font-montserrat font-[500] text-[#8E8E8E] text-[11px]">
                      {/* {todo?}|{ calculateTotalTime(todo?.timesheet)} */}
                      {calculateTotalTime(todo?.timesheet)}
                    </p>
                  </div>
                  <div className="">
                    <ul className="px-4 list-disc">
                      {todo?.timesheet?.map((item: timesheet) => (
                        <>
                          <li className="group font-montserrat font-[500] text-[#8E8E8E] text-[11px] relative">
                            <div className="flex items-center">
                              <p>
                               {`${moment(item?.start_time)
                                  .local()
                                  .format("hh:mm A")} - ${moment(item?.end_time)
                                  .local()
                                  .format("hh:mm A")}`}

                              </p>

                              <div className="flex gap-2">
                                {moment().format("YYYY-MM-DD") ===
                                  item?.created_at && (
                                  <button
                                    onClick={() =>
                                      handleEditTimesheet(
                                        item?.timesheetId,
                                        item?.start_time,
                                        item?.end_time,
                                        todo?.todoId,item?.timesheetId
                                       
                                      )
                                    }
                                    className="hidden group-hover:inline-block ml-2"
                                  >
                                    <Edit />
                                  </button>
                                )}
                                {moment().format("YYYY-MM-DD") ===
                                  item?.created_at && (
                                  <button onClick={()=>handleDeleteTimesheet(item?.timesheetId)} className="hidden group-hover:inline-block ml-2">
                                    <Delete />
                                  </button>
                                )}
                              </div>
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>
                    {(todo?.todoId===selectedTimesheetTodo )&&(
                      <Timepicker
                      setSelectedTimesheetTodo={setSelectedTimesheetTodo}
                      selectedTimesheetTodo={selectedTimesheetTodo}
                        setSelectedEditTimesheet={setSelectedEditTimesheet}

                        selectedEditTimesheet={selectedEditTimesheet}
                      />
                    )}
                    {/* (selectedTimesheetTodo===todo?.todoId) */}
                  </div>
                </div>
                <div className=""></div>
              </div>
            ))}
            {/* <BasicTimeRangeField/> */}
          </div>
        ) : (
          <div className=" flex justify-between flex-col items-center font-bold text-[29]">
            <EmptyListLogo />
            <p className="py-2 text-xl">No Timesheets for day</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TimesheetDetail;
