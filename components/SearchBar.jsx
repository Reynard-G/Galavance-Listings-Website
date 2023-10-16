import React from "react";
import { Input } from "@nextui-org/input";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = ({ setSearch }) => {

  return (
    <Input
      size="lg"
      placeholder="Plot ID"
      startContent={<SearchRoundedIcon />}
      onValueChange={(value) => setSearch(value)}
      classNames="w-1/6"
    />
  );
};

export default SearchBar;