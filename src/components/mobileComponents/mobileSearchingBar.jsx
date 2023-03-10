import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../context/lookup_context";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuContext } from "../../context/menu_context";
import { CircularProgress } from "@mui/material";


function MobileSearchingBar({ onSchState }) {


    const ctx = useContext(LookupContext);
    const meunCtx = useContext(MenuContext);
    const [airline, setAirline] = useState("");

    const [lineId, setLineId] = useState("");
    const [arrPort, setArrPort] = useState("");
    const [arrPortId, setArrPortId] = useState("");

    const [depPortId, setDepPortId] = useState("");
    const [depPort, setDepPort] = useState("");


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

        let keywordData = {
            depId: depPortId,
            arrId: arrPortId,
            lineId: lineId,
            arr: arrPort,
            dep: depPort,
            line: airline,
            date: year + month + date
        }

        ctx.handleKeyword(keywordData)
        ctx.handleSearch(data)
        onSchState(true)
    }

    const handleDepSelect = (evt) => {
        setDepPortId(evt.target.dataset.value);
        setDepPort(evt.target.innerText)
        meunCtx.handleDepSelectOpen(c => !c);
    }

    const handleArrSelect = (evt) => {
        setArrPortId(evt.target.dataset.value);
        setArrPort(evt.target.innerText)
        meunCtx.handleArrSelectOpen(c => !c);
    }

    const handleLineSelect = (evt) => {
        setAirline(evt.target.innerText)
        setLineId(evt.target.dataset.value)
        meunCtx.handleLineSelectOpen(c => !c);
    }

    const handleDepDate = (evt) => {
        setDepDate(evt.target.value)
    }

    const handleDepOpen = () => {
        meunCtx.handleDepSelectOpen(c => !c)

        if (meunCtx.arrSelectOpen) {
            meunCtx.handleArrSelectOpen(c => !c)
        }

        if (meunCtx.airlineSelectOpen) {
            meunCtx.handleLineSelectOpen(c => !c)
        }
    }

    const handleArrOpen = () => {
        meunCtx.handleArrSelectOpen(c => !c)


        if (meunCtx.depSelectOpen) {
            meunCtx.handleArrSelectOpen(c => !c)
        }

        if (meunCtx.airlineSelectOpen) {
            meunCtx.handleLineSelectOpen(c => !c)
        }
    }

    const handleAirlineOpen = () => {
        meunCtx.handleLineSelectOpen(c => !c)

        if (meunCtx.arrSelectOpen) {
            meunCtx.handleArrSelectOpen(c => !c)
        }

        if (meunCtx.depSelectOpen) {
            meunCtx.handleLineSelectOpen(c => !c)
        }
    }

    return (<section className="mobileSchBarOutline">
        {ctx.airportListData && ctx.airlineListData ?

            <>
                <div className="airportSelect">
                    <div className="selectbox" onClick={handleDepOpen}>
                        <p>{depPort ? depPort : "출발지"}</p>
                        <KeyboardArrowDownIcon />
                    </div>

                    {meunCtx.depSelectOpen &&
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

                    {meunCtx.arrSelectOpen &&
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

                    {meunCtx.airlineSelectOpen &&
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
            </>

            :
            <div>
                <CircularProgress />
            </div>
        }

    </section>);
}

export default MobileSearchingBar;