import axios from "axios";
let baseUrl = process.env.REACT_APP_BASEURL;

export async function UserRegisterReq(registerData){
    try {
        console.log('register--!');
        let response = await axios.post(`${baseUrl}/register`,{
            registerData: registerData
        })
        
        return response;

    } catch (error) {

        console.log(error)
        return error.message;
    }
    

}



//로그인 응답
export async function AuthLoginReq(auth) {
    try {
        console.log('example: auth start-!')

        // let response = await axios.post(`${baseUrl}/auth`, {
        //     auth_data: auth
        // });

        // return response;

        return  { status: 200, 
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpdGVtcyI6WyIxLjEiLCIyLjIiLCIzLjMiXSwiZm9vLmJhciI6IjQyIiwiaWF0IjoxMDAwLCJzdWIiOiJtZSIsImV4cCI6ODc0MDAsImlzcyI6InRlc3Quand0LnNlcnZlciJ9.Jl0cz325ePBYRh5vEAsGPnOsjdH3GV4xGlwjIKV-FgM", 
            refresh_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpdGVtcyI6WyIxLjEiLCIyLjIiLCIzLjMiXSwiZm9vLmJhciI6IjQyIiwiaWF0IjoxMDAwLCJzdWIiOiJtZSIsImV4cCI6ODc0MDAsImlzcyI6InRlc3Quand0LnNlcnZlciJ9.Jl0cz325ePBYRh5vEAsGPnOsjdH3GV4xGlwjIKV-FgM" }; 
            
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


/** Refresh Token server request function*/
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


