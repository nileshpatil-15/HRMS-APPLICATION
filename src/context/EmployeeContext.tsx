import React, { createContext, useState, ReactNode } from "react";
import { Task, TaskListData, Todo, TodoByDate, days } from "../types/ApiSchema";
import moment from "moment";

export interface EmployeeContextInterface {
  isOk: boolean;
  setok?: (isOk: boolean) => void;
  toDoList: Todo[];
  setTodoList: (toDoList: Todo[]) => void;
  selectedTodo: Task | undefined;
  setSelectedTodo: (todo: Task | undefined) => void;
  selectedToDoOption: string | undefined;
  setSelectedToDoOption: (selectedToDoOption: string | undefined) => void;
  MarkCompletePopup: boolean;
  setMarkCompletePopup: (MarkCompletePopup: boolean) => void;
  addTimeClicked: boolean;
  setAddTimeClicked: (addTimeClicked: boolean) => void;
  toDoListByDate: TodoByDate[];
  setTodoListByDate: (toDoListByDate: TodoByDate[]) => void;
  todoFetching: boolean;
  setTodoFetching: (todoFetching: boolean) => void;
  TodoList: TaskListData | null;
  setToDoList: (Todo: TaskListData | null) => void;
  refreshTodoList: boolean;
  setRefreshTodoList: (refreshTodoList: boolean) => void;
  timeSheetDate:string;
  setSelectedTimeesheetDate:(timeSheetDate:string)=>void;
timesheetDates:days[],
setTimesheetDates:(setTimesheetDates:days[])=>void
refreshTimesheetList:boolean
setRefreshTimesheetList: (refreshTimesheetList: boolean) => void;
}

export const EmployeeContext = createContext<EmployeeContextInterface>(
  {} as EmployeeContextInterface
);

type EmployeeContextProviderProps = {
  children: ReactNode;
};

export const EmployeeContextProvider: React.FC<
  EmployeeContextProviderProps
> = ({ children }) => {
  const [isOk] = useState<boolean>(false);
  const [toDoList, setTodoList] = useState<Todo[]>([]);
  const [toDoListByDate, setTodoListByDate] = useState<TodoByDate[]>([]);
  const [MarkCompletePopup, setMarkCompletePopup] = useState<boolean>(false);
  const [addTimeClicked, setAddTimeClicked] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Task | undefined>(
    {} as Todo
  );
  const [timesheetDates, setTimesheetDates] = useState<days[]>([]);

  const [todoFetching, setTodoFetching] = useState<boolean>(true);
  const [TodoList, setToDoList] = useState<TaskListData | null>(
    {} as TaskListData
  );
  const [timeSheetDate,setSelectedTimeesheetDate]=useState<string>(timesheetDates.length>0 ? timesheetDates[0].entry_date: moment().format('YYYY-MM-DD'))

  const [selectedToDoOption, setSelectedToDoOption] = useState<
    string | undefined
  >();

  const [refreshTodoList, setRefreshTodoList] = useState<boolean>(false);
  const [refreshTimesheetList, setRefreshTimesheetList] = useState<boolean>(false);

  return (
    <EmployeeContext.Provider
      value={{
        TodoList,
        setToDoList,
        isOk,
        toDoList,
        setTodoList,
        selectedTodo,
        setSelectedTodo,
        setSelectedToDoOption,
        selectedToDoOption,
        MarkCompletePopup,
        setMarkCompletePopup,
        addTimeClicked,
        setAddTimeClicked,
        todoFetching,
        setTodoFetching,
        toDoListByDate,
        setTodoListByDate,
        refreshTodoList,
        setRefreshTodoList,
        setSelectedTimeesheetDate,
        timeSheetDate,
        setTimesheetDates,
        timesheetDates,
        refreshTimesheetList,
        setRefreshTimesheetList

      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
