import React, { useContext } from "react";

import ReactPlayer from "react-player";

import { MovieContext } from "../context/MovieProvider";

import { Box, Modal, CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function BasicModal({ open, handleClose, trailerVideo }) {
  const dataContext = useContext(MovieContext);
  const randomVideo = Math.floor(Math.random() * trailerVideo.length);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      {dataContext.isLoading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            ...style,
            width: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerVideo[randomVideo]?.key}`}
          />
        </Box>
      )}
    </Modal>
  );
}
