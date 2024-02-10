/* eslint-disable no-constant-condition */


import React, { useContext } from "react";
import { RiTimerFlashLine } from "react-icons/ri";
import ClearIcon from "@mui/icons-material/Clear";
// import {  Typography } from "@mui/material";
import Title from "../../Atoms/Title";
import { GlobalContext } from "../../context/GlobalContext";

import Description from "../../Atoms/Description";
interface drawerHeaderProps {
}

const DrawerHeader: React.FC<drawerHeaderProps> = () => {
  const { setDrawer,isClockedIn } = useContext(GlobalContext);
  
  return (
    <>
      <div>
        <div className="h-full flex flex-row justify-center px-2  pb-3 items-start">
          <div className=" pr-1">
          <RiTimerFlashLine
          style={{
            color: "#6F6CFF",
            padding: "7px",
            backgroundColor:isClockedIn==='0' || undefined ? "#f3e8ff":"#fee2e2"  ,
            borderRadius: "50%",
            fontSize: "48px",
          }}
        /> 
          </div>

          <div className="ml-1 flex-grow">
          <Title
            
          >
           {isClockedIn==='0' || undefined  ? (<Title>Clock In</Title>):(<Title>Clock Out</Title>)}
          </Title>
          <Description  >Add at least one task to clock in</Description>      
          </div>
          <div className=" ">
            <button onClick={() => setDrawer(false)}>
              <ClearIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerHeader;
