/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function NavList({ user, setOpenNav }: any) {
  const navigate = useNavigate();

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        onClick={() => {
          navigate("/dashboard");
          setOpenNav(false);
        }}
      >
        <div className="flex items-center hover:text-blue-500 transition-colors cursor-pointer">
          Dasboard
        </div>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        onClick={() => {
          navigate("/shops");
          setOpenNav(false);
        }}
      >
        <div className="flex items-center hover:text-blue-500 transition-colors cursor-pointer">
          Shops
        </div>
      </Typography>

      <Typography variant="h6" color="indigo" className="p-1 font-bold">
        Hi {user.name}
      </Typography>
      <div>
        <Button size="sm" variant="gradient" color="deep-orange">
          Logout
        </Button>
      </div>
    </ul>
  );
}

export function NavbarSimple({ user }: any) {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 !bg-white">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Inventory Managment
        </Typography>
        <div className="hidden lg:block">
          <NavList user={user} setOpenNav={setOpenNav} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList user={user} setOpenNav={setOpenNav} />
      </Collapse>
    </Navbar>
  );
}
