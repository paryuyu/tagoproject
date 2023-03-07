import { LinearProgress, useMediaQuery } from '@mui/material';

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import _ from 'lodash';

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from '../../context/auth_context';
import { LookupContext } from "../../context/lookup_context";

import PaginationCustom from './item/PaginationCustom';
import ResultModal from './resultModal';
import GridButtons from './item/gridButtons';
import { columnDefs, defaultColDef } from './options/gridOption';





export default function DataGridTable({ onChartOpen }) {
    const { searchingData, pageLoading } = useContext(LookupContext);
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



    //추가 데이터 : 빈 데이터 생성
    function addItems() {
        const addItem = {
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

    //마지막 확인 모달 오픈
    const handleAlretOpen = () => {
        setAlretOpen(c => !c);
    }


    //수정 데이터 마지막 확인 모달창

    const handleFinalUpdate = () => {

        //선택된 데이터들
        let chkArr = gridRef.current.api.getSelectedRows();

        // flag가 존재하는 값들만 서버로 보내주기.
        let flagFilter = chkArr.filter(one => Object.keys(one).includes("flag"))
        setFinalChk(flagFilter)

        //확인창 -> 모달에서 ok를 누르면 서버로 보내지게 단계를 하나 만들기.
        setAlretOpen(c => !c)
    }




    return (
        <div className=" gridTableBox">
            <GridButtons onUpdate={handleFinalUpdate} onChartOpen={onChartOpen} onAdd={handleDataAdd} onDelete={handleDataDelete} />
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
            </div>

            <PaginationCustom onUpdate={handleFinalUpdate} />
            <ResultModal open={alretOpen} onOpen={handleAlretOpen} updateData={finalChk} />
        </div>)
}

