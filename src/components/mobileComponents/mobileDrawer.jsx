// import { Login } from "@mui/icons-material";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";
import { AuthContext } from "../../context/auth_context";
import { Login, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function MobileDrawer({ onDraw, drawerOpen }) {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (authCtx.auth) {
            authCtx.dispatch({ type: "logout" })
            localStorage.removeItem("access_token")
            onDraw();
        } else {
            navigate("/auth");
            onDraw();
        }
    }

    return (<Drawer
        anchor="right"
        open={drawerOpen}
        onClose={onDraw}
        >
        <List className="menuBox">
            {authCtx.auth && <ListItem className="menuItem">
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText>내정보</ListItemText>
            </ListItem>}
            <ListItem className="menuItem" onClick={handleNavigation}>
                <ListItemIcon>{!authCtx.auth ? <Login /> : <Logout />}</ListItemIcon>
                <ListItemText>{!authCtx.auth ? "로그인" : "로그아웃"}</ListItemText>
            </ListItem>
        </List>
    </Drawer>);
}

export default MobileDrawer;