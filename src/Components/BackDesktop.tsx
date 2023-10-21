import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const BackDesktop = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden md:flex absolute top-10 left-10 items-center gap-2 z-10">
        <Button
          className="flex items-center gap-2"
          size="sm"
          color="gray"
          variant="filled"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowSmallLeftIcon className="h-4 w-4 text-white font-bold" />
          Dashbord
        </Button>
      </div>
    </>
  );
};

export default BackDesktop;
