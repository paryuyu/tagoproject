import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../context/lookup_context";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import RecentSeachingKeyword from "./rst_table/item/itemResearching";

export default function SearchingBar({ onSchState }) {
    const ctx = useContext(LookupContext);

    const [airline, setAirline] = useState("");
    const [arrPort, setArrPort] = useState("");
    const [depPort, setDepPort] = useState("");
    const [depPortNm,setDepPortNm] = useState("");
    const [arrPortNm,setArrPortNm] = useState("");
    const [depDate, setDepDate] = useState(new Date().toISOString().slice(0, 10));
    const [keywords,setKeywords] = useState([]);
    
    const handleSearch = (evt) => {
        let year = depDate.slice(0, 4);
        let month = depDate.slice(5, 7);
        let date = depDate.slice(8, 10);

        let data = {
            depAirportId: depPort,
            arrAirportId: arrPort,
            depPlandTime: year + month + date,
            airlineId: airline
        }

        ctx.handleSearch(data)
        onSchState(true)
        setKeywords([...keywords, {depPort: depPortNm, arrPort:arrPortNm}])
    }

    useEffect(() => {
        console.log(keywords)
        localStorage.setItem("keywords",JSON.stringify(keywords))
    }, [keywords])
    

    const handleDepSelect = (evt) => {
        setDepPort(evt.target.value)
        setDepPortNm(evt.target.innerText)
    }

    const handleArrSelect = (evt) => {
        setArrPort(evt.target.value)
        setArrPortNm(evt.target.innerText)
    }

    const handleLineSelect = (evt) => {
        setAirline(evt.target.value)
    }

    const handleDepDate = (evt) => {
        setDepDate(evt.target.value)
    }

    
    return (
        <>
            <section className="schBarOutline">
                <div className="schSection">
                    <div className="schBarItemBox">
                        <FormControl className="select-box dep-port">
                            <InputLabel id="demo-simple-select-label">출발지</InputLabel>
                            {ctx.airportListData &&
                                <Select onChange={handleDepSelect} value={depPort} >

                                    {ctx.airportListData.map((item, index) => {
                                        return <MenuItem value={item.airportId} key={index}>{item.airportNm}</MenuItem>
                                    })
                                    }
                                </Select>}
                        </FormControl>
                    </div>

                    <div className="schBarItemBox">
                        <FormControl className="select-box arr-port">
                            <InputLabel id="demo-simple-select-label">도착지</InputLabel>
                            {ctx.airportListData &&
                                <Select onChange={handleArrSelect} value={arrPort} >

                                    {ctx.airportListData.reverse().map((item, index) => {
                                        return <MenuItem value={item.airportId} key={index}>{item.airportNm}</MenuItem>
                                    })
                                    }
                                </Select>}
                        </FormControl>
                    </div>
                </div>


                <div className="schSection">
                    <div className="schBarItemBox">
                        <FormControl className="select-box airline">
                            <InputLabel id="demo-simple-select-label">항공기 조회</InputLabel>
                            {ctx.airlineListData &&
                                <Select onChange={handleLineSelect} value={airline} >

                                    {ctx.airlineListData.map((item, index) => {
                                        return <MenuItem value={item.airlineId} key={index}>{item.airlineNm}</MenuItem>
                                    })
                                    }
                                </Select>}
                        </FormControl>

                    </div >
                    <div className="schBarItemBox">
                        <p className="schMiniTitle date-title">출발날짜: </p>
                        <input type="date" className="date-select" onChange={handleDepDate} value={depDate} />
                    </div>
                </div>

                <div className="schSection" >
                    <button type="submit" className="schBtn" onClick={handleSearch}>검색</button>
                </div>
                {/* <RecentSeachingKeyword/> */}
            </section>

        </>);
}
