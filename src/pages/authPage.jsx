

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import "./style/authpage.css"
import { FormControl, IconButton, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";


import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState(false);
  const [pswdErr, setPswdErr] = useState(false);
  const [pswdView, setPswdView] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value)
  }

  //로그인은 AuthContext에서 처리
  const handleLoginClick = async () => {

    if (!pswdErr && !emailErr) {
      let login_result = await ctx.handleCtxLoginReq(email, password);
      //정규식 추가

      if (login_result.result) { //로그인 성공하면
        navigate('/searching'); //searching으로 가기.
        setLoginError(false);

        //input value 비워주기
        setPassword("");
        setEmail("");

      } else {

        //로그인 에러 true : 에러멘트 보여주고 패스워드 및 아이디 input value 비워주기
        setLoginError(true);

        setPassword("");
        setEmail("");
      }

    } else {
      setLoginError(true)
    }

  }


  const handleVisible = () => { //password 확인할 수 있는 아이콘 생성
    setPswdView(c => !c)
  }


  return (<section className="authOutlineContainer" >

    <div className="authBox">
      <Typography variant="h6">Login</Typography>



      <TextField
        className="authInput"
        value={email}
        onChange={handleEmailChange}
        placeholder="*id"
        error={emailErr}
        label={"*id"} />

      <FormControl className="authInput">
        <InputLabel>*Password</InputLabel>
        <OutlinedInput
          onChange={handlePasswordChange}
          value={password}
          placeholder="*password"
          type={pswdView ? "text" : "password"}
          label={"*password"}
          endAdornment={
            !pswdView ? <IconButton onClick={handleVisible}><VisibilityIcon /></IconButton>
              : <IconButton onClick={handleVisible}><VisibilityOffIcon /></IconButton>
          }
        />
      </FormControl>




      {loginError &&
        <div className="err_box">
          <p className="err_ment">아이디 또는 비밀번호를 잘못 입력했습니다.</p>
          <p className="err_ment">입력하신 내용을 다시 확인해주세요.</p>
        </div>
      }

      <button className="LoginBtn" type="submit" onClick={handleLoginClick} >로그인</button>
      <a href="/register">회원가입으로 바로가기</a>

    </div>
  </section>);
}
