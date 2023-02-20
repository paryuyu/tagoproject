
import { Box, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import "./style/authpage.css"
export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const [emailErr,setEmailErr] = useState(false);
    const [pswdErr,setPswdErr] = useState(false);
    
    const [loginError, setLoginError] = useState(false);

    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const handleEmailChange = (evt)=>{
        setEmail(evt.target.value)
    }

    const handlePasswordChange = (evt)=>{
        setPassword(evt.target.value)
    }
    
    //로그인은 AuthContext에서 처리
    const handleLoginClick = async ()=>{
      let login_result = await ctx.handleCtxLoginReq(email,password);
    //  console.log(login_result,'login_result')
      if(login_result){ //로그인 성공하면 /searching으로 가기.
        navigate('/searching');
        
        setLoginError(false);

        //input value 비워주기
        setPassword("");
        setEmail("")
      }else{
        //로그인 에러 true : 에러멘트 보여주고 패스워드 및 아이디 input value 비워주기
        setLoginError(true);

        setPassword("");
        setEmail("")
      } 
    }






    return (<section className="authOutlineContainer">
        
        <div className="authBox">
            <Typography variant="h6">Login</Typography>



            <TextField
            value={email}
            onChange={handleEmailChange}
            placeholder="*id" 
            error={emailErr}
            label={"*id"} />
            <TextField 
            onChange={handlePasswordChange}
            value={password}
            placeholder="*password" 
            type="password"
            label={"*password"} />
            
           {loginError &&  
           <div className="err_box">
           <p className="err_ment">아이디 또는 비밀번호를 잘못 입력했습니다.</p>
           <p className="err_ment">입력하신 내용을 다시 확인해주세요.</p>
            </div>
            } 

            <button className="LoginBtn" onClick={handleLoginClick}>로그인</button>
            <a href="/register">회원가입으로 바로가기</a>

        </div>




    </section>);
}
