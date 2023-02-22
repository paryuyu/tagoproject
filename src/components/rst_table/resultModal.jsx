import { Modal } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/auth_context";
import FinalChkList from "./item/finalChklist";

export default function ResultModal({ open, onOpen, updateData, onUpdate }) {

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = ()=>{
        navigate("/auth")
    }

    return (<>
        <Modal
            open={open}
            onClose={onOpen}>

            <div className='final-update-chkbox'>

                {authCtx.auth ? 
                updateData.length !== 0 ?
                    <>
                        {updateData.map((one, index) => <FinalChkList item={one} key={index} />)}
                        <button onClick={onUpdate}>수정완료하기</button>
                    </>
                    :
                    <>
                        <p className='no-data-ment'>수정데이터가 없습니다.</p>
                        <button onClick={onOpen}>돌아가기</button>
                    </>
                    :
                    <>
                     <p className='no-data-ment'>로그인 후 이용해주세요.</p>
                        <button onClick={handleLogin}>로그인 페이지로 바로가기</button>
                    </>
                }

            </div>
        </Modal>

    </>);
}
