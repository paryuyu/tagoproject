import { AuthLoginReq, RefreshTokenValidReq } from "../util/authAPI";
import { createContext, useEffect, useReducer } from "react";
import { Cookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";

export const AuthContext = createContext();

// useReducer 로그인 및 로그아웃 구현 //auth값에 userId 저장
const authReducer = (state = null, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
}

export function AuthContextProvider({ children }) {

    const [auth, dispatch] = useReducer(authReducer, null);

    const cookies = new Cookies();


    useEffect(() => {
        handleCtxTokenValidReq();
        // 창이 마운트 될때마다 토큰 유효성 검사를 하는데 test하는 token이 이미 만료된 토큰이라 자꾸 초기화 됨.
    }, [])



    //로그인 요청보내기 : refresh token 및 access token response body로 받아오기
    const handleCtxLoginReq = async (email, password) => {

        if (email && password) {

            let result = await AuthLoginReq(email, password); //로그인 요청
          

            if (result.status === 201) { //서버 로그인 성공 시
                let decode = decodeToken(result.data.access)
                if (decode.id) {
                    dispatch({ type: "login", payload: { userId: decode.id } }) //reducer에 저장
                }

                //token을 response body로 받는다고 가정
                if (result.data) {
                    //Access Token은 localStorage에 저장
                    //FIXME: production환경에서 쿠키에 저장안되는 오류 발견 -> localStorage에 저장하는걸로 수정
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
            
                    return { result: true, message: "로그인 성공" }

                } else {

                    return { result: false, message: "서버 응답에 토큰 값이 없습니다." }
                }
                
            } else{

                //로그인 실패 
                return { result: false, message: "로그인에 실패하였습니다." }
            }

        }
    }


    /**토큰 유효성 검사 */
    const handleCtxTokenValidReq = async () => {

        let accessToken = localStorage.getItem("access_token");
        let refreshToken = localStorage.getItem("refresh_token");

        if (accessToken !== null && refreshToken) { //로컬 스토리지에 엑세스 토큰 존재

            const accessTokenExp = isExpired(accessToken) //토큰 유효성 검사 //true : 만료 false: 유효한 토큰

            if (accessTokenExp && refreshToken) {  //access 토큰 만료상태

                localStorage.removeItem("access_token"); //access 토큰을 localStorage에서 제거
                const refreshTokenExp = isExpired(refreshToken); //리프레쉬 토큰 만료 확인

                if (refreshTokenExp) {  //refresh token이 만료가 되었다면 

                    dispatch({ type: 'logout' }); //로그아웃
                    localStorage.removeItem("refresh_token"); 

                } else {//refresh token이 유효하다면 -> 서버에 access 토큰 요청
                    let result = await RefreshTokenValidReq(refreshToken) //서버 요청

                    if (result.status === 200) { //정상 응답값
                        localStorage.setItem(result.data.access) //받아온 access 토큰을 저장

                    } else { //응답에 오류가 있다면 실패메세지
                        dispatch({ type: 'logout' }); //로그아웃
                        localStorage.removeItem("refresh_token"); //쿠키에서 refresh 토큰 제거
                    }
                }

            } else if(accessToken){ //access 토큰 유효상태 
                let data = localStorage.getItem("access_token");
                let decode = decodeToken(data)
                if(decode.id){
                    dispatch({ type: "login", payload: { userId: decode.id } })
                }
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
