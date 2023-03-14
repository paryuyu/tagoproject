import axios from "axios";

//국내항공사 목록 조회
export async function ReservationReq(data) {
    const baseUrl = process.env.REACT_APP_BASEURL;
    
    try {
        let accessToken = localStorage.getItem("access_token");
       
        let headers = {
            "access-control-allow-origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': true,
            Authorization: `Bearer ${accessToken}`,
        };
        let reqUrl = `${baseUrl}/reservation`
        let response = await axios.post(reqUrl, data ,{ headers: headers });

        return response;
    } catch (err) {
        console.log(err, 'airline_err--!')
        return { status: 404 };
    }
}
