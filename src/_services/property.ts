import httpClient from "../_api/httpClient";
import type { PropertyTraceModel } from "../_models/PropertyTraceSchema";
import type { PagedResult, PropertyDetailsDto, PropertyWithOwnerImage } from "../_types/property";

export async function getProperties(params: URLSearchParams): Promise<PagedResult<PropertyWithOwnerImage>> {
    const url = `/properties?${params.toString()}`;
    const response = await httpClient.get<PagedResult<PropertyWithOwnerImage>>(url);
    return response.data;
}

export async function getPropertyById(id: string) {
    const url = `/properties/${id}`;
    const response = await httpClient.get<PropertyDetailsDto>(url);
    return response.data;
}

export async function addProperty(data: FormData) {
    const url = `/properties/add`;
    const response = await httpClient.post<PropertyDetailsDto>(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export async function addPropertyTrace(data: PropertyTraceModel) {
    const url = `/properties/addTrace`;
    const response = await httpClient.post<PropertyDetailsDto>(url, data,
    );
    return response.data;
}