// import { Login } from "@mui/icons-material";
import { Avatar, Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";
import { AuthContext } from "../../context/auth_context";
import { Login, Logout, Search, SearchOff, SearchOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function MobileDrawer({ onDraw, drawerOpen }) {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (authCtx.auth) {
            authCtx.dispatch({ type: "logout" });
            // localStorage.removeItem("access_token")
            localStorage.clear();
            onDraw();
        } else {
            navigate("/auth");
            onDraw();
        }
    }
    const handleSearching = ()=>{
        navigate("/searching");
        onDraw();
    }

    const handleMypage = ()=>{
        navigate("/mypage");
        onDraw();
    }
    
    return (<Drawer
        anchor="right"
        open={drawerOpen}
        onClose={onDraw}
    >
        <List className="menuBox">
            {authCtx.auth &&
            
            <ListItem className="menuItem"  onClick={handleMypage}>
                <ListItemAvatar><Avatar className="drawer-avatar"><PersonIcon /></Avatar></ListItemAvatar>
                <ListItemText>{authCtx.auth.userId}님의 정보</ListItemText>
            </ListItem>}
            <ListItem className="menuItem" onClick={handleSearching}>
                <ListItemAvatar><Avatar className="drawer-avatar"><Search /></Avatar></ListItemAvatar>
                <ListItemText>항공편 검색</ListItemText>
            </ListItem>
            <ListItem className="menuItem" onClick={handleNavigation}>
                <ListItemAvatar><Avatar className="drawer-avatar">{!authCtx.auth ? <Login /> : <Logout />}</Avatar></ListItemAvatar>
                <ListItemText>{!authCtx.auth ? "로그인" : "로그아웃"}</ListItemText>
            </ListItem>
        </List>
    </Drawer>);
}

export default MobileDrawer;