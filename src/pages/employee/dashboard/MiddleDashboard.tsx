import React, { useEffect } from "react";
import ClockIn from "../../../components/clock-in/ClockIn";
import TemporaryDrawer from "../../../components/drawer/Drawer";
import WelcomeCard from "../../../components/molecules/WelcomeCard";
import { TodoListResponse } from "../../../types/ApiSchema";
import ApiServices from "../../../services/APIServices";
import { useContext } from "react";
import { EmployeeContext } from "../../../context/EmployeeContext";
import { toast } from "react-toastify";
import MyTaskRecord from "../../../components/MyTask/MyTaskRecord";
const MiddleDashboard: React.FC = () => {
  return (
    <>
      <div className="  h-full  py-2 px-6   flex-1 flex flex-col    ">
        <section className="  ">
          <div className="   ">
            <div className="w-full shrink-0 grow-0 basis-auto lg:w-12/12">
              <div className=" md:flex ">
                <div className="md:mb-0 flex flex-col items-center">
                  <WelcomeCard />
                </div>
                <div className="md:mb-0 md:ml-auto flex flex-col items-center">
                  <ClockIn />
                </div>
              </div> 
            </div>
          </div>
        </section>
        <section className=" md:text-left flex-1 flex flex-col   ">
          <MyTaskRecord />
        </section>
        <div className="">
          <TemporaryDrawer />
        </div>
      </div>
    </>
  )
}
export default MiddleDashboard
