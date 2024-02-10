// SideNav.js

import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { links } from "../../Atoms/Sidenav";
import { EmployeeContext } from "../../context/EmployeeContext";
import { GlobalContext } from "../../context/GlobalContext";
import { Utils } from "../../services/Utils";

const SideNav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(links[0].title);
  const navigate = useNavigate();
  const { setTodoList } = useContext(EmployeeContext);
  const { setClockIn } = useContext(GlobalContext);
  useEffect(() => {
    // This effect runs after the state has been updated
    const tabIdFromPath = location.pathname.slice(1); // remove the leading '/'
    if (tabIdFromPath === "") {
      setActiveTab(links[0].title);
    } else {
      setActiveTab(tabIdFromPath);
    }
  }, [location.pathname]);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    if (tab === "logout") {
      Utils.Logout();
      setTodoList([]);
      setClockIn(undefined);
      navigate("/login");
    }
  };

  return (
    <div className="sidenav flex flex-col h-screen">
      <Link to="/dashboard" className="flex justify-center">
        <button className="flex items-center justify-center  p-6 outline-none">
          <img
            id="OPS-logo"
            className="w-12 rounded-full  dark:shadow-black/30"
            src="https://media.licdn.com/dms/image/C560BAQGDsrhIReQmUQ/company-logo_200_200/0/1635762645921/onpointsoft_services_logo?e=1709769600&v=beta&t=QQKNcR7JFOm1ulDkFHH9AOX6a4nDYHN5sVFNepf1h-4"
            alt="OPS Logo"
            draggable="false"
          />
        </button>
      </Link>
      <div className="flex flex-1 flex-col items-center">
        {links.map((tab) => (
          <Link
            key={tab.title}
            to={`/${tab.to}`}
            onClick={() => handleTabClick(tab.title)}
            // eslint-disable-next-line no-constant-condition
            className={`text-xl   p-3 rounded-lg flex items-center    hover:bg-blue-200  m-1 ${
              activeTab === tab.title ? "bg-blue-200" : ""
            } ${tab.title === "logout" && "mt-auto"}`}
          >
            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={`h-6 ${
                  activeTab === tab.title ? "text-red-500" : ""
                } `}
              >
                {" "}
                {tab.icon}
              </svg>
            </button>
          </Link>
        ))}
      </div>

      {/* Optional: Display the current path */}
    </div>
  );
};

export default SideNav;
