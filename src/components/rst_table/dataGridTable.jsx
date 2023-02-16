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


    const handleDataDelete = () => {

        let delArr = gridRef.current.api.getSelectedRows();
        let addAndDelData = delArr.filter((item) => item.name && addData.filter((i) => i.name === item.name))
        addAndDelData.map(one => {
            let elm = addData.filter(elm => {
                return elm.name !== one.name
            })
            setAddData(elm)
        });


        // updateData랑 delData랑 겹치면 updateData에서만 빼주기. (배열과 배열) ==> 결과적으로 서버에서 삭제될 데이터
        let updateAndDelData = delArr.filter((item) => !item.name && updateData.filter((i) => i.id === item.id));
        updateAndDelData.map(one => {
            let elm = updateData.filter(elm => {
                return elm.id !== one.id
            })
            setUpdateData(elm)
        });


        // 체크를 새로하면 이전 데이터가 사라짐.
        // setDelData에 데이터가 들어갈 때 문제가 있는 듯.
        let newArr = delArr.filter(one => !one.name).map(one => { return { flag: "delete", ...one } });
        setDelData([{flag:'delete',...newArr} , ...delData]); //<=========여기 문제
    }

    //스크롤 이벤트가 발생해야 class가 바뀌는데 이벤트 발생하면 바로 바뀌게 해야함.
    const handleGetRowClass = (params) => {
       
        if ( delData.some(one=> one.id === params.node.data.id )) {
            return 'delete-warning'
        }
        
    }






    const handleCellEdit = (e) => {
        /** TODO :  addData -> updata data에서 빼고, addData -> 정보값이 비어있으면 그냥 delete 해주기 */
        //수정된 데이터만 감별할 수 있음.
        console.log(addData, 'add')
        console.log(updateData, 'update')
        console.log(e.data,'dataa')
        // let newArr = e.data.filter(one => !one.name).map(one=> console.log(one))
        if(e.data.name && e.data.name.startsWith('add') ){
            console.log('evt...!')
            
            setUpdateData([{ flag: 'add', ...e.data }, ...updateData])
        }else if(e.data.id && !e.data.name){
            setUpdateData([{ flag: 'update', ...e.data }, ...updateData])
            //e.data.name 이 같은 애들은 add data data업데이트 해줘야하는데... 오.... 그거 어케하지...

        }
    }

    const handleRowSelected = (e) => {
        setSelectArr(e.api.getSelectedRows());
    }

    const handleChartView = () => {
        onChartOpen();
    }

    const handleFinalUpdate = () => {
        let newArr = addData.concat(delData).concat(updateData);
        //pk --> 중복 잡기 --> 체크된 애들만 수정
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

