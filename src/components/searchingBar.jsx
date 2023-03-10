import { useContext, useEffect, useRef, useState } from "react";
import { LookupContext } from "../context/lookup_context";
import { Chip, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";

export default function SearchingBar({ onSchState }) {
    const ctx = useContext(LookupContext);

    const depRef = useRef();

    const [airline, setAirline] = useState("");
    const [arrPort, setArrPort] = useState("");
    const [depPort, setDepPort] = useState("");
    const [depPortNm, setDepPortNm] = useState("");
    const [arrPortNm, setArrPortNm] = useState("");

    const [airlineNm, setAirlineNm] = useState("");
    const [depDate, setDepDate] = useState(new Date().toISOString().slice(0, 10));

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

        let keywordData = {
            depId: depPort,
            arrId: arrPort,
            lineId: airline,
            arr: arrPortNm,
            dep: depPortNm,
            line: airlineNm,
            date: year + month + date
        }

        ctx.handleKeyword(keywordData)
        ctx.handleSearch(data)
        onSchState(true)
    }

    const handleDepSelect = (evt) => {
        setDepPort(evt.target.value)
        setDepPortNm(evt.target.name)

    }

    const handleArrSelect = (evt) => {
        setArrPort(evt.target.value)
        setArrPortNm(evt.target.name)

    }

    const handleLineSelect = (evt) => {
        setAirline(evt.target.value)
        setAirlineNm(evt.target.name)
    }

    const handleDepDate = (evt) => {
        setDepDate(evt.target.value)
    }
    return (
        <>
            <section className="schBarOutline">

                {ctx.airportListData && ctx.airlineListData ?
                    <>
                        <div className="schSection">
                            <div className="schBarItemBox">
                                <FormControl className="select-box dep-port">
                                    <InputLabel id="demo-simple-select-label">출발지</InputLabel>
                                    {ctx.airportListData &&
                                        <Select onChange={handleDepSelect} value={depPort} >
                                            {ctx.airportListData.map((item, index) => {
                                                return <MenuItem value={item.airportId} key={index} >{item.airportNm}</MenuItem>
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
                                                return <MenuItem value={item.airportId} key={index} name={item.airportNm}>{item.airportNm}</MenuItem>
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
                                                return <MenuItem value={item.airlineId} key={index} name={item.airlineNm}>{item.airlineNm}</MenuItem>
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

                    </> : <div className="schbarLoading"><CircularProgress /></div>
                }

            </section>

        </>);
}
