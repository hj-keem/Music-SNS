import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Paper,
  IconButton,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";

import Appbars from "../components/appbars";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

let FeedWrap = styled.div`
  // background: #00457e;
  background: #dfe9f5;
  margin: 2rem;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0.2rem 0.2rem 1rem black;
  // color: white;
  color: black;
`;
let LCwrap = styled.div`
  padding: 0.5rem;
`;

let HashTag = styled.div`
  padding: 0.5rem;
`;
let Title = styled.div`
  padding: 0.5rem;
  font-size: 1.5rem;
`;
let ProfileImg = styled.div`
  border-radius: 10rem;
  background: black;
  width: 2rem;
  float: left;
  font-size: 1.5rem;
  margin-right: 1rem;
`;
let Username = styled.div`
  font-weight: 1rem;
  font-size: 1.2rem;
`;
let Time = styled.div``;
let BottomBox = styled.div``;
let CommentBox = styled.div``;
let LikeText = styled.div`
  margin-left: 5rem;
`;
let Icons = styled.div`
  float: left;
`;
let Contents = styled.div`
  margin: 0.5rem;
`;

function Feeddetail() {
  let navigate = useNavigate();
  const [like, setLike] = useState(false);
  const likes = 10;
  const [title, setTitle] = useState();
  const [nickname, setNickname] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [content, setContent] = useState();
  const [comment, setComment] = useState([]);
  const [viewComment, setViewComment] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8080/feed").then((res) => {
      console.log(res.data);
      setTitle(res.data[0].title);
      setNickname(res.data[0].nickname);
      setContent(res.data[0].content);
      setDate(res.data[0].date);
      setTime(res.data[0].time);
    });
    axios.get("http://localhost:8080/comment").then((res) => {
      console.log(res.data);
      setComment(res.data);
    });
  }, []);

  const deleteFeed = () => {
    axios.delete("http://localhost:8080/");
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Appbars></Appbars>
      <Box
        sx={{
          margin: "auto",
          marginTop: "1.2rem ",
          maxWidth: 500,
        }}
      >
        <Stack spacing={2}>
          <FeedWrap>
            <Paper
              elevation={3}
              style={{
                borderRadius: "1rem",
                padding: "0.8rem",
              }}
            >
              <ProfileImg>ㅁ</ProfileImg>
              <Username>{nickname}</Username>
              <Time>
                {date} {time}
              </Time>
              <IconButton>
                <MoreHorizIcon
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                ></MoreHorizIcon>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/updatefeed");
                    }}
                  >
                    수정하기
                  </MenuItem>
                  <MenuItem onClick={deleteFeed}>삭제하기</MenuItem>
                </Menu>
              </IconButton>
            </Paper>
            <div
              style={{
                background: "lightgrey",
                // width: "30rem",
                // height: "30rem",
                margin: "auto",
                borderRadius: "1rem",
                height: "10rem",
                marginTop: "0.8rem",
                marginBottom: "0.8rem",
              }}
            >
              a
            </div>
            <BottomBox>
              <Paper
                elevation={3}
                style={{
                  borderRadius: "1rem",
                  padding: "0.8rem",
                }}
              >
                <LCwrap>
                  <Icons>
                    <IconButton
                      onClick={() => {
                        if (like) {
                          setLike(false);
                        } else {
                          setLike(true);
                        }
                      }}
                    >
                      {like ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    </IconButton>
                    <IconButton>
                      <AddCommentIcon
                        onClick={() => {
                          if (viewComment) {
                            setViewComment(false);
                          } else {
                            setViewComment(true);
                          }
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <BookmarkAddIcon />
                    </IconButton>
                  </Icons>
                  <LikeText>{likes}명이 좋아합니다.</LikeText>
                </LCwrap>
                <Title>{title}</Title>
                <Contents>{content}</Contents>
                <HashTag>해시태그 : #블랙핑크</HashTag>
                {viewComment ? (
                  <CommentBox>
                    {comment
                      ? comment.map(function (i, b) {
                          return (
                            <>
                              <Paper
                                elevation={3}
                                style={{
                                  marginTop: "0.4rem",
                                  borderRadius: "1rem",
                                  padding: "0.8rem",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginRight: "0.8rem",
                                  }}
                                >
                                  {i.nickname}
                                </span>
                                {i.comment}
                              </Paper>
                            </>
                          );
                        })
                      : null}
                    <TextField
                      fullwidth
                      style={{ width: "100%" }}
                      id="fullwidth"
                      label="댓글달기"
                      variant="standard"
                    />
                  </CommentBox>
                ) : null}
              </Paper>
            </BottomBox>
          </FeedWrap>
        </Stack>
      </Box>
    </>
  );
}

export default Feeddetail;
