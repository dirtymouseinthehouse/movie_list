import { Box, Container } from "@mui/material";
import Navbar from "../components/global/Navbar";
import { Outlet } from "react-router-dom";
import { blueGrey, grey } from "@mui/material/colors";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            marginBottom: "5rem",
            // paddingBottom: "2rem",
          }}
        >
          <Outlet />
        </Box>
      </main>
    </>
  );
};

export default RootLayout;
