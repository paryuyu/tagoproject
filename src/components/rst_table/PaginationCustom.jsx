import { Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";

export default function PaginationCustom() {
    const ctx = useContext(LookupContext);

    const [pageCnt,setPageCnt] = useState();
    const [page,setPage] = useState(1);

    useEffect(()=>{
        let pageNum = Math.ceil(ctx.dataTotalCnt/10)
        setPageCnt(pageNum)
    },[ctx.dataTotalCnt])


    const handlePageChange = (evt, value) => {
        setPage(value)
        ctx.handlePageChange(value)
    }

    return (
        <div className="paginationTabBar">

            <Pagination
                count={pageCnt}
                onChange={handlePageChange}
            />
            
            <p className="totalNum">page {page} of {ctx.dataTotalCnt}</p>
        </div>
    );
}