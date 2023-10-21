/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BackDesktop from "../Components/BackDesktop";
import { productsType } from "../Config/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { addProduct, editProduct } from "../Redux/Actions/AppActions";

interface IcreateProductsProps {
  addProduct: (productsDeatils: productsType) => void;
  editProduct: (productsDeatils: productsType) => void;
}

export interface productsErrorType {
  ProductId?: number;
  Name: string;
  Description: string;
  Price: string;
  Tags: string;
  Quantity: string;
}

const CreateProdcuts = (props: IcreateProductsProps) => {
  const { addProduct, editProduct } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const [formData, setFormData] = useState<productsType>({
    Name: "",
    Description: "",
    Price: 0,
    Tags: "",
    Quantity: 0,
  });

  const [errors, setErrors] = useState<productsErrorType>({
    Name: "",
    Description: "",
    Price: "",
    Tags: "",
    Quantity: "",
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (Object.fromEntries(searchParams).isEdit) {
      const states: any = location.state;
      setFormData(states.productDetails);
      setIsEditMode(true);
    }
  }, [location, searchParams]);

  const validateForm = () => {
    const errors = {
      Name: "",
      Description: "",
      Price: "",
      Tags: "",
      Quantity: "",
    };

    if (!formData.Name || formData.Name.length < 3) {
      errors.Name = "Enter Valid Name";
    }

    if (!formData.Description || formData.Description.length < 3) {
      errors.Description = "Enter Valid Description";
    }

    if (!formData.Price || isNaN(formData.Price) || formData.Price <= 0) {
      errors.Price = "Enter Valid Price";
    }

    if (isNaN(formData.Quantity) || formData.Quantity < 0) {
      errors.Quantity = "Enter Valid Quantity";
    }

    if (!formData.Tags) {
      errors.Tags = "Choose Valid Tags";
    }
    return errors;
  };

  const handleAddProdcut = () => {
    const newErr = validateForm();
    setErrors(newErr);

    if (Object.values(newErr).every((err) => err === "")) {
      if (!isEditMode) {
        addProduct({ ...formData, ShopId: Number(id) });
        toast.success("Product Created Successfully");
      } else {
        editProduct({ ...formData, ShopId: Number(id) });
        toast.success("Product Updated Successfully");
      }
      setFormData({
        Name: "",
        Description: "",
        Price: 0,
        Tags: "",
        Quantity: 0,
      });
      navigate(`/shops/${id}/products`);
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

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]:
        name === "Price" || name === "Quantity"
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.target.valueAsNumber
          : value,
    }));
  };

  const handleSelectTag = (e: any) => {
    setFormData((state) => ({
      ...state,
      Tags: e,
    }));
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-antiquwhite">
      <BackDesktop />
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            {isEditMode ? "Edit Product" : "Create Product"}
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            value={formData.Name}
            name="Name"
            onChange={handleInputChange}
            error={!!errors.Name}
            label="Name"
            size="lg"
            crossOrigin={undefined}
          />
          <Textarea
            value={formData.Description}
            name="Description"
            onChange={handleInputChange}
            error={!!errors.Description}
            label="Description"
            size="lg"
          />
          <Input
            type="number"
            value={formData.Price}
            name="Price"
            onChange={handleInputChange}
            error={!!errors.Price}
            crossOrigin={undefined}
            label="Price"
            size="lg"
          />
          <Select
            label="Tags"
            value={formData.Tags}
            name="Tags"
            onChange={handleSelectTag}
            error={!!errors.Tags}
          >
            <Option value="tag-1">Tag 1</Option>
            <Option value="tag-2">Tag 2</Option>
            <Option value="tag-3">Tag 3</Option>
            <Option value="tag-4">Tag 4</Option>
            <Option value="tag-5">Tag 5</Option>
          </Select>
          <Input
            type="number"
            value={formData.Quantity}
            name="Quantity"
            onChange={handleInputChange}
            error={!!errors.Quantity}
            crossOrigin={undefined}
            label="Quantity Available"
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleAddProdcut}>
            {isEditMode ? "Update Product" : "Create Product"}
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Go Back To Shop?
            <Typography
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold cursor-pointer"
              onClick={() => navigate("/shops")}
            >
              Click here!
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = {
  addProduct: (productDetails: productsType) => addProduct(productDetails),
  editProduct: (productDetails: productsType) => editProduct(productDetails),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProdcuts);
