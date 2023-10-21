/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";

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
  Chip,
} from "@material-tailwind/react";
import BackDesktop from "../Components/BackDesktop";
import BackMobile from "../Components/BackMobile";
import { connect } from "react-redux";
import { RootState } from "../Redux/store";
import { productsType, shopsType } from "../Config/types";
import { deleteProduct } from "../Redux/Actions/AppActions";
import { useEffect, useState } from "react";
import DialougeBox from "../Components/DialougeBox";

const TABLE_HEAD = [
  "Name",
  "Description",
  "Price",
  "Tags",
  "Quantity",
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

  useEffect(() => {
    setProducts(allProducts[Number(id)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts[Number(id)]]);

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(Number(id), productId);
    setIsOpen(false);
    setCurrentProductId("");
    navigate(`/shops/${id}/products`);
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

  return (
    <>
      <div className="relative h-screen bg-antiquwhite">
        <BackDesktop />
        <div className="relative h-full md:flex md:items-center md:justify-center">
          <div className="mx-auto text-center md:pt-0 ">
            <Card className="h-full w-full">
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
                      Products
                    </Typography>
                    <Typography variant="h5" color="indigo">
                      {shopDetails?.Name}
                    </Typography>
                  </div>
                  <div className="pt-5 hidden md:block">
                    <Typography variant="h3" color="blue-gray">
                      Products
                    </Typography>
                    <Typography variant="h5" color="indigo">
                      {shopDetails?.Name}
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
                      onClick={() => navigate(`/shops/${id}/create-products`)}
                    >
                      <PlusIcon strokeWidth={2} className="h-4 w-4" />
                      Product
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
                    {products ? (
                      products?.map(
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
                          const isLast = index === products.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={ProductId}>
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
                                  {Description}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal w-20 md:w-24 lg:w-36 xl:w-48 truncate"
                                >
                                  {Price}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <div className="flex items-center gap-3 w-20 md:w-24 lg:w-36 xl:w-48 truncate">
                                  {/* <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal w-20 md:w-24 lg:w-36 xl:w-48 truncate"
                                  >
                                    {Tags}
                                  </Typography> */}
                                  <Chip
                                    size="sm"
                                    // variant="ghost"
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
                                <div className="flex items-center gap-3">
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal w-20 md:w-24 lg:w-36 xl:w-48 truncate"
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
                      <tr>
                        <td colSpan={6} className="text-center pt-8">
                          <Typography
                            variant="h6"
                            color="red"
                            className="font-bold leading-none opacity-70 text-center"
                          >
                            No Products Found...!
                          </Typography>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              {products?.length > 5 ? (
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
