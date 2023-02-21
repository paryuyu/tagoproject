import { createContext, useEffect, useReducer } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { AuthLoginReq, AccessTokenValidReq, RefreshTokenValidReq } from "../util/authAPI";

export const AuthContext = createContext();

//TODO: useReducer 써보기 => 로그인 및 로그아웃 구현

//TODO: 유효성 검사 시기


export function AuthContextProvider({ children }) {
    const cookies = new Cookies();

 
    //로그인 요청보내기 : refresh token 및 access token response body로 받아오기
    const handleCtxLoginReq = async (email, password) => {

        if (email && password) {

            let auth = {
                email: email,
                password: password
            }

            let result = await AuthLoginReq(auth); //로그인 요청

            if (result.status === 200) { //서버 로그인 성공 시

                //token을 response body로 받는다고 가정
                if (result.access_token && result.refresh_token) {
                    //Access Token은 localStorage에 저장하고 Refresh Token은 cookies에 저장
                    localStorage.setItem('access_token', result.access_token);
                    cookies.set("refresh_token", result.token, {
                        secure: true,
                        maxAge: 60 * 60 * 24 * 7 
                        //maxAge 단위는 ms가 아닌 s.
                        //만료기한 일주일로 가정.
                    });

                } else {
                    console.log('서버 응답에 토큰 값이 없습니다.');
                }

            } else {
                //로그인 실패 
                console.log(result.status, "<===result_status", '로그인에 실패하였습니다.');
                return false;
            }

        }
    }


    /**토큰 유효성 검사 */
    const handleCtxTokenValidReq = async () => {

        let accessToken = localStorage.getItem("access_token");
        let refreshToken = cookies.get("refresh_token");

        if (accessToken !== null) { //로컬 스토리지에 엑세스 토큰이 있으면

            /** 'isExpired' will return a boolean
                true => your token is expired
                false => your token is not expired */

            const accessTokenExp = isExpired(accessToken) //토큰 유효성 검사

            if (accessTokenExp) {  //access 토큰이 만료되었으면 

                localStorage.removeItem("access_token"); //access 토큰을 local에서 지우고

                const refreshTokenExp = isExpired(refreshToken); //리프레쉬 토큰 만료 확인

                if (refreshTokenExp) {  //refresh token이 만료가 되었다면 

                    // -> 로그아웃(토큰 날려주기)
                    cookies.remove("refresh_token")

                } else {    //refresh token이 유효하다면 -> 서버에 access 토큰 요청

                    let response = await RefreshTokenValidReq(refreshToken) //서버 요청

                    if (response.status === 200) { //응답이 정상이라면

                        localStorage.setItem(response.token) //받아온 access 토큰을 저장

                    } else { //응답에 오류가 있다면 실패메세지
                        console.log(" token 발급에 실패했습니다. ")
                    }

                }

            } else {
                return;
            }


        }

    }


    useEffect(() => {
        handleCtxTokenValidReq();
    }, [])


    return (
        <AuthContext.Provider value={{ handleCtxLoginReq, handleCtxTokenValidReq }}>
            {children}
        </AuthContext.Provider>
    )
}
