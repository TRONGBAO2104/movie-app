import React from "react";

function IntroVideo() {
  return (
    <video style={{ marginTop: -110 }} width="100%" autoPlay muted loop>
      <source src="./video.mp4" type="video/webm" />
    </video>
  );
}

export default IntroVideo;
