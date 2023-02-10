import { useContext, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { LookupContext } from "../../context/lookup_context";
import { LookupClassContext } from "../../context/lookup_class_context";


export default function DataGridTable() {
    const [editStart, setEditStart] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [oldCellVal, setOldCellVal] = useState("");
    const [newCellVal, setNewCellVal] = useState("");
    
    const { searchingData } = useContext(LookupContext);


    useEffect(() => {
        setRowData(searchingData)
    }, [searchingData])


    const columnDefs = [
        {
            
            minWidth: 50,
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
        // console.log(evt, "handleCellClicked");
        // 클릭하면 밸류 나오기
    }
    const handleDataAdd = () => {
        //버튼 클릭 시 ===> 빈 객체 하나 추가해주자. push로.
    }

    const handleDataDelete = () => {
    }

    //todo : cell editor 추가 : rowData에서 oldValue를 찾아서 newValue로 변경해주기:onCellEditingStopped
    //체크박스 기능 추가 : 체크박스 클릭하면 true onRowSelected
    //행 추가 :handleDataAdd 

    const handleCellEdit = (e)=>{
        console.log(e,'evt')
            setNewCellVal(e.newValue);
            setOldCellVal(e.oldValue);
            console.log(rowData[e.rowIndex],"eeeee")
    }




    return (
        <div className="ag-theme-alpine" style={{ height: 800, width: "90%" }}>
            <button onClick={handleDataAdd}>Add</button>
            <button onClick={handleDataDelete}>Delete</button>

            <AgGridReact

                onRowSelected={(evt) => {
                    // console.log(evt.node.selected);
                    // console.log(evt);
                }}

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

