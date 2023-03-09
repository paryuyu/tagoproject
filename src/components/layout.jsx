import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import MobileDrawer from "./mobileComponents/mobileDrawer";
import PersonIcon from '@mui/icons-material/Person';
import "./style/components.css"
import RecentSeachingKeyword from "./rst_table/item/itemResearching";
import { MenuContext } from "../context/menu_context";

export default function Layout() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loginMouse, setLoginMouse] = useState(false);
    const authCtx = useContext(AuthContext);
    const menuCtx = useContext(MenuContext);
    const navigate = useNavigate()
    const { pathname } = useLocation();


    const handleAuth = () => {
        if (authCtx.auth) {
            authCtx.dispatch({ type: "logout" });
            // localStorage.removeItem("access_token");
            localStorage.clear();
        } else {
            navigate("/auth")
        }
    }

    const handleNavigation = () => {
        navigate("/searching")
    }

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

        if (pathname === "/mypage") {
            document.title = "TAGO: 마이페이지"
        }

    }, [pathname, authCtx])



    const handleDrawer = () => {
        setDrawerOpen(c => !c)
    }

    const handleMypage = () => {
        navigate("/mypage")
    }

    return (<div className="headerBox" onClick={menuCtx.handlePageClick}>
        <header>
            <div className="headerIconBox" onClick={handleNavigation}>
                <img src="flightImg.png" className="homeImg" />
                <h1 className="headerTypo" >국내 항공 조회 서비스</h1>
            </div>
            <div className="headerbtnBox">

                {authCtx.auth &&
                    <>
                        {pathname === "/searching" && <RecentSeachingKeyword />}
                        <div className="myPageIcon" onClick={handleMypage}>
                            <PersonIcon className="personIcon" />
                            <p className="userIdTypo">{authCtx?.auth?.userId}</p>
                        </div></>}

                <button onClick={handleAuth}
                    onMouseEnter={() => { setLoginMouse(true) }}
                    onMouseLeave={() => { setLoginMouse(false) }}
                    className="headerloginBtn">{authCtx.auth ? "로그아웃" : "로그인"}</button>
                    
                {loginMouse ?
                    authCtx.auth ?
                        <p className="loginMent">로그아웃하시면 서비스 이용이 제한됩니다.</p> :
                        <p className="loginMent">로그인하시면 더 많은 서비스를 이용하실 수 있습니다.</p>

                    : <></>}
            </div>

            <div className="headerMenuIconBox">
                <IconButton className="headerMenuIcon" onClick={handleDrawer}>
                    <MenuIcon />
                </IconButton>
            </div>
        </header>
        <MobileDrawer onDraw={handleDrawer} drawerOpen={drawerOpen} />
        <Outlet />

        <footer >
            <p className="footer-ment">openAPI를 활용한 검색 서비스입니다.</p>
        </footer>

    </div>);
}