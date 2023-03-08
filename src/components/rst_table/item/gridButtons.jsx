import { useContext, useState } from "react";
import { LookupContext } from "../../../context/lookup_context";

import TimelineIcon from '@mui/icons-material/Timeline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useMediaQuery } from "@mui/material";

export default function GridButtons({ onUpdate, onAdd, onDelete, onChartOpen }) {
    const [updatemouse, setUpdateMouse] = useState(false);
    const [addmouse,setAddMouse] = useState(false);

    const matches = useMediaQuery('(min-width:750px)');
    const { handlePage } = useContext(LookupContext);

    return (<>
        <div className="btnBox">
            <div className="gridheaderBtnBox">
                <button
                  onMouseEnter={() => { setAddMouse(true); }}
                  onMouseLeave={() => { setAddMouse(false) }}
                 onClick={onAdd}>Add</button>
                <button onClick={onDelete}>Delete</button>
               {addmouse && <p className="modifyMent addMent">새로 추가하는 데이터가 비어있으면 수정에 반영되지 않습니다.</p>}
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
                            onMouseEnter={() => { setUpdateMouse(true); }}
                            onMouseLeave={() => { setUpdateMouse(false) }}
                            onClick={onUpdate}>수정하기</button>
                        {updatemouse && <p className="modifyMent">수정은 해당 페이지 내에서만 가능합니다.</p>}
                    </div>
                </div>
            }
        </div>
    </>);
}