import { createContext, useState, useEffect } from "react";
import { AirlineReq, AirportReq, DataUpdateReq, TagoServerReq } from "../util/tagoAPI";

export const LookupContext = createContext();

export function LookupContextProvider({ children }) {
    const [airlineListData, setAirlineListData] = useState(null);
    const [airportListData, setPortlineListData] = useState();
    const [searchingData, setSearchingData] = useState();
    const [searchisLoading, setSearchingLoading] = useState(true);

    const [addDataId, setAddDataId] = useState([]);
    const [removeDataId, setRemoveDataId] = useState([]);

    const [raw, setRaw] = useState([]);


    //searchingBar - airport
    async function airportlistReq() {
        let result = await AirportReq();
        if (result.status === 200) {
            let data = await result.data.response.body.items;

            if (data) {
                let item = data.item;
                setPortlineListData(item);
            }

        } else {
            return;
        }
    }

  //searchingBar - airline
    async function airlinelistReq() {
        let result = await AirlineReq();
        if (result.status === 200) {
            let data = await result.data.response.body.items;

            if (data) {
                let item = data.item;
                setAirlineListData(item);
            }
        }
    }


    const handleSearch = async (data) => {

        if (data) {
            let result = await TagoServerReq(data);

            if (result.status === 200) {


                let data = result.data.response.body.items;
                setRaw(data) //원본데이터

                if (data) {
                    let arr = [];
                    let item = data.item;
                    item.forEach((elm, index) => {
                        arr.push({ id: index, ...elm })
                    })

                    setSearchingData(arr); //수정데이터
                    setSearchingLoading(false);
                } else {
                    setSearchingLoading(false);
                }
            }
        }
    }

    console.log(searchingData)
    useEffect(() => {
        airportlistReq();
        airlinelistReq();
    }, [])



    //데이터를 한번에 가져오기.
    const handleCtxUpdate = async (data) => {

        if (data) {
            //데이터가 있으면 서버로 보내주기.
            let result = await DataUpdateReq();
            
            if(result.status === 200){
                console.log("update success...!")
            }else{
                console.log("update failed...!")
            }
        } else {
            //완료하기
            console.log('수정할 데이터가 없습니다.')
        }
    }

    return (
        <LookupContext.Provider value={{
            searchisLoading,
            raw,
            airlineListData,
            airportListData,
            searchingData,
            handleCtxUpdate,
            handleSearch
        }}>

            {children}
        </LookupContext.Provider>)
}