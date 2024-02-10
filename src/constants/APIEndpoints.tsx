import { formattedDate } from "./Constants";

export const Employee_Login = "http://104.237.6.253:4000/api/v1/auth/signin";
export const ProjectList = "http://104.237.6.253:4000/api/v1/project/";
export const ClockIn = "http://104.237.6.253:4000/api/v1/punch/punch/";
export const CreateTodo = "http://104.237.6.253:4000/api/v1/NewToDo/create";
export const GetToDoList = `http://104.237.6.253:4000/api/v1/NewToDo/taskListByDate?todo_date=${formattedDate}`;
export const deleteToDo =
  "http://104.237.6.253:4000/api/v1/NewToDo/delete?todo_id=";
export const updateTodo =
  "http://104.237.6.253:4000/api/v1/NewToDo/update?todo_id=";
export const checkClockInStatus =
  "http://104.237.6.253:4000/api/v1/punch/checkStatus";
export const getTimeSheet =
  "http://104.237.6.253:4000/api/v1/NewToDo/getByToDo?todo_id=";
export const AddTimeSheet =
  "http://104.237.6.253:4000/api/v1/timesheet/addTimesheet?todo_id=";


  export const MarkComplete =
  "http://104.237.6.253:4000/api/v1/NewToDo/updateStatus?ToDo_id=";
export const TimesheetDates =
  "http://104.237.6.253:4000/api/v1/punch/getDates?page=1&recordsPerPage=10&showAll=false";

export const GetToDoListonDate = `http://104.237.6.253:4000/api/v1/timesheet/getTimesheet/?page=1&recordsPerPage=20&showAll=false&date=`;
export const GetToDoListAll = `http://104.237.6.253:4000/api/v1/NewToDo/getTimesheet`;
export const DeleteTime = `http://104.237.6.253:4000/api/v1/timesheet/deleteTimesheet?timesheet_id=`
export const UpdateTime = `http://104.237.6.253:4000/api/v1/timesheet/updateTimesheet?timesheet_id=`;
export const NewGetTodoList=`http://104.237.6.253:4000/api/v1/NewToDo/taskList?format=`


// {{url}}/api/v1/timesheet/getTimesheet/?page=1&recordsPerPage=5&showAll=false&date 

// /api/v1/timesheet/getTimesheet/?page=1&recordsPerPage=10&showAll=false&date=2023-12-28
// export const NewGetTodoList = `http://104.237.6.253:4000/api/v1/NewToDo/taskList?format=`;
export const updateUser = "http://104.237.6.253:4000/api/v1/employee/updateEmp";
export const uploadFile = "http://104.237.6.253:4000/api/v1/public/fileUpload";
export const showingCounts = `http://104.237.6.253:4000/api/v1/NewToDo/taskList?format=1`;
export const UpdateTimesheet=`http://104.237.6.253:4000/api/v1/timesheet/updateTimesheet?timesheet_id=`
export const AddTimesheet=`http://104.237.6.253:4000/api/v1/timesheet/addTimesheet?timesheet_id=`
export const DeleteTimesheet=`http://104.237.6.253:4000/api/v1/timesheet/deleteTimesheet?timesheet_id=`