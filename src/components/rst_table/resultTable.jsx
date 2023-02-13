import { CircularProgress, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";
import DataCharts from "./dataCharts";
import DataGridTable from "./dataGridTable";
import { BsArrowRight } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import "./resultTable.css"
export default function ResultTable({ searchingState }) {
    const [chartOpen, setChartOpen] = useState(false);
    const [modalTile, setModalTitle] = useState("")
    let ctx = useContext(LookupContext);

    const handleChartOpen = () => {
        setChartOpen(c => !c)
    }
    const handleChartClose = () => {
        setChartOpen(false)
    }
    useEffect(() => {
        if (ctx.raw.length > 0) {
            setModalTitle(ctx.raw.item[0].arrAirportNm)
        }
    }, [ctx.raw])
    
    return (<div className="tableBox">

        {searchingState ?
            !ctx.searchisLoading ?
                <>
                    <Modal
                        open={chartOpen}
                        onClose={handleChartClose}>

                        <div className="modalBox">
                            <div className="modalheaderBox">
                                <MdClose className="closeIcon" onClick={handleChartOpen} />
                                <div className="modalTypoBox">
                                    <p>{ctx?.raw?.item[0]?.depAirportNm}</p>
                                    <BsArrowRight className="arrowIcon" />
                                    <p>{ctx?.raw?.item[0]?.arrAirportNm}</p>
                                </div>
                            </div>
                            <DataCharts onChartOpen={handleChartOpen} />
                        </div>
                    </Modal>
                    <DataGridTable onChartOpen={handleChartOpen} />
                </>
                : <CircularProgress color="inherit" />

            : <p className="ment">항공편을 조회해보세요.</p>}
    </div>);
}



