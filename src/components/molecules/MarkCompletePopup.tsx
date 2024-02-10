import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TodoListResponse, {
  MarkTaskInterface,
  Task,
  Todo,
  clockInResponseInterface,
  deleteToDointerface,
} from "../../types/ApiSchema";
import Title from "../../Atoms/Title";
import Description from "../../Atoms/Description";
import ApiServices from "../../services/APIServices";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../context/EmployeeContext";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Typography } from "@mui/material";
import { GlobalContext } from "../../context/GlobalContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useContext } from "react";
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

interface cardContent {
  cardTitle: string;
  cardDescription: string;
  cardButton: string;
  cardButtonContent: string;
}

interface props {
  todo?: Task;
  content: cardContent;
}

const MarkCompletePopup: React.FC<props> = ({ todo, content }) => {
  const [open, setOpen] = React.useState(false);
  const { refreshTodoList, setRefreshTodoList } = useContext(EmployeeContext);

  const [aciveAction, setActiveAction] = useState<string | undefined>(
    undefined
  );
  const { toDoList, setTodoList } = React.useContext(EmployeeContext);
  const { isDrawerTrue, setDrawer, setClockIn } =
    React.useContext(GlobalContext);
  const handleOnClick = () => {
    setOpen(true);

    setActiveAction(content?.cardButton);
  };

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleMarkCompleteTask = () => {
    setLoading(true);

    if (aciveAction === "Complete Task") {
      if (todo) {
        ApiServices.MarkTodoComplete(
          todo?.ToDo_Id,
          (response: MarkTaskInterface) => {
            setOpen(false);
            if (response.statusCode === 200) {
              toast.success(response.message);
              setRefreshTodoList(!refreshTodoList);
              ApiServices.getToDoList((response: TodoListResponse) => {
                if (response.data.Todo) {
                  setTodoList(response.data.Todo);
                } else {
                  toast(response.message);
                  setTodoList([]);
                }
              });
            } else {
              toast.error(response.message);
              setOpen(false);
            }
            //
            setLoading(false);
          }
        );
      }
    } else if (aciveAction === "Delete") {
      if (todo) {
        ApiServices.deleteTodo(
          todo?.ToDo_Id,
          (response: deleteToDointerface) => {
            if (response.statusCode === 200) {
              setLoading(false);
              setRefreshTodoList(!refreshTodoList);
              toast.success("Task deleted successfully");
              const updatedToDoList = toDoList?.filter(
                (item: Todo) => item.ToDo_Id !== todo?.ToDo_Id
              );
              setTodoList(updatedToDoList);
              setOpen(false);
            } else {
              toast.error(response.message);
              setOpen(false);
            }

            setLoading(false);
          }
        );
      }
    } else if (aciveAction === "Clock Out") {
      ApiServices.clockIn((response: clockInResponseInterface) => {
        if (response.statusCode === 201) {
          toast.success(response.message);
          setDrawer(!isDrawerTrue);
          setClockIn("1");
        } else {
          toast.error(response.message);
        }
        setLoading(false);
        setOpen(false);
      });
    }
  };

  const handlePopupClose = () => {
    setOpen(false);
  };
  const getValue = (value: string) => {
    switch (value) {
      case "Delete":
        return (
          <button
            onClick={handleOnClick}
            className="font-montserrat text-[#7A797C] text-[15px] pl-0"
          >
            {content?.cardButtonContent}
          </button>
        );

      case "Complete Task":
        return todo && todo?.Task_Status === "2" ? (
          <Box display={"flex"} alignItems={"center"}>
            <CheckCircleOutlineIcon style={{ fontSize: 16, color: "green" }} />{" "}
            <span className="text-[#7A797C] text-[13px] ml-2 ">Completed</span>
          </Box>
        ) : (
          <Box display={"flex"} alignItems={"center"}>
            <button
              onClick={handleOnClick}
              className="flex  font-montserrat text-[#7A797C] text-[13px] pl-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginRight: 2 }}
              >
                <g opacity="0.5">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.105 4.16496C13.3821 4.40741 13.4102 4.82859 13.1677 5.10568L7.33441 11.7723C7.09285 12.0484 6.67365 12.0775 6.39632 11.8374L2.89632 8.80705C2.61797 8.56605 2.58768 8.14502 2.82868 7.86667C3.06969 7.58831 3.49071 7.55803 3.76906 7.79903L6.76769 10.3952L12.1643 4.22767C12.4068 3.95058 12.8279 3.9225 13.105 4.16496Z"
                    fill="black"
                  />
                </g>
              </svg>
              <span>{content?.cardButtonContent}</span>
            </button>
          </Box>
        );

      case "Clock Out":
        return (
          <Box px={2} flex={1} display={"flex"} alignItems={"end"}>
            <Button
              onClick={handleOnClick}
              disabled={isLoading ? true : false}
              // onClick={HandleClockIn}
              // startIcon={<RiTimerFlashLine />}
              size="small"
              style={{ backgroundColor: "#FF7A7A", color: "white" }}
              sx={{
                "&:hover": {
                  backgroundColor: "#ef4444 !important",
                },
              }}
              fullWidth
            >
              <Typography fontFamily="Montserrat ">
                {isLoading ? "Please Wait ..." : "Clock Out"}
              </Typography>
            </Button>
          </Box>
        );

      default:
        return null; // Or return some default JSX or nothing based on your logic
    }
  };

  return (
    <div>
      {getValue(content?.cardButton)}

      <Modal
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
            <Box display={"flex"} marginBottom={2} justifyContent={"center"}>
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
          <Title textAlign="center">{content?.cardTitle}</Title>
          <Box textAlign={"center"}>
            <Description>{content?.cardDescription}</Description>
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
            {isLoading ? "Please Wait ..." : content?.cardButton}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MarkCompletePopup;
