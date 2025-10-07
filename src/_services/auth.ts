import httpClient from "../_api/httpClient";


export async function loginAdmin(password: string) {
    const response = await httpClient.post('auth/login', { password });
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    return token;
}