
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./style/authpage.css"

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleEmailChange = (evt)=>{
        setEmail(evt.target.value)
    }

    const handlePasswordChange = (evt)=>{
        setPassword(evt.target.value)
    }
    
    //로그인은 AuthContext에서 처리
    const handleLoginClick = ()=>{

    }





    return (<section className="authOutlineContainer">
        
        <div className="authBox">
            <Typography variant="h6">Login</Typography>
            <TextField
            value={email}
            onChange={handleEmailChange}
            placeholder="*id" 
            label={"*id"} />

            <TextField 
            onChange={handlePasswordChange}
            value={password}
            placeholder="*password" 
            type="password"
            label={"*password"} />

            <button className="LoginBtn" onClick={handleLoginClick}>로그인</button>
        </div>
    </section>);
}
