import AirlineSelecItems from "./airlineSelectItem";
import AirportSelecItem from "./airportSelecItem";
import { useContext, useState } from "react";
import { LookupContext } from "../context/lookup_context";
export default function SearchingBar({onSchState}) {
    const ctx = useContext(LookupContext);


    const [airline, setAirline] = useState("");
    const [arrPort, setArrPort] = useState("");
    const [depPort, setDepPort] = useState("");
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

        ctx.handleSearch(data)
        onSchState(true)
    }

    const handleDepSelect = (evt) => {
        setDepPort(evt.target.value)
    }

    const handleArrSelect = (evt) => {
        setArrPort(evt.target.value)
    }

    const handleLineSelect = (evt) => {
        setAirline(evt.target.value)
    }

    const handleDepDate = (evt) => {
        setDepDate(evt.target.value)
    }


    return (<>
        <div>
            <p>항공기 조회</p>
            {ctx.airlineListData &&
                <select
                    onChange={handleLineSelect}>
                    {ctx.airlineListData.map((item, index) => {
                        return <AirlineSelecItems item={item} key={index} />
                    })
                    }
                </select>}
        </div>

        <div>
            <p>출발지</p>
            {ctx.airportListData &&
                <select onChange={handleDepSelect}>
                    {ctx.airportListData.map((item, index) => {
                        return <AirportSelecItem item={item} key={index} />
                    })
                    }
                </select>}
        </div>
        <div>
            <p>도착지</p>
            {ctx.airportListData &&
                <select onChange={handleArrSelect}>
                    {ctx.airportListData.map((item, index) => {
                        return <AirportSelecItem item={item} key={index} />
                    })
                    }
                </select>}
        </div>

        <div>
            <p>출발날짜</p>
            <input type="date" onChange={handleDepDate} value={depDate} />
            <button type="submit" onClick={handleSearch}>검색</button>
        </div>



    </>);
}
