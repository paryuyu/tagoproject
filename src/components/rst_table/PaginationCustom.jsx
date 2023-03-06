import { Pagination, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";

export default function PaginationCustom() {
    const ctx = useContext(LookupContext);
    const matches = useMediaQuery('(min-width:750px)')
    const [pageCnt, setPageCnt] = useState();
    const [page, setPage] = useState(1);


    useEffect(() => {
        let pageNum = Math.ceil(ctx.dataTotalCnt / 10)
        setPageCnt(pageNum)
    }, [ctx.dataTotalCnt])


    const handlePageChange = (evt, value) => {
        setPage(value)
        ctx.handlePageChange(value)
    }

    return (
        <div className="paginationTabBar">

            <Pagination
                className="pageControler"
                siblingCount={!matches ? 0 : 1}
                count={pageCnt}
                onChange={handlePageChange}
                size={!matches ? "small" : "medium"}
            />

            <div className="pageNumBox">
                <p className="page">page {page} of {Math.ceil(ctx.dataTotalCnt / 10)}</p>
                <p className="page" >Total Data Count {ctx.dataTotalCnt}</p>
            </div>
        </div>
    );
}