import {
  Button,
  CardFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";

interface IpaginationProps {
  currentPage: number;
  totalPages: number;
  handlePage: (page: number) => void;
}

const Pagination = (props: IpaginationProps) => {
  const { currentPage, totalPages, handlePage } = props;

  // Calculate the first page number to be displayed dynamically
  let firstPage: number;
  if (currentPage <= 3) {
    firstPage = 1;
  } else {
    firstPage = currentPage - 2;
  }

  // Calculate the last page number to be displayed dynamically
  let lastPage: number;
  if (currentPage >= totalPages - 2) {
    lastPage = totalPages;
  } else {
    lastPage = currentPage + 2;

    console.log("currentPage", currentPage);
    console.log("firstPage", firstPage);
    console.log("lastPage", lastPage);
  }

  return (
    <>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <div className="flex items-center gap-2">
          {firstPage > 1 && (
            <Button variant="text" size="sm" onClick={() => handlePage(1)}>
              1
            </Button>
          )}
          {firstPage > 2 && (
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
          )}
          {Array.from({ length: lastPage - firstPage + 1 }).map((_, index) => (
            <IconButton
              key={index}
              variant="text"
              size="sm"
              onClick={() => handlePage(firstPage + index)}
            >
              {firstPage + index}
            </IconButton>
          ))}

          {lastPage < totalPages - 1 && (
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
          )}
          {lastPage < totalPages && (
            <Button
              variant="text"
              size="sm"
              onClick={() => handlePage(totalPages)}
            >
              {totalPages}
            </Button>
          )}
        </div>
      </CardFooter>
      <div className="py-4 ">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal leading-none text-center"
        >
          Current Page: <span className="font-bold">{currentPage}</span>
        </Typography>
      </div>
    </>
  );
};

export default Pagination;
