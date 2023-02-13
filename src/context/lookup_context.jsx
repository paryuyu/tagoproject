import { createContext, useState, useEffect } from "react";
import { AirlineReq, AirportReq, TagoServerReq } from "../util/tagoAPI";

export const LookupContext = createContext();

export function LookupContextProvider({ children }) {
    const [airlineListData, setAirlineListData] = useState(null);
    const [airportListData, setPortlineListData] = useState();
    const [searchingData, setSearchingData] = useState();
    const [searchisLoading, setSearchingLoading] = useState(true);

    const [addDataId, setAddDataId] = useState([]);
    const [removeDataId, setRemoveDataId] = useState([]);

    const [raw, setRaw] = useState([]); 


    
    async function airportlistReq() {
        let result = await AirportReq();
        if (result.status === 200) {
            let data = await result.data
            
            if(data){
                let item = data?.response?.body?.items?.item;
                setPortlineListData(item);
            }

        } else {
            return;
        }
    }


    async function airlinelistReq() {
        let result = await AirlineReq();
        if (result.status === 200) {
            let data = await result.data
            
            if(data){
                let item =  data?.response?.body?.items?.item;
                setAirlineListData(item);
            }
        }
    }

    function dateFormatter(date){
        let year = String(date).slice(2,4);
        let mon = String(date).slice(4,6);
        let day = String(date).slice(6,8);
        let hour = String(date).slice(8,10);
        let min = String(date).slice(10,12);
    
        return `${year}/${mon}/${day} ${hour}:${min}`
    }

    let priceFormmater = new Intl.NumberFormat("ko",{
        style:'currency',
        currency: "krw"
    })



    const handleSearch = async (data) => {

        if (data) {
            let result = await TagoServerReq(data);

            if (result.status === 200) {
                let data = result.data.response.body.items;
                setRaw(data) //원본데이터
                let arr = [];

                if (data) {
                    let item = data.item;
                    for (let i = 0; i < item.length; i++) {
                      
                        arr.push({
                            id:i+1,
                            "항공사": item[i].airlineNm,
                            "항공편": item[i].vihicleId,
                            "출발시간": dateFormatter(item[i].depPlandTime),
                            "도착시간":  dateFormatter(item[i].arrPlandTime),
                            "일반석운임": item[i].economyCharge ? priceFormmater.format(item[i].economyCharge):"정보없음",
                            "비즈니스석운임": item[i].economyCharge ? priceFormmater.format(item[i].prestigeCharge):"정보없음",
                            "출발공항": item[i].depAirportNm,
                            "도착공항": item[i].arrAirportNm
                        })
                    }
                }
             
                setSearchingData(arr) //수정데이터

                if(arr.length>0){
                    setSearchingLoading(false);
                }
            }
        }
    }


    const handleRemove = (selecId)=>{
        let newArr = searchingData.filter(elm => {
            return elm.id !== selecId
        });
        
        
        if(newArr.length > 0){
            setSearchingData(newArr)
        };
    }

    
    useEffect(() => {
        airportlistReq();
        airlinelistReq();
    }, [])

    const handleAdd = ()=>{
        setSearchingData([...searchingData, {
            id:parseInt(searchingData[searchingData.length-1].id)+1,
            "항공사": "",
            "항공편":"",
            "출발시간": "",
            "도착시간": "",
            "일반석운임": "",
            "비즈니스석운임": "",
            "출발공항": "",
            "도착공항": ""}])
    }

        
    return (
    <LookupContext.Provider value={{ 
        searchisLoading,
        raw,
        airlineListData, 
        airportListData, 
        searchingData, 
        handleSearch ,
        handleRemove , 
        handleAdd }}>

        {children}
    </LookupContext.Provider>)
}