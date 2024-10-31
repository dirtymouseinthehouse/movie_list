import { Box } from "@mui/material";
import React from "react";
import { RiseLoader } from "react-spinners";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "300px",
      }}
    >
      <RiseLoader size={30} />
    </Box>
  );
};

export default Loader;
