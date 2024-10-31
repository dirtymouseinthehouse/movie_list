import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const SeriesCarousel = () => {
  const [series, setSeries] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const options = {
          method: "GET",
          url: "https://api.themoviedb.org/3/tv/popular",
          params: { language: "en-US", page: "1" },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
            }`,
          },
        };

        const response = await axios.request(options);
        setSeries(response.data.results);
      } catch (error) {
        console.error("Error fetching series data:", error);
      }
    }

    fetchSeries();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % series.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [series]);

  const currentImage =
    series.length > 0
      ? `https://image.tmdb.org/t/p/original/${series[currentImageIndex].backdrop_path}`
      : null;

  return (
    <Box
      sx={{
        position: "relative",
        height: "60vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* Blurred Background Image */}
      {currentImage && (
        <img
          src={currentImage}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(10px)",
            // zIndex: -1,
            transition: "opacity 1s ease-in-out",
          }}
        />
      )}

      {/* Left Side - Text */}
      <Box
        sx={{
          width: "40%",
          pl: 4,
          textAlign: "left",
          zIndex: 1,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Popular TV Shows
        </Typography>
        <Typography variant="h6">
          Discover the trending TV series currently captivating audiences around
          the world.
        </Typography>
      </Box>

      {/* Right Side - Swiper Carousel */}
      <Box
        sx={{
          width: "60%",
          zIndex: 1,
          pr: 4,
        }}
      >
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {series.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                background: "rgba(0, 0, 0, 0.6)",
                borderRadius: "10px",
                maxWidth: "100%",
                height: "480px",
                margin: "auto",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.name}
                style={{
                  height: "auto",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default SeriesCarousel;
