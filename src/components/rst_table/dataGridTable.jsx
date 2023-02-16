import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import _ from 'lodash';

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LookupContext } from "../../context/lookup_context";

/** grid column 설정 */
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
    const { searchingData } = useContext(LookupContext);

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const gridRef = useRef();

    const [cnt, setCnt] = useState(0);
    const [delData, setDelData] = useState([]);
    const [addData, setAddData] = useState([]);
    const [updateData, setUpdateData] = useState([]);

    const [selectArr, setSelectArr] = useState([]);
    const [rowData, setRowData] = useState([]);


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
    
    /** 브라우저 상 0번째 인덱스로 데이터 추가 */
    const handleDataAdd = () => {
        let add = gridRef.current.api.applyTransaction({ add: [addItems()], addIndex: 0 });
    }

    /** 데이터 삭제  */
    const handleDataDelete = () => {
        //addDeleteData 추가해주기

        //현재 선택된 데이터 배열
        let delArr = gridRef.current.api.getSelectedRows();
        let newDelData = delArr.filter(one => !Object.keys(one).includes('name') ).map(one => { return { flag: "delete", ...one } });
        
        //delData가 있으면 중복제거 // 데이터가 없으면 그대로 넣어주기
        if(delData.length>0 && delData){
            let data = newDelData.concat(delData);
            let deduplication=_.uniqBy(data, "id");
            setDelData(deduplication)
        }else{
            setDelData(newDelData)
        }
        


        //TODO: 2.updateData가 있으면 updateData에서 delData에 포함된 데이터 제거. 
        let updateAndDelData = delArr.filter((item) => !item.name && updateData.filter((i) => i.id === item.id));
        updateAndDelData.map(one => {
            let elm = updateData.filter(elm => {
                return elm.id !== one.id
            })
            setUpdateData(elm)
        });
    }

    //TODO: delData에 add된 data는 없어서 조건에 걸리지 않음. --> ? 어떻게 해결할건지?
    const handleGetRowClass = (params) => {
        if (delData.some(one=> one.id === params.node.data.id)) { 
            return 'delete-warning';
        }
    }

    useEffect(()=>{
    if(delData.length>0){
        gridRef?.current?.api?.redrawRows();
    }
    },[delData])
    
    
    const handleCellUpdate = (e) => {
        //add데이터엔 id값이 없어서 key값으로 비교
        if(Object.keys(e.data).includes('id')){ 
            //updateData에 기존 데이터가 없으면 그대로 update, 있으면 비교 후 이후 데이터로 등록.
            if(updateData.length>0){
                 let exeptUpdateData = updateData.filter(one => one.id !== e.data.id) 
                 setUpdateData([{ flag: 'update', ...e.data }, ...exeptUpdateData])
            }else{
                setUpdateData([{ flag: 'update', ...e.data }, ...updateData])
            }
        }
    }


    const handleRowSelected = (e) => {
        setSelectArr(e.api.getSelectedRows());
    }

    //add데이터는 수정하기 버튼 클릭 시 내용이 입력된 상태에서 데이터를 생성해줌. 
    function AddFlag(){

        let addArr = [];
        gridRef.current.api.getSelectedRows().forEach(one => {
        
        if(one.name && one.name.startsWith("add")){
            addArr.push({flag:'add', ...one})
        }

       })
       
       setAddData(addArr)
       return addArr;
    }
   
    //TODO: 마지막 데이터 중복데이터는 없는지 최종데이터가 맞는지 확인해야함.
    const handleFinalUpdate = () => {
        let add = AddFlag()
        let finalData = add.concat(delData).concat(updateData);

        //TODO: fetch함수로 finalData 보내기. ===> 선택된 데이터들과 flag 데이터들을 비교해서 중복된 데이터만 서버로 보내기.
        console.log(gridRef.current.api.getSelectedRows())
    }

    const handleChartView = () => {
        onChartOpen();
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
                />
            </div>
            <div className="modifyBtnBox">
                <button className="modifyBtn" onClick={handleFinalUpdate}>수정하기</button>
            </div>
        </div>)
}

