
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

function FinalChkList({ item }) {
    const [addDataState, setAddDataState] = useState(false)
    const [flagClass, setFlagClass] = useState();

    useEffect(() => {

        setFlagClass(item.flag)

        if (Object.values(item).includes("add")) {
            //객체 반복문 => 새로운 객체 생성

            if (item.airlineNm && item.arrAirportNm && item.depAirportNm && item.vihicleId) {
                if (parseInt(item.arrPlandTime) > 0 && parseInt(item.depPlandTime) > 0) {
                    if (parseInt(item.economyCharge) >= 0 && parseInt(item.prestigeCharge) >= 0) {
                        setAddDataState(true)
                    }
                }
            }
            // console.log(item)
        }

    }, [item])

    return (<>
        {item &&
            <>
                <Box className={"modal-itembox"}>

                    <table>
                        <thead>
                            <tr>
                                <th className={`UpdateTableTitle ${item.flag}`} colSpan={2}>{item.flag}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="datatitle">항공사</td>
                                <td>{item.airlineNm}</td>
                            </tr>
                            <tr>
                                <td className="datatitle">도착 장소</td>
                                <td>{item.arrAirportNm}</td>
                            </tr>
                            <tr>
                                <td className="datatitle">도착 날짜</td>
                                <td>{item.arrPlandTime}</td>
                            </tr>
                            <tr>
                                <td className="datatitle">출발 공항</td>
                                <td>{item.depAirportNm}</td>
                            </tr>
                            <tr>
                                <td className="datatitle">출발 날짜</td>
                                <td>{item.depAirportNm}</td>
                            </tr>
                            <tr>
                                <td className="datatitle">항공편 명</td>
                                <td>{item.vihicleId}</td>
                            </tr>
                            <tr>
                                <td className="datatitle">이코노미운임</td>
                                <td>{item.economyCharge}</td>
                            </tr>
                            <tr>
                                <td className="datatitle">비즈니스운임</td>
                                <td>{item.prestigeCharge}</td>
                            </tr>
                        </tbody>
                    </table>

                    {!addDataState && Object.values(item).includes("add") ? <p className="modalText">추가된 데이터는 정보값이 부족하면 수정에 반영되지 않습니다.</p> : <></>}
                </Box>
            </>
        }
    </>);
}

export default FinalChkList;