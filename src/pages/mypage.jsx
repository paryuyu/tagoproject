import { useContext } from "react";
import { AuthContext } from "../context/auth_context";

export default function Mypage() {
    let authCtx = useContext(AuthContext);
    
    return (<section className="authOutlineContainer mypageOutlined" >
        <h2>My Page</h2>
        <p>안녕하세요. <b>{authCtx?.auth?.userId}</b>님.</p>

    </section>);    
}