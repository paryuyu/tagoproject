
import { useContext, useState } from "react";
import { LookupContext } from "../context/lookup_context";
import Header from "../components/header";
import ResultListItem from "../components/resultListitem";
import SearchingBar from "../components/searchingBar";


// import "./mainpage.css"
export default function MainPage() {
    const [searchingState, setSearchingState] = useState(false);
    const ctx = useContext(LookupContext);

    const HandleSearchingState = (val)=>{
        setSearchingState(val);
    }


    return (<>
        <header>
          <Header/>
        </header>

        <main>
            <section>
               <SearchingBar onSchState={HandleSearchingState} />
            </section>
            <section>
                {searchingState ? <>
                    {ctx.searchingData && ctx.searchingData.response.body.items ?
                        ctx.searchingData.response.body.items.item.map((item, index) => { return <ResultListItem item={item} key={index} /> })

                        : <p>검색값이 없습니다.</p>}</> 
                        : <p>항공편을 조회해보세요.</p>}
            </section>
        </main>

    </>);
}
