import { useContext, useState } from "react";
import { LookupContext } from "../../context/lookup_context";
import ResultListItem from "./resultListitem"
export default function ResultTable({ searchingState }) {
    let ctx = useContext(LookupContext);


    return (<>

        {searchingState ? <>



       
        </>

            : <p>항공편을 조회해보세요.</p>}

    </>);
}




     {/* {ctx.searchingData && ctx.searchingData.response.body.items ?
                ctx.searchingData.response.body.items.item.map((item, index) => { return <ResultListItem item={item} key={index} /> }) : <p>검색값이 없습니다.</p>} */}
