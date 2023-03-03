import { LinearProgress, useMediaQuery } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AgGridReact } from "ag-grid-react";
import _ from 'lodash';

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from '../../context/auth_context';
import { LookupContext } from "../../context/lookup_context";
import { DateFormatter, PriceFormmater } from '../../lib/formatter';
import { DataUpdateReq } from '../../util/tagoAPI';
import PaginationCustom from './PaginationCustom';
import ResultModal from './resultModal';




/** grid column 설정 */
const columnDefs = [
    {
        maxWidth: 200,
        width: 20,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        editable: false,
    
    },
    { headerName: '항공사', field: "airlineNm", },
    { headerName: '항공편', field: "vihicleId", },
    { headerName: '출발시간', field: "depPlandTime", valueFormatter: DateFormatter },
    { headerName: '도착시간', field: "arrPlandTime", valueFormatter: DateFormatter },
    { headerName: '일반석운임', field: "economyCharge", valueFormatter: PriceFormmater },
    { headerName: '비즈니스석운임', field: "prestigeCharge", valueFormatter: PriceFormmater },
    { headerName: '출발공항', field: "depAirportNm", },
    { headerName: '도착공항', field: "arrAirportNm", },
];

export default function DataGridTable({ onChartOpen }) {
    const responsiveWidth = useMediaQuery('(max-width:750px)')
    console.log(responsiveWidth,'matches')

    const { searchingData, searchisLoading, pageLoading, handleCtxUpdate } = useContext(LookupContext);
    const authCtx = useContext(AuthContext);

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const gridRef = useRef();

    const [alretOpen, setAlretOpen] = useState(false);
    const [finalChk, setFinalChk] = useState([]);
    const [cnt, setCnt] = useState(0);
    //얘로 다 처리하기
    const [selectArr, setSelectArr] = useState([]);
    const [rowData, setRowData] = useState();
    useEffect(() => {
        if (searchingData.length > 0) {
            setRowData(searchingData.sort((a, b) => b.id - a.id))
        }
    }, [searchisLoading, searchingData])

    /**column 설정 */
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        editable: true,
    }), [])


    function addItems() {
        let addItem = {
            flag: 'add',
            name: `add${cnt}`,
            airlineNm: '',
            vihicleId: '',
            depPlandTime: '000000000000',
            arrPlandTime: '000000000000',
            economyCharge: '',
            prestigeCharge: '',
            depAirportNm: '',
            arrAirportNm: '',
        }

        setCnt(cnt + 1)
        return addItem;
    }

    /** 브라우저 상 0번째 인덱스로 데이터 추가 */
    const handleDataAdd = () => {
        let add = gridRef.current.api.applyTransaction({ add: [addItems()], addIndex: 0 });
        setRowData([{ id: Number(add.add[0].id), ...add.add[0].data }, ...rowData])
    }

    /** 데이터 삭제 => rowData에 flag만 붙여주는걸로 수정 */
    const handleDataDelete = () => {
        let delArr = gridRef.current.api.getSelectedRows();

        let newDeleteData = []; //delete flag가 달린 새로운 배열
        delArr.forEach(elm => {
            elm.flag = 'delete'
            newDeleteData.push(elm)
        })

        //기존배열이랑 새로운 delete배열 붙여버리고 중복값 제거해준 배열로 rowData 넣어버리기.
        let newArr = rowData.concat(newDeleteData)
        let filterArr = _.uniqBy(newArr)
        setRowData(filterArr)

    }


    // rowData가 변경될 때마다 작동: delete -> 그리드 새로고침(rowclass)
    useEffect(() => {
        gridRef?.current?.api?.redrawRows();
    }, [rowData])


    //style class 붙여주는 함수
    const handleGetRowClass = (params) => {
        if ('delete' === params.node.data.flag) {
            return 'delete-warning';
        }

        if ("update" === params.node.data.flag) {
            return 'update-warning';
        }
    }

    //해당 데이터에 update -> rowData 반복문돌면서 flag만 붙여주고 빠져나오기.
    const handleCellUpdate = (e) => {
        if (e) {
            let filterArr = rowData.filter(elm => elm.id !== e.data.id)
            let sortData = [{ flag: 'update', ...e.data }, ...filterArr].sort((a, b) => b.id - a.id)
            setRowData(sortData)
        }

    }


    const handleRowSelected = (e) => {
        setSelectArr(e.api.getSelectedRows());
    }


    //서버로 보내줄 update data
    const handleFinalUpdate = () => {
        //선택된 데이터들
        let chkArr = gridRef.current.api.getSelectedRows();

        // flag가 존재하는 값들만 서버로 보내주기.
        let flagFilter = chkArr.filter(one => Object.keys(one).includes("flag"))
        setFinalChk(flagFilter)

        //add된 값이랑 delete된 값이 겹치면 서버에 보내줄 때만 빼버리기 UI에서는 보여줄거임

        //확인창 -> 모달에서 ok를 누르면 서버로 보내지게 단계를 하나 만들기.
        setAlretOpen(c => !c)
    }

    const handleChartView = () => {
        onChartOpen();
    }

    const handleAlretOpen = () => {
        setAlretOpen(c => !c);
    }

    const handleUpdateFinish = () => {
        
        //서버로 수정된 데이터 보내주기 : 마지막
        // let updateData = //토큰으로 보내주기
        
        let result = handleCtxUpdate(finalChk)
        // console.log(result, '<==update result')
        // if(result.status === 200){
        //     console.log("update success-->refresh..!(다시 한번 find 요청 보내기)")
        //     handleAlretOpen()
        // }else{
        //     console.log("update failed..!")
        //     handleAlretOpen()
        // }
    }

    return (
        <div className="ag-theme-alpine gridTableBox">
            <div className="btnBox">
                <div className="btnAddDelBox">
                    <button onClick={handleDataAdd}>Add</button>
                    <button onClick={handleDataDelete}>Delete</button>
                </div>
                <button onClick={handleChartView} className={"chartBtn"}>
                    Price Chart View</button>
            </div>
            {pageLoading && <LinearProgress color='primary'  />}

            <div
                style={gridStyle}
                className={"ag-theme-alpine"}>

                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    ref={gridRef}
                    rowSelection='multiple'
                    onSelectionChanged={handleRowSelected}
                    onCellEditingStopped={handleCellUpdate}
                    defaultColDef={defaultColDef}
                    getRowClass={handleGetRowClass}
                    paginationAutoPageSize={false}
                />
            </div>

            <PaginationCustom />
            
            <div className="modifyBtnBox">
                <button className="modifyBtn" onClick={handleFinalUpdate}>수정하기</button>
            </div>
            
            <ResultModal open={alretOpen} onOpen={handleAlretOpen} updateData={finalChk} onUpdate={handleUpdateFinish} />
        </div>)
}

