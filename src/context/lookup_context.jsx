import { createContext, useState, useEffect } from "react";
import { AirlineReq, AirportReq, TagoServerReq } from "../util/tagoAPI";

export const LookupContext = createContext();

export function LookupContextProvider({ children }) {
    const [airlineListData, setAirlineListData] = useState(null);
    const [airportListData, setPortlineListData] = useState();
    const [searchingData, setSearchingData] = useState();

    async function airportlistReq() {
        let result = await AirportReq();
        if (result.status === 200) {
            let json = await result.json();
            setPortlineListData(json.response.body.items.item);
        } else {
            return;
        }
    }


    async function airlinelistReq() {
        let result = await AirlineReq();
        if (result.status === 200) {
            let json = await result.json();
            setAirlineListData(json.response.body.items.item);
        }
    }


    const handleSearch = async (data) => {

        if (data) {
            let result = await TagoServerReq(data);
            console.log(result)
            if (result.status === 200) {
                let json = await result.json();
                setSearchingData(json)
                // console.log(json)
            }
        }


    }



    useEffect(() => {
        airportlistReq();
        airlinelistReq();
    }, [])


    return (<LookupContext.Provider value={{ airlineListData, airportListData, handleSearch ,searchingData}}>
        {children}
    </LookupContext.Provider>)
}