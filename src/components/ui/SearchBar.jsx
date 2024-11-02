import React, { useState } from "react";
import { Cascader, Input, Select, Space } from "antd";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const selectBefore = (
  <Select
    defaultValue="movies"
    onChange={(e) => {
      console.log(e);
    }}
    style={{
      background: "white",
    }}
  >
    <Option value="movie">Movies</Option>
    <Option value="series">TV Series</Option>
  </Select>
);

const SearchBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  console.log(matches);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("movie");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/results?type=${type}&search=${searchTerm}`);
    }
  };
  return (
    <Input
      addonBefore={selectBefore}
      prefix={<Search />}
      placeholder="search"
      onChange={(e) => setSearchTerm(e.target.value)}
      onPressEnter={handleSearch}
      required
      style={{
        width: !matches ? 200 : 500,
      }}
    />
  );
};

export default SearchBar;
