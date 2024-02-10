import React, { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Typography } from "@mui/material";
import { GlobalContext } from "../../context/GlobalContext";
interface drawerHeaderProps {}

const DrawerHeader: React.FC<drawerHeaderProps> = () => {
  // const { toDoList } = useContext(EmployeeContext);
  const { setDrawer } = useContext(GlobalContext);
  const {isClockedIn}=useContext(GlobalContext)
  // console.log(toDoList);
  
  return (
    <>
      <div>
        <div className="flex flex-row justify-center items-center">
          <div className="p-3"> 
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                viewBox="0 0 55 55"
                fill="none"
                className=""
              >
                <circle
                  cx="27.5"
                  cy="27.5"
                  r="27.5"
                  fill="#6F6CFF"
                  fill-opacity="0.07"
                />

                <svg
                   x="12.5"
                   y="12.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="28"
                  viewBox="0 0 30 28"
                  fill="none"
                >
                  <g clip-path="url(#clip0_80_726)">
                    <path
                      d="M24.089 8.33496L25.8852 6.65846L24.1177 5.00821L22.1962 6.80167C20.4407 5.64059 18.3923 4.925 16.2515 4.725V2.33333H18.7515V0H11.2515V2.33333H13.7515V4.725C11.6106 4.925 9.5622 5.64059 7.80678 6.80167L5.88522 5.00821L4.11772 6.65846L5.91397 8.33496C4.23728 9.99186 3.11727 12.0708 2.69226 14.3151C2.26725 16.5595 2.55585 18.8708 3.52242 20.9637C4.48899 23.0567 6.0912 24.8396 8.13119 26.0922C10.1712 27.3449 12.5596 28.0124 15.0015 28.0124C17.4434 28.0124 19.8318 27.3449 21.8718 26.0922C23.9117 24.8396 25.5139 23.0567 26.4805 20.9637C27.4471 18.8708 27.7357 16.5595 27.3107 14.3151C26.8857 12.0708 25.7657 9.99186 24.089 8.33496ZM15.0015 25.6667C13.0237 25.6667 11.0903 25.1193 9.44577 24.0937C7.80128 23.0682 6.51955 21.6105 5.76268 19.905C5.0058 18.1996 4.80777 16.323 5.19362 14.5125C5.57947 12.702 6.53188 11.039 7.9304 9.73367C9.32893 8.42838 11.1108 7.53947 13.0506 7.17934C14.9904 6.81921 17.001 7.00404 18.8283 7.71046C20.6556 8.41688 22.2174 9.61315 23.3162 11.148C24.415 12.6829 25.0015 14.4874 25.0015 16.3333C24.9985 18.8078 23.944 21.1802 22.0693 22.9299C20.1945 24.6797 17.6527 25.6639 15.0015 25.6667Z"
                      fill="#6F6CFF"
                    />
                    <path
                      d="M15.0015 9.33337V16.3334H7.50146C7.50146 17.7178 7.94133 19.0712 8.76544 20.2224C9.58955 21.3735 10.7609 22.2707 12.1313 22.8005C13.5018 23.3303 15.0098 23.469 16.4646 23.1989C17.9195 22.9288 19.2559 22.2621 20.3048 21.2831C21.3537 20.3042 22.068 19.0569 22.3574 17.699C22.6467 16.3411 22.4982 14.9337 21.9306 13.6546C21.3629 12.3755 20.4016 11.2823 19.1682 10.5131C17.9349 9.74392 16.4848 9.33337 15.0015 9.33337Z"
                      fill="#6F6CFF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_80_726">
                      <rect width="30" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </svg>
            </div>
          </div>

          <div className="ml-1 flex-grow">
            <Typography
              fontSize={18}
              color={"#000000"}
              fontWeight={700}
              fontFamily="Montserrat"
            >
              {isClockedIn==='0' || isClockedIn=== '1' ?'Clock Out':'Clock In'}
             
            </Typography>
            <Typography fontSize={14} fontFamily="Montserrat">
              Add at least one task to clock in
            </Typography>
          </div>
          <div className="mr-4 mb-6">
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
