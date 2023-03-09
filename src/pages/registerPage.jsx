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
        let emailReg = /^[a-z0-9_]{4,8}$/g;

        if (email.length > 0 && !emailReg.test(email)) {
            setEmailErr(true);
        } else {
            setEmailErr(false);
        }

        let pswdReg = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=*.]).*$/;
        if (password.length > 0 && !pswdReg.test(password)) {
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

        if (!emailErr && !pswdErr && !pswdChkErr && email && password) {

            let data = {
                id: email,
                password: password
            }
            let result = await UserRegisterReq(data);
            if (result.status === 200) {
                navigate("/auth");
                setResultErr(false);
                setPassword("");
                setEmail("");
                setPasswordChk("");

            } else {
                console.log("register error--!");
                setResultErr(true);
                setPassword("");
                setEmail("")
                setPasswordChk("")
            }

        } else {
            console.log("아이디 비밀번호를 입력하세요")
            setResultErr(true);

        }
    }



    return (<section className="authOutlineContainer">


        <div className="authBox registerBox">

            <Typography variant="h6">Register</Typography>

            <TextField
                className="register_input"
                value={email}
                onChange={handleEmailChange}
                placeholder="*id"
                error={emailErr}
                label={"*id"} />

            {emailErr && <p className="err_ment">4~8자의 영문 소문자, 숫자와 특수기호(_)만 사용 가능합니다.</p>}

            <FormControl variant="outlined" className="pswd">
                <InputLabel>*Password</InputLabel>
                <OutlinedInput
                    className="register_input"
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

            {pswdErr && <p className="err_ment">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</p>}


            <FormControl variant="outlined" className="pswd">
                <InputLabel>*Password Check</InputLabel>
                <OutlinedInput
                    className="register_input"
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

            {pswdChkErr && <p className="err_ment">비밀번호가 일치하지 않습니다.</p>}

            <button className="LoginBtn" onClick={handleRegisterClick}>회원가입</button>

            {resultErr && <div className="finalRegisterErr">
                <p className="err_ment registerFinalTypo">회원가입에 실패하였습니다.</p>
                <p className="err_ment registerFinalTypo">아이디 비밀번호를 확인하세요.</p>
            </div>}



        </div>

    </section>);
}
