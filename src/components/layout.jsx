import { useContext, useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import "./style/components.css"


export default function Layout() {
    const authCtx = useContext(AuthContext);

    const navigate = useNavigate()
    const [auth, setAuth] = useState();

    const { pathname } = useLocation();

    const handleAuth = () => {
        if(authCtx.auth){
            
            authCtx.dispatch({type:"logout"});
            localStorage.removeItem("access_token");

        }else{
            navigate("/auth")
        }
        
            
    }

    const handleNavigation = () => {
        navigate("/searching")
    }


    useEffect(() => {
        console.log(authCtx.auth, 'authCtx/layout')
        // "/" 경로에서는 /searching으로 바로 이동
        if (pathname === "/") {
            navigate("/searching")
        }

        let getItem = localStorage.getItem("access_token");
        setAuth(getItem)
    }, [])


    return (<div className="headerBox">
        <header>
            <h1 className="headerTypo" onClick={handleNavigation}>국내 항공 조회 서비스</h1>
            <button onClick={handleAuth} className="headerloginBtn">{authCtx.auth ? "로그아웃" : "로그인"}</button>
        </header>

        <Outlet />

        <footer >
            <p className="footer-ment">openAPI를 활용한 검색 서비스입니다.</p>
        </footer>

    </div>);
}