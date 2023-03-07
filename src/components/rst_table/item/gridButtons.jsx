import { useContext , useState} from "react";
import { LookupContext } from "../../../context/lookup_context";

import TimelineIcon from '@mui/icons-material/Timeline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useMediaQuery } from "@mui/material";

export default function GridButtons({ onUpdate, onAdd, onDelete, onChartOpen }) {
    const [mouse,setMouse] = useState(false)
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

                    <div className="modifyBox">
                        <button
                            onMouseEnter={() => { setMouse(true); }}
                            onMouseLeave={() => { setMouse(false) }}
                            onClick={onUpdate}>수정하기</button>
                     {mouse && <p className="modifyMent">수정은 페이지 내에서만 가능합니다.</p>}
                    </div>
                </div>
            }
        </div>
    </>);
}