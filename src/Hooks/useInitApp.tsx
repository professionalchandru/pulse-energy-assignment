import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initApp } from "../Redux/Actions/AppActions";

const UseInitApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(initApp());
  }, [dispatch]);
};

export default UseInitApp;
