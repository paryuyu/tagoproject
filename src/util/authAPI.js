import axios from "axios";

let baseUrl = process.env.REACT_APP_BASEURL;

export async function UserRegisterReq(registerData) {
    try {
        console.log('register--!');
        let response = await axios.post(`${baseUrl}/join`, {
            id: registerData.id,
            pw: registerData.password
        })
        console.log(response,'response')
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


/** Refresh Token 유효성 검사 요청*/
export async function RefreshTokenValidReq(refreshToken) {
    try {
        let response = await axios.get(`${baseUrl}/refresh`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
        })
        console.log(response,'refreshvalid')

        return response;

    } catch (error) {

        return error.message
    }
}


