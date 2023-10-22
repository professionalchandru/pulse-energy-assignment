import { Outlet, useNavigate } from "react-router-dom";

import {
  PlusIcon,
  PlusCircleIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
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
} from "@material-tailwind/react";
import BackDesktop from "../Components/BackDesktop";
import BackMobile from "../Components/BackMobile";
import { RootState } from "../Redux/store";
import { connect } from "react-redux";
import { shopsType } from "../Config/types";
import Pagination from "../Components/Pagination";
import { useEffect, useState } from "react";

const TABLE_HEAD = [
  "Name",
  "About",
  "Address",
  "Latitude",
  "Longitude",
  "Actions",
];

interface IshopProps {
  shops: shopsType[];
}

const Shop = (props: IshopProps) => {
  const { shops } = props;
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [shopsList, setShopsList] = useState<shopsType[]>(shops);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItem = shopsList.slice(
    (currentPage - 1) * itemsPerPage,
    indexOfLastItem
  );
  const totalPages = Math.ceil(shopsList.length / itemsPerPage);

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (search) {
      const searchedResults = shops.filter((item: shopsType) =>
        item.Name.toLowerCase().includes(search.toLowerCase())
      );

      if (searchedResults.length) {
        setCurrentPage(1);
        setShopsList(searchedResults);
      } else {
        setShopsList([]);
      }
    } else {
      setShopsList(shops);
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="relative w-full h-screen bg-antiquwhite">
        <BackDesktop />
        <div className="relative h-full md:flex md:items-center md:justify-center">
          <div className="mx-auto text-center md:pt-0 ">
            <Card className="h-full w-full md:min-w-[760px] lg:min-w-[992px] xl:min-w-[1232px]">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="relative mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div
                    className="md:hidden"
                    onClick={() => navigate("/dashboard")}
                  >
                    <BackMobile />
                    <Typography variant="h3" color="blue-gray">
                      Shops
                    </Typography>
                  </div>
                  <div className="pt-5 hidden md:block">
                    <Typography variant="h3" color="blue-gray">
                      Shops
                    </Typography>
                  </div>
                  <div className="flex w-full md:pt-5 shrink-0 gap-2 md:w-max">
                    <div className="w-52 md:w-72">
                      <Input
                        crossOrigin={undefined}
                        label="Search"
                        name="search"
                        value={search}
                        onChange={handleSearch}
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
                      New Shop
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="overflow-auto px-0">
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
                    {currentItem.length ? (
                      currentItem.map(
                        (
                          { ShopId, Name, About, Address, Latitude, Longitude },
                          index
                        ) => {
                          const isLast = index === currentItem.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={ShopId}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold w-20 md:w-24 lg:w-36 xl:w-48 truncate"
                                  >
                                    {Name}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal w-20 md:w-24 lg:w-36 xl:w-48 truncate"
                                >
                                  {About}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal w-20 md:w-24 lg:w-36 xl:w-48 truncate"
                                >
                                  {Address}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal w-20 md:w-24 lg:w-36 xl:w-48 truncate"
                                  >
                                    {Latitude}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal w-20 md:w-24 lg:w-36 xl:w-48 truncate"
                                    >
                                      {Longitude}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className={classes}>
                                <Tooltip content="Add Products">
                                  <IconButton
                                    variant="text"
                                    onClick={() =>
                                      navigate(`${ShopId}/create-products`)
                                    }
                                  >
                                    <PlusCircleIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip content="View Products">
                                  <IconButton
                                    variant="text"
                                    onClick={() =>
                                      navigate(`${ShopId}/products`)
                                    }
                                  >
                                    <DocumentIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center pt-8">
                          <Typography
                            variant="h6"
                            color="red"
                            className="font-bold leading-none opacity-70 text-center"
                          >
                            No Shops Found...!
                          </Typography>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              {totalPages > 1 ? (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePage={handlePage}
                />
              ) : null}
            </Card>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    shops: state.app.shops,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
