
import { useState } from "react";
import SearchingBar from "../components/searchingBar";
import ResultTable from "../components/rst_table/resultTable";
import "./style/mainpage.css"
import MobileSearchingBar from "../components/mobileComponents/mobileSearchingBar";

export default function MainPage() {
    const [searchingState, setSearchingState] = useState(false);

    const HandleSearchingState = (val) => {
        setSearchingState(val);
    }


    return (<>
        <main >
            <section>
                <SearchingBar onSchState={HandleSearchingState} />
                <MobileSearchingBar onSchState={HandleSearchingState}/>
            </section>
            <section>
                <ResultTable searchingState={searchingState} />
            </section>
        </main>
    </>);
}
