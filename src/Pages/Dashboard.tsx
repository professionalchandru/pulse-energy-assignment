import { PlusIcon } from "@heroicons/react/24/solid";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { currentUserType } from "../Config/types";
import { connect } from "react-redux";
import { RootState } from "../Redux/store";

interface DashboardProps {
  currentUser: currentUserType;
}

const Dashboard = (props: DashboardProps) => {
  const { currentUser } = props;

  const navigate = useNavigate();

  return (
    <>
      <div className="relative h-screen bg-antiquwhite flex items-center justify-center">
        <Card className="mt-6 w-96">
          <CardBody>
            <Typography
              variant="h1"
              color="indigo"
              className="ml-1 text-4xl md:text-4xl font-bold"
            >
              Welcome {currentUser.name}
            </Typography>
            <div className="pt-6 space-y-5">
              <Typography
                variant="h3"
                color="blue-gray"
                className="ml-1 text-2xl md:text-2xl font-bold"
              >
                What would you like to do?
              </Typography>

              <div className="flex gap-5 items-center justify-center">
                <Button
                  size="md"
                  variant="gradient"
                  color="indigo"
                  onClick={() => navigate("/shops/create-shop")}
                  className="flex items-center gap-2"
                >
                  <PlusIcon
                    strokeWidth={2}
                    className="h-4 w-4 text-white font-bold"
                  />
                  Create Shop
                </Button>
                <Button
                  size="md"
                  variant="gradient"
                  color="indigo"
                  onClick={() => navigate("/shops")}
                  className="flex items-center gap-2"
                >
                  <BuildingStorefrontIcon
                    strokeWidth={2}
                    className="h-4 w-4 text-white font-bold"
                  />
                  View Shops
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.app.currentUser,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
