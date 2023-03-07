import { Chip, useMediaQuery } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function RecentSeachingKeyword() {
    const [recent, setRecent] = useState();

    const matches = useMediaQuery('(min-width:750px)')
    useEffect(() => {
        let item = localStorage.getItem("mkeywords");
        let json = JSON.parse(item);
        setRecent(json)
    }, [])

    return (<>
        <div className="recentSearchingDataBox">
            {recent?.map(one => <Chip label={`출발 ${one.depPort} 도착 ${one.arrPort} `} />)}
        </div>
    </>);
}
