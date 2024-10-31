import React from "react";
import { Cascader, Input, Select, Space } from "antd";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const { Option } = Select;

const selectBefore = (
  <Select
    defaultValue="movies"
    style={{
      background: "white",
    }}
  >
    <Option value="movies">Movies</Option>
    <Option value="series">TV Series</Option>
  </Select>
);

const SearchBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  console.log(matches);
  return (
    <Input
      addonBefore={selectBefore}
      prefix={<Search />}
      placeholder="search"
      style={{
        width: !matches ? 200 : 500,
      }}
    />
  );
};

export default SearchBar;
