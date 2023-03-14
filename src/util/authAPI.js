import axios from "axios";
import { Cookies } from "react-cookie";

let baseUrl = process.env.REACT_APP_BASEURL;

export async function UserRegisterReq(registerData) {
    try {
        console.log('register start--!');
        console.log(registerData)
       
        let response = await axios.post("http://localhost:8080/register",registerData )
        return response;
        // let response = await axios.post(`${baseUrl}/join`, registerData);

        // return response;

    } catch (error) {

        console.log(error)
        return error.message;
    }


}

//로그인 응답
export async function AuthLoginReq(id, pw) {
    try {
      
        let response = await axios.post(`${baseUrl}/login`, {
            id: id,
            pw: pw
        });
   
        return response;

    } catch (e) {
        return e
    }
}


/** Refresh Token 유효성 검사 요청*/
export async function RefreshTokenValidReq() {

    try {
        let cookies = new Cookies();
        let refreshToken = cookies.get("refresh_token");

        let headers = {
            "access-control-allow-origin": "*",
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Credentials': true,
            Authorization: `Bearer ${refreshToken}`,
        };
        
        let response = await axios.get(`${baseUrl}/refresh`, { headers });
      
        return response;

    } catch (error) {

        return error.message
    }
}


