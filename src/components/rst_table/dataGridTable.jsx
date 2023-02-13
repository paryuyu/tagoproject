import { useContext, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { LookupContext } from "../../context/lookup_context";


export default function DataGridTable({onChartOpen}) {
    const [editStart, setEditStart] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [oldCellVal, setOldCellVal] = useState("");
    const [newCellVal, setNewCellVal] = useState("");
    const [selectDataId, setSelectDataId] = useState();
    const { searchingData, handleRemove, handleAdd } = useContext(LookupContext);


    useEffect(() => {
        setRowData(searchingData)
    }, [searchingData])


    const columnDefs = [
        {

            maxWidth: 50,
            width: 20,
            headerCheckboxSelection: true,
            checkboxSelection: true,
            editable: false,
        },
        { field: '항공사', },
        { field: '항공편', },
        { field: '출발시간', },
        { field: '도착시간', },
        { field: '일반석운임', },
        { field: '비즈니스석운임', },
        { field: '출발공항', },
        { field: '도착공항', },

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
        handleRemove(selectDataId)
    }


    const handleCellEdit = (e) => {
        //수정된 데이터만 감별할 수 있음.
    }

    const handleRowSelected = (e) => {
        setSelectDataId(e.data.id)
    }

    const handleChartView = ()=>{
        onChartOpen();
    }

    return (
        <div className="ag-theme-alpine-dark" style={{ height: 600, width: "90%" }}>
            <div className="btnBox">
                <div className="btnAddDelBox">
                    <button onClick={handleDataAdd}>Add</button>
                    <button onClick={handleDataDelete}>Delete</button>
                </div>
                <button onClick={handleChartView} className={"chartBtn"}>
                    Price Chart View</button>
            </div>
            <AgGridReact
                onRowSelected={handleRowSelected}
                onCellClicked={handleCellClicked}
                onCellDoubleClicked={() => { setEditStart(true) }}
                onCellEditingStopped={handleCellEdit}
                rowData={rowData}
                rowSelection='single'
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />

        </div>)
}

