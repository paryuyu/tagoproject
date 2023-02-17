let baseUrl = process.env.REACT_APP_BASEURL;

export async function AuthLoginReq(auth) {

    try {
        let response = await axios.post(`${baseUrl}/auth`,{
            authData: auth
        });

        return response;
    } catch (e) {
        return e
    }
}