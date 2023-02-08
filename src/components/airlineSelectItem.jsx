export default function AirlineSelecItems({item}) {

    return ( <>
    {item && 
        <option value={item.airlineId}>{item.airlineNm}</option>
    }
    </> );
}

