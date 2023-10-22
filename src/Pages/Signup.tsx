import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import { connect } from "react-redux";
import { signUpUser } from "../Redux/Actions/AppActions";

export interface signUpFormDataType {
  name: string;
  phone: string;
  email: string;
  password?: string;
}

interface IsignupProps {
  users: signUpFormDataType[];
  signUpUser: (usersArray: signUpFormDataType[]) => void;
}

const Signup = (props: IsignupProps) => {
  const { users, signUpUser } = props;

  const navigate = useNavigate();

  const [formData, setFormData] = useState<signUpFormDataType>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<signUpFormDataType>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors: signUpFormDataType = {
      name: "",
      phone: "",
      email: "",
      password: "",
    };

    if (!formData.name || formData.name.length < 3) {
      errors.name = "Enter Valid Name";
    }

    if (
      !formData.phone ||
      formData.phone.length !== 10 ||
      isNaN(Number(formData.phone))
    ) {
      errors.phone = "Enter Valid Phone Number";
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Enter Valid Email";
    }

    if (!formData.password || formData.password.length < 8) {
      errors.password = "Enter Valid Password";
    }
    return errors;
  };

  const handleSignup = () => {
    const newErr = validateForm();
    setErrors(newErr);

    if (Object.values(newErr).every((err) => err === "")) {
      if (!users) {
        signUpUser([formData]);
      } else {
        const parsedUsers = [...users, formData];
        signUpUser(parsedUsers);
      }

      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
      });
      toast.success("User Registered Successfully");
      navigate("/");
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-antiquwhite">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              color="indigo"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
              label="Name"
              size="lg"
              crossOrigin={undefined}
              error={!!errors.name}
            />
            <Input
              color="indigo"
              value={formData.phone}
              name="phone"
              onChange={handleInputChange}
              label="Phone Number"
              size="lg"
              crossOrigin={undefined}
              error={!!errors.phone}
            />
            <Input
              color="indigo"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              label="Email"
              size="lg"
              crossOrigin={undefined}
              error={!!errors.email}
            />
            <Input
              color="indigo"
              value={formData.password}
              type="password"
              name="password"
              onChange={handleInputChange}
              label="Password"
              size="lg"
              crossOrigin={undefined}
              error={!!errors.password}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignup}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => navigate("/")}
              >
                Sign In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    users: state.app.users,
  };
};
const mapDispatchToProps = {
  signUpUser: (usersArray: signUpFormDataType[]) => signUpUser(usersArray),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
