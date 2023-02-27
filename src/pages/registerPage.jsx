import { FormControl, IconButton, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UserRegisterReq } from "../util/authAPI";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChk, setPasswordChk] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [pswdErr, setPswdErr] = useState(false);
    const [pswdChkErr, setPswdChkErr] = useState(false);
    const [pswdView, setPswdView] = useState(false);
    const [pswdChkView, setPswdChkView] = useState(false);

    const [resultErr, setResultErr] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handlePasswordChk = (evt) => {
        setPasswordChk(evt.target.value)
    }


    const handleVisible = () => {
        setPswdView(c => !c)
    }

    const handleChkVisible = () => {
        setPswdChkView(c => !c)
    }


    
    useEffect(() => {
        let emailReg = /[a-z]+[a-z0-9_]{5,9}$/g;
        if (email.length > 0 && !emailReg.test(email)) {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }

        if (password.length > 0 && password.length < 8) {
            setPswdErr(true);
        } else {
            setPswdErr(false);
        }

        if (password !== passwordChk) {
            setPswdChkErr(true);
        } else {
            setPswdChkErr(false);
        }

    }, [email, password, passwordChk])


    const handleRegisterClick = async () => {
        if(!emailErr && !pswdErr && !pswdChkErr){
            let data = {
                id: email,
                password: password
            }

            let result = await UserRegisterReq(data);

            if(result.status === 200){
                navigate("/auth");
                setResultErr(false);
                setPassword("");
                setEmail("");
                setPasswordChk("");

            }else{
                console.log("register error--!");
                setResultErr(true);
                setPassword("");
                setEmail("")
                setPasswordChk("")

            }

        }
    }



    return (<section className="authOutlineContainer">

        <div className="authBox registerBox">
            <Typography variant="h6">Register</Typography>
            <TextField
                value={email}
                onChange={handleEmailChange}
                placeholder="*id"
                error={emailErr}
                label={"*id"} />


            <FormControl variant="outlined" className="pswd">
                <InputLabel>*Password</InputLabel>
                <OutlinedInput
                    onChange={handlePasswordChange}
                    value={password}
                    error={pswdErr}
                    placeholder="*password"
                    type={pswdView ? "text" : "password"}
                    label={"*password"}
                    endAdornment={
                        !pswdView ? <IconButton onClick={handleVisible}><VisibilityIcon /></IconButton> : <IconButton onClick={handleVisible}><VisibilityOffIcon /></IconButton>
                    }

                /></FormControl>

            {pswdErr && <p className="err_ment register_input">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</p>}


            <FormControl variant="outlined" className="pswd">
                <InputLabel>*Password Check</InputLabel>
                <OutlinedInput
                    error={pswdChkErr}
                    onChange={handlePasswordChk}
                    value={passwordChk}
                    placeholder="*password check"
                    type={pswdChkView ? "text" : "password"}
                    label={"*password check"}
                    endAdornment={
                        !pswdChkView ? <IconButton onClick={handleChkVisible}><VisibilityIcon /></IconButton> : <IconButton onClick={handleChkVisible}><VisibilityOffIcon /></IconButton>
                    }
                />
            </FormControl>

            {pswdChkErr && <p className="err_ment register_input">비밀번호가 일치하지 않습니다.</p>}
            {resultErr && <p className="err_ment register_input">회원가입에 실패하였습니다.</p>}

            <button className="LoginBtn" onClick={handleRegisterClick}>회원가입</button>
        </div>

    </section>);
}
