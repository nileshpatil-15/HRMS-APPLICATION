import { useEffect, useState } from "react";
import ApiServices from "../../services/APIServices";
import {
  RecentClockInsResponse,
  ClockIn,
  getTimesheetDatesInterface,
  days,
} from "../../types/ApiSchema";
import { toast } from "react-toastify";
import RecentClockinByDate from "./RecentClockinByDate";

function RecentClockIns() {
  const [recentClockinList, setRecentClockinList] = useState<ClockIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentClockinDates, setRecentClockinDates] = useState<days[]>([]);

  useEffect(() => {
    ApiServices.getTimesheetDates((response: getTimesheetDatesInterface) => {
      setLoading(false);
      console.log("response in recent clocin", { ...response });
      if (response.statusCode === 200) {
        setRecentClockinDates(response?.data?.days);
        // setRecentClockinList(response?.data?.RecentClockIns);
      } else {
        toast.error(response.message);
        setRecentClockinList([]);
      }
    });
  }, []);

  return (
    <>
      <div className=" h-full overflow-scroll">
        <div className="p-4 font-montserrat  h-full overflow-scroll  ">
          <div className="mb-2 ">
            <span className="text-md font-semibold">Recent Clock Ins</span>
          </div>
          <div className=" overflow-hidden overflow-y-scroll h-[90%] pt-[5px] ">
            {loading ? (
              <div>
                <div
                  className="mt-24 flex justify-center items-center"
                  data-te-loading-management-init
                  data-te-class-spinner-color="text-blue-300 dark:text-blue-300"
                  data-te-parent-selector="#loading-basic-example"
                >
                  <div
                    data-te-loading-icon-ref
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                  <span data-te-loading-text-ref>Loading...</span>
                </div>
              </div>
            ) : (
              <div
                className=""
                style={{ height: "calc(100vh - 270px)" }}
              >
                <RecentClockinByDate recenclockinDates={recentClockinDates} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentClockIns;
