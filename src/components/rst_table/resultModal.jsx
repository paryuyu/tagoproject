import { Modal } from "@mui/material";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/auth_context";
import { LookupContext } from "../../context/lookup_context";
import FinalChkList from "./item/finalChklist";

export default function ResultModal({ open, onOpen, updateData }) {
    const ctx = useContext(LookupContext);
    const authCtx = useContext(AuthContext);
    const [addDataState, setAddDataState] = useState(false);
    const navigate = useNavigate();

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
        
        let result = await ctx.handleCtxUpdate(CudFinalData)
        


        //서버 통신 결과
        // if (result.status === 200) {
        //     //검색 키워드 기억하고 있다가 다시 요청을 보내야함(Search 가공)
        //     console.log("update success-->refresh..!(다시 한번 find 요청 보내기)")
        //     onOpen()
        // } else {
        //     console.log("update failed..!")
        //     onOpen()
        // }
    }

    return (<>
        <Modal
            open={open}
            onClose={onOpen}>

            <div className='final-update-chkbox'>
                {authCtx.auth ?
                    updateData.length !== 0 ?
                        <>
                            <div className="modalbox">
                                {updateData.map((one, index) => <FinalChkList item={one} key={index} />)}
                            </div>
                            <p className="ment modalText">완료하기를 누르시면 데이터가 영구적으로 수정됩니다. <br /> 수정하시겠습니까?</p>
                            <div className="modalBtnBox">
                                <button onClick={handleUpdateFinish} className="modalBtn completeBtn">수정완료하기</button>
                                <button onClick={onOpen} className="modalBtn">돌아가기</button>
                            </div>
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
