import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";
import { blueGrey, grey, yellow } from "@mui/material/colors";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

const HorizontalSlider = ({ data, header, loading }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  console.log(matches);
  return loading ? (
    <p>loading...</p>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "2rem",
      }}
    >
      <Typography variant="h5">{header}</Typography>
      <Swiper
        slidesPerView={!matches ? 3 : 6}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={10}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data?.map((movie, index) => (
          <SwiperSlide
            key={movie.id}
            style={{
              background: grey[900],
              borderRadius: "24px",
            }}
          >
            <Card
              sx={{
                // maxWidth: 100,
                height: 450,
                background: grey[900],
                color: "white",
              }}
            >
              <img
                src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                style={{
                  objectFit: "cover",
                  height: "280px",
                  borderBottomRightRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "1rem",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: grey[400],
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "4px",
                        color: yellow[400],
                      }}
                      component={"div"}
                    >
                      <Star fontSize="15" />
                      {movie.vote_average}
                    </Typography>
                  </Box>
                  <Link
                    to={`/movie/details/${movie?.id}`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    <Typography
                      gutterBottom
                      component="div"
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      {movie.title}
                    </Typography>
                  </Link>
                </Box>
              </CardContent>
            </Card>
            {/* <img
                src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                style={{
                  objectFit: "cover",
                  height: "180px",
                }}
              /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HorizontalSlider;
