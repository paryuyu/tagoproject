import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { LookupContext } from "../../context/lookup_context";


export default function DataGridTable({ onChartOpen }) {
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const gridRef = useRef();

    const [delData, setDelData] = useState();
    const [selectArr, setSelectArr] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [editStart, setEditStart] = useState(false);
    const [selectDataId, setSelectDataId] = useState();
    const { searchingData, handleRemove, handleAdd , raw } = useContext(LookupContext);


    useEffect(() => {
        setRowData(searchingData)
    }, [searchingData])


    function dateFormatter(params){
        let year = String(params.value).slice(2,4);
        let mon = String(params.value).slice(4,6);
        let day = String(params.value).slice(6,8);
        let hour = String(params.value).slice(8,10);
        let min = String(params.value).slice(10,12);
    
        return `${year}/${mon}/${day} ${hour}:${min}`
    }




    const columnDefs = [
        {
            maxWidth: 50,
            width: 20,
            headerCheckboxSelection: true,
            checkboxSelection: true,
            editable: false,
        },
        { headerName:  '항공사' , field: airlineNm,  },
        { headerName: '항공편', field: vihicleId },
        { headerName: '출발시간', field: depPlandTime , valueFormatter: dateFormatter },
        { headerName: '도착시간',  field: arrPlandTime ,valueFormatter: dateFormatter},
        { headerName: '일반석운임',  field: economyCharge , },
        { headerName: '비즈니스석운임', field: prestigeCharge ,},
        { field: '출발공항',field: depAirportNm , },
        { field: '도착공항',field: arrAirportNm , },

    ];


    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        editable: true,
    }), [])

    const handleCellClicked = (evt) => {

    }

    const handleDataAdd = () => {
        handleAdd()
    }

    const handleDataDelete = () => {
        setDelData(gridRef.current.api.getSelectedRows())
    }

    const handleCellEdit = (e) => {
        //수정된 데이터만 감별할 수 있음.
    }

    const handleRowSelected = (e) => {
        setSelectArr(e.api.getSelectedRows());
    }

    const handleChartView = () => {
        onChartOpen();
    }

    const rowClassRules = useMemo(() => {
        return {
            'sick-days-warning': (params) => {

                let id = params.data.id;
                if(delData){  

                    return delData.filter(one=>{
                        return id === one.id
                    })

                }
            }
        }
    }, [])


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
                    
                    rowClassRules={rowClassRules}
                    onRowSelected={(e)=>{setSelectDataId(e.data.id)}}
                    onSelectionChanged={handleRowSelected}                    
                    onCellClicked={handleCellClicked}
                    onCellDoubleClicked={() => { setEditStart(true) }}
                    onCellEditingStopped={handleCellEdit}
                    defaultColDef={defaultColDef}
                />
            </div>
            <div className="modifyBtnBox">
                <button className="modifyBtn">수정하기</button>
            </div>
        </div>)
}

