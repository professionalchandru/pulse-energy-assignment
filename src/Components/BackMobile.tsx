import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const BackMobile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip content="Dashboard">
        <IconButton
          variant="text"
          onClick={() => navigate("/dashboard")}
          className="absolute -top-3 -left-3 flex items-center"
        >
          <ArrowSmallLeftIcon className="h-4 w-4 text-black font-bold" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default BackMobile;
