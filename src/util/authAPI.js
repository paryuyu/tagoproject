import axios from "axios";
let baseUrl = process.env.REACT_APP_BASEURL;

//로그인 응답
export async function AuthLoginReq(auth) {
    try {
        console.log('auth start-!')
        // let response = await axios.post(`http://121.167.52.69:29180/jwt.secret?items%5B%5D=1.1&items%5B%5D=2.2&items%5B%5D=3.3&foo.bar=42&user=me&iat=1000`, {
        //     auth_data: auth
        // });

        // let response = await axios.post(`${baseUrl}/auth`, {
        //     auth_data: auth
        // });

        // console.log(response, 'login-response')

        return  { status: 200, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpdGVtcyI6WyIxLjEiLCIyLjIiLCIzLjMiXSwiZm9vLmJhciI6IjQyIiwiaWF0IjoxMDAwLCJzdWIiOiJtZSIsImV4cCI6ODc0MDAsImlzcyI6InRlc3Quand0LnNlcnZlciJ9.Jl0cz325ePBYRh5vEAsGPnOsjdH3GV4xGlwjIKV-FgM" }      
         // return response;
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
export async function RefreshTokenValidReq(refreshToken) {
    try {
        let response = await axios.get(`${baseUrl}/refresh`, {
            headers: { Authorization: `Bearer ${refreshToken}` },

        })

        return response;

    } catch (error) {

        return error.message
    }
}