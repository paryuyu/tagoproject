import { LinearProgress, useMediaQuery } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AgGridReact } from "ag-grid-react";
import _ from 'lodash';

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from '../../context/auth_context';
import { LookupContext } from "../../context/lookup_context";
import { DateFormatter, PriceFormmater } from '../../lib/formatter';
import PaginationCustom from './PaginationCustom';
import ResultModal from './resultModal';
import TimelineIcon from '@mui/icons-material/Timeline';



/** grid column 설정 */
const columnDefs = [
    {
        maxWidth: 200,
        width: 20,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        editable: false,

    },
    { headerName: '항공사', field: "airlineNm", },
    { headerName: '항공편', field: "vihicleId", },
    { headerName: '출발시간', field: "depPlandTime", valueFormatter: DateFormatter },
    { headerName: '도착시간', field: "arrPlandTime", valueFormatter: DateFormatter },
    { headerName: '일반석운임', field: "economyCharge", valueFormatter: PriceFormmater },
    { headerName: '비즈니스석운임', field: "prestigeCharge", valueFormatter: PriceFormmater },
    { headerName: '출발공항', field: "depAirportNm", },
    { headerName: '도착공항', field: "arrAirportNm", },
];

export default function DataGridTable({ onChartOpen }) {
    const { searchingData, pageLoading, handleCtxUpdate } = useContext(LookupContext);
    const authCtx = useContext(AuthContext);
    const matches = useMediaQuery('(min-width:750px)');
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const gridRef = useRef();

    const [alretOpen, setAlretOpen] = useState(false);
    const [finalChk, setFinalChk] = useState([]);
    const [cnt, setCnt] = useState(0);
    const [rowData, setRowData] = useState();
    const [selectArr, setSelectArr] = useState([]);


    //데이터가 새로 들어올 때 새로 마운트 해주기. 
    useEffect(() => {
        if (searchingData.length > 0) {
            setRowData(searchingData.sort((a, b) => b.id - a.id))
        }
    }, [searchingData])


    /**column 설정 */
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        editable: true,
    }), [])


    //추가 데이터 : 빈 데이터 생성
    function addItems() {
        let addItem = {
            flag: 'add',
            name: `add${cnt}`,
            airlineNm: '',
            vihicleId: '',
            depPlandTime: '000000000000',
            arrPlandTime: '000000000000',
            economyCharge: '',
            prestigeCharge: '',
            depAirportNm: '',
            arrAirportNm: '',
        }

        setCnt(cnt + 1)
        return addItem;
    }

    /**추가 데이터 :브라우저 상 0번째 인덱스로 데이터 추가 */
    const handleDataAdd = () => {
        let add = gridRef.current.api.applyTransaction({ add: [addItems()], addIndex: 0 });
        setRowData([{ id: Number(add.add[0].id), ...add.add[0].data }, ...rowData])
    }


    /** 데이터 삭제 => rowData에 flag만 붙여주는걸로 수정 */
    const handleDataDelete = () => {
        let delArr = gridRef.current.api.getSelectedRows();

        let newDeleteData = []; //delete flag가 달린 새로운 배열
        delArr.forEach(elm => {
            elm.flag = 'delete'
            newDeleteData.push(elm)
        })

        //기존배열이랑 새로운 delete배열 붙여버리고 중복값 제거해준 배열로 rowData 넣어버리기.
        let newArr = rowData.concat(newDeleteData) //배열 붙이기
        let filterArr = _.uniqBy(newArr) //중복값 제거
        setRowData(filterArr)

    }

    // rowData가 변경될 때마다 작동: delete flag가 붙은 row 색 변환
    useEffect(() => {
        gridRef?.current?.api?.redrawRows();
    }, [rowData])


    //row에 style class 생성
    const handleGetRowClass = (params) => {
        if ('delete' === params.node.data.flag) {
            return 'delete-warning';
        }

        if ("update" === params.node.data.flag) {
            return 'update-warning';
        }

        if ("add" === params.node.data.flag) {
            return 'add-warning';
        }
    }

    //해당 데이터에 update -> rowData 반복문돌면서 flag만 붙여주고 빠져나오기.
    const handleCellUpdate = (e) => {

        //데이터가 변형되어야 이벤트 발생
        if (e.newValue !== e.oldValue) {

            //rowData에서 변형되지 않은 데이터들
            let filterArr = rowData.filter(elm => elm.id !== e.data.id)

            //변형된 데이터에는 flag 붙이고, 변형되지 않은 데이터들 배열과 합쳐서 UI에서 그대로 보이게 sort해주기.
            if (!Object.values(e.data).includes("add")) {

                let updateData = _.cloneDeep(e.data);
                updateData.flag = "update"

                let sortData = [updateData, ...filterArr].sort((a, b) => b.id - a.id)
                setRowData(sortData)

            }
        }

    }


    //차트 모달 오픈
    const handleChartView = () => {
        onChartOpen();
    }

    //마지막 확인 모달 오픈
    const handleAlretOpen = () => {
        setAlretOpen(c => !c);
    }


    //수정 데이터 마지막 확인 모달창
    const handleFinalUpdate = () => {
        //UI => 빈 데이터 / 여기서는 보여주고
        //경고문만 보여주자.

        //선택된 데이터들
        let chkArr = gridRef.current.api.getSelectedRows();

        // flag가 존재하는 값들만 서버로 보내주기.
        let flagFilter = chkArr.filter(one => Object.keys(one).includes("flag"))
        setFinalChk(flagFilter)

        //확인창 -> 모달에서 ok를 누르면 서버로 보내지게 단계를 하나 만들기.
        setAlretOpen(c => !c)
    }



    //서버로 수정된 데이터 보내주기 : 1. user정보는 header로.
    const handleUpdateFinish = () => {
        //서버에는 빈 데이터가 안들어가게

        let result = handleCtxUpdate(finalChk)

        //서버 결과창
        // if(result.status === 200){
        // 검색 키워드 기억하고 있다가 다시 요청을 보내야함
        //     console.log("update success-->refresh..!(다시 한번 find 요청 보내기)")
        //     handleAlretOpen()
        // }else{
        //     console.log("update failed..!")
        //     handleAlretOpen()
        // }
    }




    return (
        <div className=" gridTableBox">
            <div className="btnBox">
                <div className="btnAddDelBox">
                    <button onClick={handleDataAdd}>Add</button>
                    <button onClick={handleDataDelete}>Delete</button>
                </div>
                {matches ? <button onClick={handleChartView} className={"chartBtn"}>
                    Price Chart View</button> :
                    <div className='chartIcon' onClick={handleChartView}>
                        <TimelineIcon />
                    </div>
                }
            </div>
            {pageLoading && <LinearProgress color='primary' />}

            <div
                style={gridStyle}
                className={"ag-theme-alpine"}>

                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    ref={gridRef}
                    rowSelection='multiple'
                    onCellEditingStopped={handleCellUpdate}
                    defaultColDef={defaultColDef}
                    getRowClass={handleGetRowClass}
                    paginationAutoPageSize={false}
                />
                <div className="modifyBtnBox">
                    <button className="modifyBtn" onClick={handleFinalUpdate}>수정하기</button>
                </div>
            </div>
            <PaginationCustom />
            <ResultModal open={alretOpen} onOpen={handleAlretOpen} updateData={finalChk} onUpdate={handleUpdateFinish} />
        </div>)
}

