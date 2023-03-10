import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useMediaQuery } from "@mui/material";
import MypageRecentSearchItem from "../components/myPageItems/myPageRecentItem";
export default function Mypage() {
    let authCtx = useContext(AuthContext);
    const matches = useMediaQuery('(min-width:750px)');
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [recentSearchingView, setRecentSearchingView] = useState(false);
    const [recentData, setRecentData] = useState();
    useEffect(() => {
        if (pathname === "/mypage" && !authCtx?.auth?.userId) {
            navigate("/auth");
        }

        let token = localStorage.getItem("access_token");
        let getRecentKeywords = localStorage.getItem("keywords_" + token);
        let jsonData = JSON.parse(getRecentKeywords);
        if (jsonData) {
            setRecentData(jsonData)
        }
    }, [authCtx?.auth])

    const handleView = () => {
        console.log(recentSearchingView, 'recentSearchingView')
        setRecentSearchingView(c => !c)
    }



    return (<section className="authOutlineContainer mypageOutlined" >
        <h2>{authCtx?.auth?.userId}님의 정보</h2>
        <div className="myPagerecentViewBox">

            <div className="myPageRecentViewHeaderBox" onClick={handleView}>
                <p className="mypageTypo">최근 검색한 검색 데이터 보기</p>
                <KeyboardArrowDownIcon />
            </div>
            <div className="myPagerecentViewContentBox">
                {recentSearchingView &&
                    recentData &&

                    recentData?.length > 0 ?
                    recentData.map((one, index) => { return <MypageRecentSearchItem item={one} key={index} /> })
                    :
                    <></>
                }
            </div>
        </div>

    </section>);
}