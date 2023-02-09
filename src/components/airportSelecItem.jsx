
export default function AirportSelecItem({ item }) {

    return (
        <>  
        
        {item &&
            <option value={item.airportId}>{item.airportNm}</option>
        }
        


        
        </>);
}