import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { signUpFormDataType } from "./Signup";
import { connect } from "react-redux";
import { signInUser } from "../Redux/Actions/AppActions";
import { RootState } from "../Redux/store";
import { currentUserType } from "../Config/types";

interface signInFormDataType {
  userName: string;
  password: string;
}

interface IsigninProps {
  users: signUpFormDataType[];
  currentUser: currentUserType;
  signInUser: (currentUser: currentUserType) => void;
}

const Login = (props: IsigninProps) => {
  const { users, currentUser, signInUser } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<signInFormDataType>({
    userName: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [errors, setErrors] = useState<signInFormDataType>({
    userName: "",
    password: "",
  });

  if (currentUser.email && currentUser.phone && currentUser.rememberMe) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = () => {
    const errors: signInFormDataType = {
      userName: "",
      password: "",
    };

    if (
      !formData.userName ||
      (isNaN(Number(formData.userName)) &&
        !/^\S+@\S+\.\S+$/.test(formData.userName)) ||
      (!isNaN(Number(formData.userName)) && formData.userName.length !== 10)
    ) {
      errors.userName = "Enter Valid User Name";
    }

    if (!formData.password || formData.password.length < 8) {
      errors.password = "Enter Valid Password";
    }
    return errors;
  };

  const handleSignin = () => {
    const newErr = validateForm();
    setErrors(newErr);

    if (Object.values(newErr).every((err) => err === "")) {
      if (!users) {
        toast.error("No Users Found...! Please Sign Up First");
        return;
      } else {
        // TODO: NEED TO DO REDUX THINGS HERE FOR CHECKING THE LOGGIN STATUS AND MAKE IT PERSISTANT

        const userMatch = users?.find(
          (user: signUpFormDataType) =>
            (user.phone === formData.userName ||
              user.email === formData.userName) &&
            user.password === formData.password
        );
        if (!userMatch) {
          toast.error("Please Check UserName and Password");
          return;
        }
        delete userMatch?.password;
        if (userMatch && rememberMe) {
          signInUser({ ...userMatch, isLoggedIn: true, rememberMe });
        } else if (userMatch && !rememberMe) {
          signInUser({ ...userMatch, isLoggedIn: true, rememberMe: false });
        }
      }
      setFormData({
        userName: "",
        password: "",
      });
      toast.success("Logged In Successfully");
      navigate("/dashboard");
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
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-antiquwhite">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            value={formData.userName}
            name="userName"
            onChange={handleInputChange}
            label="Email or Phone"
            error={!!errors.userName}
            size="lg"
            crossOrigin={undefined}
          />
          <Input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleInputChange}
            error={!!errors.password}
            crossOrigin={undefined}
            label="Password"
            size="lg"
          />
          <div className="-ml-2.5">
            <Checkbox
              label="Remember Me"
              crossOrigin={undefined}
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSignin}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    users: state.app.users,
    currentUser: state.app.currentUser,
  };
};
const mapDispatchToProps = {
  signInUser: (currentUser: currentUserType) => signInUser(currentUser),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
