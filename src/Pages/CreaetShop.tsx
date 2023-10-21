import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import BackDesktop from "../Components/BackDesktop";
import { connect } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { createShop } from "../Redux/Actions/AppActions";

export interface createShopTypes {
  Name: string;
  About: string;
  Address: string;
  Latitude: string;
  Longitude: string;
}

interface IcreateShopProps {
  createShop: (shopDetails: createShopTypes) => void;
}

const CreateShop = (props: IcreateShopProps) => {
  const { createShop } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<createShopTypes>({
    Name: "",
    About: "",
    Address: "",
    Latitude: "",
    Longitude: "",
  });

  const [errors, setErrors] = useState<createShopTypes>({
    Name: "",
    About: "",
    Address: "",
    Latitude: "",
    Longitude: "",
  });

  const validateForm = () => {
    const errors: createShopTypes = {
      Name: "",
      About: "",
      Address: "",
      Latitude: "",
      Longitude: "",
    };

    if (!formData.Name || formData.Name.length < 3) {
      errors.Name = "Enter Valid Name";
    }

    if (!formData.About || formData.About.length < 3) {
      errors.About = "Enter Valid About";
    }

    if (!formData.Address || formData.Address.length < 3) {
      errors.Address = "Enter Valid Address";
    }

    if (!formData.Latitude || formData.Latitude.length < 3) {
      errors.Latitude = "Enter Valid Latitude";
    }

    if (!formData.Longitude || formData.Longitude.length < 3) {
      errors.Longitude = "Enter Valid Longitude";
    }
    return errors;
  };

  const handleCreateShop = () => {
    const newErr = validateForm();
    setErrors(newErr);

    if (Object.values(newErr).every((err) => err === "")) {
      createShop(formData);
      setFormData({
        Name: "",
        About: "",
        Address: "",
        Latitude: "",
        Longitude: "",
      });
      toast.success("Shop Created Successfully");
      navigate("/shops");
    } else {
      let message = "";
      Object.values(newErr).forEach((item) =>
        item !== ""
          ? (message = `${message.length ? message + "\n" : ""} ${item}`)
          : null
      );
      toast.error(message);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

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
            Create Shop
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            value={formData.Name}
            name="Name"
            onChange={handleInputChange}
            error={!!errors.Name}
            label="Name"
            size="lg"
            crossOrigin={undefined}
          />
          <Textarea
            value={formData.About}
            name="About"
            onChange={handleInputChange}
            error={!!errors.About}
            label="Bio / About"
            size="lg"
          />
          <Textarea
            value={formData.Address}
            name="Address"
            onChange={handleInputChange}
            error={!!errors.Address}
            label="Address"
            size="lg"
          />
          <Input
            value={formData.Latitude}
            name="Latitude"
            onChange={handleInputChange}
            error={!!errors.Latitude}
            crossOrigin={undefined}
            label="Latitude"
            size="lg"
          />
          <Input
            value={formData.Longitude}
            name="Longitude"
            onChange={handleInputChange}
            error={!!errors.Longitude}
            crossOrigin={undefined}
            label="Longitude"
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleCreateShop}>
            Create Shop
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            View Created Shops?
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

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = {
  createShop: (shopDetails: createShopTypes) => createShop(shopDetails),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateShop);
