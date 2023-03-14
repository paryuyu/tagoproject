import { Modal } from "@mui/material";
import _ from "lodash";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/auth_context";
import { LookupContext } from "../../context/lookup_context";
import LoginModal from "../modal/login";
import FinalChkList from "./item/finalChklist";

export default function ResultModal({ open, onOpen, updateData }) {
    const ctx = useContext(LookupContext);
    const authCtx = useContext(AuthContext);

    const navigate = useNavigate();
    const [updateState, setUpdateState] = useState(1);

    const handleLogin = () => {
        navigate("/auth")
    }

    const handleUpdateFinish = async () => {
        //비어있는 데이터 잡기 -> C
        let createCondition = updateData.filter(elm => elm.flag === "add").filter(one => {
            if (one.airlineNm && one.arrAirportNm && one.depAirportNm && one.vihicleId) {
                if (parseInt(one.arrPlandTime) > 0 && parseInt(one.depPlandTime) > 0) {
                    if (parseInt(one.economyCharge) >= 0 && parseInt(one.prestigeCharge) >= 0) {
                        return one;
                    }
                }
            }
        })

        //update Data 에서 add된 데이터(유일하게 name키가 있음)에서 삭제된 데이터는 빼고 update로 보내주기.
        let deleteCondition = updateData.filter(elm => elm.flag === "delete").filter(elm => !elm.name); //D

        //CUD Final Data
        let updateCondition = updateData.filter(elm => elm.flag === "update");
        let CudFinalData = createCondition.concat(deleteCondition).concat(updateCondition)
        setUpdateState(1);

        let result = await ctx.handleCtxUpdate(CudFinalData);

        // 서버 통신 결과
        if (result.status === 200 || result.status === 201) {
            setUpdateState(2);

        } else if (result.status >= 400) {
            setUpdateState(3);
        }

    }

    const handleReturn = () => {
        console.log("return", updateState)
        setUpdateState(1);
        onOpen();
    }

    return (<>
        {authCtx.auth ?
            <Modal
                open={open}
                onClose={onOpen}>

                <div className='final-update-chkbox'>
                    {updateData.length !== 0 ?
                        <>
                            <div className="modalbox">
                                {updateData.map((one, index) => <FinalChkList item={one} key={index} />)}
                            </div>



                            {updateState === 1 ? <p className="ment modalText">완료하기를 누르시면 데이터가 영구적으로 수정됩니다. <br /> 수정하시겠습니까?</p> :
                                updateState === 2 ?
                                    <p className="ment modalText updateSuccess">업데이트가 성공적으로 반영되었습니다.</p>
                                    :
                                    updateState === 3 && <p className="ment modalText updateErr">수정에 실패하였습니다.</p>
                            }

                            <div className="modalBtnBox">
                                <button onClick={handleUpdateFinish} className="modalBtn completeBtn">수정완료하기</button>
                                <button onClick={onOpen} className="modalBtn">돌아가기</button>
                                <p></p>
                            </div>
                        </>
                        :
                        <>
                            <p className='no-data-ment'>수정데이터가 없습니다.</p>
                            <button onClick={handleReturn}>돌아가기</button>
                        </>
                    }
                </div>
            </Modal>
            :
            <LoginModal open={open} onOpen={onOpen} />
        }
    </>);
}
