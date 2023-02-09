let key = "Lg3xW55zPXZOKKGy%2F9yuUYPbKZnBYzrDHtABcdAECRZiwNt0igZqOXoADrNI7%2BoSNrgN6raYgbrkNG2%2FUWerGA%3D%3D"
let endpoint = `http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService`
let baseUrl = "http://172.30.1.38:8080"
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

    try{
  
    let reqUrl = `https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList?serviceKey=${key}&depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}&_type=json`;
    // let reqUrl =`${baseUrl}/find?depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}`;

    let response = await fetch(reqUrl);
    // console.log(await response.json());
    // console.log(response);
    return response;

}catch(err){
    console.log(err)
    return err;
}

}