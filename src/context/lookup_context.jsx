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

            if (result.status === 200) {
                let json = await result.json();
                let data = json.response.body.items;
                let arr = [];

                if (data) {
                    let item = data.item;
                    for (let i = 0; i < item.length; i++) {
                        arr.push({
                            "항공사": item[i].airlineNm,
                            "항공편": item[i].vihicleId,
                            "출발시간": item[i].depPlandTime,
                            "도착시간": item[i].arrPlandTime,
                            "일반석운임": item[i].economyCharge,
                            "비즈니스석운임": item[i].prestigeCharge,
                            "출발공항": item[i].depAirportNm,
                            "도착공항": item[i].arrAirportNm
                        })
                    }

                }

                setSearchingData(arr)
                
            }
        }
    }


    useEffect(() => {
        airportlistReq();
        airlinelistReq();
    }, [])


    return (
    <LookupContext.Provider value={{ airlineListData, airportListData, handleSearch ,searchingData}}>
        {children}
    </LookupContext.Provider>)
}