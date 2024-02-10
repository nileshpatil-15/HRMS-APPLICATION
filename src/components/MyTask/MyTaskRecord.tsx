import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MyTask from "./MyTask";
import { GlobalContext } from "../../context/GlobalContext";
import { EmployeeContext } from "../../context/EmployeeContext";
import { toDoHistoryTabs, todoStatusTabs } from "../../constants/Constants";

import ApiServices from "../../services/APIServices";
import { TaskListResponse } from "../../types/ApiSchema";
import { toast } from "react-toastify";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Utils } from "../../services/Utils";
import AddTaskPopup from "../molecules/AddTaskPopup";
import ToDoList from "../TodoList/TodoList";

export default function BasicTabs() {  
  const {
    TodoList,
    setToDoList,
    setTodoFetching,
    refreshTodoList,
  } = React.useContext(EmployeeContext);
  const [toDoHistoryTab, setToDoHistoryTab] = React.useState<string>(
    toDoHistoryTabs[0]
  );
  const [value, setValue] = React.useState<string>("0");
 
  const activeTab =
    (todoStatusTabs[parseInt(value)] as "Completed") ||
    "Overdue" ||
    "Inprogress";
  const handleChangetab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setToDoHistoryTab(newValue);
  };

  React.useEffect(() => {
    const historyTab = Utils.getTodothistoryTabParameter(toDoHistoryTab);
    ApiServices.getNewTodoList(historyTab, (response: TaskListResponse) => {
      if (response.statusCode === 200) {
        setToDoList(response?.data);
        setTodoFetching(false);
      } else {
        toast.error(response.message);
      }
    });
  }, [toDoHistoryTab, value, refreshTodoList]);

  return (
    <>
      <div className=" flex  flex-1 flex-col    ">
        <div className="flex pt-6">
          <span className="text-xl font-montserrat font-semibold">
            My Tasks
          </span>

          <AddTaskPopup />
        </div>
        <div className="flex-1 flex flex-col  ">
          <Box sx={{ display: "flex" }}>
            <Tabs
              value={toDoHistoryTab}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              sx={{
                "& .MuiTabs-indicator": {
                  borderBottom: "2px solid #6F6CFF",
                  maxWidth: "100px", // Adjust the width as needed
                },
                "& .MuiTab-root": {
                  padding: "8px",
                  fontSize: "12px",

                  // Adjust the padding around each tab
                  typography: {
                    fontFamily: "Montserrat", // Change the font family
                  },
                },
              }}
            >
              {toDoHistoryTabs.map((tab, index) => (
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: toDoHistoryTab === tab ? "#6F6CFF" : "#666666",
                      fontWeight: "600",
                    },
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                  key={index}
                  value={tab}
                  label={tab}
                />
              ))}
            </Tabs>
          </Box>

          <Box pb={2} mt={2} style={{ flex: 1 }}>
            <div className="  flex flex-1 flex-col h-full ">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangetab}
                    aria-label="lab API tabs example"
                    sx={{
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                      "& .MuiTab-root": {
                        minHeight: 20, // Set the desired height
                      },
                    }}
                  >
                    {(toDoHistoryTab === "Today" ||
                      toDoHistoryTab === "Yestarday") && (
                      <Tab
                        sx={{
                          fontSize: "12px",
                          textTransform: "none",
                          borderBottom: "none", // Remove the underline
                          // Add any other styles as needed
                          "&.Mui-selected": {
                            color: value === "0" ? "white" : "#666666",
                            fontWeight: "600",
                          },
                          fontWeight: "600",
                          fontFamily: "Montserrat",
                          backgroundColor: value === "0" ? "#a5b4fc" : "",
                          borderRadius: 15,
                        }}
                        label="Overdue"
                        value="0"
                      />
                    )}

                    {toDoHistoryTab === "Today" && (
                      <Tab
                        sx={{
                          fontSize: "12px",
                          textTransform: "none",

                          borderBottom: "none", // Remove the underline
                          // Add any other styles as needed
                          "&.Mui-selected": {
                            color: value === "1" ? "white" : "#666666",
                            fontWeight: "600",
                          },

                          fontWeight: "600",
                          fontFamily: "Montserrat",
                          backgroundColor: value === "1" ? "#a5b4fc" : "",
                          borderRadius: 15,
                        }}
                        label="Inprogress"
                        value="1"
                      />
                    )}

                    <Tab
                      sx={{
                        fontSize: "12px",
                        textTransform: "none",

                        borderBottom: "none", // Remove the underline
                        // Add any other styles as needed
                        "&.Mui-selected": {
                          color: value === "2" ? "white" : "#666666",
                          fontWeight: "600",
                        },

                        fontWeight: "600",
                        fontFamily: "Montserrat",
                        backgroundColor: value === "2" ? "#a5b4fc" : "",
                        borderRadius: 15,
                      }}
                      label="Completed"
                      value="2"
                    />
                  </TabList>
                </Box>
                <Box
                  mt={2}
                  borderRadius={4}
                  sx={{
                    backgroundColor: "#ffffff",

                    flex: "1",
                    maxHeight: `calc(100vh - 360px)`,
                    overflow: "scroll",

                    display:
                      TodoList?.[activeTab]?.length ?? 0 > 0 ? "block" : "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="0">
                    <MyTask tab={value} />
                  </TabPanel>

                  <TabPanel
                    key={JSON.stringify(TodoList?.Inprogress)}
                    value="1"
                  >
                    <MyTask
                      key={JSON.stringify(TodoList?.Inprogress)}
                      tab={value}
                    />
                  </TabPanel>

                  <TabPanel value="2">
                    <MyTask tab={value} />
                  </TabPanel>
                </Box>
              </TabContext>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
