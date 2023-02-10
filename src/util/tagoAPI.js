let key = process.env.REACT_APP_KEY;
let endpoint = process.env.REACT_APP_END_POINT;
let baseUrl = process.env.REACT_APP_BASEURL;


//국내공항목록 조회
export async function AirportReq() {
    try {
        let reqUrl = `${endpoint}/getArprtList?serviceKey=${key}&_type=json`;
        let response = await fetch(reqUrl);

        return response;
    } catch (e) {
        return e
    }
}

//국내항공사 목록 조회
export async function AirlineReq() {
    try {
        let reqUrl = `${endpoint}/getAirmanList?serviceKey=${key}&_type=json`;
        let response = await fetch(reqUrl);

        return response;
    } catch (e) {
        return e;
    }
}

//출도착지 기준으로 조회
export async function TagoServerReq(data) {

    try {

        let reqUrl = `${endpoint}/getFlightOpratInfoList?serviceKey=${key}&depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}&_type=json`;
        // let reqUrl =`${baseUrl}/find?depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}`;

        let response = await fetch(reqUrl);
        // console.log(await response.json());
        return response;

    } catch (err) {
        console.log(err)
        return err;
    }

}