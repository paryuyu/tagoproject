import { useContext } from "react";
import { LookupContext } from "../../context/lookup_context";
import DataGridTable from "./dataGridTable";
import "./resultTable.css"
export default function ResultTable({ searchingState }) {
    let ctx = useContext(LookupContext);


    return (<div className="tableBox">

        {searchingState ?
         
                <DataGridTable />
              
            : <p className="ment">항공편을 조회해보세요.</p>}

    </div>);
}



