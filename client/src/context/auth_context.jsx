import { createContext, useEffect, useReducer } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { AuthLoginReq, AccessTokenValidReq, RefreshTokenValidReq } from "../util/authAPI";

export const AuthContext = createContext();

//TODO: useReducer 써보기 => 로그인 및 로그아웃 구현
const authReducer = (state = null, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
}

//TODO: 토큰 유효성 검사 시기

export function AuthContextProvider({ children }) {
    const [auth, dispatch] = useReducer(authReducer, null);

    const cookies = new Cookies();

    // useEffect(() => { 
    //  토큰이 만료돼서 토큰 유효성 검사를 해주는 useEffect 때문에 localStorage 토큰값이 자꾸 초기화됨
    //     handleCtxTokenValidReq();
    // }, [])

    useEffect(() => {
        //로딩 될 때 토큰값을 가져와주기.
        let data = localStorage.getItem("access_token")

        if (data) {
            //localStorage에 토큰이 null 이면 false 토큰이 있으면 true 
            //token값이 존재하면 자동로그인 (reducer)
            dispatch({ type: "login", payload: { tokenData: data } })

        } else {
            dispatch({ type: 'logout' })
        }

    }, [])

    //로그인 요청보내기 : refresh token 및 access token response body로 받아오기
    const handleCtxLoginReq = async (email, password) => {

        if (email && password) {

            let auth = {
                email: email,
                password: password
            }

            let result = await AuthLoginReq(auth); //로그인 요청

            if (result.status === 200) { //서버 로그인 성공 시

                dispatch({ type: "login", payload: { tokenData: result.access_token } })

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

                    return { result: true, message: "로그인 성공" }

                } else {

                    return { result: false, message: "서버 응답에 토큰 값이 없습니다." }
                }

            } else {
                //로그인 실패 
                return { result: false, message: "로그인에 실패하였습니다." }
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

            if (accessTokenExp) {  //access 토큰이 만료상태

                localStorage.removeItem("access_token"); //access 토큰을 localStorage에서 제거

                const refreshTokenExp = isExpired(refreshToken); //리프레쉬 토큰 만료 확인


                if (refreshTokenExp) {  //refresh token이 만료가 되었다면 

                    cookies.remove("refresh_token") // -> 로그아웃(리프레쉬 토큰 제거)

                } else {
                    //refresh token이 유효하다면 -> 서버에 access 토큰 요청
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



    return (
        <AuthContext.Provider value={{
            handleCtxLoginReq,
            handleCtxTokenValidReq,
            auth,
            dispatch
        }}>

            {children}
        </AuthContext.Provider>
    )
}
