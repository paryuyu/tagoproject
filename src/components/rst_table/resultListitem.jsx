import { useEffect } from "react";

export default function ResultListItem({ item }) {

    // console.log(item)
    
let depTimeFormat = new Intl.DateTimeFormat("ko",{dateStyle:"long"});
let depTime = depTimeFormat.format(new Date(item.depPlandTime));
  


    return (<>
        {item &&
                <tr>
                    <td>{item.airlineNm}</td>
                    <td>{item.vihicleId}</td>
                    <td>{depTime}</td>
                    <td>{item.arrPlandTime}</td>
                    <td>{item.economyCharge}</td>
                    <td>{item.prestigeCharge}</td>
                    <td>{item.depAirportNm}</td>
                    <td>{item.arrAirportNm}</td>
                </tr>
        }







    </>);
}