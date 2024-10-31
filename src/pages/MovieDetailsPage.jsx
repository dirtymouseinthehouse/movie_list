import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Box, Container, Stack, Typography } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import { Star } from "@mui/icons-material";
import ReactPlayer from "react-player";
import LoaderSecondary from "../components/ui/LoaderSecondary";
import GenreCards from "../components/global/GenreCards";
import Casts from "../components/global/Casts";

const MovieDetailsPage = () => {
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [castList, setCastList] = useState([]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
          }`,
        },
      };
      const response = await axios.request(options);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const fetchMovieVideo = async () => {
    try {
      if (movie) {
        setVideoLoading(true);
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${movie?.id}/videos`,
          params: { language: "en-US" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
            }`,
          },
        };

        const response = await axios.request(options);
        setVideoUrl(
          `https://www.youtube.com/watch?v=${response.data.results[0]?.key}`
        );
        setVideoLoading(false);
      }
    } catch (error) {
      console.log(error);
      setVideoLoading(false);
    }
  };

  const fetchMovieCasts = async () => {
    try {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movie?.id}/credits`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
          }`,
        },
      };
      const response = await axios.request(options);
      setCastList(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    fetchMovieVideo();
    fetchMovieCasts();
  }, [movie]);

  function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60); // Get the whole number of hours
    const remainingMinutes = minutes % 60; // Get the remaining minutes

    return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} minute${
      remainingMinutes !== 1 ? "s" : ""
    }`;
  }

  return (
    <Container sx={{ flexGrow: 1, paddingTop: "10px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {movie?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: grey[500],
            }}
          >
            {movie?.release_date.split("-")[0]} .{" "}
            {convertMinutesToHours(movie?.runtime)} . {movie?.original_language}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: grey[500],
              }}
            >
              Votes
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
              }}
              component={"div"}
            >
              <Star size={24} htmlColor={yellow[600]} />
              <span
                style={{
                  color: yellow[600],
                }}
              >
                {movie?.vote_average}
              </span>{" "}
              / 10
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: grey[500],
              }}
            >
              Popularity
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
              }}
            >
              {movie?.popularity}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid container>
        <Grid size={5} mt={2}>
          {/* poster */}
          <Box>
            <img
              src={`http://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              style={{
                height: "400px",
                width: "310px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Grid>
        <Grid size={7}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            {videoLoading ? (
              <LoaderSecondary />
            ) : (
              <>
                {videoUrl && (
                  <ReactPlayer width="100%" controls={true} url={videoUrl} />
                )}
              </>
            )}
          </Box>
        </Grid>
        <Grid
          size={7}
          sx={{
            mt: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <GenreCards data={movie?.genres} />
          <Typography
            sx={{
              color: grey[300],
            }}
          >
            {movie?.overview}
          </Typography>
        </Grid>
        <Grid size={5}>
          <Casts data={castList} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetailsPage;
