import { useContext } from "react";
import { LookupContext } from "../../../context/lookup_context";

import TimelineIcon from '@mui/icons-material/Timeline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useMediaQuery } from "@mui/material";

export default function GridButtons({ onUpdate, onAdd, onDelete, onChartOpen }) {

    const matches = useMediaQuery('(min-width:750px)');
    const { handlePage } = useContext(LookupContext);

    return (<>
        <div className="btnBox">
            <div className="gridheaderBtnBox">
                <button onClick={onAdd}>Add</button>
                <button onClick={onDelete}>Delete</button>
            </div>

            {matches ?
                <div className="gridheaderBtnBox">
                    <button onClick={onChartOpen} className={"chartBtn"}>
                        Price Chart View</button>
                </div>
                : <div className="gridheaderBtnBox">
                 
                    <div className='chartIcon' onClick={onChartOpen}>
                        <TimelineIcon />
                    </div>
                    <button onClick={onUpdate}>수정하기</button>
                </div>
            }
        </div>
    </>);
}