import TodoListResponse, { days } from "../../types/ApiSchema";
import moment from "moment";
import { toast } from "react-toastify";
import ApiServices from "../../services/APIServices";
import { useContext, useState } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { GlobalContext } from "../../context/GlobalContext";

interface TimesheetDates {
  dates: days[];
}

const TimesheetDates: React.FC<TimesheetDates> = (props) => {
  const { timeSheetDate, setSelectedTimeesheetDate ,timesheetDates} =
    useContext(EmployeeContext);
  const {isClockedIn} =
    useContext(GlobalContext);
  const { dates } = props;


  const handleDateClick = (clickedDate: string) => {
    setSelectedTimeesheetDate(clickedDate);
  };

  const formatTotalHours = (totalHours: string) => {
    const duration = moment.duration(Number(totalHours), "minutes");
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${hours}hr  ${minutes}min`;
  };

  



  return (
    <>
      <div className="overflow-y-scroll font-montserrat ">
        {dates &&
          dates.map((item, index: number) => (
            <div
              className={`px-5 py-2 cursor-pointer hover:bg-[#EFEFFF] ${
                 timeSheetDate===item?.entry_date   ? "bg-[#EFEFFF]" : ""
              } `} 
              key={index}
              onClick={() => handleDateClick(item.entry_date)}
            >
              <div className="flex justify-between items-center ">
                <div className="">
                  <span className="text-md font-[500] font-montserrat text-[14px] text-[#565656]">
                    {moment(item.entry_date).format("DD MMM  YYYY")}
                  </span>
                </div>
                <p> </p>
                <p className="text-[11px] font-[500] text-[#8E8E8E]">{moment().format('YYYY-MM-DD')===item?.entry_date?'TODAY':''}</p>
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="10" 
                    viewBox="0 0 6 10"
                    fill="none"
                  >
                    <path
                      d="M0.958496 0.916586L5.04183 4.99992L0.958496 9.08325"
                      stroke="#979797"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
              </div>

              <p className="text-[12px] font-montserrat font-[500px] text-[#8E8E8E] ">
                {formatTotalHours(item?.total_hours)}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default TimesheetDates;
