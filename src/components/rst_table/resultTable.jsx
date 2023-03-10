import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";
import ChartModal from "./ChartModal";
import DataGridTable from "./dataGridTable";
import "./style/resultTable.css"

export default function ResultTable({ searchingState }) {

    const [chartOpen, setChartOpen] = useState(false);
    let ctx = useContext(LookupContext);

    const handleChartOpen = () => {
        setChartOpen(c => !c)
    }

    const handleChartClose = () => {
        setChartOpen(false)
    }  

    
    
    return (<div className="tableBox">

        {searchingState ?
            !ctx.searchisLoading ?
                ctx.searchingData && ctx.searchingData.length > 0 ?
                    <>
                        <ChartModal onClose={handleChartClose} onOpen={handleChartOpen} open={chartOpen} />
                        <DataGridTable onChartOpen={handleChartOpen} />
                    </>
                    : <p className="ment"> 검색값이 존재하지 않습니다. </p>
                : <CircularProgress color="inherit" className="loadingProgress" />
            : <p className="ment">항공편을 조회해보세요.</p>}
    </div>);
}



