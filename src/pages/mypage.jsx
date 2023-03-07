import { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth_context";

export default function Mypage() {
    let authCtx = useContext(AuthContext);

    const { pathname } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (pathname === "/mypage" && !authCtx?.auth?.userId) {
            navigate("/auth")
        }
    }, [authCtx?.auth])

    return (<section className="authOutlineContainer mypageOutlined" >
        <h2>My Page</h2>
        <div className="mypage-hello">
            <p className="mypageTypo">안녕하세요.</p>
            <p className="mypageTypo"> <b>{authCtx?.auth?.userId}</b>님.</p>
        </div>
    </section>);
}