// import {  useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Utils } from "../../services/Utils";
import { useContext, useEffect, useState } from "react";

import ApiServices from "../../services/APIServices";
import {
  RecentClockInsResponse,
  ClockIn,
  TaskListData,
  UserData,
  UploadResponse,
  TodoListResponse,
} from "../../types/ApiSchema";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../context/EmployeeContext";
import Icon from "@mui/material/Icon";
import { useRef } from "react";
import Spinner from "react-spinner";

function Profile() {
  const user = Utils.getUserData();
  const [res, setRes] = useState<any>();
  const { TodoList } = useContext(EmployeeContext);

  // djndhds
  const [loader, setLoader] = useState<Boolean>(false);
  // const [checkcouts,setCheckCounts]=useState<TaskListData>();
  const [userAvatar, setUserAvatar] = useState<string>(user?.profilePic);
  // setUserAvatar(user?.profilePic);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    setLoader(true);

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
      };

      reader.readAsDataURL(selectedFile);

      // console.log("file path", selectedFile, "----", typeof selectedFile);

      try {
        const uploadResponse = await ApiServices.uploadfile(selectedFile);

        // console.log("UploadResponse", uploadResponse);

        if (uploadResponse.statusCode === 201) {
          const fileString = uploadResponse?.data?.filePath;

          const updateProfileResponse = await ApiServices.updateUserProfile(
            fileString
          );

          if (updateProfileResponse.statusCode === 200) {
            // console.log("updateProfileResponse", {
            //   ...updateProfileResponse?.data?.profilePic,
            // });


            setUserAvatar(updateProfileResponse?.data?.profilePic);

            setLoader(false);
            toast.success("User profile updated successfully");
          } else {
            toast.error("User profile not updated");
          }
        } else {
          toast.error("File not uploaded");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    
    }
  };

  // Store the updated data back to local storage

  useEffect(() => {
    const existingUserData = user;

    // Update the profile picture property
    existingUserData.profilePic = userAvatar;

    // Store the updated data back to local storage
    localStorage.setItem("user", JSON.stringify(existingUserData));
  }, [userAvatar]);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // console.log("user proflie pic afterr", user?.profilePic);
  useEffect(() => {
    ApiServices.showCount((response: any) => {
      if (response.statusCode == "200") {
        const todoList: any = response || [];
        setRes(todoList);
      } else {
        toast("Something went wrong while fetching todo list!");
      }
    });
  }, [TodoList]);

  return (
    <>
      <div className=" border-0  h-full ">
        <div className="p-3 flex flex-col justify-center items-center">
          <div className="p-1 border rounded-full bg-gradient-to-b from-purple-600 via-indigo-600 to-blue-500 relative">
            <Avatar
              // src={profileData.avatarUrl}
              // src={user?.avatarUrl || defaultAvatarUrl}
              src={
                loader == true ? (
                  <Spinner
                    style={{
                      width: "20px", // Adjust the width as needed
                      height: "20px", // Adjust the height as needed
                      border: "2px solid #f3f3f3",
                      borderTop: "2px solid #3498db",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                ) : (
                  userAvatar
                )
              }
              sx={{
                bgcolor: deepOrange[500],
                width: "100px",
                height: "100px",
                border: 3,
              }}
              alt=""
            >
              
            </Avatar>
            <div className="absolute left-[70%] bottom-[-12px] ">
              <Icon color="primary" onClick={handleAddImageClick}>
                add_circle
              </Icon>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center font-montserrat mb-[10px]">
            <p className="text-md font-semibold text-neutral-700 capitalize">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-neutral-600 ">{user?.emp_position}</p>
          </div>
          <div className="w-full mt-[5px] border-t-[1.21px] border-b-[1.21px] border-gray-00 items-center">
            <div className="flex mx-auto mt-[13px] w-[90%]">
              <div className="w-[33%] flex flex-col justify-center items-center">
                <h3 className="font-montserrat text-[14px] font-light leading-[22px] tracking-norma text-gray-400 ">
                  In Progress
                </h3>
                <h1 className="font-Kanit text-[22px]  font-bold leading-[32px] tracking-normal text-black ">
                  {res?.data?.count.inProgressCount
                    ? res?.data?.count.inProgressCount
                    : 0}
                </h1>
              </div>
              <div className="w-[33%] flex flex-col justify-center items-center">
                <h3 className=" font-montserrat text-[14px] font-light leading-[22px] tracking-[0.5px] text-gray-400">
                  Completed
                </h3>
                <h1 className="font-Kanit text-[22px] font-bold leading-[32px] tracking-normal text-black ">
                  {" "}
                  {res?.data?.count.CompleteCount
                    ? res?.data?.count.CompleteCount
                    : 0}
                </h1>
              </div>
              <div className="w-[33%] flex flex-col justify-center items-center">
                <h3 className="  font-montserrat text-[14px] font-light leading-[22px] tracking-[0.5px] text-gray-400 ">
                  Overdue
                </h3>
                <h1 className="font-Kanit text-[22px] font-bold leading-[32px] tracking-normal  text-black">
                  {" "}
                  {res?.data?.count.overDueCount
                    ? res?.data?.count.overDueCount
                    : 0}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
