import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function MovieCarousel() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const fetchLatestMovies = async () => {
    try {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/now_playing",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
          }`,
        },
      };

      const response = await axios.request(options);
      console.log(response);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestMovies();
  }, []);
  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {movies?.map((movie, index) => (
            <SwiperSlide
              key={movie.id}
              style={{
                position: "relative",
              }}
            >
              {index === 0 && (
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    position: "absolute",
                    fontWeight: "bold",
                    "&:hover": {
                      fontSize: "40px",
                      color: "#e4e7e7",
                    },
                    transition: "font-size 0.2s ease-in",
                  }}
                >
                  Now Playing
                </Typography>
              )}
              <img
                src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                style={{
                  objectFit: "cover",
                  height: "380px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
