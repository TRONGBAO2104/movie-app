import React, { useContext } from "react";

// components
import GenresList from "../GenresList";
import PaginationBar from "../PaginationBar";
import MovieCard from "./MovieCard";

import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { MovieContext } from "../../context/MovieProvider";

function MainMoviesList() {
  const dataContext = useContext(MovieContext);
  return (
    <div>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Stack>
          {/* Left Column */}
          <GenresList
            selectGenres={dataContext.genres}
            setSelectGenres={dataContext.setGenres}
          />
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ mr: 2, ml: 2 }} />

        {/* Right Column */}
        <Stack sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textTransform: "uppercase" }}
            fontWeight={700}
          >
            {dataContext.topics}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <PaginationBar
              page={dataContext.page}
              setPage={dataContext.setPage}
            />
          </Box>
          {dataContext.isLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Grid container spacing={2}>
                {dataContext.movies.map((movie) => (
                  <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      </Box>
    </div>
  );
}

export default MainMoviesList;
