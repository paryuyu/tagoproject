import axios from "axios";
let baseUrl = process.env.REACT_APP_BASEURL;

//로그인 응답
export async function AuthLoginReq(auth) {

    



    try {
        let response = await axios.post(`${baseUrl}/auth`, {
            auth_data: auth
        },{  withCredentials: true });

        return response;

    } catch (e) {
        return e
    }
}

//token 헤더** -> access token 유효성 검사
export async function AccessTokenValidReq(accessToken) {
    try {
        let response = await axios.get(`${baseUrl}/request`, {
            headers: { Authorization: `Bearer ${accessToken}` },
    
        })

        return response;

    } catch (error) {

        return error.message
    }
}


//token 헤더** -> refresh token 유효성 검사
export async function RefreshTokenValidReq(refreshToken){
    try {
        let response = await axios.get(`${baseUrl}/refresh`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
    
        })

        return response;

    } catch (error) {

        return error.message
    }
}