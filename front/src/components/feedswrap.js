import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import axios from "axios";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";

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
let Idwrap = styled.div`
  padding: 0.5rem;
  background: white;
  border-radius: 1rem;
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
  font-size: 1.5rem;
`;
let BottomBox = styled.div`
  border-radius: 1rem;
  background: white;
  padding: 0.5rem;
`;
let LikeText = styled.div`
  margin-left: 5rem;
`;
let Icons = styled.div`
  float: left;
`;
let Contents = styled.div`
  margin: 0.5rem;
`;

export default function Feedswrap() {
  const likes = 10;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/sns").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <Box
      sx={{
        width: "50%",
        margin: "auto",
      }}>
      <Stack spacing={2}>
        {data.map(function (i, b) {
          return (
            <>
              <FeedWrap>
                <Idwrap>
                  <ProfileImg>ㅁ</ProfileImg>
                  <Username>{i.nickname}</Username>
                </Idwrap>
                <div
                  style={{
                    background: "lightgrey",
                    width: "37rem",
                    height: "30rem",
                    margin: "auto",
                    borderRadius: "1rem",
                  }}></div>
                <BottomBox>
                  <LCwrap>
                    <Icons>
                      <ThumbUpOffAltIcon />
                      <AddCommentIcon />
                    </Icons>
                    <LikeText>{likes}명이 좋아합니다.</LikeText>
                  </LCwrap>
                  <Title>{i.title}</Title>
                  <HashTag>해시태그 : #블랙핑크</HashTag>
                  <Contents>{i.content}</Contents>
                </BottomBox>
              </FeedWrap>
            </>
          );
        })}
      </Stack>
    </Box>
  );
}