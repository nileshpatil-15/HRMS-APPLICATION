import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { Box } from '@mui/material';

import moment from 'moment';
import ApiServices from '../../services/APIServices';
import { toast } from 'react-toastify';
import { EmployeeContext } from '../../context/EmployeeContext';
interface props{
  selectedTimesheetTodo:string|undefined
  setSelectedTimesheetTodo:(state:string|undefined)=>void
  selectedEditTimesheet:({startTime:string|null,endTime:string|null,timesheetId:string|null,todoId:string|null})
  setSelectedEditTimesheet:(selectedEditTimesheet:{startTime:string|null,endTime:string|null,timesheetId:string|null,todoId:string|null})=>void
} 

const Timepicker:React.FC<props>=({setSelectedTimesheetTodo,selectedEditTimesheet,setSelectedEditTimesheet,selectedTimesheetTodo})=> {
  const [from, setFrom] = React.useState<Dayjs|null >(dayjs())
  const [to, setTo] = React.useState<Dayjs |null>(dayjs()) 
  const {setRefreshTimesheetList,refreshTimesheetList}=React.useContext(EmployeeContext)  



console.log(selectedTimesheetTodo,selectedEditTimesheet?.timesheetId,'ok')

// const handleOnchangeFrom=(newValue)=>{
//   const formattedUtcTime = newValue.$d.toISOString().replace(/\.\d{3}Z$/, 'Z');
  

// }
// const handleOnchangeFrom=(newValue)=>{
//   const formattedUtcTime = newValue.$d.toISOString().replace(/\.\d{3}Z$/, 'Z');
  

// }
// console.log(from && from.toDate().toISOString().replace(/\.\d{3}Z$/, 'Z'));

const handleSubmit=()=>{

  if(selectedEditTimesheet?.timesheetId!==null){
   
 ApiServices.EditTimesheet(selectedEditTimesheet?.timesheetId,from,to,(response:any)=>{
  if(response.statusCode===200){
    toast.success(response.message)
    setSelectedEditTimesheet({startTime:null,endTime:null,timesheetId:null,todoId:null})
    setSelectedTimesheetTodo(undefined)
    setRefreshTimesheetList(!refreshTimesheetList)
    setFrom(null)
    setTo(null)

  }
  else{
    toast.error(response.message)
  }
})

  }
  else{
    ApiServices.AddTimesheet(selectedTimesheetTodo,from,to,(response:any)=>{

      if(response.statusCode===201){
        toast.success(response.message)
        setSelectedTimesheetTodo(undefined)
        setRefreshTimesheetList(!refreshTimesheetList)
        setFrom(null)
        setTo(null)
      }
      else{
        toast.error(response.message)
      }
    })
  }

}


console.log((from))


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['TimePicker', 'TimePicker']}>
        <Box display={'flex'} gap={'10px'} sx={{width:'70%'}} alignItems={'center'}>
        <DesktopTimePicker
          label="From"
          value={selectedEditTimesheet?.startTime?(dayjs(selectedEditTimesheet?.startTime)):from}
          onChange={(newValue) => setFrom(newValue)}
          slotProps={{ textField: { size: 'small' } }}
          sx={{ width: '40% ! important' }} 
        />
        <DesktopTimePicker
          label="To"
          value={selectedEditTimesheet?.startTime?(dayjs(selectedEditTimesheet?.endTime)):to}
          
          onChange={(newValue) => setTo(newValue)}
          slotProps={{ textField: { size: 'small' } }}
          sx={{ width: '40% ! important' }} // Set the desired width
        />
        </Box>
        <button onClick={handleSubmit} className='rounded-full bg-[#6F6CFF] outline-none rounded-50% p-2  w-10 h-10    text-white'> <CheckIcon/></button>
        <button onClick={()=>setSelectedTimesheetTodo(undefined)}  className='rounded-full bg-[#ddd6fe] rounded-50% p-2 w-10 h-10    '> <ClearIcon/> </button>
       

      </DemoContainer>
    </LocalizationProvider>
  );
}






export default Timepicker