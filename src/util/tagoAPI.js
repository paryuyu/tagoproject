import axios from "axios";

// let key=process.env.REACT_APP_KEY;
let key ="Lg3xW55zPXZOKKGy%2F9yuUYPbKZnBYzrDHtABcdAECRZiwNt0igZqOXoADrNI7%2BoSNrgN6raYgbrkNG2%2FUWerGA%3D%3D"
let endpoint = process.env.REACT_APP_END_POINT;
let baseUrl = process.env.REACT_APP_BASEURL;

//국내공항목록 조회
export async function AirportReq() {
    try {

        //path값은 명사 -> 동사X
        let reqUrl = `${baseUrl}/airport`
        let response = await axios.get(reqUrl);
        return response;
    } catch (e) {
        return e
    }
}

//국내항공사 목록 조회
export async function AirlineReq() {
    try {

        let reqUrl = `${baseUrl}/airline`
        let response = await axios.get(reqUrl);
        return response;
    } catch (e) {
        return e;
    }
}

//출도착지 기준으로 조회 ==> 함수명 변경
export async function TagoServerReq(data) {

    try {
        
        let reqUrl = `${baseUrl}/flight?depAirportId=${data.depAirportId}&arrAirportId=${data.arrAirportId}&depPlandTime=${data.depPlandTime}&airlineId=${data.airlineId}`
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