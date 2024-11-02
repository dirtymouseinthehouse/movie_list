import { Box, Paper, Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const ResultCard = ({ data }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "8px",
        gap: "1rem",
        background: grey[900],
      }}
    >
      <Box>
        {/* poster */}
        <img
          src={`http://image.tmdb.org/t/p/original/${data?.poster_path}`}
          style={{
            width: "70px",
            height: "90px",
            borderRadius: "12px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Link
          to={`/movie/details/${data?.id}`}
          style={{
            textDecoration: "none",
            color: grey[200],
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: grey[200],
            }}
          >
            {data?.title}
          </Typography>
        </Link>
        <Typography
          sx={{
            fontSize: "12px",
            color: grey[400],
          }}
        >
          {data?.release_date.split("-")[0]}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: grey[400],
          }}
        >
          {data?.vote_average} / 10
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: grey[400],
          }}
        >
          {data?.vote_count} votes
        </Typography>
      </Box>
    </Paper>
  );
};

export default ResultCard;
