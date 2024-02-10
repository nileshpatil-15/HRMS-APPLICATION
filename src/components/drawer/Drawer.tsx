import React, { useState, useEffect, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/system/Box";
import DrawerHeader from "./drawer-header";
import { Typography } from "@mui/material";
import useTheme from "@mui/system/useTheme";
import ToDoForm from "../to-doForm/ToDoForm";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ApiServices from "../../services/APIServices";
import { GlobalContext } from "../../context/GlobalContext";
import { EmployeeContext } from "../../context/EmployeeContext";
import ToDoList from "../TodoList/TodoList";
import { Button } from "@mui/material";
import { RiTimerFlashLine } from "react-icons/ri";
import TodoListResponse, {
  clockInResponseInterface,
  getProjectsApiInterface,
  timesheetInterface,
  TimesheetData,
  addTimesheetResponseInterface,
} from "../../types/ApiSchema";
import Spinner from "react-spinner";
import { toast } from "react-toastify";
import Title from "../../Atoms/Title";
import ClearIcon from "@mui/icons-material/Clear";
import Description from "../../Atoms/Description";
import BasicTimeRangeField from "../timePicker/TimePicker";
import { Utils } from "../../services/Utils";
import moment from "moment-timezone";
import { Dayjs } from "dayjs";
import MarkCompletePopup from "../molecules/MarkCompletePopup";
import { ClockOutCardContent } from "../../constants/Constants";
const TemporaryDrawer: React.FC = () => {
  // const data = JSON.parse(localStorage.getItem('ProjectList')) as [];

  // const [projects, setProjectlist] = useState<ProjectListInterface[]>([]);
  // import dayjs, { Dayjs } from "dayjs";
  const theme = useTheme();
  const context = useContext(GlobalContext);
  const {
    isDrawerTrue,
    setDrawer,
    timeSheetDrawer,
    setTimeSheetDrawer,
    isClockedIn,
    setClockIn,
    setprojectsList,
    projects,
  } = context;
  const {
    toDoList,
    setSelectedTodo,
    selectedTodo,
    setSelectedToDoOption,
    setTodoList,
    addTimeClicked,
    setAddTimeClicked,
    refreshTodoList
  } = useContext(EmployeeContext);

  const [addTaskClicked, setAddTaskClicked] = useState<boolean>(false);
  const [timeSheetTime, setTimeSheetTime] = useState<typeof Dayjs | null>();
  const [timeSheet, setTimesheet] = useState<TimesheetData>(
    {} as TimesheetData
  );
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleAddTimeSheet = async () => {
    if (timeSheetTime) {
      const time = await Utils.ConvertTime(timeSheetTime);
      ApiServices.addTimesheet(
        selectedTodo?.ToDo_Id ?? "",
        time,
        (response: addTimesheetResponseInterface) => {
          if (response.statusCode === 201) {
            toast.success(response.message);
            setSelectedTodo(undefined);
            setTimeSheetDrawer(false);
            setTimeSheetTime(undefined);
          } else {
            toast.error(response.message);
            setTimeSheetTime(undefined);
          }
        }
      );
    } else {
      toast.error("Please enter valid time");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const HandleClockIn = async () => {
    setLoading(true);

    // const timeSheetStatus = await Utils.isTimesheetAdded(toDoList);

    ApiServices.clockIn((response: clockInResponseInterface) => {
      if (response.statusCode === 201) {
        toast.success(response.message);
        setDrawer(!isDrawerTrue);
        setClockIn("1");
        setLoading(false);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    });
  };

  const handleClearIcon = () => {
    setDrawer(false);
    setSelectedTodo(undefined);
  };
  const handleDrawer = () => {
    setDrawer(!isDrawerTrue);
    setAddTaskClicked(false);

    setSelectedTodo(undefined);
    setAddTimeClicked(false);
  };

  const handleAddTaskButton = () => {
    setAddTaskClicked(true);
    setSelectedToDoOption(undefined);
  };

  useEffect(() => {
    ApiServices.getProjectList((res: getProjectsApiInterface) => {
      if (res.statusCode === 200) {
        if (res.data !== undefined) {
          setprojectsList(res.data);
        }
      }
    });
  }, [setprojectsList]);

  useEffect(() => {
    ApiServices.getToDoList((response: TodoListResponse) => {
      if (response.data.Todo) {
        setTodoList(response.data.Todo);
      } else {
        toast.error("Something went Wrong !");
        setTodoList([]);
      }
    });

    if (selectedTodo && selectedTodo?.Task) {
      ApiServices.getTimeSheet(
        selectedTodo.ToDo_Id,
        (response: timesheetInterface) => {
          if (response.statusCode === 200) {
            setTimesheet(response.data.timesheet);
          }
        }
      );
    }

    return () => {
      // Code to run before the component is unmounted
      setTimesheet({} as TimesheetData);
    };
  }, [setTodoList, selectedTodo, setTimesheet,refreshTodoList]);

  return (
    <Drawer anchor="right" open={isDrawerTrue} onClose={handleDrawer}>
      <Box
        pb={3}
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        role="presentation"
        sx={{
          [theme.breakpoints.down("sm")]: {
            width: "70vw",
          },
          [theme.breakpoints.up("sm")]: {
            width: "35vw",
          },

          [theme.breakpoints.up("md")]: {
            width: "28vw",
          },
          [theme.breakpoints.up("lg")]: {
            width: "32vw",
          },
        }}
      >
        {!timeSheetDrawer ? (
          <div className="flex flex-col h-screen">
            <DrawerHeader />
            <hr />
            {/* To do text and its count */}
            <Box pt={2} pb={2} px={2} display={"flex"}>
              <ArrowDropDownIcon sx={{ color: "#6F6CFF" }} />
              <Typography
                fontFamily="Montserrat"
                color={"#000000"}
                marginRight={1}
                fontWeight={600}
              >
                To Do
              </Typography>
              <Typography marginRight={2} color={"#8E8E8E"}>
                ({toDoList?.length})
              </Typography>
              <button onClick={handleAddTaskButton}>
                <Typography
                  sx={{
                    fontSize: 12,
                    marginLeft: 3,
                    fontWeight: 600,
                    color: "#6F6CFF",
                  }}
                  fontFamily="Montserrat"
                >
                  + Add Task
                </Typography>
              </button>
            </Box>
            {addTaskClicked &&
              Object.keys(!selectedTodo || selectedTodo).length === 0 && (
                <ToDoForm
                  projects={projects}
                  setAddTaskClicked={setAddTaskClicked}
                  selectedTodo={selectedTodo}
                />
              )}
            <ToDoList
              setAddTaskClicked={setAddTaskClicked}
              projects={undefined}
            />

            {isClockedIn === undefined ? (
              <Button fullWidth size="small">
                <Spinner
                  style={{
                    width: "20px", // Adjust the width as needed
                    height: "20px", // Adjust the height as needed
                    border: "2px solid #f3f3f3",
                    borderTop: "2px solid #3498db",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </Button>
            ) : isClockedIn === "0" ? (
              <Box px={2} flex={1} display={"flex"} alignItems={"end"}>
                <Button
                  disabled={isLoading ? true : false}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#3730a3 !important",
                    },
                  }}
                  onClick={HandleClockIn}
                  startIcon={<RiTimerFlashLine />}
                  fullWidth
                  size="small"
                >
                  <Typography fontFamily="Montserrat">
                    {isLoading ? "Please Wait" : "Clock In"}
                  </Typography>
                </Button>
              </Box>
            ) : (
              <Box
                flexDirection={"column"}
                px={2}
                flex={1}
                display={"flex"}
                justifyContent={"end"}
              >
                <MarkCompletePopup
                  todo={selectedTodo && selectedTodo}
                  content={ClockOutCardContent}
                />
              </Box>
            )}
          </div>
        ) : (
          <div className=" flex flex-col h-screen   ">
            <div className="flex flex-col   ">
              <div className="p-6 h-full flex flex-row justify-center px-3  pb-3 items-start">
                <div
                  className={`w-[10px] mt-2 mr-1  h-[10px] rounded-full  ${
                    selectedTodo?.Task_Status === "1"
                      ? "bg-[#9a98f9]"
                      : selectedTodo?.Task_Status === "2"
                      ? "bg-[#00BE35]"
                      : "bg-red-400"
                  }`}
                ></div>

                <div className="ml-1 flex-grow">
                  {/* <Title dangerouslySetInnerHTML={{ __html: selectedTodo?.Task }}></Title> */}
                  <Title>{selectedTodo?.Task}</Title>
                  <Box display={"flex"}>
                    <Description>
                      {selectedTodo?.project_id?.project_name}
                    </Description>
                    <span className="pr-2 pl-2">| </span>
                    <Description>
                      {selectedTodo && selectedTodo?.timesheets?.length > 0
                        ? Utils.calculateTotalTime(selectedTodo?.timesheets)
                        : "0 hr"}
                    </Description>
                  </Box>
                </div>
                <div className=" ">
                  <button onClick={handleClearIcon}>
                    <ClearIcon />
                  </button>
                </div>
              </div>
              <hr className="border-t-1 border-gray-200 my-2" />

              <Box display={""}>
                <Box display={"flex"} marginTop={1} marginBottom={1} px={1}>
                  <ArrowDropDownIcon sx={{ color: "#6F6CFF" }} />

                  <Typography
                    fontFamily="Montserrat"
                    color={"#000000"}
                    marginRight={1}
                    fontWeight={600}
                  >
                    Today's Timesheet
                  </Typography>

                  <button onClick={() => setAddTimeClicked(!addTimeClicked)}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        marginLeft: 3,
                        fontWeight: 600,
                        color: "#6F6CFF",
                      }}
                      fontFamily="Montserrat"
                    >
                      + Add Time
                    </Typography>
                  </button>

                  <br />
                </Box>
                <Box px={2}>
                  {addTimeClicked ? (
                    <BasicTimeRangeField setTimeSheetTime={setTimeSheetTime} />
                  ) : null}
                </Box>
                <Box
                  sx={{
                    height: 200,
                    overflowY: "scroll",
                  }}
                  px={2}
                  pb={3}
                >
                  {timeSheet?.Today?.length === 0 ? (
                    <Box
                      height={"inherit"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Description>
                        There is no timesheets for today
                      </Description>
                    </Box>
                  ) : timeSheet?.Today?.length > 0 ? (
                    timeSheet?.Today?.map((timesheet) => {
                      return (
                        <div className="flex py-3  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            style={{ marginRight: "10px", marginTop: "5px" }}
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M16.7077 9.00033C16.7077 13.2578 13.2568 16.7087 8.99935 16.7087C4.74185 16.7087 1.29102 13.2578 1.29102 9.00033C1.29102 4.74283 4.74185 1.29199 8.99935 1.29199C13.2568 1.29199 16.7077 4.74283 16.7077 9.00033Z"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.8594 11.4524L8.71777 9.57823V5.53906"
                              stroke="black"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div>
                            <p className="text-[14] font-bold">
                              {Utils.ConvertTimeToTime(
                                timesheet?.start_time,
                                timesheet?.end_time
                              )}{" "}
                            </p>
                            <Description>
                              {`${Math.floor(
                                parseInt(timesheet?.total_time) / 60
                              )} hours : ${
                                parseInt(timesheet?.total_time) % 60
                              } minutes`}
                            </Description>
                          </div>
                          <div className="ml-auto">
                            <Description>
                              {moment(timesheet.createdAt).format(
                                "DD MMM YYYY"
                              )}
                            </Description>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Box
                      height={"inherit"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
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
                    </Box>
                  )}
                </Box>

                <Box marginTop={4} marginBottom={1} px={1} display={"flex"}>
                  <ArrowDropDownIcon sx={{ color: "#6F6CFF" }} />

                  <Typography
                    fontFamily="Montserrat"
                    color={"#000000"}
                    marginRight={1}
                    fontWeight={600}
                  >
                    Previous Timesheet
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 200,
                    overflowY: "scroll",
                  }}
                  px={2}
                  pb={3}
                >
                  {timeSheet?.Previous?.length === 0 ? (
                    <Box
                      height={"inherit"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Description>There is no previous timesheet</Description>
                    </Box>
                  ) : timeSheet?.Previous?.length > 0 ? (
                    timeSheet?.Previous?.map(
                      (timesheet: {
                        start_time: string | number | Date;
                        end_time: string;
                        total_time: string;
                      }) => {
                        return (
                          <div className="flex py-3  ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              style={{ marginRight: "10px", marginTop: "5px" }}
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.7077 9.00033C16.7077 13.2578 13.2568 16.7087 8.99935 16.7087C4.74185 16.7087 1.29102 13.2578 1.29102 9.00033C1.29102 4.74283 4.74185 1.29199 8.99935 1.29199C13.2568 1.29199 16.7077 4.74283 16.7077 9.00033Z"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11.8594 11.4524L8.71777 9.57823V5.53906"
                                stroke="black"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <div>
                              <p className="text-[14] font-bold">
                                {Utils.ConvertTimeToTime(
                                  timesheet?.start_time,
                                  timesheet?.end_time
                                )}{" "}
                              </p>
                              <Description>
                                {`${Math.floor(
                                  parseInt(timesheet?.total_time) / 60
                                )} hours : ${
                                  parseInt(timesheet?.total_time) % 60
                                } minutes`}
                              </Description>
                            </div>
                            <div className="ml-auto">
                              <Description>
                                {new Date(
                                  timesheet?.start_time
                                ).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  timeZone: "Asia/Kolkata",
                                })}
                                ;
                              </Description>
                            </div>
                          </div>
                        );
                      }
                    )
                  ) : (
                    <Box
                      height={"inherit"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
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
                    </Box>
                  )}
                </Box>
              </Box>
            </div>
            {/* <hr className="border-t-1 border-gray-200 my-1" /> */}

            <div className=" flex-1 flex items-end px-2">
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "#3730a3 !important",
                  },
                }}
                size="small"
                type="submit"
                color="primary"
                onClick={handleAddTimeSheet}
                fullWidth
              >
                <Typography fontFamily="Montserrat">Save</Typography>
              </Button>
            </div>
          </div>
        )}
      </Box>
    </Drawer>
  );
};

export default TemporaryDrawer;
