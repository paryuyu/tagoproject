import { Pagination, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LookupContext } from "../../../context/lookup_context";

export default function PaginationCustom({ onUpdate, reservationData, onReservation }) {
    const ctx = useContext(LookupContext);
    const matches = useMediaQuery('(min-width:750px)')
    const navigate = useNavigate();
    const [pageCnt, setPageCnt] = useState();

    const [page, setPage] = useState(1);
    const [mouse, setMouse] = useState(false);
    useEffect(() => {
        let pageNum = Math.ceil(ctx.dataTotalCnt / 10)
        setPageCnt(pageNum)
    }, [ctx.dataTotalCnt])


    const handlePageChange = (evt, value) => {
        ctx.handlePageChange(value)
        setPage(value)
    }

    return (
        <div className="paginationTabBar">

            <div className="pageNumBox">
                <p className="page">page {page} of {Math.ceil(ctx.dataTotalCnt / 10)}</p>
                <p className="page" >Total Data Count {ctx.dataTotalCnt}</p>
            </div>

            <Pagination
                className="pageControler"
                siblingCount={!matches ? 0 : 1}
                count={pageCnt}
                onChange={handlePageChange}
                size={!matches ? "small" : "medium"}
            />

            <div className="modifyBtnBox">
                <button
                    onMouseEnter={() => { setMouse(true); }}
                    onMouseLeave={() => { setMouse(false) }}
                    className="modifyBtn"
                    onClick={onUpdate}>수정하기</button>
                <button
                    onMouseEnter={() => { setMouse(true); }}
                    onMouseLeave={() => { setMouse(false) }}
                    className="modifyBtn"
                    onClick={onReservation}>예약하기</button>
            </div>


        </div>
    );
}