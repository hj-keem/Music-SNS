import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";

import Appbars from "../components/appbars.js";
import Searchbox from "../components/searchbox.js";
import Feedswrap from "../components/feedswrap.js";

let MainWrap = styled.div`
  margin: auto;
  padding: 1rem;
`;

function Mainpage(props) {
  const cookies = new Cookies();
  const [JWT, setJWT] = useState();
  const [profileImg, setProfileImg] = useState();
  //쿠키에 있는 값을 꺼낼때
  const getCookie = (name) => {
    return cookies.get(name);
  };
  useEffect(() => {
    setJWT(getCookie("is_login"));
    check();
    axios
      .get("http://localhost:8080/users/mypage/" + props.username + "/follow")
      .then((res) => {
        console.log(res.data);
        setProfileImg(res.data.profileImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.username]);
  const check = () => {
    axios
      .post("http://localhost:8080/users/secure-resource", {
        headers: { Authorization: `Bearer ${JWT}` },
      })
      .then((res) => {
        console.log(res.data);
        props.setUsername(res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Appbars
        username={props.username}
        setUsername={props.setUsername}></Appbars>
      <MainWrap>
        <div style={{ margin: "auto" }}>
          <Searchbox />
          <Feedswrap username={props.username} profileImg={profileImg} />
        </div>
      </MainWrap>
    </>
  );
}
export default Mainpage;
