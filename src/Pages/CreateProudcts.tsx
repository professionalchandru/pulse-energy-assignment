import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import BackDesktop from "../Components/BackDesktop";

const CreateProdcuts = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  console.log("id", id);

  return (
    <div className="relative h-screen flex items-center justify-center bg-antiquwhite">
      <BackDesktop />
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Create Product
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Name" size="lg" crossOrigin={undefined} />
          <Textarea label="Description" size="lg" />
          <Input crossOrigin={undefined} label="Price" size="lg" />
          <Select label="Tags">
            <Option>Tag 1</Option>
            <Option>Tag 2</Option>
            <Option>Tag 3</Option>
            <Option>Tag 4</Option>
            <Option>Tag 5</Option>
          </Select>
          <Input crossOrigin={undefined} label="Quantity Available" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            onClick={() => navigate("/dashboard")}
          >
            Create Product
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Go Back To Shop?
            <Typography
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold cursor-pointer"
              onClick={() => navigate("/shops")}
            >
              Click here!
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateProdcuts;
