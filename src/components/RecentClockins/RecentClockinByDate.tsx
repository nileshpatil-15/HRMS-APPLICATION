import TodoListResponse, { ClockIn,days, timesheetDetail, timesheetDetailsInterface } from "../../types/ApiSchema";
import moment from "moment";
import { toast } from "react-toastify";
import ApiServices from "../../services/APIServices";
import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RecentClockinDetail from "./RecentClockinDetail";
import { Utils } from "../../services/Utils";
interface recentClockinProps{
  recenclockinDates:days[] 
}


const RecentClockinByDate: React.FC<recentClockinProps> = (props) => {
  const { recenclockinDates } = props;
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { setTodoListByDate } = useContext(EmployeeContext);
  const [clickedRecentClockinDate,setClickedRecentClockinDate]=useState<string>()
  const [recentClockIndetails,setRecentClockIndetails]=useState<timesheetDetail[]>([])

  const handleDateClick = (clickedDate: string) => {
    
    
    setClickedRecentClockinDate(clickedDate)
    // ApiServices.getTimeSheetDetails(clickedDate, (response: TodoListResponse) => {
    //   if (response.statusCode === 200) {
    //     setTodoListByDate(response?.data.Todo);
    //   } else {
    //     toast.error(response.message);
    //     setTodoListByDate([]);
    //   }
    // });
  };

  const formatTotalHours = (totalHours: string) => {
    const duration = moment.duration(Number(totalHours), "minutes");
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${hours}hr  ${minutes}min`;
  };

  useEffect(()=>{

      if(clickedRecentClockinDate!==undefined){

        ApiServices.getTimeSheetDetails(clickedRecentClockinDate ,(response:timesheetDetailsInterface)=>{
          if(response?.statusCode===200){
            const result=Utils.filterTimesheetBySameTodoId(response?.data?.Timesheet)
            setRecentClockIndetails(result)
          } 
          })
      }
      else{
        setRecentClockIndetails([])
      }
   
    
  },[openAccordion])

  const handleAccordionChange =
    (panel: number) =>
    (_event: React.ChangeEvent<object>, isExpanded: boolean) => {
      setOpenAccordion(isExpanded ? panel : null);
    };
  return (
    <>
      <div>
        <div className="overflow-y-scroll font-montserrat">
          {recenclockinDates &&
            recenclockinDates
              .slice( 0,7)
              .map((item, index) => (
                <>
                  <Accordion
                    key={index}
                    style={{
                      overflow: "hidden",
                      boxShadow: "none",
                      margin: "none",
                      backgroundColor:
                        openAccordion === index
                          ? "rgba(239,239,255,0.3)"
                          : "transparent",
                    }}
                    expanded={openAccordion === index}
                    onChange={handleAccordionChange(index)}
                    onClick={() => {
                      handleDateClick(item.entry_date);
                    }}
                  >
                    <AccordionSummary
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(239,239,255,0.3)",
                        },
                      }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                    >
                      <div>
                        <div
                          className="flex justify-between items-center hover:bg-[#EFEFFF54]"
                          key={index}
                        >
                          <div className="">
                            <span className="text-sm text-neutral-950 ">
                              {moment(item.entry_date).format("DD MMM  YYYY")}
                            </span>
                            <p className="text-[11px] text-[#565656]">
                              {formatTotalHours(item.total_hours)}
                            </p>
                          </div>
                        </div> 
                      </div>
                    </AccordionSummary>
                    <AccordionDetails style={{ margin: "none" }}>
                      <div>
                        {recentClockIndetails.map(item=>{
                          return(
                            <RecentClockinDetail recentClockIndetails={item}/>

                          )
                        })}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
        </div>
      </div>
    </>
  );
};

export default RecentClockinByDate;
