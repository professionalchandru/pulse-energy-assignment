/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowSmallLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import BackMobile from "../Components/BackMobile";
import { connect } from "react-redux";
import { RootState } from "../Redux/store";
import { productsType, shopsType } from "../Config/types";
import { deleteProduct } from "../Redux/Actions/AppActions";
import { useEffect, useState } from "react";
import DialougeBox from "../Components/DialougeBox";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";
import TableError from "../Components/TableError";
import TableHead from "../Components/TableHead";
import TableColumns from "../Components/TableColumns";

const TABLE_HEAD = [
  "Name",
  "Description",
  "Price",
  "Tags",
  "Available Stock",
  "Actions",
];

interface IProductsProps {
  allProducts: any;
  shops: shopsType[];
  deleteProduct: (shopId: number, productId: string) => void;
}

const Products = (props: IProductsProps) => {
  const { allProducts, shops, deleteProduct } = props;
  const { id } = useParams();
  const shopDetails = shops.find((shop) => shop.ShopId === Number(id));
  const navigate = useNavigate();
  const [products, setProducts] = useState<productsType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<string>("");
  const [search, setSearch] = useState("");

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItem = products?.slice(
    (currentPage - 1) * itemsPerPage,
    indexOfLastItem
  );
  const totalPages = Math.ceil(products?.length / itemsPerPage);

  useEffect(() => {
    setProducts(allProducts[Number(id)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts[Number(id)]]);

  useEffect(() => {
    if (search) {
      const searchedResults = allProducts[Number(id)].filter(
        (item: productsType) =>
          item.Name.toLowerCase().includes(search.toLowerCase())
      );

      if (searchedResults.length) {
        setCurrentPage(1);
        setProducts(searchedResults);
      } else {
        setProducts([]);
      }
    } else {
      setProducts(allProducts[Number(id)]);
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(Number(id), productId);
    setIsOpen(false);
    setCurrentProductId("");
    navigate(`/shops/${id}/products`);
    setSearch("");
  };

  const handleOpen = (productId: string) => {
    setIsOpen(true);
    setCurrentProductId(productId);
  };

  const handleConfirm = () => {
    handleDeleteProduct(currentProductId);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentProductId("");
  };

  const handleEditProduct = (productId: string) => {
    navigate(`/shops/${id}/create-products?isEdit=true`, {
      state: {
        shopId: Number(id),
        productDetails: allProducts[Number(id)].find(
          (item: productsType) => item.ProductId === productId
        ),
      },
    });
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        className="relative h-screen  bg-antiquwhite"
        // style={{ height: `calc(100vh - 64px)` }}
      >
        <div className="relative h-full md:flex md:items-center md:justify-center">
          <div className="mx-auto text-center md:pt-0 ">
            <Card className="h-full w-full md:min-w-[760px] lg:min-w-[992px] xl:min-w-[1232px]">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="relative mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div className="md:hidden" onClick={() => navigate("/shops")}>
                    <BackMobile />
                    <Typography variant="h3" color="blue-gray">
                      Products
                    </Typography>
                    <Typography variant="h5" color="indigo">
                      {shopDetails?.Name}
                    </Typography>
                  </div>
                  <div className="pt-5 hidden md:flex flex-row gap-5">
                    <Tooltip content="Shops">
                      <IconButton
                        variant="text"
                        onClick={() => navigate("/shops")}
                      >
                        <ArrowSmallLeftIcon className="h-4 w-4 text-black font-bold" />
                      </IconButton>
                    </Tooltip>
                    <div>
                      <Typography variant="h3" color="blue-gray">
                        Products
                      </Typography>
                      <Typography variant="h5" color="indigo">
                        {shopDetails?.Name}
                      </Typography>
                    </div>
                  </div>
                  <SearchBar
                    buttonText="Product"
                    searchValue={search}
                    handleSearch={handleSearch}
                    handleAddButtonClick={() =>
                      navigate(`/shops/${id}/create-products`)
                    }
                  />
                </div>
              </CardHeader>
              <CardBody className="overflow-auto px-0">
                <table className="w-full min-w-max table-auto text-left">
                  <TableHead TABLE_HEAD={TABLE_HEAD} />
                  <tbody>
                    {currentItem?.length ? (
                      currentItem?.map(
                        (
                          {
                            ProductId,
                            Name,
                            Description,
                            Price,
                            Tags,
                            Quantity,
                          },
                          index
                        ) => {
                          const isLast = index === currentItem?.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={ProductId}>
                              <td className={classes}>
                                <TableColumns
                                  text={Name}
                                  fontWeight="font-bold"
                                />
                              </td>
                              <td className={classes}>
                                <TableColumns text={Description} />
                              </td>
                              <td className={classes}>
                                <TableColumns
                                  text={`₹ ${Price}`}
                                  fontWeight="font-bold"
                                />
                              </td>
                              <td className={classes}>
                                <div className="flex items-center gap-3 w-20 md:w-24 lg:w-36 xl:w-48 truncate">
                                  <Chip
                                    size="sm"
                                    value={Tags}
                                    color={
                                      Tags === "tag-1"
                                        ? "green"
                                        : Tags === "tag-2"
                                        ? "amber"
                                        : Tags === "tag-3"
                                        ? "red"
                                        : Tags === "tag-4"
                                        ? "indigo"
                                        : Tags === "tag-5"
                                        ? "cyan"
                                        : "orange"
                                    }
                                  />
                                </div>
                              </td>
                              <td className={classes}>
                                <TableColumns
                                  text={Quantity}
                                  fontWeight="font-bold"
                                />
                              </td>
                              <td className={classes}>
                                <Tooltip content="Edit">
                                  <IconButton
                                    variant="text"
                                    onClick={() =>
                                      handleEditProduct(ProductId as string)
                                    }
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip content="Delete">
                                  <IconButton
                                    variant="text"
                                    onClick={() =>
                                      handleOpen(ProductId as string)
                                    }
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <TableError colSpan={6} message="No Products Found...!" />
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

      <DialougeBox
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        header={`Confirm Delete`}
        message={`This product will be deleted permanently... Are you sure you want to delete this product? `}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    allProducts: state.app.products,
    shops: state.app.shops,
  };
};
const mapDispatchToProps = {
  deleteProduct: (shopId: number, productId: string) =>
    deleteProduct(shopId, productId),
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
