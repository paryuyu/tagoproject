
export default function AirportSelecItem({item}) {
    // console.log(item)

    return ( 
<>  {item && 
        <option value={item.airportId}>{item.airportNm}</option>
    }</>     );
}