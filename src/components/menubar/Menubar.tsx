import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Utils } from "../../services/Utils";
import { EmployeeContext } from "../../context/EmployeeContext";
import { GlobalContext } from "../../context/GlobalContext";
import { TaskListData, Todo } from "../../types/ApiSchema";
import ProfileView from "../ProfileView/ProfileView";
const Menubar = () => {
  //   const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleToggleProfile = () => {
    setShowProfile(!showProfile);
    setDrawerOpen(false); // Close drawer when opening/closing profile
  };
  const { setTodoFetching, setToDoList } = useContext(EmployeeContext);
  const { setClockIn } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const handleLogOut = async () => {
    setTodoFetching(true);
    setToDoList(null);

    setClockIn(undefined);
    Utils.Logout();
    navigate("/login");
  };
  const handleProfileDrawerClose = () => {
    setShowProfile(false);
  };
  useEffect(() => {
    // This effect runs after the state has been updated
    const tabIdFromPath = location.pathname.slice(1); // remove the leading '/'
    if (tabIdFromPath === "") {
      setActiveTab("dashboard");
    } else {
      setActiveTab(tabIdFromPath);
    }
  }, [location.pathname]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit" onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleToggleProfile}>
            <AccountCircleRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
        <Box
          pb={3}
          width={"100%"}
          height={"100%"}
          role="presentation"
          sx={{
            width: "30vh",
          }}
        >
          <List>
            <ListItem
              button
              onClick={() => navigate("/dashboard")}
              style={{
                backgroundColor: activeTab === "dashboard" ? "#E7EAFF" : "",
              }}
            >
              <ListItemText style={{ color: "#8E8E8E" }} primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              onClick={() => navigate("/timesheet")}
              style={{
                backgroundColor: activeTab === "timesheet" ? "#E7EAFF" : "",
              }}
            >
              <ListItemText style={{ color: "#8E8E8E" }} primary="Timesheet" />
            </ListItem>
            <ListItem
              button
              onClick={() => navigate("/settings")}
              style={{
                backgroundColor: activeTab === "settings" ? "#E7EAFF" : "",
              }}
            >
              <ListItemText style={{ color: "#8E8E8E" }} primary="settings" />
            </ListItem>
            <ListItem button onClick={handleLogOut}>
              <ListItemText style={{ color: "#8E8E8E" }} primary="Logout" />
            </ListItem>
            {/* Add more list items as needed */}
          </List>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={showProfile}
        onClose={handleProfileDrawerClose}
      >
        <Box p={3} width={350} role="presentation">
          <ProfileView onClose={handleProfileDrawerClose} />
        </Box>
      </Drawer>
    </div>
  );
};

export default Menubar;
