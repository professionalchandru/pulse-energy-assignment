import { Outlet, useNavigate } from "react-router-dom";

import { PlusCircleIcon, DocumentIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { RootState } from "../Redux/store";
import { connect } from "react-redux";
import { shopsType } from "../Config/types";
import Pagination from "../Components/Pagination";
import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import TableError from "../Components/TableError";
import TableHead from "../Components/TableHead";
import TableColumns from "../Components/TableColumns";

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
      <div
        className="relative h-screen w-full bg-antiquwhite"
        // style={{ height: `calc(100vh - 64px)` }}
      >
        {/* <BackDesktop /> */}
        <div className="relative h-full md:flex md:items-center md:justify-center">
          <div className="mx-auto text-center md:pt-0 ">
            <Card className="h-full w-full md:min-w-[760px] lg:min-w-[992px] xl:min-w-[1232px]">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="relative mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div className="pt-5 ">
                    <Typography variant="h3" color="blue-gray">
                      Shops
                    </Typography>
                  </div>
                  <SearchBar
                    buttonText="New Shop"
                    searchValue={search}
                    handleSearch={handleSearch}
                    handleAddButtonClick={() => navigate("/shops/create-shop")}
                  />
                </div>
              </CardHeader>
              <CardBody className="overflow-auto px-0">
                <table className="w-full min-w-max table-auto text-left">
                  <TableHead TABLE_HEAD={TABLE_HEAD} />
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
                                <TableColumns
                                  text={Name}
                                  fontWeight="font-bold"
                                />
                              </td>
                              <td className={classes}>
                                <TableColumns text={About} />
                              </td>
                              <td className={classes}>
                                <TableColumns text={Address} />
                              </td>
                              <td className={classes}>
                                <TableColumns text={Latitude} />
                              </td>
                              <td className={classes}>
                                <TableColumns text={Longitude} />
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
                      <TableError colSpan={6} message="No Shops Found...!" />
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
