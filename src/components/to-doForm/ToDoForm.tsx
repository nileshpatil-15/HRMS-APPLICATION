import React, { useContext, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ApiServices from "../../services/APIServices";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../context/EmployeeContext";
import TodoListResponse, {
  projectInterface,
  updateToDoInterface,
  Todo,
} from "../../types/ApiSchema";
import ToDoList from "../TodoList/TodoList";
import { Typography } from "@mui/material";
import { GlobalContext } from "../../context/GlobalContext";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Utils } from "../../services/Utils";
interface FormInput {
  task: string;
  project: string;
}

export interface createToDoResponseInterface {
  statusCode: number;
  message: string;
}

interface propsInterface {
  projects: projectInterface[] | undefined;
  setAddTaskClicked: (state: boolean) => void;
  selectedTodo: Todo | undefined;
}

const ToDoForm: React.FC<propsInterface> = ({
  setAddTaskClicked,
  selectedTodo,
}) => {
  const { setTodoList, selectedToDoOption } = useContext(EmployeeContext);
  const { setSelectedTodo } = useContext(EmployeeContext);
  const { projects } = useContext(GlobalContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const project_id = Utils.getProjectId(data.project, projects);
    const todoId = selectedTodo?.ToDo_Id;
    if (selectedToDoOption === "Edit") {
      ApiServices.updateTodo(
        data.task,
        todoId ? todoId : "",
        project_id,
        (response: updateToDoInterface) => {
          if (response.statusCode === 200) {
            setAddTaskClicked(false);
            setSelectedTodo(undefined);
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        }
      );
    } else {
      ApiServices.createToDo(
        data.task,
        project_id,
        (response: createToDoResponseInterface) => {
          if (response.statusCode === 201) {
            setAddTaskClicked(false);

            ApiServices.getToDoList((response: TodoListResponse) => {
              if (response.data.Todo) {
                setTodoList(response.data.Todo);
              } else {
                // Handle the case where updatedListResponse or updatedListResponse.data is undefined
                // Set an appropriate default value for your application
                toast("Something went Wrong !");
                setTodoList([]);
              }
            });
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        }
      );
    }
  };

  const handleCancel = () => {
    setAddTaskClicked(false);
    setSelectedTodo(undefined);
  };

  useEffect(() => {
    ApiServices.getToDoList((response: TodoListResponse) => {
      if (response.data.Todo) {
        setTodoList(response.data.Todo);
      } else {
        // Handle the case where updatedListResponse or updatedListResponse.data is undefined
        // Set an appropriate default value for your application
        toast.error("Something went Wrong !");
        setTodoList([]);
      }
    });
  }, [setTodoList]);

  // const textOnly = text.replace(/<[^>]*>/g, '');
  const removeHtmlTags = (htmlString: string) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="px-6 py-2 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="task"
          control={control}
          defaultValue={
            selectedTodo && ToDoList.length > 0 ? selectedTodo.Task : undefined
          }
          rules={{ required: "Please enter task" }}
          render={({ field }) => (
            <TextField
              fullWidth
              value={field.value}
              onChange={(content, delta, source, editor) => {
                field.onChange(content);
              }}
              placeholder="Please enter Task"
            />
          )}
        />
        <div className="mb-4">
          <Controller
            name="project"
            control={control}
            defaultValue={
              selectedTodo && ToDoList.length > 0
                ? selectedTodo?.project_id?.project_name
                : undefined
            }
            rules={{ required: "Please select project" }}
            render={({ field }) => (
              <Autocomplete
                sx={{
                  marginTop: "15px",
                  "& .MuiAutocomplete-inputRoot": {
                    borderRadius: 2,
                    backgroundColor: "#F5F5F5",
                    color: "#000000",
                    fontWeight: "600",
                  },
                }}
                options={(projects ?? [])
                  .map((project) => project.project_name)
                  .filter(Boolean)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Project"
                    fullWidth
                    size="small"
                    error={!!errors.project}
                    helperText={errors.project?.message}
                    style={{ borderRadius: 2 }}
                  />
                )}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
              />
            )}
          />
        </div>
        <div>
          {selectedToDoOption === "Edit" ? (
            <Button
              sx={{
                width: "90px",
                "&:hover": {
                  backgroundColor: "#3730a3 !important",
                },
              }}
              size="small"
              type="submit"
              color="primary"
            >
              <Typography fontSize="14px" fontFamily="Montserrat">
                Update
              </Typography>
            </Button>
          ) : (
            <Button
              sx={{
                width: "90px",
                "&:hover": {
                  backgroundColor: "#3730a3 !important",
                },
              }}
              size="small"
              type="submit"
              color="primary"
            >
              <Typography fontSize="14px" fontFamily="Montserrat">
                Save
              </Typography>
            </Button>
          )}

          <Button
            onClick={handleCancel}
            size="small"
            sx={{
              width: "90px",
              backgroundColor: "#f3e8ff",
              color: "#5B5FC7",
              marginLeft: "20px",
              "&:hover": {
                backgroundColor: "#3730a3 !important",
              },
            }}
            color={"primary"}
          >
            <Typography fontSize="14px" fontFamily="Montserrat">
              Cancel
            </Typography>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ToDoForm;
