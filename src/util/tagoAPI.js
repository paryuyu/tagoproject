import axios from "axios";

let key=process.env.REACT_APP_KEY;
let endpoint = process.env.REACT_APP_END_POINT;
let baseUrl = process.env.REACT_APP_BASEURL;

//국내공항목록 조회
export async function AirportReq() {
    try {

        //path값은 명사 -> 동사X
        // let reqUrl = `${baseUrl}/airport`
        
        let reqUrl = `${endpoint}/getArprtList?serviceKey=${key}&_type=json`;
        let response = await axios.get(reqUrl);
        return response;
    } catch (e) {
        return e
    }
}

//국내항공사 목록 조회
export async function AirlineReq() {
    try {
        let reqUrl = `${endpoint}/getAirmanList?serviceKey=${key}&_type=json`;
        // let reqUrl = `${baseUrl}/airline`
        let response = await axios.get(reqUrl);
        return response;
    } catch (e) {
        return e;
    }
}

//출도착지 기준으로 조회 ==> 함수명 변경
export async function TagoServerReq(data) {
    console.log("tago-req")
    try {
        let reqUrl = `${endpoint}/getFlightOpratInfoList?serviceKey=${key}&depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}&_type=json&pageNo=${data.pageNo}&numOfRows=10`;

        // let reqUrl = `${baseUrl}/flight?depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}&pageNo=${data.pageNo}&numOfRows=10`
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
        console.log(err.message)
        return err.message;
    }

}