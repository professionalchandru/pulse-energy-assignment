import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Shop from "./Pages/Shops";
import CreateShop from "./Pages/CreaetShop";
import CreateProdcuts from "./Pages/CreateProudcts";
import Products from "./Pages/Proudcts";
import { currentUserType } from "./Config/types";
import UseInitApp from "./Hooks/useInitApp";
import { connect } from "react-redux";
import { RootState } from "./Redux/store";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import ShopLayout from "./Layouts/ShopLayout";
import { NavbarSimple } from "./Components/Navbars";
interface Iprops {
  currentUser: currentUserType;
}

const App = (props: Iprops) => {
  const { currentUser } = props;
  UseInitApp();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<ProtectedRoutes user={currentUser} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="shops" element={<ShopLayout />}>
              <Route index element={<Shop />} />
              <Route path=":id/create-products" element={<CreateProdcuts />} />
              <Route path=":id/products" element={<Products />} />
              <Route path="create-shop" element={<CreateShop />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.app.currentUser,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

interface ProtectedRoutesProps {
  user: currentUserType;
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoutes = (props: ProtectedRoutesProps) => {
  const { user, redirectPath = "/", children } = props;

  if (!user.email && !user.phone) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? (
    children
  ) : (
    <>
      <div className="bg-antiquwhite">
        <NavbarSimple user={user} />
      </div>
      <Outlet />
    </>
  );
};
