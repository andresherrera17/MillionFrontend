export interface PropertyWithOwnerImage {
    idProperty: string;
    name: string;
    address: string;
    price: number;
    year: number;
    ownerName?: string | null;
    firstImage: string;
}

export interface PropertyDto {
    idProperty: string;
    idOwner: string;
    name: string;
    address: string;
    price: number;
    codeInternal: string;
    year: number;
}

export interface OwnerDto {
    idOwner: string;
    name: string;
    address: string;
    photo?: string;
    birthday?: string;
}

export interface PropertyImageDto {
    idPropertyImage: string;
    idProperty: string;
    file: string;
    enabled: boolean;
}

export interface PropertyTraceDto {
    idPropertyTrace: string;
    dateSale: string;
    name: string;
    value: number;
    tax: number;
    idProperty: string;
}

export interface PropertyDetailsDto {
    property: PropertyDto;
    owner: OwnerDto;
    images: PropertyImageDto[];
    traces: PropertyTraceDto[];
}

export interface PagedResult<T> {
    items: T[];
    total: number;
}