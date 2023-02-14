import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";
import ChartModal from "./ChartModal";
import DataGridTable from "./dataGridTable";

import "./resultTable.css"
export default function ResultTable({ searchingState }) {

    const [chartOpen, setChartOpen] = useState(false);
    const [noResultMent, setNoresultMent] = useState("");
    const [noResultState, setNoresultState] = useState(false);
    let ctx = useContext(LookupContext);

    const handleChartOpen = () => {
        setChartOpen(c => !c)
    }
    const handleChartClose = () => {
        setChartOpen(false)
    }

    useEffect(() => {
        if (ctx.raw?.item === []) {
            setNoresultState(false);
            setNoresultMent("검색값이 존재하지 않습니다.");
        } else {
            setNoresultState(true);
        }
    }, [ctx.raw])
    
    console.log(ctx.raw, 'raw')
    return (<div className="tableBox">

        {searchingState ?
            !ctx.searchisLoading ?
              
                    <>
                        <ChartModal onClose={handleChartClose} onOpen={handleChartOpen} open={chartOpen} />
                        <DataGridTable onChartOpen={handleChartOpen} />
                    </>
                  
                : <CircularProgress color="inherit" />
            : <p className="ment">항공편을 조회해보세요.</p>}
    </div>);
}



