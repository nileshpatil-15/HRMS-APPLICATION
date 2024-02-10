import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import { Divider, Select, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { GlobalContext } from "../../context/GlobalContext";
import ApiServices from "../../services/APIServices";
import { createToDoResponseInterface } from "../to-doForm/ToDoForm";
import { toast } from "react-toastify";
import { Utils } from "../../services/Utils";
import { EmployeeContext } from "../../context/EmployeeContext";
import { TaskListResponse } from "../../types/ApiSchema";
const style = {
  position: "absolute" as "inherit",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  height: 365,
  bgcolor: "background.paper",
  borderRadius: 8,
  outline: "none",
  border: 0,
  boxShadow: 24,
};

interface FormInput {
  task: string;
  project: string;
}
export default function AddTaskPopup() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { setToDoList, refreshTodoList, setRefreshTodoList } =
    React.useContext(EmployeeContext);

  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>();

  const { projects } = React.useContext(GlobalContext);
  const onSubmit = (data: { task: string; project: string }) => {
    const project_id = Utils.getProjectId(data.project, projects);

    ApiServices.createToDo(
      data.task,
      project_id,
      (response: createToDoResponseInterface) => {
        if (response.statusCode === 201) {
          ApiServices.getNewTodoList(1, (response: TaskListResponse) => {
            if (response.statusCode === 200) {
              setToDoList(response?.data);
              setRefreshTodoList(!refreshTodoList);
            } else {
              toast.error(response.message);
            }
          });
          handleClose();
          reset();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    );
  };

  return (
    <div className="">
      <button onClick={handleOpen} className="text-[#6F6CFF]">
        <Typography
          sx={{ fontSize: 13, marginLeft: 3, fontWeight: 600 }}
          fontFamily="Montserrat"
        >
          + Add Task
        </Typography>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box display={"flex"} flexDirection={"column"} sx={style} py={2}>
          <Box display={"flex"} px={3} pb={2} justifyContent={"space-between"}>
            <Typography
              fontWeight={600}
              color={"#000000"}
              fontSize={18}
              fontFamily={"Montserrat"}
            >
              Create new task
            </Typography>
            <button onClick={handleClose}>
              <ClearIcon />
            </button>
          </Box>
          <Divider />
          <form
            className="px-6 pt-4 flex flex-col flex-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Controller
                name="task"
                control={control}
                defaultValue=""
                rules={{ required: "Task name is required" }}
                render={({ field }) => (
                  <textarea
                    placeholder="Enter task"
                    className="bg-[#F5F5F5] resize-none px-2 py-2 pb-16 whitespace-normal w-100% w-full rounded-[8px] outline-none font-montserrat text-[15px] font-[500] "
                    {...field}
                  />
                )}
              />
              <span className="font-montserrat text-[15px] font-[500] text-red-500">
                {" "}
                {errors.task && errors.task.message}
              </span>
            </div>
            <div className="pt-2">
              <Controller
                name="project"
                control={control}
                defaultValue=""
                rules={{ required: "project is required" }}
                render={({ field }) => (
                  <select
                    className="w-full h-12 px-2  bg-[#F5F5F5] rounded-[8px] outline-none font-montserrat text-[15px] font-[500]"
                    {...field}
                  >
                    <option value="" disabled hidden>
                      Select Project
                    </option>

                    {projects &&
                      projects.map((project, index) => (
                        <option
                          className="font-montserrat text-[15px] font-[500] "
                          key={index}
                        >
                          {project?.project_name}
                        </option>
                      ))}
                  </select>
                )}
              />
              <span className="font-montserrat text-[15px] font-[500] text-red-500">
                {errors.project && errors.project.message}
              </span>
            </div>

            <Box
              pt={2}
              display={"flex"}
              flex={1}
              alignItems={"center"}
              justifyContent={"end"}
            >
              <Button
                sx={{
                  width: 95,
                  height: 44,
                  backgroundColor: "#F4F3FF",
                  color: "#6F6CFF",
                  "&:hover": {
                    backgroundColor: "#3730a3 !important",
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  width: 95,
                  height: 44,
                  backgroundColor: "#6F6CFF",
                  color: "#ffffff",
                  marginLeft: 2,
                  "&:hover": {
                    backgroundColor: "#3730a3 !important",
                  },
                }}
                type="submit"
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
