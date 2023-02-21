import { createContext, useEffect } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { AuthLoginReq, AccessTokenValidReq, RefreshTokenValidReq } from "../util/authAPI";

export const AuthContext = createContext();


export function AuthContextProvider({ children }) {

    const cookies = new Cookies();

    //로그인 요청보내기 : refresh token 및 access token response body로 받아오기
    const handleCtxLoginReq = async (email, password) => {

        if (email && password) {

            let auth = {
                email: email,
                password: password
            }

            let result = await AuthLoginReq(auth); //서버 요청

            //token을 response body -> data로 받는다고 가정
            if (result.status === 200) {
                //서버 로그인 성공 시

                // if (result.data.access_token && result.data.refresh_token) {
                if (result.token) {
                    //localStorage에 Access Token 저장

                    localStorage.setItem('access_token', result.token); //저장하고
                    let token = localStorage.getItem('access_token'); //꺼내오기
                    console.log(token, '<===token') // 꺼내온 토큰을 decoding

                    const mydecodedToken = decodeToken(token) //decoding
                    const TokenExp = isExpired(token) //token expired 체크

                    console.log(TokenExp, '<=TokenExp')
                    console.log(mydecodedToken, '<=mydecodedToken')


                    //쿠키에 저장 
                    //options : expires는 Date로 지정(상대값이 아니라 절대값)
                     cookies.set("refresh_token", result.token, {
                        secure: true,
                        httpOnly: true, //http Only 는 리프레쉬 토큰 어떻게 받아오는지?
                        maxAge: 60*60*24*7 //일주일 //maxAge 단위는 ms가 아닌 s.
                    });

                    //쿠키에서 꺼내오기 : httpOnly일 때는 보여지는게 없어서 못 꺼냄. 
                    let refreshToken = cookies.get("refresh_token"); 
                    console.log(refreshToken, '<==refreshToken');

                    return true;

                } else {
                    console.log('서버 응답에 토큰 값이 없습니다.');
                    return false;
                }

            } else {
                //로그인 실패 
                //로그인 실패 화면 띄워주기
                console.log(result.status, "<===result_status", '로그인에 실패하였습니다.');
                return false;
            }

        }
    }


    //토큰 검증 -> header에 access 토큰을 보내기.
    const handleCtxTokenValidReq = async () => {

        let accessToken = localStorage.getItem("access_token");
        let refreshToken = cookies.get("refresh_token");

        if (accessToken !== null) {
            // access token 이 로컬스토리지에 있으면 서버에 access token 유효성 검사
            let result = await AccessTokenValidReq(accessToken);

            if (result.status === 200) {

                //access 토큰이 정상이면 
                console.log('success login--!')

            } else {
                console.log('Token is expired...!')


                //access token이 만료됐으면 localStorage에서 access token 을 제거하고
                localStorage.removeItem("access_token")

                //access token 만료 시 refresh 토큰을 서버에 요청해서 access 토큰을 새로 발급받음
                let refresh_result = await RefreshTokenValidReq(refreshToken)

                if (refresh_result.status === 200) {

                    //발급받은 토큰을 localStorage에 새로저장
                    localStorage.setItem('access_token', result.data.access_token);
                    console.log('success login--!');

                } else {

                    //리프레쉬 토큰이 만료되었거나 손상되었으면 로그아웃 => local과 cookie에서 모두 제거
                    localStorage.removeItem("access_token");
                    cookies.remove("refresh_token");

                    console.log('logout--!');
                }

            }
        }
    }


    useEffect(() => {
        // handleCtxTokenValidReq();
    }, [])


    return (
        <AuthContext.Provider value={{ handleCtxLoginReq, handleCtxTokenValidReq }}>
            {children}
        </AuthContext.Provider>
    )
}
