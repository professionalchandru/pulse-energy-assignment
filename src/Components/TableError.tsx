import { Typography } from "@material-tailwind/react";

const TableError = (props: { message: string; colSpan: number }) => {
  return (
    <tr>
      <td colSpan={props.colSpan} className="text-center pt-8">
        <Typography
          variant="h6"
          color="red"
          className="font-bold leading-none opacity-70 text-center"
        >
          {props.message}
        </Typography>
      </td>
    </tr>
  );
};

export default TableError;
