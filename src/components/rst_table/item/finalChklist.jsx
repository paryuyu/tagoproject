
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { DateFormatter } from "../options/formatter";

function FinalChkList({ item }) {
    const [addDataState, setAddDataState] = useState(false)
    const [flagClass,setFlagClass] =useState();

    useEffect(() => {

        setFlagClass(item.flag)
        
        if (Object.values(item).includes("add")) {
            //객체 반복문 => 새로운 객체 생성
            for (let i in item) {

                //도착시간 및 출발시간은 0보다 큰 숫자만 가능 
                if (i == "arrPlandTime" || i === "depPlandTime") {
                    parseInt(item[i]) > 0 ? setAddDataState(true) : setAddDataState(false)
                }

                //가격은 0원도 가능하지만 숫자만 가능 //TODO: 조건이 제대로 적용이 안됨.
                if(i === "economyCharge" || i === "prestigeCharge"){
                    console.log(!!parseInt(item[i]))
                    parseInt(item[i]) >= 0 ? setAddDataState(true) : setAddDataState(false)
                    parseInt(item[i]) ? setAddDataState(true) : setAddDataState(false); 
                }

                if(i === "airlineNm" || i === "arrAirportNm" || i === "depAirportNm" || i === "vihicleId"){
                    item[i] ? setAddDataState(true) :  setAddDataState(false)
                }
            }

        }

    }, [item])

    return (<>
        {item &&
            <>
                <Box className={"modal-itembox"}>
                    <p className={"finish-modal-typo modal-title "+flagClass}>{item.flag}</p>
                    
                    <div className="finish-modal-item-box">
                        <p className="finish-modal-typo">항공사 : {item.airlineNm}</p>
                        <p className="finish-modal-typo">도착 공항 : {item.arrAirportNm}</p>
                        <p className="finish-modal-typo">도착 날짜 : {DateFormatter(item.arrPlandTime)}</p>
                        <p className="finish-modal-typo">출발 공항 : {item.depAirportNm}</p>
                        <p className="finish-modal-typo">출발 날짜 : {DateFormatter(item.depPlandTime)}</p>
                        <p className="finish-modal-typo">항공편명 : {item.vihicleId}</p>
                        <p className="finish-modal-typo">이코노미운임 : {item.economyCharge}</p>
                        <p className="finish-modal-typo">비즈니스운임 : {item.prestigeCharge}</p>

                        {!addDataState && Object.values(item).includes("add") ? <p className="ment modalText">추가된 데이터가 비어있으면 수정에 반영되지 않습니다.</p> : <></>}

                    </div>
                </Box>
            </>
        }
    </>);
}

export default FinalChkList;