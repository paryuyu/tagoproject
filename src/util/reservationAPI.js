import axios from "axios";
const baseUrl = process.env.REACT_APP_BASEURL;

//국내항공사 목록 조회
export async function ReservationReq(data) {

    try {
        let accessToken = localStorage.getItem("access_token");

        let headers = {
            "access-control-allow-origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': true,
            Authorization: `Bearer ${accessToken}`,
        };
        
        let reqUrl = "http://localhost:8080/reservation"
        // let reqUrl = `${baseUrl}/reservation`
        let response = await axios.post(reqUrl, data, { headers: headers });

        return response;
    } catch (err) {
        console.log(err, 'flight-reservation-error--!')
        return { status: 404 };
    }
}


export async function DataFindReq(flightId) {
    console.log("req2--")
    try {
        let accessToken = localStorage.getItem("access_token");

        let headers = {
            "access-control-allow-origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': true,
            Authorization: `Bearer ${accessToken}`,
        };

        // let reqUrl = `${baseUrl}/information`
        let reqUrl = "http://localhost:8080/information"
        let response = await axios.post(reqUrl, {flightId: flightId}, { headers: headers });

        return response;
    } catch (err) {
        console.log(err, 'flight-extra-information-error--!')
        return { status: 404 };
    }
}