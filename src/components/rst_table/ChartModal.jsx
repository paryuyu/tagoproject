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
        if (Array.isArray(ctx.searchingData)) {
            setAirline(ctx.searchingData[0]?.airlineNm)
            setArrNm(ctx.searchingData[0]?.arrAirportNm)
            setDepNm(ctx.searchingData[0]?.depAirportNm)
        }
    }, [open])

    const handleClose = ()=>{
        onClose()
    }

    return (<>
        <Modal
            open={open}
            onClose={handleClose}>

            <div className="modalBox">
                <DataCharts onChartOpen={onOpen} airline={airline} arr={arrNm} dep={depNm}/>
            </div>
        </Modal>

    </>);
}
