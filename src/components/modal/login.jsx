import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginModal({ open, onOpen }) {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/auth")
    }

    return (
        <Modal
            open={open}
            onClose={onOpen}
        >
            <div className='final-update-chkbox'>
                <p className='no-data-ment'>로그인 후 이용해주세요.</p>
                <button onClick={handleLogin}>로그인 페이지로 바로가기</button>
            </div>
        </Modal>);
}

export default LoginModal;