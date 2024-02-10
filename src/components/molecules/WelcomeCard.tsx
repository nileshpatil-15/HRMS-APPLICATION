
import { Utils } from "../../services/Utils";

function WelcomeCard() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

const user=Utils.getUserData()
  const formattedDate = date.toLocaleDateString(undefined, options);


  return (
    <>
      <div className="h-40 font-montserrat">
        <div className="flex flex-col justify-center items-start">
          <span className="text-sm  text-[#8E8E8E]">{formattedDate}</span>      
          <span className="text-3xl ">Welcome Back</span>
            <span className="text-4xl font-semibold capitalize">{user?.firstName} !</span>
            </div>      
      </div>
    </>
  );
}

export default WelcomeCard;
