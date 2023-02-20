import { TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChk, setPasswordChk] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [pswdErr, setPswdErr] = useState(false);
    const [pswdChkErr, setPswdChkErr] = useState(false);

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handlePasswordChk = (evt) => {
        setPasswordChk(evt.target.value)
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


    const handleRegisterClick = () => {
        
    }   


    return (<section className="authOutlineContainer">

        <div className="authBox">
            <Typography variant="h6">Register</Typography>
            <TextField
                value={email}
                onChange={handleEmailChange}
                placeholder="*id"
                error={emailErr}
                label={"*id"} />

            <TextField
                onChange={handlePasswordChange}
                value={password}
                error={pswdErr}
                placeholder="*password"
                type="password"
                label={"*password"} />

            <TextField
                error={pswdChkErr}
                onChange={handlePasswordChk}
                value={passwordChk}
                placeholder="*password check"
                type="password"
                label={"*password check"} />

            <button className="LoginBtn" onClick={handleRegisterClick}>회원가입</button>
        </div>








    </section>);
}
