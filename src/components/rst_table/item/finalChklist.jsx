
import { Box } from "@mui/system";

function FinalChkList({ item }) {

    function DateFormatter(date) {
        
    let year = String(date).slice(2, 4);
    let mon = String(date).slice(4, 6);
    let day = String(date).slice(6, 8);
    let hour = String(date).slice(8, 10);
    let min = String(date).slice(10, 12);

    return `${year}/${mon}/${day} ${hour}:${min}`
    }

    return (<>
        {item &&
            <>
                <Box className={"modal-itembox"}>
                    <p className="finish-modal-typo modal-title">{item.flag}</p>

                    <div className="finish-modal-item-box">
                        <p className="finish-modal-typo">항공사 : {item.airlineNm}</p>
                        <p className="finish-modal-typo">도착 공항 : {item.arrAirportNm}</p>
                        <p className="finish-modal-typo">도착 날짜 : {DateFormatter(item.arrPlandTime)}</p>
                        <p className="finish-modal-typo">출발 공항 : {item.depAirportNm}</p>
                        <p className="finish-modal-typo">출발 날짜 : {DateFormatter(item.depPlandTime)}</p>
                        <p className="finish-modal-typo">항공편명 : {item.vihicleId}</p>
                    </div>
                </Box>
            </>
        }
    </>);
}

export default FinalChkList;