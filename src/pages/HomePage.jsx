import { Box, Container, Typography } from "@mui/material";
import React from "react";
import MovieCarousel from "../components/ui/MovieCarousel/MovieCarousel";
import TopRated from "../components/movies/TopRated";
import Upcoming from "../components/movies/Upcoming";
import SeriesCarousel from "../components/TVSeries/SeriesCarousel/SeriesCarousel";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* <Typography variant="h2">HomePage</Typography> */}
      <MovieCarousel />
      <Container maxWidth="lg">
        <TopRated />
        <Upcoming />
      </Container>
      <SeriesCarousel />
    </Box>
  );
};

export default HomePage;
