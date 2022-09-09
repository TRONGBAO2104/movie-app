import React, { useEffect, useState } from "react";
import { Box, Chip, Link, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import "./DetailPage.css";

// Fake Review: https://api.themoviedb.org/3/movie/610150/reviews?api_key=747bdae421bd7cc4b6553379021dab65&language=en-US&page=1
// Detail Movie: https://api.themoviedb.org/3/movie/507086?api_key=747bdae421bd7cc4b6553379021dab65&language=en-US&append_to_response=videos
function DetailPage() {
  const [movies, setMovies] = useState([]);
  const [genresItem, setGenresItem] = useState([]);

  const params = useParams();
  // console.log(params);

  const movieId = params.movieId;
  // console.log(movieId);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiService.get(
          `/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        console.log(">>> MovieDetail", response.data);
        setMovies(response.data);
        setGenresItem(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <Box
      sx={{
        // https://image.tmdb.org/t/p/original/ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg

        // filter: "blur(3px)",
        backgroundImage: `linear-gradient( rgba(8, 8, 37, 0.5), rgba(0, 15, 80, 0.5)),url("https://image.tmdb.org/t/p/original/${movies.backdrop_path}")`,

        minHeight: "100vh",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="movie-layout"
    >
      <Box
        spacing={2}
        sx={{
          backgroundImage:
            "linear-gradient(45deg, rgba(2,0,36,0.5) 0%, rgba(98,98,113,0.5) 16%)",
          color: "#fff",
          width: "80%",
          padding: "30px",
        }}
        className="movie-detail"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movies?.poster_path}`}
          alt={movies?.poster_path}
          className="movie-image"
        />

        <Box sx={{ p: 2 }} className="movie-info">
          <Typography variant="h4" fontWeight={700}>
            {movies?.title}
          </Typography>
          <Typography
            component="legend"
            sx={{ display: "flex", alignItems: "center" }}
            gutterBottom
          >
            Rating
            <Rating
              size="large"
              name="read-only"
              value={movies?.vote_average / 2}
              precision={0.5}
              readOnly
              sx={{ ml: 2 }}
            />
          </Typography>

          <Typography variant="subtitle2" mb={3}>
            Visit: <Link href={movies?.homepage}>{movies?.homepage}</Link>
          </Typography>
          <Box>
            {genresItem.map((genre) => (
              <Typography key={genre.id} component={"span"} spacing={1}>
                <Chip
                  variant="contained"
                  label={genre?.name}
                  sx={{ m: 0.2 }}
                  color="primary"
                />
              </Typography>
            ))}
          </Box>

          <Typography variant="body2" gutterBottom mt={2}>
            {movies?.overview}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default DetailPage;
