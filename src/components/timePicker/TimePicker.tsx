import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";

interface BasicTimeRangeFieldProps {
  setTimeSheetTime: (time: typeof Dayjs |null) => void;
}

const BasicTimeRangeField: React.FC<BasicTimeRangeFieldProps> = (props) => {
  const {setTimeSheetTime} = props

  const handleTimeRangeChange = (newValue:typeof Dayjs) => {
    // setSelectedValue(newValue);
    
 
    setTimeSheetTime(newValue);
 
  
  };

  const [value, setValue] = React.useState<DateRange<Dayjs>>(() => [
    dayjs(),
    dayjs(),
  ]);


  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["SingleInputTimeRangeField", "SingleInputTimeRangeField"]}
      >
      
        <SingleInputTimeRangeField
          style={{ borderRadius: "10px" }}
          fullWidth
          slotProps={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            textField: () => ({
              label: "From - To",
              size: "small",
              width:'20px ! important'
            }),
          }}
          
          value={value}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e:any)=>{handleTimeRangeChange(e),setValue(e);}}
        />
      </DemoContainer>
    </LocalizationProvider>
    </>
  );
};

export default BasicTimeRangeField;