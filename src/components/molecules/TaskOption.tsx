import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import { deleteToDointerface, Todo } from "../../types/ApiSchema";
import { EmployeeContext } from "../../context/EmployeeContext";
import ApiServices from "../../services/APIServices";
import { toast } from "react-toastify";
const options = ["Edit", "Delete"];
interface taskOptionInterface {
  setClickedTodoOption: (option: string) => void;
  todo: Todo;
  setAddTaskClicked: (state: boolean) => void;
}
const ITEM_HEIGHT = 48;

export const TaskOption: React.FC<taskOptionInterface> = ({
  todo,
  setClickedTodoOption,
  setAddTaskClicked,
}) => {
  const { setSelectedTodo, setSelectedToDoOption } =
    useContext(EmployeeContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setTodoList, toDoList } = useContext(EmployeeContext);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOption = (option: string) => {
    if (option === "Delete") {
      setAddTaskClicked(false);
      setSelectedTodo(undefined);
      setSelectedToDoOption(option);
      ApiServices.deleteTodo(todo.ToDo_Id, (response: deleteToDointerface) => {
        if (response.statusCode === 200) {
          toast.success("Task deleted successfully");
          const updatedToDoList = toDoList?.filter(
            (item: Todo) => item.ToDo_Id !== todo.ToDo_Id
          );
          setTodoList(updatedToDoList);
        } else {
          toast.error(response?.message);
        }
      });
    } else {
      setSelectedToDoOption(option);
      setSelectedTodo(todo);
      setAddTaskClicked(true);
      setClickedTodoOption(option);

      handleClose();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleOption(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
