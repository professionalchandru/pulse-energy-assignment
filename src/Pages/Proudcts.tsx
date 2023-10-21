import { useNavigate } from "react-router-dom";

import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import BackDesktop from "../Components/BackDesktop";
import BackMobile from "../Components/BackMobile";

const TABLE_HEAD = [
  "Name",
  "Description",
  "Price",
  "Tags",
  "Quantity",
  "Actions",
];

const TABLE_ROWS = [
  {
    Name: "Spotify",
    Description: "lorem ipusum",
    Price: "lorem ipusum",
    Tags: "sdaf2323",
    Quantity: "asdfasdf",
  },
  {
    Name: "Spotify",
    Description: "lorem ipusum",
    Price: "lorem ipusum",
    Tags: "sdaf2323",
    Quantity: "asdfasdf",
  },
  {
    Name: "Spotify",
    Description: "lorem ipusum",
    Price: "lorem ipusum",
    Tags: "sdaf2323",
    Quantity: "asdfasdf",
  },
  {
    Name: "Spotify",
    Description: "lorem ipusum",
    Price: "lorem ipusum",
    Tags: "sdaf2323",
    Quantity: "asdfasdf",
  },
  {
    Name: "Spotify",
    Description: "lorem ipusum",
    Price: "lorem ipusum",
    Tags: "sdaf2323",
    Quantity: "asdfasdf",
  },
];

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative h-screen bg-antiquwhite md:flex md:items-center md:justify-center">
        <BackDesktop />
        <div className="mx-auto text-center md:pt-0 ">
          <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="relative mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                <div
                  className="md:hidden"
                  onClick={() => navigate("/dashboard")}
                >
                  <BackMobile />
                  <Typography variant="h3" color="blue-gray">
                    Products
                  </Typography>
                  <Typography variant="h5" color="indigo">
                    Shop 1
                  </Typography>
                </div>
                <div className="pt-5 hidden md:block">
                  <Typography variant="h3" color="blue-gray">
                    Products
                  </Typography>
                  <Typography variant="h5" color="indigo">
                    Shop 1
                  </Typography>
                </div>
                <div className="flex w-full md:pt-5 shrink-0 gap-2 md:w-max">
                  <div className="w-52 md:w-72">
                    <Input
                      crossOrigin={undefined}
                      label="Search"
                      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                  </div>
                  <Button
                    className="flex items-center gap-2"
                    size="sm"
                    color="indigo"
                    onClick={() => navigate("/shops/create-shop")}
                  >
                    <PlusIcon strokeWidth={2} className="h-4 w-4" />
                    Product
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(
                    ({ Name, Description, Price, Tags, Quantity }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={Name}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {Name}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Description}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Price}
                            </Typography>
                          </td>
                          {/* <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={status}
                                color={
                                  status === "paid"
                                    ? "green"
                                    : status === "pending"
                                    ? "amber"
                                    : "red"
                                }
                              />
                            </div>
                          </td> */}
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {Tags}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal capitalize"
                                >
                                  {Quantity}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Edit">
                              <IconButton
                                variant="text"
                                onClick={() => navigate("/create-products")}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete">
                              <IconButton
                                variant="text"
                                onClick={() => navigate("/create-products")}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <IconButton variant="outlined" size="sm">
                  1
                </IconButton>
                <IconButton variant="text" size="sm">
                  2
                </IconButton>
                <IconButton variant="text" size="sm">
                  ...
                </IconButton>
                <IconButton variant="text" size="sm">
                  8
                </IconButton>
                <IconButton variant="text" size="sm">
                  9
                </IconButton>
              </div>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Products;
