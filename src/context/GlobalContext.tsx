import React, {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { projectInterface, UserData } from "../types/ApiSchema";
export type GlobalContextInterface = {
  isClockedIn: string | undefined;
  isDrawerTrue: boolean;
  setDrawer: Dispatch<SetStateAction<boolean>>;
  setClockIn: Dispatch<SetStateAction<string | undefined>>;
  projects: projectInterface[] ;
  setprojectsList: (projects: projectInterface[]) => void;
  user: UserData ;
  setUserData: (user: UserData) => void;
 timeSheetDrawer: boolean;
  setTimeSheetDrawer: Dispatch<SetStateAction<boolean>>
  isLoggedIn:boolean;
  setLoggedIn:Dispatch<SetStateAction<boolean>>;
  loader:boolean;
  setLoader:Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextInterface>(
  {} as GlobalContextInterface
);

type MyProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider: React.FC<MyProviderProps> = ({
  children,
}) => { 
  const [isClockedIn, setClockIn] = useState<string | undefined>(undefined);
  const [isDrawerTrue, setDrawer] = useState<boolean>(false);
  const [isLoggedIn,setLoggedIn]=useState<boolean>(false)
  const [timeSheetDrawer, setTimeSheetDrawer] = useState<boolean>(false);
  const [projects, setprojectsList] = useState<projectInterface[]>(
    []
  )
  const [loader,setLoader]=useState<boolean>(true)
  
  const [user, setUserData] = useState<UserData>({} as UserData);
  // console.log("context called forst");

  

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoggedIn,
        setLoggedIn,
        setUserData,
        isClockedIn,
        setClockIn,
        isDrawerTrue,
        setDrawer,
        projects,
        setprojectsList,
        timeSheetDrawer,
        setTimeSheetDrawer,
        loader ,
        setLoader
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
