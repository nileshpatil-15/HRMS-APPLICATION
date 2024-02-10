import { toast } from "react-toastify";
import {
  CreateTodo,
  Employee_Login,
  GetToDoList,
  deleteToDo,
  updateTodo,
  checkClockInStatus,
  AddTimeSheet,
  MarkComplete,
  getTimeSheet,
  // GetClockinList,
  GetToDoListonDate,
  DeleteTime,
  UpdateTime,
  NewGetTodoList,
  TimesheetDates,
  uploadFile,
  updateUser,
  showingCounts,
  UpdateTimesheet,
  DeleteTimesheet

  
} from "../constants/APIEndpoints";
import { ProjectList } from "../constants/APIEndpoints";
import { Utils } from "./Utils";
import { TimeConversion, UploadResponse } from "../types/ApiSchema";
import { ClockIn } from "../constants/APIEndpoints";
// import { GlobalContext } from "../context/GlobalContext";
// import { useContext } from "react";
export default class ApiServices {
  public static tokenKey = "token";

  static login = async (
    email: string,
    password: string,
    rememberMe: boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    next: Function
  ) => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    try {
      const response = await fetch(Employee_Login, {
        method: "POST",
        headers: myHeader,
        body: JSON.stringify({
          officialEmail: email,
          password: password,
        }),
      });

      const result = await response.json();
      if (result.statusCode === 201) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  static getProjectList = async (next: Function) => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    try {
      let token;
      if (localStorage.getItem(this.tokenKey) !== null) {
        token = localStorage.getItem(this.tokenKey);
      } else {
        token = sessionStorage.getItem(this.tokenKey);
      }
      const response = await fetch(ProjectList, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast(errorData.message);
      }
      const result = await response.json();

      if (result.statusCode === 200) {
        next(result);
      } else {
        toast(result.message);
      }
      // next(result);
    } catch (err) {
      next(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  static clockIn = async (next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }
    try {
      const response = await fetch(ClockIn, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Entry_Type: "Office",
        }),
      });

      const result = await response.json();

      if (result.statusCode === 201) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  static createToDo = async (task: string, project: string, next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }

    try {
      const response = await fetch(CreateTodo, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Task: task,
          project_id: project,
        }),
      });
      const result = await response.json();
      if (result.statusCode === 201) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      toast.error("Something went wrong !");
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  static getToDoList = async (next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }
    try {
      const response = await fetch(GetToDoList, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.statusCode === 200) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      next(err);
    }
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  static deleteTodo = async (todoId: string, next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }

    try {
      const response = await fetch(deleteToDo + todoId, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      next(err);
    }
  };
  static updateTodo = async (
    todo: string,
    TodoId: string,
    project_id: string | undefined,
    // eslint-disable-next-line @typescript-eslint/ban-types
    next: Function
  ) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }

    try {
      const response = await fetch(updateTodo + TodoId, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Task: todo,
          project_id,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        next(result);
      } else if (result.statusCode === 200) {
        next(result);
      } else next(result);
    } catch (err) {
      next(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  static checkClockInStatus = async (next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }

    try {
      const response = await fetch(checkClockInStatus, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok) {
        next(result);
      } else if (result.statusCode === 200) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      next(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
  static addTimesheet = async (
    toDoId: string,
    time: TimeConversion,
    // eslint-disable-next-line @typescript-eslint/ban-types
    next: Function
  ) => {
    // console.log(time.end_time,'add')
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }

    try {
      const response = await fetch(AddTimeSheet + toDoId, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_time: time.start_time,
          end_time: time.end_time,
        }),
      });
      const result = await response.json();
      if (result.statusCode === 201) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      next(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types

  // eslint-disable-next-line @typescript-eslint/ban-types
  static MarkTodoComplete = async (todoId: string, next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }
    try {
      const response = await fetch(MarkComplete + todoId, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.statusCode === 200) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      next(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  static getTimeSheet = async (todoId: string, next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }
    try {
      const response = await fetch(getTimeSheet + todoId, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.statusCode === 200) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      next(err);
    }
  };
  //Recent clockIn List
  // eslint-disable-next-line @typescript-eslint/ban-types
  static getTimesheetDates = async (next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }
    try {
      const response = await fetch(TimesheetDates, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.statusCode === 200) {
        next(result);
      } else {
        toast(result);
      }
    } catch (err) {
      next(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  static getTimeSheetDetails = async (date: string, next: Function) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }
    try {
      const response = await fetch(GetToDoListonDate +`${date}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.statusCode === 200) {
        next(result);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      next(err);
    }
  }

  

  // eslint-disable-next-line @typescript-eslint/ban-types
  static DeleteTime = async (
    timesheet_Id: string,
    timeIndex: number,
    next: Function
  ) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }
    try {
      const response = await fetch(DeleteTime + timesheet_Id, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timesheet_Id, timeIndex }),
      });

      const result = await response.json();
      if (result.statusCode === 200) {
        next(result);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      next(err);
    }
  };
  static updateTime = async (
    todo: string,
    timesheet_Id: string,
    project_id: string | undefined,
    // eslint-disable-next-line @typescript-eslint/ban-types
    next: Function
  ) => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }

    try {
      const response = await fetch(UpdateTime + timesheet_Id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Task: todo,
          project_id,
          timesheet_Id,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        next(result);
      } else if (result.statusCode === 200) {
        next(result);
      } else next(result);
    } catch (err) {
      next(err);
    }
  };

  static getNewTodoList=async (tab: number| undefined,next:Function)=>{

    try{
      let token;
      if (localStorage.getItem(this.tokenKey) !== null) {
        token = localStorage.getItem(this.tokenKey);
      } else {
        token = sessionStorage.getItem(this.tokenKey);
      }

      const response=await fetch(NewGetTodoList+tab,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }) 
      

      
      const result=await response.json()
if(result.statusCode===200){
  next(result)
}
else{
  next(result)
}
    }
    catch(err){
     toast.error('something went wrong');
      
    }
   }

   static updateUserProfile = async (
    filePath: string
  ): Promise<UploadResponse> => {
    let token;
    if (localStorage.getItem(this.tokenKey) !== null) {
      token = localStorage.getItem(this.tokenKey);
    } else {
      token = sessionStorage.getItem(this.tokenKey);
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(updateUser, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePic: filePath,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw result; // Throw an error to be caught in the catch block
      } else if (result.statusCode === 200) {
        return result; // Return the result in case of success
      } else {
        throw result; // Throw an error in case of non-200 status code
      }
    } catch (err) {
      throw err; 
    }
  };

  // for uploading file
  static uploadfile = async (filePath: File) => {
    return new Promise<UploadResponse>(async (resolve, reject) => {
      let token;
      if (localStorage.getItem(this.tokenKey) !== null) {
        token = localStorage.getItem(this.tokenKey);
      } else {
        token = sessionStorage.getItem(this.tokenKey);
      }

      try {
        const formData = new FormData();
        formData.append("file", filePath);

        const response = await fetch(uploadFile, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        });

        const result = await response.json();
        if (!response.ok) {
          reject(result);
        } else if (result.statusCode === 201) {
          resolve(result);
        } else {
          reject(result);
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  //shoeing count of progress ,overdue
  static showCount = async (next: Function) => {
    try {
      let token;
      if (localStorage.getItem(this.tokenKey) !== null) {
        token = localStorage.getItem(this.tokenKey);
      } else {
        token = sessionStorage.getItem(this.tokenKey);
      }

      const response = await fetch(showingCounts, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
  console.log("responformat1",{...response})
      const result = await response.json();
      if (result.statusCode === 200) {
        next(result);
      } else {
        next(result);
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };


  static EditTimesheet=async (timesheetId,start,end,next:Function)=>{
    console.log(timesheetId,start,end)
    try{
      let token;
      if (localStorage.getItem(this.tokenKey) !== null) {
        token = localStorage.getItem(this.tokenKey);
      } else {
        token = sessionStorage.getItem(this.tokenKey);
      }
      console.log(UpdateTimesheet+timesheetId) 

      const response=await fetch(UpdateTimesheet+timesheetId,{
        method:'PUT', 
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      start_time:start,
      end_time:end,

        }),
      }) 
      console.log(UpdateTimesheet+timesheetId) 
      
      

      
      const result=await response.json()
if(result.statusCode===200){
  next(result)
}
else{
  next(result)
}
    }
    catch(err){
     toast.error('something went wrong');
      
    }
   }
   static AddTimesheet=async (todoId,start,end,next:Function)=>{
    alert(start)
    try{
      let token;
      if (localStorage.getItem(this.tokenKey) !== null) {
        token = localStorage.getItem(this.tokenKey);
      } else {
        token = sessionStorage.getItem(this.tokenKey);
      }
      console.log(UpdateTimesheet+todoId) 

      const response=await fetch(AddTimeSheet+todoId,{
        method:'POST', 
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      start_time:start,
      end_time:end,

        }),
      }) 
    
      
      

      
      const result=await response.json()
if(result.statusCode===201){
  next(result)
}
else{
  next(result)
}
    }
    catch(err){
     toast.error('something went wrong');
      
    }
   }
   static DeleteTimesheet=async(timesheetId:string,next:Function)=>{
    try{
      let token;
      if (localStorage.getItem(this.tokenKey) !== null) {
        token = localStorage.getItem(this.tokenKey);
      } else {
        token = sessionStorage.getItem(this.tokenKey);
      }
      // console.log(UpdateTimesheet+timesheetId) 

      const response=await fetch(DeleteTimesheet+timesheetId,{
        method:'PATCH', 
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
     
      }) 
      const result=await response.json()
if(result.statusCode===201){
  next(result)
}
else{
  next(result)
}
    }
    catch(err){
     toast.error('something went wrong');
      
    }
   }
  }

