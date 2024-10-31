import { Box, Chip } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const GenreCards = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}
    >
      {data?.map((val) => (
        <Chip
          label={val?.name}
          key={val?.id}
          variant="outlined"
          sx={{
            color: grey[400],
          }}
        />
      ))}
    </Box>
  );
};

export default GenreCards;
