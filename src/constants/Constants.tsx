// import { useContext } from "react";
// import { GlobalContext } from "../context/GlobalContext";
   const today = new Date();
   export const tokenKey = "token";
   export const userKey='user';
export const formattedDate = today.toISOString().split('T')[0];
export const clockInStatusTokenKey='clockInStatusTokenKey'
export const localStorageToken = localStorage.getItem(tokenKey);
export const sessionStorageToken = sessionStorage.getItem(tokenKey);
export const jwtToken=localStorage.getItem(tokenKey)!==null?localStorage.getItem(tokenKey):sessionStorage.getItem(tokenKey)

export const toDoHistoryTabs=['Today','Yestarday','This week','This Month','All time']
export const todoStatusTabs=['Overdue','Inprogress','Completed']
export const tabs={Overdue:'Overdue',Inprogress:'Inprogress',Completed:'Completed'}
export const MarkCompleteCardContent={
   cardTitle:'Are You sure you want to complete this task ?',

   cardDescription:'This task will shifted to completed section.',
   cardButtonContent: 'Mark as completed',
   cardButton:'Complete Task'
}

export const DeleteCardContent={
   cardTitle:'Are You sure you want to Delete ?',

   cardDescription:'This task will shifted to deleted section .',
   cardButtonContent: 'Delete',
   cardButton:'Delete'
}
export const ClockOutCardContent={
   cardTitle:'Are You sure you want to Clockout ?',

   cardDescription:'You will be clocked out for today.',
   cardButtonContent: 'Clock Out',
   cardButton:'Clock Out'
}


