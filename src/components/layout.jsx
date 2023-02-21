import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style/components.css"


export default function Layout() {
    const navigate = useNavigate()
    const [auth, setAuth] = useState();

    const {pathname} = useLocation();
    console.log(pathname,'location')

    const handleLogin = ()=>{   
        navigate("/auth")
    }

   const handleNavigation = ()=>{
    navigate("/searching")
   }
    

    useEffect(()=>{
        // "/" 경로에서는 /searching으로 바로 이동
        if(pathname === "/"){
            navigate("/searching")
        }

        let getItem = localStorage.getItem("access_token");
        setAuth(getItem)
    },[])


    return (<div className="headerBox">
        <header>
            <h1 className="headerTypo" onClick={handleNavigation}>국내 항공 조회 서비스</h1>
            <button onClick={handleLogin} className="headerloginBtn">{"로그인"}</button>
        </header>

        <Outlet /> 

        <footer >
            <p className="footer-ment">openAPI를 활용한 검색 서비스입니다.</p>
        </footer>

    </div>);
}