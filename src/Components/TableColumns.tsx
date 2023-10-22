import { Typography } from "@material-tailwind/react";

const TableColumns = (props: {
  text: string | number;
  fontWeight?: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Typography
        variant="small"
        color="blue-gray"
        className={`w-20 md:w-24 lg:w-36 xl:w-48 truncate ${
          props.fontWeight ? props.fontWeight : "font-normal"
        }`}
      >
        {props.text}
      </Typography>
    </div>
  );
};

export default TableColumns;
