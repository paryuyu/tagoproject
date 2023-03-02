import { useContext, useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import "./style/components.css"


export default function Layout() {
    const authCtx = useContext(AuthContext);

    const navigate = useNavigate()

    const { pathname } = useLocation();

    const handleAuth = () => {
        if (authCtx.auth) {
            authCtx.dispatch({ type: "logout" });
            localStorage.removeItem("access_token");

        } else {
            navigate("/auth")
        }
    }

    const handleNavigation = () => {
        navigate("/searching")
    }

    useEffect(()=>{
        console.log(authCtx.auth,'<==auth')
    },[])
    useEffect(() => {

        if (pathname === "/") {
            navigate("/searching")
        }

        if (pathname === "/auth" && authCtx.auth) {
            navigate("/searching")
        } else if (pathname === "/register" && authCtx.auth) {
            navigate("/searching")
        }

        if (pathname === "/searching") {
            document.title = "TAGO: 항공정보검색"
        }

        if (pathname === "/auth") {
            document.title = "TAGO: 로그인"
        }

        if (pathname === "/register") {
            document.title = "TAGO: 회원가입"
        }

    }, [pathname, authCtx])


    return (<div className="headerBox">
        <header>
            <div className="headerIconBox" onClick={handleNavigation}>
                <img src="flightImg.png" className="homeImg"/>
                <h1 className="headerTypo" >국내 항공 조회 서비스</h1>
            </div>
            <button onClick={handleAuth} className="headerloginBtn">{authCtx.auth ? "로그아웃" : "로그인"}</button>
        </header>

        <Outlet />

        <footer >
            <p className="footer-ment">openAPI를 활용한 검색 서비스입니다.</p>
        </footer>

    </div>);
}