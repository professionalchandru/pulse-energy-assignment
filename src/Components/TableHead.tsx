import { Typography } from "@material-tailwind/react";

const TableHead = (props: { TABLE_HEAD: string[] }) => {
  return (
    <thead>
      <tr>
        {props.TABLE_HEAD.map((head: string) => (
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
  );
};

export default TableHead;
