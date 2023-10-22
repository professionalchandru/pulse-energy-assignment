import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const BackMobile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip content="Shops">
        <IconButton
          variant="text"
          onClick={() => navigate("/shops")}
          className="absolute top-0 left-0 flex items-center"
        >
          <ArrowSmallLeftIcon className="h-4 w-4 text-black font-bold" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default BackMobile;
