import { AgChartsReact } from "ag-charts-react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { LookupContext } from "../../context/lookup_context";
//onChartOpen={onOpen}
export default function DataCharts({ onChartOpen }) {
    const [data, setData] = useState([]);
    const [dataErr, setDataErr] = useState(false);
    const [arr, setArr] = useState("");
    const [dep, setDep] = useState("")
    let ctx = useContext(LookupContext)

    useEffect(() => {
        let newData = [];
        if (!ctx?.searchisLoading) {
            let item = ctx.searchingData;

            if (Array.isArray(item)) { //정보가 1개면 객체로 들어옴
                setArr(item[0].arrAirportNm);
                setDep(item[0].depAirportNm);

                item.forEach((elm, index) => {
                    if (elm.economyCharge > 0 || elm.prestigeCharge > 0) {

                        newData.push({
                            quarter: `P${index}`,
                            economy: elm.economyCharge ? elm.economyCharge : 0,
                            business: elm.prestigeCharge ? elm.prestigeCharge : 0
                        })
                    }
                })

            } else {
                setArr(item.arrAirportNm);
                setDep(item.depAirportNm);

                newData.push({
                    quarter: `P${0}`,
                    economy: item?.economyCharge ? item.economyCharge : 0,
                    business: item?.prestigeCharge ? item.prestigeCharge : 0
                })
            }

        }

        setData(newData)
    }, [ctx.searchingData])

    useEffect(() => {
        if (Array.isArray(data)) {
            setDataErr(false);
            data.forEach((one) => {
                if (Number(one.economy) == 0 && Number(one.business) == 0) {
                    setDataErr(true);
                }
            })
        }

    }, [data])


    const options = {
        data: data,

        legend: {
            position: "bottom"
        },
        series: [{
            xKey: 'quarter',
            yKey: 'economy',
        }, {
            xKey: 'quarter',
            yKey: 'business',
        }],

    }

    return (<div>
        <div className="modalheaderBox">
            <MdClose className="closeIcon" onClick={onChartOpen} />
            <div className="modalTypoBox">
                <p>{dep}</p>
                <BsArrowRight className="arrowIcon" />
                <p>{arr}</p>
            </div>
        </div>
        
        {data.length > 0 && !dataErr ?
            !ctx.searchisLoading &&
            <AgChartsReact options={options} /> :

            <>
                <div className="no-data-ment">
                    <p>{dep}에서 {arr}로 도착하는 해당 노선에 대한 가격정보가 없습니다.</p>
                </div>
                <button onClick={onChartOpen} className="close-btn">돌아가기</button>
            </>
        }

    </div>);
}
