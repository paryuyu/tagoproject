export default function ResultListItem({ item }) {

    console.log(item)
    return (<>
        {item &&

            <div>
                <p>{item.airlineNm} </p>
                <p>{item.arrAirportNm} </p>
                <p>{item.depAirportNm} </p>
                <p>{item.arrPlandTime} </p>
                <p>{item.depPlandTime} </p>
                <p>{item.economyCharge} </p>
                <p>{item.prestigeCharge} </p>
                <p>{item.vihicleId} </p>
            </div>

        }







    </>);
}