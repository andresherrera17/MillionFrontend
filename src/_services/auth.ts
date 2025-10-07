import httpClient from "../_api/httpClient";

const API_URL = "http://localhost:5110/api/auth/login";

export async function loginAdmin(password: string) {
    const response = await httpClient.post(API_URL, { password });
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    return token;
}