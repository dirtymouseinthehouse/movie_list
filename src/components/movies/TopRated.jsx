import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import HorizontalSlider from "../ui/HorizontalSlider/HorizontalSlider";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const fetchTopRatedMovies = async () => {
    try {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated",
        params: { language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
          }`,
        },
      };

      setLoading(false);
      const response = await axios.request(options);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  return (
    <Box
      sx={{
        mt: "15px",
      }}
    >
      <HorizontalSlider
        data={movies}
        header={"Top Rated Movies"}
        loading={loading}
      />
    </Box>
  );
};

export default TopRated;
