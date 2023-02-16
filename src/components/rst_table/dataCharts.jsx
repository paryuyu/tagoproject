import { AgChartsReact } from "ag-charts-react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { LookupContext } from "../../context/lookup_context";

export default function DataCharts() {
    const [data, setData] = useState([]);

    let ctx = useContext(LookupContext)

    useEffect(() => {
        let newData = [];
        if (!ctx.searchisLoading) {

            ctx.raw?.item.forEach((elm, index) => {
                if (elm.economyCharge > 0 || elm.prestigeCharge > 0) {

                    newData.push({
                        quarter: `P${index}`,
                        economy: elm.economyCharge ? elm.economyCharge : 0,
                        business: elm.prestigeCharge ? elm.prestigeCharge : 0
                    })
                }
            })
        }
        setData(newData)
    }, [ctx.searchingData])


    const options = {
        data: data,
        
        legend:{
            position:"bottom"
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

        {!ctx.searchisLoading && <AgChartsReact
            options={options} />}

    </div>);
}
