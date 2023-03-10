import { FormControl, IconButton, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { UserRegisterReq } from "../util/authAPI";
import { useNavigate } from "react-router-dom";
import AddressModal from "../components/modal/address";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChk, setPasswordChk] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [idErr, setIdErr] = useState(false);
    const [pswdErr, setPswdErr] = useState(false);
    const [pswdChkErr, setPswdChkErr] = useState(false);
    const [pswdView, setPswdView] = useState(false);
    const [pswdChkView, setPswdChkView] = useState(false);
    const [resultErr, setResultErr] = useState(false);
    const [addressErr, setAddressErr] = useState(false);
    const [addressModal, setAddressModal] = useState(false);
    const [numberErr, setNumberErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    
    const [userName,setUserName]= useState("");
    const [userNameErr, setUserNameErr] =useState(false);
    const navigate = useNavigate();

    const handleIdChange = (evt) => {
        setId(evt.target.value)
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
        let idReg = /^[a-z0-9_]{4,8}$/g;

        if (id.length > 0 && !idReg.test(id)) {
            setIdErr(true);
        } else {
            setIdErr(false);
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

        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailReg.test(email)) {
            setEmailErr(false)
        } else {
            setEmailErr(true)
        }

        if(!userName){
            setUserNameErr(true)
        }
    }, [id, password, passwordChk, email, userName])


    const handleRegisterClick = async () => {
        if (!address) setAddressErr(true);
        if (!phoneNumber) setNumberErr(true);
        if (!idErr && !pswdErr && !pswdChkErr && !addressErr && !emailErr && id && password && address && phoneNumber && email && userName) {

            let data = {
                id: id,
                pw: password,
                address: address,
                email:email,
                phoneNumber:phoneNumber,
                name:userName
            }

            let result = await UserRegisterReq(data);
            if (result.status === 200) {
                navigate("/auth");
                setResultErr(false);
                setPassword("");
                setId("");
                setPasswordChk("");
                setEmail("")
                setAddress("")

            } else {
                console.log("register error--!");
                setResultErr(true);
                setPassword("");
                setId("");
                setPasswordChk("");
                setEmail("")
                setAddress("")
            }

        } else {
            console.log("????????? ??????????????? ???????????????")
            setResultErr(true);

        }
    }
    const handleAddressModal = () => {
        setAddressModal(c => !c)
    }

    const handleAddress = (val) => {
        console.log(val)
        setAddress(val);
        setAddressErr(false);
    }



    const handlePhoneNumber = (e) => {
        const inputText = e.target.value.replace(/[^0-9]/g, '');

        let length = inputText.length;
        if (length < 4) {
            e.target.value = inputText;
        } else if (length < 7) {
            e.target.value = inputText.slice(0, 3) + '-' + inputText.slice(3);
        } else if (length < 11) {
            e.target.value = inputText.slice(0, 3) + '-' + inputText.slice(3, 6) + '-' + inputText.slice(6);
        } else {
            e.target.value = inputText.slice(0, 3) + '-' + inputText.slice(3, 7) + '-' + inputText.slice(7, 11);
        }

        setPhoneNumber(e.target.value);
        setNumberErr(false);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleName = (e)=>{
        setUserName(e.target.value);
        setUserNameErr(false);
    }

    return (<section className="authOutlineContainer">


        <div className="authBox registerBox">

            <Typography variant="h6" className="auth-title">????????????</Typography>

            <TextField
                className="register_input"
                value={id}
                onChange={handleIdChange}
                placeholder="*id"
                error={idErr}
                label={"*id"} />

            {idErr && <p className="err_ment">4~8?????? ?????? ?????????, ????????? ????????????(_)??? ?????? ???????????????.</p>}

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

            {pswdErr && <p className="err_ment">8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????.</p>}


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
            {pswdChkErr && <p className="err_ment">??????????????? ???????????? ????????????.</p>}

            <FormControl variant="outlined" className="pswd">
                <InputLabel>*Name</InputLabel>
                <OutlinedInput
                    className="register_input"
                    placeholder="????????? ???????????????."
                    label={"*Name"}
                    value={userName}
                    onChange={handleName}
                />
            </FormControl>
            {userNameErr && <p className="err_ment">????????? ???????????????.</p>}

            <FormControl variant="outlined" className="pswd" onClick={handleAddressModal}>
                <InputLabel>*Address</InputLabel>
                <OutlinedInput
                    className="register_input"
                    placeholder="????????? ???????????????."
                    label={"*address"}
                    value={address}
                />
            </FormControl>
            {addressErr && <p className="err_ment">????????? ???????????????.</p>}

            <FormControl variant="outlined" className="pswd">
                <InputLabel>*PhoneNumber</InputLabel>
                <OutlinedInput
                    onChange={handlePhoneNumber}
                    className="register_input"
                    placeholder="010-0000-0000"
                    label={"*PhoneNumber"}
                    value={phoneNumber}
                    pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                />
            </FormControl>
            {numberErr && <p className="err_ment">??????????????? ???????????????.</p>}


            <FormControl variant="outlined" className="pswd">
                <InputLabel>*Email</InputLabel>
                <OutlinedInput
                    onChange={handleEmail}
                    className="register_input"
                    placeholder="???????????? ???????????????."
                    label={"*Email"}
                    value={email}
                />
            </FormControl>
            {emailErr && <p className="err_ment">???????????? ????????? ?????? ???????????????.</p>}


            <button className="LoginBtn" onClick={handleRegisterClick}>????????????</button>

            {resultErr && <div className="finalRegisterErr">
                <p className="err_ment registerFinalTypo">??????????????? ?????????????????????.</p>
            </div>}

            <AddressModal open={addressModal} onOpen={handleAddressModal} onAddress={handleAddress} />


        </div>

    </section>);
}
