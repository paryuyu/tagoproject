import { createContext } from "react";
export const AuthContext = createContext();


export function AuthContextProvider({children}){
    //로그인 요청보내기
    //localStorage에 Refresh Token저장
    
    return(
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}
