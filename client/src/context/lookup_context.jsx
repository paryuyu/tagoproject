import { createContext, useState, useEffect } from "react";
import { AirlineReq, AirportReq, DataUpdateReq, TagoServerReq } from "../util/tagoAPI";

export const LookupContext = createContext();

export function LookupContextProvider({ children }) {
    const [airlineListData, setAirlineListData] = useState(null);
    const [airportListData, setPortlineListData] = useState();
    const [searchingData, setSearchingData] = useState();
    const [searchisLoading, setSearchingLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
        setSearchingLoading(true)
        if (data) {
            let result = await TagoServerReq(data);

            if (result.status === 200) {
                let data = result?.data?.response?.body?.items;
                setRaw(data) //원본데이터

                if (data) {
                    let arr = [];
                    let item = data.item;
                    if(item.length>0){
                        item.forEach((elm, index) => {
                            arr.push({ id: index, ...elm })
                        })
    
                        setSearchingData(arr); //수정데이터
                        setSearchingLoading(false);

                    }else if(item instanceof Object){ //결과값이 1개일 땐 배열이 아닌 객체로 들어와서 배열로 변경.
                        setSearchingData([item]);
                        setSearchingLoading(false);
                    }
                  
                } else {
                    setSearchingLoading(false);
                }
            }
        }
    }   

    useEffect(() => {
        airportlistReq();
        airlinelistReq();
    }, [])



    /** 데이터 업데이트 */
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


    //검색 버튼 클릭 시 refresh => addData, updateData, deleteData 모두 삭제
    const handleRefresh = () => {
        setRefresh(c=>!c)
    }

    return (
        <LookupContext.Provider value={{
            searchisLoading,
            raw,
            airlineListData,
            airportListData,
            searchingData,
            handleCtxUpdate,
            handleSearch,
            handleRefresh,
        }}>

            {children}
        </LookupContext.Provider>)
}