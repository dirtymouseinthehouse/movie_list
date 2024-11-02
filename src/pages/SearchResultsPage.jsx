import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ResultCard from "../components/ui/ResultCard";
import { Box, Container, Typography, Pagination } from "@mui/material";
import LoaderSecondary from "../components/ui/LoaderSecondary";

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages available

  const fetchResults = async (page = 1) => {
    try {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: query.get("search"),
          include_adult: "false",
          language: "en-US",
          page: page, // Pass the current page in the request
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN
          }`,
        },
      };
      const response = await axios.request(options);
      setResults(response.data.results);
      setTotalPages(response.data.total_pages); // Set the total pages based on the API response
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch results when location or page changes
  useEffect(() => {
    fetchResults(page);
  }, [location, page]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md">
      {query.get("search") && (
        <Typography
          sx={{
            fontSize: "24px",
          }}
        >
          Search results for "{query.get("search")}"
        </Typography>
      )}
      {results.length > 0 && (
        <Typography
          sx={{
            fontSize: "18px",
            marginBottom: "1rem",
          }}
        >
          Titles
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {loading ? (
          <LoaderSecondary />
        ) : (
          results.map((item) => <ResultCard key={item.id} data={item} />)
        )}
      </Box>
      {/* Pagination component */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white", // Set the text color to white
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default SearchResultsPage;
