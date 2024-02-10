import moment from "moment";
import { Timesheet, Todo, projectInterface } from "../types/ApiSchema";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export class Utils {
  public static tokenKey = "token";
  public static userKey = "user";

  /**
   *
   * @param token
   * @param permanent
   */

  public static storeToken(token: string, permanent: boolean) {
    if (permanent) {
      window.localStorage.setItem(Utils.tokenKey, token);
      window.sessionStorage.removeItem(Utils.tokenKey);
    } else {
      window.sessionStorage.setItem(Utils.tokenKey, token);
      window.localStorage.removeItem(Utils.tokenKey);
    }
  }

  public static getToken() {
    if (window.localStorage.getItem("token")) {
      return window.localStorage.getItem("token");
    } else {
      return window.sessionStorage.getItem("token");
    }
  }

  /**
   *
   * @param email
   */
  // public static storeUser(email: string, token: string) {
  //   localStorage.setItem(this.tokenKey, token);
  // }

  public static getUserData() {
    const user = localStorage.getItem(this.userKey);
    const User = user ? JSON.parse(user) : null;
    return User;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static ConvertTime(time: any) {
    //

    const formatDate = (date: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      $y: any;
      $M: { toString: () => string };
      $D: { toString: () => string };
      $H: { toString: () => string };
      $m: { toString: () => string };
    }) => {
      const year = date.$y;
      const month = date.$M.toString().padStart(2, "0");
      const day = date.$D.toString().padStart(2, "0");
      const hours = date.$H.toString().padStart(2, "0");
      const minutes = date.$m.toString().padStart(2, "0");
      // const month = date?.$M?.toString().padStart(2, "0");
      // const day = date?.$D?.toString().padStart(2, "0");
      // const hours = date?.$H?.toString().padStart(2, "0");
      // const minutes = date?.$m?.toString().padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
    };

    const convertToIST = (utcTimeString: string) => {
      const utcTime = new Date(utcTimeString);
      const istTime = utcTime.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      return new Date(istTime).toISOString();
    };

    const startTime = formatDate(time[0]);
    const endTime = formatDate(time[1]);

    // Convert to Indian Standard Time (IST)
    const startTimeIST = convertToIST(startTime);
    const endTimeIST = convertToIST(endTime);

    const result = {
      start_time: startTimeIST,
      end_time: endTimeIST,
    };
    return result;
  }

  public static calculateTotalTime = (timesheets: Timesheet[]) => {
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

  public static ConvertTimeToTime(
    start: string | number | Date,
    end: string | number | Date
  ) {
    function convertTimeToAMPM(isoTime: string | number | Date) {
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC", // Set to UTC or your desired time zone
      };

      return new Date(isoTime).toLocaleTimeString("en-US", options);
    }

    const formattedStartTime = convertTimeToAMPM(start);
    const formattedEndTime = convertTimeToAMPM(end);

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  public static Logout = () => {
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  public static getProjectId = (
    projectName: string,
    projects: projectInterface[]
  ) => {
    const project = projects?.filter(
      (project) => project.project_name === projectName
    );

    return project[0]?.project_id;
  };

  public static isTimesheetAdded(todolist: Todo[]) {
    const result = todolist.every((todo) => todo?.timesheets?.length === 0);
    return result;
  }

  public static getTodoStatusTabs() {
    const todoStatusTabs = ["Overdue", "Inprogress", "Completed"];
    return todoStatusTabs;
  }

  public static getTodothistoryTabParameter(tab: string) {
    if (tab === "Today") {
      return 1;
    }
    if (tab == "Yestarday") {
      return 2;
    }
    if (tab == "This week") {
      return 3;
    }
  }

  public static filterTimesheetBySameTodoId = (timesheets: any) => {
    const filteredTimesheets = timesheets.filter(timesheet => timesheet?.ToDo_Id !== null);
    const groupedByToDoId = filteredTimesheets.reduce((acc: any, timesheet: any) => {
      const todoId = timesheet.ToDo_Id.ToDo_Id;
      const timesheetId = timesheet.timesheet_id;
      
      
      if (!acc[todoId]) {
        acc[todoId] = {
          task: timesheet.ToDo_Id.Task,
          taskStatus: timesheet?.ToDo_Id?.Task_Status,
          todoDate: timesheet.ToDo_Id.ToDo_Date,
          timesheet: [],
          
        };
      }


      acc[todoId].timesheet.push({
        timesheetId,
        start_time: timesheet.start_time,
        end_time: timesheet.end_time,
        created_at:timesheet.t_Date,
       

      });

      return acc;
    }, {})
    
    // Transform the grouped data into the desired output format
    const output = Object.entries(groupedByToDoId).map(([todoId, { task, taskStatus, timesheet,todoDate   }]) => ({
      todoId,
      task,
      taskStatus,
      timesheet,
        todoDate
    })) 
    return output
  }

  }





