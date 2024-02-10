import React, { useContext } from "react";
import { useState } from "react";
import { EmployeeContext } from "../../context/EmployeeContext";
import { TaskOption } from "../molecules/TaskOption";
import EmptyToDoList from ".././molecules/EmptyToDoList";
import { GlobalContext } from "../../context/GlobalContext";
import { projectInterface } from "../../types/ApiSchema";
import ToDoForm from "../to-doForm/ToDoForm";
import Description from "../../Atoms/Description";
import { Todo } from "../../types/ApiSchema";
import Box from "@mui/system/Box";
import MarkCompletePopup from "../molecules/MarkCompletePopup";
import { MarkCompleteCardContent } from "../../constants/Constants";
import { Utils } from "../../services/Utils";

interface propsInterface {
  setAddTaskClicked: (state: boolean) => void;
  projects: projectInterface[] | undefined;
}

const ToDoList: React.FC<propsInterface> = ({ setAddTaskClicked }) => {
  const { toDoList, selectedTodo, setSelectedTodo } =
    useContext(EmployeeContext);

  const { projects, setTimeSheetDrawer } = useContext(GlobalContext);

  const [clickedTodoOption, setClickedTodoOption] = useState<
    string | undefined
  >();

  console.log(clickedTodoOption);
  const handleTimeSheetOption = (todo: Todo) => {
    setSelectedTodo(todo);
    setTimeSheetDrawer(true);
  };

  return (
    <div className="pb-5  overflow-y-auto">
      {toDoList?.length === 0 ? (
        <div className="flex  h-inherit mt-12 items-center justify-center">
          <EmptyToDoList />
        </div>
      ) : (
        <div className="" style={{ height: "calc(100vh - 350px)" }}>
          {toDoList?.map((todo, index) => {
            return selectedTodo?.ToDo_Id === todo.ToDo_Id ? (
              <>
                <hr className="border-t-1 border-gray-200 my-4" />

                <ToDoForm
                  projects={projects}
                  selectedTodo={selectedTodo}
                  setAddTaskClicked={setAddTaskClicked}
                />
                <hr className="border-t-1 border-gray-200 my-4" />
              </>
            ) : (
              <div key={index} className="py-2 px-6 flex   ">
                <div
                  className={`w-[11px] mt-2 mr-1  h-[10px] rounded-full  ${
                    todo?.Task_Status === "1"
                      ? "bg-[#9a98f9]"
                      : todo?.Task_Status === "2"
                      ? "bg-[#00BE35]"
                      : "bg-red-400"
                  }`}
                ></div>

                <div className="px-2 grid-cols-8 w-[90%]">
                  <p
                    className="font-montserrat text-md text-gray-950"
                    // dangerouslySetInnerHTML={{ __html: todo?.Task }}
                  >
                    {todo.Task.charAt(0).toUpperCase() + todo.Task.slice(1)}
                  </p>
                  <Box display={"flex"}>
                    <p className="text-neutral-600 ">
                      {todo.project_id?.project_name}
                    </p>
                    <span className="px-1 text-neutral-600 ">|</span>

                    <Description>
                      {todo && todo?.timesheets?.length > 0
                        ? Utils.calculateTotalTime(todo?.timesheets)
                        : "0 hr"}
                    </Description>
                  </Box>

                  <div className="flex mt-2">
                    <button onClick={() => handleTimeSheetOption(todo)}>
                      <div className="flex items-center  ">
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
                            d="M13.1654 7.00016C13.1654 10.4062 10.4047 13.1668 6.9987 13.1668C3.5927 13.1668 0.832031 10.4062 0.832031 7.00016C0.832031 3.59416 3.5927 0.833496 6.9987 0.833496C10.4047 0.833496 13.1654 3.59416 13.1654 7.00016Z"
                            stroke="#7A797C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.28677 8.96187L6.77344 7.46253V4.2312"
                            stroke="#7A797C"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <p className="font-montserrat text-[#7A797C] text-[13px] pl-2 pr-4 ">
                          Add timesheet
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center justify-center ">
                      <MarkCompletePopup
                        todo={todo}
                        content={MarkCompleteCardContent}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <TaskOption
                    todo={todo}
                    setClickedTodoOption={setClickedTodoOption}
                    setAddTaskClicked={setAddTaskClicked}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ToDoList;
