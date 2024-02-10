import  { useContext } from "react";
import Title from "../../Atoms/Title";
import { Button, Typography } from "@mui/material";
import Description from "../../Atoms/Description";
import { EmployeeContext } from "../../context/EmployeeContext";

const EmptyTimesheet = () => {
const {setAddTimeClicked}=useContext(EmployeeContext)

  return (
    <div className="flex  justify-center    items-center  ">
      <div className=" text-center w-[50%]  ">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="137"
            viewBox="0 0 115 137"
            fill="none"
          >
            <path
              d="M57.3795 127.879C89.0694 127.879 114.759 102.19 114.759 70.4999C114.759 38.81 89.0694 13.1204 57.3795 13.1204C25.6897 13.1204 0 38.81 0 70.4999C0 102.19 25.6897 127.879 57.3795 127.879Z"
              fill="#EAE8FA"
            />
            <g filter="url(#filter0_d_80_2529)">
              <path
                d="M90.2777 46.0181H24.4825C22.3699 46.0181 20.6572 47.7307 20.6572 49.8434V130.175C20.6572 132.287 22.3699 134 24.4825 134H90.2777C92.3904 134 94.103 132.287 94.103 130.175V49.8434C94.103 47.7307 92.3904 46.0181 90.2777 46.0181Z"
                fill="white"
              />
            </g>
            <path
              d="M49.7283 57.4941H29.8367C28.5691 57.4941 27.5415 58.5217 27.5415 59.7893C27.5415 61.0569 28.5691 62.0845 29.8367 62.0845H49.7283C50.9958 62.0845 52.0234 61.0569 52.0234 59.7893C52.0234 58.5217 50.9958 57.4941 49.7283 57.4941Z"
              fill="#EAE8FA"
            />
            <path
              d="M63.4993 67.4399H29.8367C28.5691 67.4399 27.5415 68.4675 27.5415 69.7351C27.5415 71.0027 28.5691 72.0303 29.8367 72.0303H63.4993C64.7669 72.0303 65.7945 71.0027 65.7945 69.7351C65.7945 68.4675 64.7669 67.4399 63.4993 67.4399Z"
              fill="#F6F5FF"
            />
            <path
              d="M49.7283 78.1506H29.8367C28.5691 78.1506 27.5415 79.1782 27.5415 80.4458C27.5415 81.7134 28.5691 82.741 29.8367 82.741H49.7283C50.9958 82.741 52.0234 81.7134 52.0234 80.4458C52.0234 79.1782 50.9958 78.1506 49.7283 78.1506Z"
              fill="#EAE8FA"
            />
            <path
              d="M63.4993 88.0964H29.8367C28.5691 88.0964 27.5415 89.124 27.5415 90.3916C27.5415 91.6592 28.5691 92.6868 29.8367 92.6868H63.4993C64.7669 92.6868 65.7945 91.6592 65.7945 90.3916C65.7945 89.124 64.7669 88.0964 63.4993 88.0964Z"
              fill="#F6F5FF"
            />
            <path
              d="M49.7283 98.8074H29.8367C28.5691 98.8074 27.5415 99.835 27.5415 101.103C27.5415 102.37 28.5691 103.398 29.8367 103.398H49.7283C50.9958 103.398 52.0234 102.37 52.0234 101.103C52.0234 99.835 50.9958 98.8074 49.7283 98.8074Z"
              fill="#EAE8FA"
            />
            <path
              d="M63.4993 108.753H29.8367C28.5691 108.753 27.5415 109.781 27.5415 111.048C27.5415 112.316 28.5691 113.344 29.8367 113.344H63.4993C64.7669 113.344 65.7945 112.316 65.7945 111.048C65.7945 109.781 64.7669 108.753 63.4993 108.753Z"
              fill="#F6F5FF"
            />
            <g filter="url(#filter1_d_80_2529)">
              <path
                d="M90.2777 7H24.4825C22.3699 7 20.6572 8.71265 20.6572 10.8253V33.7771C20.6572 35.8898 22.3699 37.6024 24.4825 37.6024H90.2777C92.3904 37.6024 94.103 35.8898 94.103 33.7771V10.8253C94.103 8.71265 92.3904 7 90.2777 7Z"
                fill="#C2C0FC"
              />
            </g>
            <path
              d="M49.7283 15.4155H29.8367C28.5691 15.4155 27.5415 16.4431 27.5415 17.7107C27.5415 18.9783 28.5691 20.0059 29.8367 20.0059H49.7283C50.9958 20.0059 52.0234 18.9783 52.0234 17.7107C52.0234 16.4431 50.9958 15.4155 49.7283 15.4155Z"
              fill="#EAE8FA"
            />
            <path
              d="M63.4993 25.3613H29.8367C28.5691 25.3613 27.5415 26.3889 27.5415 27.6565C27.5415 28.9241 28.5691 29.9517 29.8367 29.9517H63.4993C64.7669 29.9517 65.7945 28.9241 65.7945 27.6565C65.7945 26.3889 64.7669 25.3613 63.4993 25.3613Z"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_80_2529"
                x="16.0669"
                y="39.1325"
                width="82.6265"
                height="97.1627"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="-2.29518" />
                <feGaussianBlur stdDeviation="2.29518" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_80_2529"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_80_2529"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_d_80_2529"
                x="16.0669"
                y="0.114458"
                width="82.6265"
                height="39.783"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="-2.29518" />
                <feGaussianBlur stdDeviation="2.29518" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.788235 0 0 0 0 0.803922 0 0 0 0 0.85098 0 0 0 0.349 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_80_2529"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_80_2529"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <Title>No time added</Title>
        <Description>
          Click on the button at the bottom to create a timesheet
        </Description>
        <Button
        onClick={()=>setAddTimeClicked(true)}
                size="small"
                sx={{
                    marginTop:'5px',
                }}
              
                fullWidth
              >
                <Typography fontFamily="Montserrat">+ Add Time</Typography>
              </Button>      </div>
    </div>
  );
};

export default EmptyTimesheet;
