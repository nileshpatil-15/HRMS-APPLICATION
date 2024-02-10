export interface UserData {
  firstName: string;
  lastName: string;
  userName: string;
  emp_position: string;
  profilePic: string | null;
}

export interface AuthData {
  user: UserData;
  accessToken: string;
  refreshToken: string;
}
export interface signInApiInterface {
  statusCode: number;
  message: string;
  data: AuthData;
  error?: string;
}

export interface eachTodoInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project_id: any;
  Emp_id: string;
  Project_id: string;
  Task: string;
  Task_Status: string;
  ToDo_Date: string;
  ToDo_Id: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface todoListInterface {
  statusCode: number;
  message: string;
  data: [] | undefined;
}

export interface clockInResponseInterface {
  statusCode: number;
}

export interface clockInResponseInterface {
  statusCode: number;
  message: string;
  data?: {
    Entry_Type?: string;
    Entry_Date?: string;
    Entry_Status?: string;
    Emp_id?: string;
    Punch_In?: string;
    deletedAt?: string | null;
    entry_id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface projectInterface {
  project_id: string;
  project_name: string;
  description: string;
  project_Manager: string;
  client_id: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface ProjectListInterface {
  project_id: string;
  project_name: string;
  description: string;
  project_Manager: string;
  client_id: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface deleteToDointerface {
  statusCode: number;
  message: string;
  data: {
    ToDo_Id: string;
    Emp_id: string;
    ToDo_Date: string;
    Task: string;
    Project_id: string;
    Task_Status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
}

interface ToDoData {
  ToDo_Id: string;
  Emp_id: string;
  ToDo_Date: string;
  Task: string;
  Project_id: string;
  Task_Status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface updateToDoInterface {
  statusCode: number;
  message: string;
  data: ToDoData[];
}
export interface checkClockInStatusInterface {
  statusCode: number;
  message: string;
  data: {
    punchStatusEntry: string;
  };
}

export interface projectInterface {
  project_id: string;
  project_name: string;
  description: string;
  project_Manager: string;
  client_id: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface getProjectsApiInterface {
  statusCode: number;
  message: string;
  data: projectInterface[] | undefined;
}

export interface TodoListResponse {
  statusCode: number;
  message: string;
  data: {
    count: number;
    Todo: Todo[];
  };
}

export default TodoListResponse;

export interface TimeConversion {
  start_time: string;
  end_time: string;
}

export interface MarkTaskInterface {
  statusCode: number;
  message: string;
  data: {
    ToDo_Id: string;
    Emp_id: string;
    ToDo_Date: string;
    Task: string;
    Task_Status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}
interface TimesheetEntry {
  start_time: string;
  end_time: string;
  total_time: string;
  createdAt: string;
}

export interface TimesheetData {
  timeSheet(timeSheet: any): unknown;
  Today: TimesheetEntry[];
  Previous: TimesheetEntry[];
}

export interface timesheetInterface {
  statusCode: number;
  data: {
    Task: string;
    status: string;
    timesheet: TimesheetData;
  };
}

export interface addTimesheetResponseInterface {
  statusCode: number;
  message: string;
  data: {
    start_time: string;
    end_time: string;
    total_time: string;
    ToDo_Id: string;
    deletedAt: null | string;
    timesheet_id: string;
    createdAt: string;
    updatedAt: string;
  };
}
export interface ScheduleItemInterface {
  time: string;
}

export interface ActivityInterface {
  title: string;
  duration: string;
  schedule: ScheduleItemInterface[];
  isCompleted?: boolean;
}

export interface ClockinEntryInterface {
  date: string;
  duration: string;
  activities: ActivityInterface[];
}

export interface ClockIn {
  Entry_Date: string;
  Total_hours: string;
}

export interface RecentClockInsResponse {
  statusCode: number;
  message: string;
  data: {
    RecentClockIns: ClockIn[];
  };
}

export interface TodoByDate {
  ToDo_Id: string;
  ToDo_Date: string;
  Task: string;
  Task_Status: string;
  timesheets: Timesheet[]; // You might want to replace 'any' with a specific type for timesheets
  project_id: Project | null;
}

export interface Project {
  project_id: string;
  project_name: string;
}
export interface Timesheet {
  [x: string]: string;
  start_time: string;
  end_time: string;
  total_time: string;
}
export interface Todo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedTodo: any;
  length: number;
  ToDo_Id: string;
  ToDo_Date: string;
  Task: string;
  createdAt: string;
  timesheets: Timesheet[];
  project_id: Project | null;
  Task_Status: string;
}
export interface Data {
  ToDoList(ToDoList: any): unknown;
  months: number;
  records: Todo[];
}

export interface ApiResponse {
  statusCode: number;
  message: string;
  data: Data;
}
export interface TodoRecords {
  statusCode: number;
  message: string;
  data: Data;
}

export interface TaskListResponse {
  statusCode: number;
  message: string;
  data: {
    count: {
      inProgressCount: number;
      CompleteCount: number;
      overDueCount: number;
    };
    Inprogress: Task[];
    Completed: Task[];
    Overdue: Task[];
  };
}

export interface Task {
  ToDo_Id: string;
  ToDo_Date: string;
  Task: string;
  Task_Status: string;
  timesheets: any[]; // Replace 'any[]' with the actual type if available
  project_id: {
    project_id: string;
    project_name: string;
  };
}

export interface TaskListData {
  count: {
    inProgressCount: number;
    CompleteCount: number;
    overDueCount: number;
  };
  Inprogress?: Task[];
  Completed?: Task[];
  Overdue?: Task[];
}

export interface days {
  entry_date: string;
  total_hours: string;
}

export interface getTimesheetDatesInterface {
  statusCode: number;
  message: string;
  data: {
    count: number;
    days: days[];
  };
  meta: {
    page: string;
    recordsPerPage: string;
    showAll: string;
  };
}

// export interface timesheetDetail{

//       timesheet_id: string;
//       start_time: string;
//       end_time: string;
//       total_time: string;
//       t_Date: string;
//       ToDo_Id: {
//         ToDo_Id: string;
//         ToDo_Date: string;
//         Task: string;
//         Task_Status: string;
//         project_id: { project_id: string; project_name: string };
//       }

//   }

export interface timesheetDetailsInterface {
  statusCode: number;
  message: string;
  
  data: {
    count: number;
    Timesheet: timesheetDetail[];
  };
  meta: { page: string; recordsPerPage: string; showAll: string };
}
export interface timesheet {
   start_time: string; end_time: string; todoId: string ,
   created_at:string;
   timesheetId:string;
}

export interface timesheetDetail { task: string;taskStatus:string; todoDate:string, timesheet: timesheet[]; todoId?: string }[]

