
import { Box } from "@mui/system";

function FinalChkList({ item }) {

    console.log(item)
    function DateFormatter(date) {
        
        let formatter = new Intl.DateTimeFormat("ko")
    
        if (date) {
            return `${formatter.format(date)}`
        } else {
            return `${formatter.format(0)}`
        }
    }
    
    return (<>
        {item &&
            <>
                    <Box className={"modal-itembox"}>
                        <p className="finish-modal-typo modal-title">{item.flag}</p>

                        <div className="finish-modal-item-box">
                        <p className="finish-modal-typo">{item.airlineNm}</p>
                        <p className="finish-modal-typo">{item.arrAirportNm}</p>
                        <p className="finish-modal-typo">{DateFormatter(item.arrPlandTime)}</p>
                        <p className="finish-modal-typo">{item.depAirportNm}</p>
                        <p className="finish-modal-typo">{item.depPlandTime}</p>
                        <p className="finish-modal-typo">{item.vihicleId}</p>
                        </div>
                    </Box>
    

            </>
      }
    </>);
}

export default FinalChkList;