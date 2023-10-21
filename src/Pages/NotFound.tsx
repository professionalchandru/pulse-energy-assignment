import { Typography } from "@material-tailwind/react";
import NotFoundImg from "../Assets/notfound.jpg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen text-center flex flex-col items-center justify-center"
      style={{ background: "#F9FAFC" }}
    >
      <img
        src={NotFoundImg}
        alt="Not found"
        className="w-96 h-96 md:h-800px md:w-800px"
      />
      <Typography
        variant="h4"
        color="blue-gray"
        className="absolute ml-1 bottom-40 md:bottom-40 font-bold cursor-pointer hover:text-indigo-800"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </Typography>
    </div>
  );
};

export default NotFound;
