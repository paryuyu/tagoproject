import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RecentSeachingKeyword from "../rst_table/item/itemResearching";


function MobileSearchingBar({ onSchState }) {


    const ctx = useContext(LookupContext);
    const [airlineSelectOpen, setAirlineSelectOpen] = useState(false);
    const [airline, setAirline] = useState("");
    const [lineId, setLineId] = useState("");
    const [arrPort, setArrPort] = useState("");
    const [arrPortId, setArrPortId] = useState("");
    const [arrSelectOpen, setArrSelectOpen] = useState(false);

    const [depPortId, setDepPortId] = useState("");
    const [depPort, setDepPort] = useState("");
    const [depSelectOpen, setDepSelectOpen] = useState(false);

    const [keywords,setKeywords] = useState([]);
    
    const [depDate, setDepDate] = useState(new Date().toISOString().slice(0, 10));

    const handleSearch = (evt) => {
        let year = depDate.slice(0, 4);
        let month = depDate.slice(5, 7);
        let date = depDate.slice(8, 10);

        let data = {
            depAirportId: depPortId,
            arrAirportId: arrPortId,
            depPlandTime: year + month + date,
            airlineId: lineId
        }
        
        ctx.handleSearch(data)
        onSchState(true)
        setKeywords([...keywords, {depPort: depPort, arrPort:arrPort}])
    }

    useEffect(() => {
        console.log(keywords)
        localStorage.setItem("mkeywords",JSON.stringify(keywords))
    }, [keywords])

    const handleDepSelect = (evt) => {
        setDepPortId(evt.target.dataset.value);
        setDepPort(evt.target.innerText)
        setDepSelectOpen(c => !c);
    }

    const handleArrSelect = (evt) => {
        setArrPortId(evt.target.dataset.value);
        setArrPort(evt.target.innerText)
        setArrSelectOpen(c => !c);
    }

    const handleLineSelect = (evt) => {
        setAirline(evt.target.innerText)
        setLineId(evt.target.dataset.value)
        setAirlineSelectOpen(c => !c);
    }

    const handleDepDate = (evt) => {
        setDepDate(evt.target.value)
    }

    const handleDepOpen = () => {
        setDepSelectOpen(c => !c)

        if (arrSelectOpen) {
            setArrSelectOpen(c => !c)
        }

        if (airlineSelectOpen) {
            setAirlineSelectOpen(c => !c)
        }
    }

    const handleArrOpen = () => {
        setArrSelectOpen(c => !c)


        if (depSelectOpen) {
            setArrSelectOpen(c => !c)
        }

        if (airlineSelectOpen) {
            setAirlineSelectOpen(c => !c)
        }
    }

    const handleAirlineOpen = () => {
        setAirlineSelectOpen(c => !c)

        if (arrSelectOpen) {
            setArrSelectOpen(c => !c)
        }

        if (depSelectOpen) {
            setAirlineSelectOpen(c => !c)
        }
    }

    return (<section className="mobileSchBarOutline">
        <div className="airportSelect">
            <div className="selectbox" onClick={handleDepOpen}>
                <p>{depPort ? depPort : "출발지"}</p>
                <KeyboardArrowDownIcon />

            </div>
            {depSelectOpen &&
                <div className="selectOption">
                    {ctx.airportListData.map((item, index) => {
                        return <p className="selectTypo" onClick={handleDepSelect} data-value={item.airportId} key={index}>{item.airportNm}</p>
                    })
                    }
                </div>}
        </div>


        <div className="airportSelect">
            <div className="selectbox" onClick={handleArrOpen}>
                <p>{arrPort ? arrPort : "도착지"}</p>
                <KeyboardArrowDownIcon />
            </div>

            {arrSelectOpen &&
                <div className="selectOption">
                    {ctx.airportListData.reverse().map((item, index) => {
                        return <p className="selectTypo" onClick={handleArrSelect} data-value={item.airportId} key={index}>{item.airportNm}</p>
                    })
                    }
                </div>}
        </div>


        <div className="airportSelect">
            <div className="selectbox" onClick={handleAirlineOpen}>
                <p>{airline ? airline : "항공편"}</p>
                <KeyboardArrowDownIcon />
            </div>

            {airlineSelectOpen &&
                <div className="selectOption">
                    {ctx.airlineListData.map((item, index) => {
                        return <p className="selectTypo" onClick={handleLineSelect} data-value={item.airlineId} key={index}>{item.airlineNm}</p>
                    })
                    }
                </div>}
        </div>
        <div className="dateBox">
            <p className="schMiniTitle date-title">출발날짜</p>
            <input type="date" className="date-select" onChange={handleDepDate} value={depDate} />
        </div>

        <button type="submit" className="schBtn" onClick={handleSearch}>검색</button>
        {/* <RecentSeachingKeyword/> */}
    </section>);
}

export default MobileSearchingBar;