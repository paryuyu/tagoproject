import { useContext, useEffect, useRef, useState } from "react";
import { LookupContext } from "../context/lookup_context";
import { Chip, CircularProgress, FormControl, InputLabel, LinearProgress, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
export default function SearchingBar({ onSchState }) {
    const ctx = useContext(LookupContext);

    const depRef = useRef();

    const [airline, setAirline] = useState("");
    const [arrPort, setArrPort] = useState("");
    const [depPort, setDepPort] = useState("");
    const [depPortNm, setDepPortNm] = useState("");
    const [arrPortNm, setArrPortNm] = useState("");
    const [airlineNm, setAirlineNm] = useState("");

    const [locale, setLocale] = useState('ko');
    const [depDate, setDepDate] = useState(new Date());

    const handleSearch = (evt) => {
        
        let year = String(depDate.getFullYear());
        let month = depDate.getMonth() + 1 < 10 ? "0" + String(depDate.getMonth() + 1) : String(depDate.getMonth() + 1);
        let date = depDate.getDate() < 10 ? "0" + String(depDate.getDate()) : String(depDate.getDate());

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

    const handleDepDate = (value) => {
        setDepDate(value)
    }


    return (
        <>
            <section className="schBarOutline">

                {ctx.airportListData && ctx.airlineListData ?
                    <>
                        <div className="schRowStyle">
                            <div className="schSection" >
                                <div className="schBarItemBox">
                                    <FormControl className="select-box dep-port">
                                        <InputLabel id="demo-multiple-chip-label">출발지</InputLabel>
                                        {ctx.airportListData &&
                                            <Select onChange={handleDepSelect} value={depPort} input={<OutlinedInput label="출발지" />}>
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
                                            <Select onChange={handleArrSelect} value={arrPort} input={<OutlinedInput label="도착지" />}>
                                                {ctx.airportListData.reverse().map((item, index) => {
                                                    return <MenuItem value={item.airportId} key={index} name={item.airportNm}>{item.airportNm}</MenuItem>
                                                })
                                                }
                                            </Select>}
                                    </FormControl>
                                </div>
                            </div>
                            <div className="schSection" >
                                <div className="schBarItemBox">
                                    <FormControl className="select-box airline">
                                        <InputLabel id="demo-simple-select-label" >항공기</InputLabel>
                                        {ctx.airlineListData &&
                                            <Select onChange={handleLineSelect} value={airline} input={<OutlinedInput label="항공기" />}>
                                                {ctx.airlineListData.map((item, index) => {
                                                    return <MenuItem value={item.airlineId} key={index} name={item.airlineNm}>{item.airlineNm}</MenuItem>
                                                })
                                                }
                                            </Select>}
                                    </FormControl>

                                </div>

                                <div className="schBarItemBox">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
                                        <DatePicker
                                            className="datepicker"
                                            label="출발날짜"
                                            onChange={handleDepDate}
                                            value={depDate}
                                        />
                                    </LocalizationProvider>
                                </div>
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
