// import { useEffect, useState } from "react";
// import { ApiResponse,Timesheet, Todo, projectInterface } from "../../types/ApiSchema";
// import { toast } from "react-toastify";
// import ApiServices from "../../services/APIServices";
// import EmptyMyTask from "./EmptyMyTask";
// import MarkCompletePopup from "../molecules/MarkCompletePopup";
// import { ArrowDropDownIcon } from "@mui/x-date-pickers";
// import { Typography } from "@mui/material";



// interface propsInterface {
//   projects: projectInterface[] | undefined;

// }
//   const YesterdayRecords: React.FC<propsInterface> = () => {


//   // const [recentClockinList, setRecentClockinList] = useState<ClockIn[]>([])
//   const [ToDoListAll, setToDoListAll] = useState<[]>([]);


//   useEffect(() => {
//   ApiServices.getToDoListAll((response: ApiResponse) => {
//     if (response.statusCode === 200) {
//       setToDoListAll(response?.data.records);

//     }
//     else {
//       toast.error(response.message);
//       setToDoListAll([]);
//     }
//   });},[]);

//   const handleTimeSheetOption = (todo: Todo) => {
//     // setLoading(false);
//     // setSelectedTodo(todo);
//     // setTimeSheetDrawer(true);
//     // setDrawer(true);
//   };
  
//   return (
//     <div>
//       <div>
//           {ToDoListAll.length > 0 ? (
//             <>
//               <div className="mb-2 px-4 flex">
//                 <ArrowDropDownIcon
//                   sx={{ color: "#6F6CFF", width: "12", height: "12" }}
//                 />
//                 <Typography
//                   fontFamily="Montserrat"
//                   color={"#000000"}
//                   marginRight={1}
//                   fontWeight={600}
//                   fontSize={15}
//                 >
//                   To Do
//                 </Typography>

//                 <Typography
//                   fontSize={12}
//                   fontFamily="Montserrat"
//                   marginLeft={1}
//                   paddingTop={0.5}
//                   color={"#8E8E8E"}
//                 >
//                   ({ToDoListAll?.length})
//                 </Typography>
//               </div>
//               <div className="bg-white shadow-sm rounded-xl">
//                 <div
//                   className="my-2 overflow-y-auto"
//                   style={{ height: "calc(100vh - 380px)" }}
//                 >
//                   {ToDoListAll.map((todo, index) => {
//                     return (
//                       <>
//                         <div className="py-2 px-4 flex justify-center items-center font-montserrat hover:bg-[#F6F6F6] group/item">
//                           <div
//                             className="flex justify-start items-start px-2"
//                             key={index}
//                           >
//                             <div
//                               className={`w-[10px] h-[10px] mb-5 rounded-full  ${
//                                 todo?.Task_Status === "1"
//                                   ? "bg-[#6F6CFF]"
//                                   : "bg-[#00BE35]"
//                               }`}
//                             ></div>
//                           </div>
//                           <div className="ml-4 flex-grow">
//                             <p className="text-md text-neutral-950 ">
//                               {todo.Task.charAt(0).toUpperCase() +
//                                 todo.Task.slice(1)}
//                             </p>
//                             <span className="text-[12px] text-neutral-500 w-[60%] capitalize">
//                               {todo.project_id?.project_name} |{" "}
//                               {todo && todo?.timesheets?.length > 0
//                                 ? `${
//                                     (
//                                       todo?.timesheets?.reduce(
//                                         (accumulator, timesheet) =>
//                                           accumulator +
//                                           parseFloat(timesheet.total_time),
//                                         0
//                                       ) / 60
//                                     ).toFixed(2) || "0.00"
//                                   } hours logged`
//                                 : "0 hours logged"}
//                             </span>
//                           </div>
//                           <div className="group/edit invisible group-hover/item:visible text-black">
//                             <div className="mr-4 opacity-70	md:flex flex justify-center items-center gap-6">
//                               <button
//                                 className="flex justify-center items-center"
//                                 onClick={() => handleTimeSheetOption(todo)}
//                               >
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width="14"
//                                   height="14"
//                                   viewBox="0 0 14 14"
//                                   fill="none"
//                                 >
//                                   <path
//                                     fill-rule="evenodd"
//                                     clip-rule="evenodd"
//                                     d="M13.1668 7.00041C13.1668 10.4064 10.4062 13.1671 7.00016 13.1671C3.59416 13.1671 0.833496 10.4064 0.833496 7.00041C0.833496 3.59441 3.59416 0.83374 7.00016 0.83374C10.4062 0.83374 13.1668 3.59441 13.1668 7.00041Z"
//                                     stroke="#7A797C"
//                                     stroke-linecap="round"
//                                     stroke-linejoin="round"
//                                   />
//                                   <path
//                                     d="M9.28775 8.96187L6.77441 7.46253V4.2312"
//                                     stroke="#7A797C"
//                                     stroke-linecap="round"
//                                     stroke-linejoin="round"
//                                   />
//                                 </svg>
//                                 <p className="font-montserrat text-neutral-600 text-[13px] pl-2 pr-4  ">
//                                   Add timesheet
//                                 </p>
//                               </button>

//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 16 16"
//                                 fill="none"
//                               >
//                                 <g opacity="0.5">
//                                   <path
//                                     fill-rule="evenodd"
//                                     clip-rule="evenodd"
//                                     d="M13.105 4.16496C13.3821 4.40741 13.4102 4.82859 13.1677 5.10568L7.33441 11.7723C7.09285 12.0484 6.67365 12.0775 6.39632 11.8374L2.89632 8.80705C2.61797 8.56605 2.58768 8.14502 2.82868 7.86667C3.06969 7.58831 3.49071 7.55803 3.76906 7.79903L6.76769 10.3952L12.1643 4.22767C12.4068 3.95058 12.8279 3.9225 13.105 4.16496Z"
//                                     fill="black"
//                                   />
//                                 </g>
//                               </svg>
//                               <MarkCompletePopup todo={todo} />
//                               {/* <TaskOption
//                     todo={todo}
//                     setClickedTodoOption={setClickedTodoOption}
//                     // setAddTaskClicked={setAddTaskClicked}
//                   /> */}
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     );
                //   })}
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div>
//               <EmptyMyTask />
//             </div>
//           )}
//         </div>
      
//     </div>
//   )
// }

// export default YesterdayRecords

