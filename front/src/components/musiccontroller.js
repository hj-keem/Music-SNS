import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import MusicSearch from "./musicsearch";

export default function Musiccontroller() {
  // const [data, setData] = useState([]);
  const theme = useTheme();

  const [player, setPlayer] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [videoId, setVideoId] = useState();
  const [coverImg, setCoverImg] = useState();

  useEffect(() => {
    // let tempVideoId = "";
    // axios
    //   .get("http://localhost:8080/feed")
    //   .then((res) => {
    //     console.log(res.data);
    //     setData(res.data);
    //     tempVideoId = res.data[0].videoId;
    //     let [a, b] = tempVideoId.split("=");
    //     if (b) {
    //       setVideoId(b);
    //     }
    //     setCoverImg(res.data[0].imageUrlPath);
    //   })
    //   .then(() => {
    // if (videoId) {
    //   initializePlayer(videoId);
    // }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    console.log("musiccontoller, useEffect");
    console.log(videoId);
    if (videoId) {
      initializePlayer(videoId);
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
    // eslint-disable-next-line
  }, [videoId]);

  const initializePlayer = (videoId) => {
    console.log("musiccontroller, initializePlayer");
    console.log(videoId);
    setPlayer(
      new window.YT.Player("player", {
        height: "0",
        width: "0",
        videoId: videoId,
        // videoId: "JGwWNGJdvx8", //music id, 일단 임의로 지정해둠
        playerVars: {
          rel: 0,
          controls: 0,
          autoplay: 1,
          loop: 1,
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
    );
  };

  const onPlayerReady = (event) => {
    setVideoTitle(event.target.getVideoData().title);
    setTotalTime(event.target.getDuration());
    setInterval(updateProgressBar, 1000);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const updateProgressBar = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const seekToTime = (value) => {
    const duration = player.getDuration();
    const seekTime = (value / 100) * duration;
    player.seekTo(seekTime);
  };

  const changeVolume = (newVolume) => {
    player.setVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <>
      <div id="player"></div>
      <Card
        sx={{
          display: "flex",
          background: "transparent",
          color: "white",
          backgroundColor: "#003a88",
          borderRadius: "1rem",
          padding: "0.8rem",
          margin: "0.8rem",
          width: 500,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <div style={{ maxWidth: 200 }}>{videoTitle}</div>
          </CardContent>
          <div style={{ maxWidth: 200, margin: "auto" }}>
            <input
              type="range"
              value={progress}
              onChange={(e) => seekToTime(e.target.value)}
              style={{ margin: "auto", width: 200 }}
            />
            <span>{formatTime(currentTime)}</span> /
            <span>{formatTime(totalTime)}</span>
          </div>
          <div style={{ maxWidth: 200, margin: "auto" }}>
            <input
              type="range"
              value={volume}
              onChange={(e) => changeVolume(e.target.value)}
              min="0"
              max="100"
              style={{ margin: "auto", width: 200 }}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
            style={{ margin: "auto" }}
          >
            <IconButton
              aria-label="previous"
              sx={{
                color: "white",
              }}
            >
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause" onClick={togglePlayPause}>
              {isPlaying ? (
                <PauseIcon sx={{ height: 38, width: 38, color: "white" }} />
              ) : (
                <PlayArrowIcon sx={{ height: 38, width: 38, color: "white" }} />
              )}
            </IconButton>
            <IconButton
              aria-label="next"
              sx={{
                color: "white",
              }}
            >
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: 210,
            height: 210,
            background: "black",
            borderRadius: "1rem",
            margin: "auto",
          }}
          image={coverImg ? coverImg : null}
          alt="앨범커버"
        />
      </Card>
      <MusicSearch setVideoId={setVideoId} setCoverImg={setCoverImg} />
    </>
  );
}
