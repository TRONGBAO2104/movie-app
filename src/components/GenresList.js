import React, { useState, useEffect, useContext } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Stack, Typography } from "@mui/material";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { MovieContext } from "../context/MovieProvider";

export default function GenresList({ selectGenres, setSelectGenres }) {
  const dataContext = useContext(MovieContext);

  // Render Genres List
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    const fetchGenresList = async () => {
      try {
        // https://api.themoviedb.org/3/genre/movie/list?api_key=747bdae421bd7cc4b6553379021dab65&language=en-US
        const response = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(response.data.genres);
        // console.log(">>> Genres", response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenresList();
  }, []);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.defaultValue;
    // console.log(isChecked, value);
    if (isChecked === true) {
      setSelectGenres([...selectGenres, value]);
      dataContext.setSearchQuery("");
    } else {
      setSelectGenres(selectGenres.filter((genre) => genre !== value));
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ ml: 3, maxWidth: 200 }}
    >
      <Typography variant="h4" gutterBottom>
        GENRES
      </Typography>
      <FormGroup>
        {genresList.map((genres) => (
          <FormControlLabel
            key={genres.id}
            value={genres.id}
            control={<Checkbox />}
            label={genres.name}
            onChange={handleChange}
          />
        ))}
      </FormGroup>
    </Stack>
  );
}
