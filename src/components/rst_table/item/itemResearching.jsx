import { Chip, useMediaQuery } from "@mui/material";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { LookupContext } from "../../../context/lookup_context";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export default function RecentSeachingKeyword() {
    const [recent, setRecent] = useState([]);
    const ctx = useContext(LookupContext);
    const matches = useMediaQuery('(min-width:750px)')
    useEffect(() => {

        let item = localStorage.getItem("keywords");
        let json = JSON.parse(item);
        setRecent(json)

    }, [ctx.keywords])
    console.log(recent, 'recent')
    const [recentView, setRecentView] = useState(false);
    const handleView = () => {
        setRecentView(c => !c);
    }
    return (<>
        <div className="recentSearchingDataBox">

            <div className="recentTitleBox" onClick={handleView}>
                <p className="recentKeywordTitle">최근 검색어 보기</p>
                <ArrowDropDownIcon />
            </div>
            {recentView &&
                <div className="recentValueBox">

                    {recentView &&
                        recent?.length > 0 ? recent?.map((one, index) => {
                            return (<div className="recentChipBox">
                                <p className="recentChipTypo recentChipTitle">출발공항</p>
                                <p className="recentChipTypo recentChipContent">{one.dep}</p>
                                <p className="recentChipTypo recentChipTitle">도착공항</p>
                                <p className="recentChipTypo recentChipContent">{one.arr}</p>
                            </div>)
                        })
                        : <p className="ment recentSearchMent">저장된 검색어가 없습니다.</p>
                        
                        }
                </div>}
        </div>
    </>);
}
