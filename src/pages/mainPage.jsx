
import { useContext, useState } from "react";
import { LookupContext } from "../context/lookup_context";
import Header from "../components/header";
import SearchingBar from "../components/searchingBar";
import ResultTable from "../components/rst_table/resultTable";
import DataGridTable from "../components/rst_table/dataGridTable";
import "./mainpage.css"
// import "./mainpage.css"
export default function MainPage() {
    const [searchingState, setSearchingState] = useState(false);
    const ctx = useContext(LookupContext);

    const HandleSearchingState = (val) => {
        setSearchingState(val);
    }


    return (<>
        <header>
            <Header />
        </header>

        <main>
            <section>
                <SearchingBar onSchState={HandleSearchingState} />
            </section>
            <section>
                <ResultTable searchingState={searchingState} />
            </section>
        </main>
      

    </>);
}
