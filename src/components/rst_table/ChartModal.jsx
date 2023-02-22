import { BsArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import DataCharts from "./dataCharts";
import { Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";


export default function ChartModal({ onClose, onOpen, open }) {

    let ctx = useContext(LookupContext);
    const [arrNm, setArrNm] = useState("")
    const [depNm, setDepNm] = useState("")
    const [airline,setAirline] =useState("")
    useEffect(() => {
        if (ctx.raw?.item?.length > 0) {
            console.log(ctx,"<==setAirline")
            
            setAirline(ctx?.raw?.item[0]?.airlineNm)
            setArrNm(ctx?.raw?.item[0]?.arrAirportNm)
            setDepNm(ctx?.raw?.item[0]?.depAirportNm)
        }
    }, [ctx.raw])
    const handleClose = ()=>{
        onClose()
    }
    return (<>
        <Modal
            open={open}
            onClose={handleClose}>

            <div className="modalBox">
                <div className="modalheaderBox">
                    <MdClose className="closeIcon" onClick={handleClose} />
                    <div className="modalTypoBox">
                        <p>{depNm}</p>
                        <BsArrowRight className="arrowIcon" />
                        <p>{arrNm}</p>
                    </div>
                </div>
                <DataCharts onChartOpen={onOpen} airline={airline} arr={arrNm} dep={depNm}/>
            </div>
        </Modal>

    </>);
}
