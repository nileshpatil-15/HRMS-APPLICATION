import Profile from "./Profile";
import RecentClockin from "../RecentClockins/RecentClockins";
import CloseIcon from "@mui/icons-material/Close";

function ProfileView({ onClose }: any) {
  return (
    <>
      <div className="h-[100vh] ">
        <div
          style={{ textAlign: "left", marginTop: "2px" }}
          className="min-[760px]:hidden"
        >
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="h-[35%]">
          <Profile />
        </div>
        <div className="h-[65%]  ">
          <RecentClockin />
        </div>
      </div>
    </>
  );
}

export default ProfileView;
