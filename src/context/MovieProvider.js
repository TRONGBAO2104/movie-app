import React, { useState, createContext, useEffect } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [topics, setTopics] = useState("popular");

  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    const fetchDataMovies = async () => {
      setisLoading(true);
      try {
        // Example: https://api.themoviedb.org/3/movie/popular?api_key=747bdae421bd7cc4b6553379021dab65&language=en-US&page=1
        const response = await apiService.get(
          // `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre.selectGenres}`
          `/movie/${topics}?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genres}`
        );
        setisLoading(false);
        setMovies(response.data.results);

        if (searchQuery) {
          const responseSearch = await apiService.get(
            `/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${searchQuery}`
          );
          setMovies(responseSearch.data.results);
          setisLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataMovies();
    // console.log(BASE_URL);
    // }, [page, genre.selectGenres]);
  }, [topics, page, genres, searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieContext.Provider
        value={{
          topics,
          setTopics,
          movies,
          setMovies,
          page,
          setPage,
          genres,
          setGenres,
          query,
          setQuery,
          searchQuery,
          setSearchQuery,
          isLoading,
          darkMode,
          setDarkMode,
          theme,
        }}
      >
        {children}
      </MovieContext.Provider>
    </ThemeProvider>
  );
}

export { MovieContext, MovieProvider };
