import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Appbars from "../components/appbars";

import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";

let WholeWrap = styled.div`
  margin: 2rem;
`;
let ProfileImg = styled.div`
  border-radius: 2rem;
  background: grey;
  width: 4rem;
  height: 4rem;
`;
let FFS = styled.div`
  margin-left: 8rem;
  flex: 1;
`;
let TopWrap = styled.div`
  display: flex;
`;

function Mypage() {
  let navigate = useNavigate();
  const [follower, setFollower] = useState(11);
  const [following, setFollowing] = useState(9);
  const [scrap, setScrap] = useState(13);
  const [data, setData] = useState([]);
  // useEffect로 피드 데이터 불러오기
  useEffect(() => {
    axios.get("http://localhost:3000/sns").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <Appbars />
      <WholeWrap>
        <TopWrap>
          <ProfileImg>프사</ProfileImg>
          <FFS>
            <tr style={{ fontSize: "1.6rem", textAlign: "center" }}>
              <th>
                <IconButton
                  onClick={() => {
                    navigate("/follower");
                  }}>
                  팔로워
                </IconButton>
              </th>
              <th>|</th>
              <th>
                <IconButton
                  onClick={() => {
                    navigate("/following");
                  }}>
                  팔로잉
                </IconButton>
              </th>
              <th>|</th>
              <th>
                <IconButton
                  onClick={() => {
                    navigate("/scrap");
                  }}>
                  스크랩
                </IconButton>
              </th>
            </tr>
            <tr style={{ fontSize: "1.6rem", textAlign: "center" }}>
              <td>{follower}</td>
              <td>|</td>
              <td>{following}</td>
              <td>|</td>
              <td>{scrap}</td>
            </tr>
          </FFS>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              navigate("/mypageset");
            }}
            color="inherit">
            <SettingsIcon></SettingsIcon>
          </IconButton>
        </TopWrap>
        <Paper elevation={3} style={{ padding: "0.8rem", margin: "0.8rem" }}>
          <Box
            sx={{
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
              },
            }}>
            <List
              sx={{
                width: "100%",
                // maxWidth: 360,
                bgcolor: "background.paper",
              }}>
              {data.map(function (i, b) {
                return (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemText primary={i.title} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })}
            </List>
          </Box>
        </Paper>
      </WholeWrap>
    </>
  );
}
export default Mypage;
