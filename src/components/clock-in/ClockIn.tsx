import { Button } from "@mui/material";
import { useContext } from "react";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ApiServices from "../../services/APIServices";
import { checkClockInStatusInterface } from "../../types/ApiSchema";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { EmployeeContext } from "../../context/EmployeeContext";
const ClockIn: React.FC = () => {
  const { isClockedIn, setClockIn } = useContext(GlobalContext);

 const {setTimeSheetDrawer}=useContext(GlobalContext)
 const {setMarkCompletePopup}=useContext(EmployeeContext)
 
 const  handleClockIn=()=>{
  setMarkCompletePopup(false)
  setTimeSheetDrawer(false) 
  
   setDrawer(!isDrawerTrue)
   
 
 }

 const  handleClockOut=()=>{

  setTimeSheetDrawer(false)
   setDrawer(!isDrawerTrue)
 }
  useEffect(() => {
    ApiServices.checkClockInStatus((response: checkClockInStatusInterface) => {
      if (response.statusCode === 200) {
        if (response.data.punchStatusEntry === "0") {
          setClockIn("0");
        } else {
         
          setClockIn("1");
        }
      }
    });
  }, [setClockIn]);

  const { isDrawerTrue, setDrawer } = useContext(GlobalContext);
  return (
    <>
      <div className="w-64 h-44 font-montserrat rounded-2xl bg-white">
        <div className="flex flex-col justify-center items-center ">
          <div className="p-4 flex flex-col ">
          <span className="mb-2 font-semibold text-xl text-center">Mark Attendance</span>
            <span className="mb-2 text-sm text-neutral-400 text-center">
              {isClockedIn===undefined?     (null):(isClockedIn==='1'?('Manage task during clockout and close for day'):('Start your day clock in and planning today task'))
}
            </span>
          </div>
          <div className="w-44">
            {isClockedIn === undefined ? (
              <Button
                style={{ backgroundColor: "#e7eaf6" }}
                fullWidth
                size="small"
              >
                <CircularProgress color="inherit" size={23} />
              </Button>
            ) : isClockedIn === "0" ? (
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "#3730a3 !important",
                  },
                }}
                onClick={handleClockIn}
                // startIcon={<RiTimerFlashLine />}
                fullWidth
                size="small"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  className=""
                >
                  <g clip-path="url(#clip0_80_1885)">
                    <path
                      d="M12.1328 4.68244L12.971 3.78432L12.1462 2.90025L11.2495 3.86104C10.4303 3.23903 9.47432 2.85568 8.47526 2.74854V1.46729H9.64193V0.217285H6.14193V1.46729H7.3086V2.74854C6.30955 2.85568 5.3536 3.23903 4.53441 3.86104L3.63768 2.90025L2.81285 3.78432L3.6511 4.68244C2.86864 5.57007 2.34597 6.6838 2.14763 7.88611C1.94929 9.08842 2.08397 10.3266 2.53504 11.4479C2.98611 12.5691 3.73381 13.5242 4.6858 14.1953C5.63779 14.8663 6.75238 15.2239 7.89193 15.2239C9.03148 15.2239 10.1461 14.8663 11.0981 14.1953C12.0501 13.5242 12.7978 12.5691 13.2488 11.4479C13.6999 10.3266 13.8346 9.08842 13.6362 7.88611C13.4379 6.6838 12.9152 5.57007 12.1328 4.68244ZM7.89193 13.9673C6.96895 13.9673 6.0667 13.674 5.29927 13.1246C4.53184 12.5752 3.9337 11.7943 3.58049 10.8807C3.22728 9.96707 3.13487 8.96174 3.31493 7.99183C3.495 7.02193 3.93945 6.13101 4.5921 5.43175C5.24474 4.73249 6.07626 4.25629 6.98151 4.06336C7.88675 3.87043 8.82506 3.96945 9.67779 4.34789C10.5305 4.72633 11.2593 5.36719 11.7721 6.18943C12.2849 7.01168 12.5586 7.97838 12.5586 8.96729C12.5572 10.2929 12.0651 11.5638 11.1902 12.5012C10.3154 13.4385 9.12918 13.9658 7.89193 13.9673Z"
                      fill="white"
                    />
                    <path
                      d="M7.89209 5.21729V8.96729H4.39209C4.39209 9.70897 4.59736 10.434 4.98195 11.0507C5.36653 11.6674 5.91316 12.148 6.5527 12.4318C7.19224 12.7157 7.89597 12.7899 8.57491 12.6452C9.25384 12.5005 9.87748 12.1434 10.367 11.6189C10.8564 11.0945 11.1898 10.4263 11.3248 9.69887C11.4599 8.97145 11.3906 8.21745 11.1257 7.53222C10.8608 6.847 10.4122 6.26133 9.83659 5.84927C9.26101 5.43722 8.58432 5.21729 7.89209 5.21729Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_80_1885">
                      <rect
                        width="14"
                        height="15"
                        fill="white"
                        transform="translate(0.891113 0.217285)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Typography marginLeft={1} fontSize={15} fontFamily="Montserrat">Clock In</Typography>
              </Button>
            ) : (
              <Button
                onClick={handleClockOut}
                // startIcon={<RiTimerFlashLine />}
                fullWidth
                style={{ backgroundColor: "#FF7A7A" }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#ef4444 !important",
                  },
                }}
                size="small"
            
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_80_1885)">
                    <path
                      d="M12.1328 4.68244L12.971 3.78432L12.1462 2.90025L11.2495 3.86104C10.4303 3.23903 9.47432 2.85568 8.47526 2.74854V1.46729H9.64193V0.217285H6.14193V1.46729H7.3086V2.74854C6.30955 2.85568 5.3536 3.23903 4.53441 3.86104L3.63768 2.90025L2.81285 3.78432L3.6511 4.68244C2.86864 5.57007 2.34597 6.6838 2.14763 7.88611C1.94929 9.08842 2.08397 10.3266 2.53504 11.4479C2.98611 12.5691 3.73381 13.5242 4.6858 14.1953C5.63779 14.8663 6.75238 15.2239 7.89193 15.2239C9.03148 15.2239 10.1461 14.8663 11.0981 14.1953C12.0501 13.5242 12.7978 12.5691 13.2488 11.4479C13.6999 10.3266 13.8346 9.08842 13.6362 7.88611C13.4379 6.6838 12.9152 5.57007 12.1328 4.68244ZM7.89193 13.9673C6.96895 13.9673 6.0667 13.674 5.29927 13.1246C4.53184 12.5752 3.9337 11.7943 3.58049 10.8807C3.22728 9.96707 3.13487 8.96174 3.31493 7.99183C3.495 7.02193 3.93945 6.13101 4.5921 5.43175C5.24474 4.73249 6.07626 4.25629 6.98151 4.06336C7.88675 3.87043 8.82506 3.96945 9.67779 4.34789C10.5305 4.72633 11.2593 5.36719 11.7721 6.18943C12.2849 7.01168 12.5586 7.97838 12.5586 8.96729C12.5572 10.2929 12.0651 11.5638 11.1902 12.5012C10.3154 13.4385 9.12918 13.9658 7.89193 13.9673Z"
                      fill="white"
                    />
                    <path
                      d="M7.89209 5.21729V8.96729H4.39209C4.39209 9.70897 4.59736 10.434 4.98195 11.0507C5.36653 11.6674 5.91316 12.148 6.5527 12.4318C7.19224 12.7157 7.89597 12.7899 8.57491 12.6452C9.25384 12.5005 9.87748 12.1434 10.367 11.6189C10.8564 11.0945 11.1898 10.4263 11.3248 9.69887C11.4599 8.97145 11.3906 8.21745 11.1257 7.53222C10.8608 6.847 10.4122 6.26133 9.83659 5.84927C9.26101 5.43722 8.58432 5.21729 7.89209 5.21729Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_80_1885">
                      <rect
                        width="14"
                        height="15"
                        fill="white"
                        transform="translate(0.891113 0.217285)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Typography marginLeft={1} fontSize={15} fontWeight={500} fontFamily="Montserrat">{isClockedIn==='3'?'Clocked Out':'Clock Out'}</Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClockIn;
