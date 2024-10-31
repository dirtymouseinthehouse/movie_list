import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import HorizontalSlider from "../ui/HorizontalSlider/HorizontalSlider";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const fetchUpcomingMovies = async () => {
    try {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/upcoming",
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
    fetchUpcomingMovies();
  }, []);

  return (
    <Box
      sx={{
        mt: "15px",
      }}
    >
      <HorizontalSlider
        data={movies}
        header={"Upcoming Movies"}
        loading={loading}
      />
    </Box>
  );
};

export default Upcoming;
