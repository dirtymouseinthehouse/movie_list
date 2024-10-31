import { Box } from "@mui/material";
import React from "react";
import { FadeLoader } from "react-spinners";

const LoaderSecondary = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "60vh",
        justifyContent: "center",
        // marginTop: "300px",
      }}
    >
      <FadeLoader size={25} color={"#ffff"} />
    </Box>
  );
};

export default LoaderSecondary;
