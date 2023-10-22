import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@material-tailwind/react";
import React from "react";

interface IsearchProps {
  searchValue: string;
  handleSearch: (search: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  handleAddButtonClick: () => void;
}

const SearchBar = (props: IsearchProps) => {
  const { searchValue, handleAddButtonClick, handleSearch, buttonText } = props;

  return (
    <div>
      <div className="flex w-full md:pt-5 shrink-0 gap-2 md:w-max">
        <div className="w-52 md:w-72">
          <Input
            crossOrigin={undefined}
            label="Search"
            name="search"
            value={searchValue}
            onChange={handleSearch}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
        <Button
          className="flex items-center gap-2"
          size="sm"
          color="indigo"
          onClick={handleAddButtonClick}
        >
          <PlusIcon strokeWidth={2} className="h-4 w-4" />
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
