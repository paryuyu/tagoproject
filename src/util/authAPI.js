import axios from "axios";
import { Cookies } from "react-cookie";

let baseUrl = process.env.REACT_APP_BASEURL;

export async function UserRegisterReq(registerData) {
    try {
        console.log('register--!');

        let response = await axios.post(`${baseUrl}/join`, {
            id: registerData.id,
            pw: registerData.password
        })

        console.log(response, 'response')
        return response;

    } catch (error) {

        console.log(error)
        return error.message;
    }


}

//로그인 응답
export async function AuthLoginReq(id, pw) {
    try {

        console.log('login start-!')
        let response = await axios.post(`${baseUrl}/auth`, {
            id: id,
            pw: pw
        });

        return response;

    } catch (e) {
        return e
    }
}


/** Refresh Token 유효성 검사 요청*/
export async function RefreshTokenValidReq(refreshToken) {
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

        //local server
        let response = await axios.get(`http://172.30.1.201:8080/refresh`, { headers });

        //docker server
        //let response = await axios.get(`${baseUrl}/refresh`, { headers });

        return response;

    } catch (error) {

        return error.message
    }
}


