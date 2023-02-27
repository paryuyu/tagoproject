import { Modal } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import _ from 'lodash';

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from '../../context/auth_context';
import { LookupContext } from "../../context/lookup_context";
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
    { headerName: '출발시간', field: "depPlandTime", valueFormatter: dateFormatter },
    { headerName: '도착시간', field: "arrPlandTime", valueFormatter: dateFormatter },
    { headerName: '일반석운임', field: "economyCharge", valueFormatter: priceFormmater },
    { headerName: '비즈니스석운임', field: "prestigeCharge", valueFormatter: priceFormmater },
    { headerName: '출발공항', field: "depAirportNm", },
    { headerName: '도착공항', field: "arrAirportNm", },
];

/**데이터그리드의 내 가격 포맷터 */
function priceFormmater(params) {
    let formatter = new Intl.NumberFormat("ko", {
        style: 'currency',
        currency: "krw"
    })

    if (params.value) {
        return `${formatter.format(params.value)}`
    } else {
        return `${formatter.format(0)}`
    }
}

/**날짜 및 시간 포맷터 */
function dateFormatter(params) {
    let year = String(params.value).slice(2, 4);
    let mon = String(params.value).slice(4, 6);
    let day = String(params.value).slice(6, 8);
    let hour = String(params.value).slice(8, 10);
    let min = String(params.value).slice(10, 12);

    return `${year}/${mon}/${day} ${hour}:${min}`
}


export default function DataGridTable({ onChartOpen }) {
    const { searchingData,searchisLoading } = useContext(LookupContext);

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
    }, [searchisLoading])

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


    const handleFinalUpdate = () => {
        //선택된 데이터들
        let chkArr = gridRef.current.api.getSelectedRows();

        // flag가 존재하는 값들만 서버로 보내주기.
        let flagFilter = chkArr.filter(one => Object.keys(one).includes("flag"))
        setFinalChk(flagFilter)

        //모달에서 ok를 누르면 서버로 보내지게 단계를 하나 만들기.
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
    }

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: "90%" }}>
            <div className="btnBox">
                <div className="btnAddDelBox">
                    <button onClick={handleDataAdd}>Add</button>
                    <button onClick={handleDataDelete}>Delete</button>
                </div>
                <button onClick={handleChartView} className={"chartBtn"}>
                    Price Chart View</button>
            </div>
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
                    paginationPageSize={10}
                    pagination={true}
                />
            </div>
            <div className="modifyBtnBox">
                <button className="modifyBtn" onClick={handleFinalUpdate}>수정하기</button>
            </div>
            <ResultModal open={alretOpen} onOpen={handleAlretOpen} updateData={finalChk} onUpdate={handleUpdateFinish} />
        </div>)
}

