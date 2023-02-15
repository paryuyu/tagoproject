import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LookupContext } from "../../context/lookup_context";


const columnDefs = [
    {
        maxWidth: 50,
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

function dateFormatter(params) {
    let year = String(params.value).slice(2, 4);
    let mon = String(params.value).slice(4, 6);
    let day = String(params.value).slice(6, 8);
    let hour = String(params.value).slice(8, 10);
    let min = String(params.value).slice(10, 12);

    return `${year}/${mon}/${day} ${hour}:${min}`
}




export default function DataGridTable({ onChartOpen }) {
    const { searchingData, handleCtxUpdate } = useContext(LookupContext);

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const gridRef = useRef();

    const [cnt, setCnt] = useState(0);
    const [delData, setDelData] = useState([]);
    const [addData, setAddData] = useState([]);
    const [updateData, setUpdateData] = useState([]);

    const [selectArr, setSelectArr] = useState([]);
    const [rowData, setRowData] = useState([]);

    const [editStart, setEditStart] = useState(false);
    const [selectDataId, setSelectDataId] = useState();


    useEffect(() => {
        setRowData(searchingData)
    }, [searchingData])


    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        editable: true,
    }), [])


    function addItems() {
        let addItem = {
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

    const handleDataAdd = () => {
        let add = gridRef.current.api.applyTransaction({ add: [addItems()], addIndex: 0 });
        setAddData([{ flag: 'add', ...add.add[0].data }, ...addData])
    }
    //======================================================================
    //delete => btn onclick
    const handleDataDelete = () => {

        let delArr = gridRef.current.api.getSelectedRows();
        // addData랑 delData 랑 겹치면 addData에서도 빼주고 delData에는 저장 X. (배열과 배열)

        // add 된 후 delete된 데이터 찾아주기
        let addAndDelData = delArr.filter((item) => item.name && addData.filter((i) => i.name === item.name))
        // addData 데이터에서 add 됐지만 바로 delete된 값은 지워서 새 배열로 들어감.
        addAndDelData.map(one => {
            let elm = addData.filter(elm => {
                return elm.name !== one.name
            })
            setAddData(elm)
        });


        // updateData랑 delData랑 겹치면 updateData에서만 빼주기. (배열과 배열) ==> 결과적으로 서버에서 삭제될 데이터
        let updateAndDelData = delArr.filter((item) => !item.name && updateData.filter((i) => i.id === item.id))
        updateAndDelData.map(one => {
            let elm = updateData.filter(elm => {
                return elm.id !== one.id
            })
            setUpdateData(elm)
        });

        // 최종적으로 클라이언트에서 새롭게 add 된 데이터는 deleteData에 들어가면 안됨. => delArr에서 item에 name이 있는 애들만 다 빼주기.
        let newArr = delArr.filter(one => !one.name).map(one => { return { flag: "delete", ...one } })
        setDelData(newArr)
    }

    /** TODO :  addData -> updata data에서 빼고, addData -> 정보값이 비어있으면 그냥 delete 해주기 */
    /** TODO :  화면상에서 진짜 빼지말고 색만 바꾸기  => row 객체별로 나와서 row 별 클래스를 넣어줄 수 있음. */
    
    const handleGetRowClass = (params) => {

        // if (params.node.rowIndex % 2 === 0) {
        //     // 조건값 -> delData에 있는 데이터값이랑 비교해야함.


        //     return 'delete-warning'
        // }

    }
    console.log(updateData)
    console.log(addData,'ddd')
    //======================================================================
    const handleCellEdit = (e) => {
        //수정된 데이터만 감별할 수 있음.
        setUpdateData([{ flag: 'update', ...e.data }, ...updateData])
    }

    const handleRowSelected = (e) => {
        setSelectArr(e.api.getSelectedRows());
    }

    const handleChartView = () => {
        onChartOpen();
    }

    const handleFinalUpdate = () => {
        let newArr = addData.concat(delData).concat(updateData);
        handleCtxUpdate(newArr);
        console.log(newArr)
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
                    onRowSelected={(e) => { setSelectDataId(e.data.id) }}
                    onSelectionChanged={handleRowSelected}
                    onCellDoubleClicked={() => { setEditStart(true) }}
                    onCellEditingStopped={handleCellEdit}
                    defaultColDef={defaultColDef}
                    getRowClass={handleGetRowClass}
                />
            </div>
            <div className="modifyBtnBox">
                <button className="modifyBtn" onClick={handleFinalUpdate}>수정하기</button>
            </div>
        </div>)
}

