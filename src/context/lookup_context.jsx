import _ from "lodash";
import { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { AirlineReq, AirportReq, DataUpdateReq, TagoServerReq } from "../util/tagoAPI";

export const LookupContext = createContext();

export function LookupContextProvider({ children }) {

    const [airlineListData, setAirlineListData] = useState(null);
    const [airportListData, setPortlineListData] = useState();

    const [searchingData, setSearchingData] = useState();
    const [searchisLoading, setSearchingLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [dataTotalCnt, setDataTotalCnt] = useState(0);

    const [refresh, setRefresh] = useState(false);
    const [raw, setRaw] = useState([]);

    const [initialData, setInitailData] = useState();
    const [keywords, setKeywords] = useState("");

    // 키워드 저장
    const handleKeyword = (data) => {
        console.log("keywordSave---!")

        let keywordData = { depPort: data.dep, arrPort: data.arr, airline: data.line, depDate: data.date }
        //mui select 에서 name이나 옵션값이 따로 저장이 되지 않아 처음에 받아오는 공항데이터랑 비교

        if(!data.arr){ 
           let findNm =  airportListData.find(elm => elm.airportId === data.arrId )
           console.log(findNm,'findNm')
           data.arr = findNm.airportNm
        }

        if(!data.dep){
            let findNm =  airportListData.find(elm => elm.airportId === data.depId )
            console.log(findNm,'findNm')
            data.dep = findNm.airportNm
         }
         

        //중복키워드 제거해주기
        setKeywords([...keywords, data])


    }

    //키워드 이벤트가 발생할 때 마다 로컬로 저장
    useEffect(()=>{
        localStorage.setItem("keywords", JSON.stringify(keywords))
    },[keywords])

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

    async function Search(searchData, page) {

        if (page) {
            searchData = { ...initialData, pageNo: page }
        }

        let result = await TagoServerReq(searchData);
        console.log(result,'flightResult')
        if (result.status === 200) {
            console.log(result, 'result')
            let data = result?.data?.response?.body?.items;
            setRaw(data) //검색해온 원본 데이터 저장

            if (data) {
                setDataTotalCnt(result.data.response.body.totalCount)

                let item = data.item;
                if (Array.isArray(item)) {
                    let arr = [];
                    //pk가 있으면 id index 붙여주는건 삭제
                    item.forEach((elm, index) => {
                        arr.push({ id: index, ...elm })
                    })

                    setSearchingData(arr); //수정데이터
                    setSearchingLoading(false);
                    page && setPageLoading(false);

                } else {
                    //결과값이 1개일 땐 배열이 아닌 객체로 들어와서 배열로 변경.
                    setSearchingData([item]);
                    setSearchingLoading(false);
                    page && setPageLoading(false);
                }

            } else {
                setSearchingData([]);
                setSearchingLoading(c => !c);
            }
        }
    }


    //데이터 검색
    const handleSearch = async (data) => {
        setSearchingLoading(true)

        if (data) {
            setInitailData(data) //검색한 데이터 저장
            Search(data)
        }
    }


    //페이지 별 검색
    const handlePageChange = async (page) => {
        setPageLoading(true)
        if (page) {
            Search(initialData, page)
        }
    }


    /** 데이터 업데이트 */
    const handleCtxUpdate = async (data) => {
        let result = await DataUpdateReq(data);
    }


    //검색 버튼 클릭 시 refresh => 
    const handleRefresh = () => {
        setRefresh(c => !c)
    }

    useEffect(() => {
        airportlistReq();
        airlinelistReq();
    }, [])


    return (
        <LookupContext.Provider value={{
            keywords,
            handleKeyword,
            dataTotalCnt,
            searchisLoading,
            raw,
            airlineListData,
            airportListData,
            searchingData,
            pageLoading,
            handlePageChange,
            handleCtxUpdate,
            handleSearch,
            handleRefresh
        }}>

            {children}
        </LookupContext.Provider>)

}