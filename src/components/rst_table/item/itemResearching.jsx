import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import _ from "lodash";

import { useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";

import { LookupContext } from "../../../context/lookup_context";
import { AuthContext } from "../../../context/auth_context";
import { MenuContext } from "../../../context/menu_context";
import RecentKeyword from './recentKeyword';

export default function RecentSeachingKeyword() {
    const menuCtx = useContext(MenuContext);
    const ctx = useContext(LookupContext);
    const authCtx = useContext(AuthContext);

    const [recent, setRecent] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("access_token");
        let item = localStorage.getItem("keywords");
        let decode = decodeToken(token);
        
        if (item && decode.id === authCtx?.auth?.userId) {
            let json = JSON.parse(item);
            const uniqueArr = _.uniqBy(json, (obj) => obj.arr + obj.dep);
            setRecent(uniqueArr);
        }

    }, [ctx.refresh])

    const handleView = () => {
        menuCtx.handleRecentView(true);
    }

    return (<>
        <div className="recentSearchingDataBox">
            <div className="recentTitleBox" onClick={handleView}>
                <p className="recentKeywordTitle">최근 검색어 보기</p>
                <ArrowDropDownIcon />
            </div>

            {menuCtx.recentView &&
                <div className="recentValueBox">
                    {menuCtx.recentView &&
                        recent?.length > 0
                        ? recent?.map((one, index) => {
                            return (<RecentKeyword arr={one.arr} dep={one.dep} key={index} />)
                        })

                        : <p className="ment recentSearchMent">저장된 검색어가 없습니다.</p>

                    }
                </div>}
        </div>
    </>);
}
