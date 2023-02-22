import { AgChartsReact } from "ag-charts-react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { LookupContext } from "../../context/lookup_context";
//onChartOpen={onOpen}
export default function DataCharts({ onChartOpen, airline, arr, dep }) {
    const [data, setData] = useState([]);

    let ctx = useContext(LookupContext)

    useEffect(() => {
        let newData = [];
        if (!ctx.searchisLoading) {
            let item = ctx.raw.item;
          
            if(Array.isArray(item)){ //정보가 1개면 객체로 들어옴

                item.forEach((elm, index) => {
                    if (elm.economyCharge > 0 || elm.prestigeCharge > 0) {
    
                        newData.push({
                            quarter: `P${index}`,
                            economy: elm.economyCharge ? elm.economyCharge : 0,
                            business: elm.prestigeCharge ? elm.prestigeCharge : 0
                        })
                    }
                })

            }else{
                
                newData.push({
                    quarter: `P${0}`,
                    economy: item?.economyCharge ? item.economyCharge : 0,
                    business: item?.prestigeCharge ? item.prestigeCharge : 0
                })
            }
         
        }

        setData(newData)
    }, [ctx.searchingData])


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

        {data.length > 0 ?

            !ctx.searchisLoading && <AgChartsReact options={options} /> :
            <>
                <div className="no-data-ment">
                    <p>{dep}에서 {arr}로 도착하는 해당 노선에 대한 정보가 없습니다.</p>
                </div>
                <button onClick={onChartOpen} className="close-btn">돌아가기</button>
            </>
        }

    </div>);
}
