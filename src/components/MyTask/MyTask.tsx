import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { EmployeeContext } from "../../context/EmployeeContext";
import EmptyMyTask from "./EmptyMyTask";
import {
  TaskListResponse,
  Timesheet,
  projectInterface,
} from "../../types/ApiSchema";
import { Todo, Task } from "../../types/ApiSchema";
import { GlobalContext } from "../../context/GlobalContext";
import MarkCompletePopup from "../molecules/MarkCompletePopup";
import {
  DeleteCardContent,
  MarkCompleteCardContent,
  todoStatusTabs,
} from "../../constants/Constants";
import moment from "moment";
import Spinner from "react-spinner";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import UpdateTaskPopup from "../molecules/UpdateTaskPopup";

interface propsInterface {
  tab: string;
}
const style = {
  position: "absolute" as "inherit",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 323,
  height: 288,
  bgcolor: "background.paper",

  boxShadow: 24,
  borderRadius: 4,
  py: 5,
  px: 5,
};
const MyTask: React.FC<propsInterface> = ({ tab }) => {
  // const { setTodoList, toDoList, refreshTodoList, setRefreshTodoList } =
  //   useContext(EmployeeContext);

  const calculateTotalTime = (timesheets: Timesheet[]) => {
    let totalTime = 0;

    timesheets?.forEach((timesheet: Timesheet) => {
      const startTime = moment(timesheet?.start_time);
      const endTime = moment(timesheet?.end_time);
      const duration = moment.duration(endTime.diff(startTime));

      totalTime += duration.asMinutes(); // or asSeconds(), asHours(), etc. based on your needs
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalHours = Math.floor(totalTime / 60);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const remainingMinutes = totalTime % 60;
    return `${totalHours}hr  ${remainingMinutes}min`;
  };
  const { setSelectedTodo, todoFetching, TodoList } =
    useContext(EmployeeContext);
  const { setTimeSheetDrawer, setDrawer } = useContext(GlobalContext);
  const [isUpdateTaskPopupOpen, setUpdateTaskPopupOpen] = useState(false);
  const activeTab =
    (todoStatusTabs[parseInt(tab)] as "Completed") || "Overdue" || "Inprogress";

  const handleTimeSheetOption = (todo: Task) => {
    setSelectedTodo(todo);
    setTimeSheetDrawer(true);
    setDrawer(true);
  };

  // useEffect(()=>{
  //   console.log('re')
  //   ApiServices.getNewTodoList(1, (response: TaskListResponse) => {
  //     if (response.statusCode === 200) {
  //       setToDoList(response?.data);
  //     } else {
  //       toast.error(response.message);
  //     }
  //   })
  // },[])
  // this is for edit and delat option

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menu, setMenu] = useState({} as Task);
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleOpenUpdateTaskPopup = () => {
    setUpdateTaskPopupOpen(true);
  };

  const handleCloseUpdateTaskPopup = () => {
    setUpdateTaskPopupOpen(false);
  };

  const handleEdit = (todo: any) => {
    setSelectedTodo(todo);
    handleOpenUpdateTaskPopup();
    handleClose();
  };
 
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return ( 
    <div className="  flex-1 flex-col     ">
      {todoFetching ? (
        <div className=" flex-1 flex flex-col justify-center items-center ">
          <Spinner
            style={{
              width: "40px",
              height: "40px",
              border: "2px solid #f3f3f3",
              borderTop: "2px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      ) : TodoList?.[activeTab] && TodoList?.[activeTab].length > 0 ? (
        <>
          <div className="shadow-sm rounded-xl      ">
            {TodoList?.[activeTab]?.map((todo, index) => {
              return (
                <div key={index}>
                  <div
                    className={`w-full  py-2 px-4  flex justify-center items-center font-montserrat hover:bg-[#F6F6F6] group/item ${
                      activeIndex === index ? "bg-[#F6F6F6]" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                  >
                    <div className="flex justify-center items-start px-2 ">
                      <div>
                        <div
                          className={`w-[10px] mb-5  h-[10px] rounded-full  ${
                            todo?.Task_Status === "1"
                              ? "bg-[#9a98f9]"
                              : todo?.Task_Status === "2"
                              ? "bg-[#00BE35]"
                              : "bg-red-400"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 flex-grow">
                      <p
                        className="text-md max-w-md text-neutral-950"
                        // dangerouslySetInnerHTML={{ __html: todo?.Task }}
                      >
                        {todo.Task.charAt(0).toUpperCase() + todo.Task.slice(1)}
                      </p>
                      <span className="text-[12px] text-neutral-600 max-w-sm capitalize">
                        {todo.project_id?.project_name} |{" "}
                        {todo && todo?.timesheets?.length > 0
                          ? calculateTotalTime(todo?.timesheets)
                          : "0 hr"}
                        {/* | {"  "} */}
                      </span>
                    </div>
                    {/* {[1, 3].includes(parseInt(todo?.Task_Status, 10)) && ( */}
                    <div className="group/edit invisible group-hover/item:visible text-black">
                      <div className="mr-4 opacity-70	md:flex flex justify-center items-center gap-6">
                        <button
                          className="flex justify-center items-center"
                          onClick={() => handleTimeSheetOption(todo)}
                          // disabled={isTaskStatus2}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.1668 7.00041C13.1668 10.4064 10.4062 13.1671 7.00016 13.1671C3.59416 13.1671 0.833496 10.4064 0.833496 7.00041C0.833496 3.59441 3.59416 0.83374 7.00016 0.83374C10.4062 0.83374 13.1668 3.59441 13.1668 7.00041Z"
                              stroke="#7A797C"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.28775 8.96187L6.77441 7.46253V4.2312"
                              stroke="#7A797C"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p className="font-montserrat text-[#7A797C] text-[13px] pl-2 pr-4  ">
                            Add timesheets
                          </p>
                        </button>
                        <div className="flex justify-center items-center">
                          <MarkCompletePopup
                            todo={todo && todo}
                            content={MarkCompleteCardContent}
                          />
                        </div>

                        <div className="flex justify-center items-center">
                          {activeTab === "Inprogress" && (
                            <div className="flex justify-end items-center">
                              {/* Three dots */}
                              <IconButton
                                aria-label="more"
                                id={`options-button-${index}`}
                                aria-controls={`options-menu-${index}`}
                                aria-haspopup="true"
                                onClick={(e) => {
                                  setMenu(todo);
                                  handleClick(e);
                                }}
                              >
                                <MoreVertIcon />
                              </IconButton>

                              {/* <Modal
                                open={open}
                                onClose={handlePopupClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box
                                  display={"flex"}
                                  justifyContent={"center"}
                                  flexDirection={"column"}
                                  sx={style}
                                >
                                  <Box alignSelf={"end"}>
                                    <button onClick={() => setOpen(false)}>
                                      <ClearIcon />
                                    </button>
                                  </Box>

                                  <Box>
                                    <Box
                                      display={"flex"}
                                      marginBottom={2}
                                      justifyContent={"center"}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="54"
                                        height="54"
                                        viewBox="0 0 54 54"
                                        fill="none"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M27.0013 49.6665C39.5 49.6665 49.668 39.4985 49.668 26.9998C49.668 14.5012 39.5 4.33317 27.0013 4.33317C14.5026 4.33317 4.33464 14.5012 4.33464 26.9998C4.33464 39.4985 14.5026 49.6665 27.0013 49.6665ZM27.0013 0.333173C41.7053 0.333175 53.668 12.2958 53.668 26.9998C53.668 41.7038 41.7053 53.6665 27.0013 53.6665C12.2973 53.6665 0.334642 41.7038 0.334643 26.9998C0.334644 12.2958 12.2973 0.333172 27.0013 0.333173Z"
                                          fill="#FF7A7A"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M27.0156 23.3383C28.1196 23.3383 29.0156 24.2343 29.0156 25.3383L29.0156 37.1223C29.0156 38.2263 28.1196 39.1223 27.0156 39.1223C25.9116 39.1223 25.0156 38.2263 25.0156 37.1223L25.0156 25.3383C25.0156 24.2343 25.9116 23.3383 27.0156 23.3383Z"
                                          fill="#FF7A7A"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M26.9919 14.2109C28.4665 14.2109 29.6719 15.4029 29.6719 16.8775C29.6719 18.3522 28.4905 19.5442 27.0185 19.5442L26.9919 19.5442C25.5172 19.5442 24.3252 18.3522 24.3252 16.8775C24.3252 15.4029 25.5172 14.2109 26.9919 14.2109Z"
                                          fill="#FF7A7A"
                                        />
                                      </svg>
                                    </Box>
                                  </Box>
                                  <Title textAlign="center">
                                    {content?.cardTitle}
                                  </Title>
                                  <Box textAlign={"center"}>
                                    <Description>
                                      {content?.cardDescription}
                                    </Description>
                                  </Box>

                                  <Button
                                    disabled={isLoading}
                                    onClick={handleMarkCompleteTask}
                                    sx={{
                                      marginTop: 3,
                                      "&:hover": {
                                        backgroundColor: "#3730a3 !important",
                                      },
                                    }}
                                    style={{ color: "white" }}
                                  >
                                    {isLoading
                                      ? "Please Wait ..."
                                      : content?.cardButton}
                                  </Button>
                                </Box>
                              </Modal> */}

                              {/* Menu for Edit and Delete options */}
                            </div>
                          )}

                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="#7A797C"
                            style={{ marginRight: 2 }}
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              stroke="#7A797C"
                              d="M6.14387 11.8333C5.35345 11.8333 4.58287 11.8246 3.82045 11.8088C2.84512 11.7896 2.1702 11.1573 2.05995 10.1586C1.8762 8.50192 1.56179 4.59709 1.55887 4.55801C1.53904 4.31709 1.7187 4.10592 1.95962 4.08667C2.19704 4.08026 2.4117 4.24709 2.43095 4.48742C2.43387 4.52709 2.7477 8.41851 2.9297 10.0623C2.99212 10.6299 3.29837 10.9228 3.83854 10.9338C5.29687 10.9648 6.78495 10.9665 8.38912 10.9373C8.96312 10.9263 9.27345 10.6393 9.33762 10.0583C9.51845 8.42842 9.83345 4.52709 9.83695 4.48742C9.8562 4.24709 10.0691 4.07909 10.3077 4.08667C10.5486 4.10651 10.7283 4.31709 10.709 4.55801C10.7055 4.59767 10.3894 8.51242 10.2074 10.1545C10.0942 11.1736 9.42104 11.7937 8.40487 11.8123C7.62729 11.8258 6.87712 11.8333 6.14387 11.8333Z"
                              fill="#6F6CFF"
                            />
                            <path
                              d="M6.14387 11.8333C5.35345 11.8333 4.58287 11.8246 3.82045 11.8088C2.84512 11.7896 2.1702 11.1573 2.05995 10.1586C1.8762 8.50192 1.56179 4.59709 1.55887 4.55801C1.53904 4.31709 1.7187 4.10592 1.95962 4.08667C2.19704 4.08026 2.4117 4.24709 2.43095 4.48742C2.43387 4.52709 2.7477 8.41851 2.9297 10.0623C2.99212 10.6299 3.29837 10.9228 3.83854 10.9338C5.29687 10.9648 6.78495 10.9665 8.38912 10.9373C8.96312 10.9263 9.27345 10.6393 9.33762 10.0583C9.51845 8.42842 9.83345 4.52709 9.83695 4.48742C9.8562 4.24709 10.0691 4.07909 10.3077 4.08667C10.5486 4.10651 10.7283 4.31709 10.709 4.55801C10.7055 4.59767 10.3894 8.51242 10.2074 10.1545C10.0942 11.1736 9.42104 11.7937 8.40487 11.8123C7.62729 11.8258 6.87712 11.8333 6.14387 11.8333"
                              stroke="#7A797C"
                              stroke-width="0.25"
                            />
                            <path
                              fill-rule="evenodd"
                              stroke="#7A797C"
                              clip-rule="evenodd"
                              d="M11.0797 3.0769H1.1875C0.946 3.0769 0.75 2.8809 0.75 2.6394C0.75 2.3979 0.946 2.2019 1.1875 2.2019H11.0797C11.3212 2.2019 11.5172 2.3979 11.5172 2.6394C11.5172 2.8809 11.3212 3.0769 11.0797 3.0769Z"
                              fill="#7A797C"
                            />
                            <path
                              d="M11.0797 3.0769H1.1875C0.946 3.0769 0.75 2.8809 0.75 2.6394C0.75 2.3979 0.946 2.2019 1.1875 2.2019H11.0797C11.3212 2.2019 11.5172 2.3979 11.5172 2.6394C11.5172 2.8809 11.3212 3.0769 11.0797 3.0769"
                              stroke="#7A797C"
                              stroke-width="0.25"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              stroke="#7A797C"
                              d="M9.17359 3.077C8.50976 3.077 7.93342 2.60391 7.80276 1.95291L7.66101 1.24358C7.63126 1.13566 7.50817 1.04175 7.36817 1.04175H4.89892C4.75892 1.04175 4.63584 1.13566 4.60026 1.27041L4.46434 1.95291C4.33426 2.60391 3.75734 3.077 3.09351 3.077C2.85201 3.077 2.65601 2.881 2.65601 2.6395C2.65601 2.398 2.85201 2.202 3.09351 2.202C3.34201 2.202 3.55784 2.02466 3.60684 1.78083L3.74859 1.0715C3.89267 0.527831 4.36342 0.166748 4.89892 0.166748H7.36817C7.90367 0.166748 8.37442 0.527831 8.51267 1.04525L8.66084 1.78083C8.70926 2.02466 8.92509 2.202 9.17359 2.202C9.41509 2.202 9.61109 2.398 9.61109 2.6395C9.61109 2.881 9.41509 3.077 9.17359 3.077Z"
                              fill="#7A797C"
                            />
                            <path
                              d="M9.17359 3.077C8.50976 3.077 7.93342 2.60391 7.80276 1.95291L7.66101 1.24358C7.63126 1.13566 7.50817 1.04175 7.36817 1.04175H4.89892C4.75892 1.04175 4.63584 1.13566 4.60026 1.27041L4.46434 1.95291C4.33426 2.60391 3.75734 3.077 3.09351 3.077C2.85201 3.077 2.65601 2.881 2.65601 2.6395C2.65601 2.398 2.85201 2.202 3.09351 2.202C3.34201 2.202 3.55784 2.02466 3.60684 1.78083L3.74859 1.0715C3.89267 0.527831 4.36342 0.166748 4.89892 0.166748H7.36817C7.90367 0.166748 8.37442 0.527831 8.51267 1.04525L8.66084 1.78083C8.70926 2.02466 8.92509 2.202 9.17359 2.202C9.41509 2.202 9.61109 2.398 9.61109 2.6395C9.61109 2.881 9.41509 3.077 9.17359 3.077"
                              stroke="#7A797C"
                              stroke-width="0.10"
                            />
                          </svg> */}
                          {/* 
                          <MarkCompletePopup
                            todo={todo}
                            content={DeleteCardContent}
                          /> */}
                        </div>
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <EmptyMyTask />
        </div>
      )}

      <Menu
        sx={{ zIndex: "10", border: "black" }}
        id={`options-menu`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className="cursor-pointer w-[100px] ml-[2px] h-[25px]"
          onClick={() => handleEdit(menu)}
        >
          <Typography className="font-montserrat text-[#7A797C] text-[13px] pl-0">
            Edit
          </Typography>
        </MenuItem>

        <MenuItem className="w-[100px] ml-[2px] h-[25px]">
          <MarkCompletePopup todo={menu} content={DeleteCardContent} />
        </MenuItem>
      </Menu>

      <UpdateTaskPopup
        open={isUpdateTaskPopupOpen}
        onClose={handleCloseUpdateTaskPopup}
        selectedTodo={menu}
      />
    </div>
  );
};

export default MyTask;
