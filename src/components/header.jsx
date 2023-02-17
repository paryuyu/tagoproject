import { Outlet } from "react-router-dom";
import "./style/components.css"

function Header() {
    return ( <div className="headerBox">
    <h1 className="headerTypo">국내 항공 조회 서비스</h1>
    <Outlet/>
    </div> );
}

export default Header;