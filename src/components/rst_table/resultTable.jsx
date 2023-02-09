import { useContext, useState } from "react";
import { LookupContext } from "../../context/lookup_context";


export default function ResultTable({ searchingState }) {
    let ctx = useContext(LookupContext);
    // const columnDefs = [
    //     { headerName: 'Make', field: 'make' },
    //     { headerName: 'Model', field: 'model' },
    //     { headerName: 'Price', field: 'price' }

    // ]
    // const rowData = [
    //     { make: 'Toyota', model: 'Celica', price: 35000 },
    //     { make: 'Ford', model: 'Mondeo', price: 32000 },
    //     { make: 'Porsche', model: 'Boxster', price: 72000 }
    // ]

    return (<>
   

    </>)
}



// return (<>

//     {searchingState ? <>


//         {/* <table>
//             <tr>
//                 <th>항공사명</th>
//                 <th>항공편명</th>
//                 <th>출발시간</th>
//                 <th>도착시간</th>
//                 <th>일반석운임</th>
//                 <th>비즈니스석운임</th>
//                 <th>출발공항</th>
//                 <th>도착공항</th>
//             </tr>
//             {ctx.searchingData && ctx.searchingData.response.body.items ?
//                 ctx.searchingData.response.body.items.item.map((item, index) => { return <ResultListItem item={item} key={index} /> }) : <p>검색값이 없습니다.</p>}
//         </table> */}
//     </>

//         : <p>항공편을 조회해보세요.</p>}

// </>);