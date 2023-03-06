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

        if (result.status === 200) {
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

        const cookies = new Cookies();
        let refreshToken = cookies.get("refresh_token");

        if (data) {
            
            let result = await DataUpdateReq(data, refreshToken);

            if (result.status === 200) {
                console.log("update success...!")
            } else {
                console.log("update failed...!")
            }

        } else {
            //완료하기
            console.log('수정할 데이터가 없습니다.')
        }
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