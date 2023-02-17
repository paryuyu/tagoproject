import axios from "axios";

let key=process.env.REACT_APP_KEY;
let endpoint = process.env.REACT_APP_END_POINT;
let baseUrl = process.env.REACT_APP_BASEURL;

//국내공항목록 조회
export async function AirportReq() {
    try {
        
        let reqUrl = `${baseUrl}/find`
        // let reqUrl = `${endpoint}/getArprtList?serviceKey=${key}&_type=json`;
        let response = await axios.get(reqUrl);
        return response;
    } catch (e) {
        return e
    }
}

//국내항공사 목록 조회
export async function AirlineReq() {
    try {

        let reqUrl = `${baseUrl}/find`
        let response = await axios.get(reqUrl);

        return response;
    } catch (e) {
        return e;
    }
}

//출도착지 기준으로 조회 ==> 함수명 변경
export async function TagoServerReq(data) {

    try {
        
        let reqUrl = `${endpoint}/getFlightOpratInfoList?serviceKey=${key}&depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}&numOfRows=50&_type=json`;

        let response = await axios.get(reqUrl);
        return response;

    } catch (err) {
        return err;
    }

}


//update request
export async function DataUpdateReq(data){
    
    try{ 
        let response = await axios.put(baseUrl+"/update", data);
        return response;

    }catch(err){

        console.log(err)
        return err.message;
    }

}