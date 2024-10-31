import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const CastCard = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={`https://image.tmdb.org/t/p/w200/${item?.profile_path}`}
        sx={{ width: 56, height: 56 }}
      />
      <Typography
        sx={{
          fontSize: "14px",
          color: grey[400],
        }}
      >
        {item?.name}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: grey[600],
        }}
      >
        {item?.character}
      </Typography>
    </Box>
  );
};

const Casts = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          color: grey[300],
        }}
      >
        Casts
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {data.map((item) => (
          <CastCard item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Casts;
