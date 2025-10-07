import httpClient from "../_api/httpClient";
import type { PropertyTraceModel } from "../_models/PropertyTraceSchema";
import type { PagedResult, PropertyDetailsDto, PropertyWithOwnerImage } from "../_types/property";

const API_URL = "http://localhost:5110/api/properties";
export async function getProperties(params: URLSearchParams): Promise<PagedResult<PropertyWithOwnerImage>> {
    const url = `${API_URL}?${params.toString()}`;
    const response = await httpClient.get<PagedResult<PropertyWithOwnerImage>>(url);
    return response.data;
}

export async function getPropertyById(id: string) {
    const url = `${API_URL}/${id}`;
    const response = await httpClient.get<PropertyDetailsDto>(url);
    return response.data;
}

export async function addProperty(data: FormData) {
    const url = `${API_URL}/add`;
    const response = await httpClient.post<PropertyDetailsDto>(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function addPropertyTrace(data: PropertyTraceModel) {
    const url = `${API_URL}/addTrace`;
    const response = await httpClient.post<PropertyDetailsDto>(url, data,
    );
    return response.data;
}