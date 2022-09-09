import React, { useEffect, useState } from "react";

// API
import { API_KEY, IMAGE_URL } from "../../api/config";

// Material UI
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardMedia,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import apiService from "../../api/apiService";
import BasicModal from "../BasicModal";

export default function MovieSlideCard({ movie }) {
  const [open, setOpen] = useState(false);
  const [trailerVideo, setTrailerVideo] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiService.get(
          `/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        setTrailerVideo(response.data.videos.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [movie.id]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ maxWidth: 250, height: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          // https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg
          image={`${IMAGE_URL}original${movie.poster_path}`}
          alt={movie.id}
          onClick={handleClick}
        />
      </CardActionArea>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 1 }}
      >
        <Button size="small" color="primary" variant="contained" sx={{ mr: 1 }}>
          <ShareIcon sx={{ mr: 0.5 }} />
          Share
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => handleOpen(movie.id)}
        >
          <VisibilityIcon sx={{ mr: 0.5 }} />
          Trailer
        </Button>
        <BasicModal
          open={open}
          handleClose={handleClose}
          trailerVideo={trailerVideo}
        />
      </CardActions>
    </Card>
  );
}
