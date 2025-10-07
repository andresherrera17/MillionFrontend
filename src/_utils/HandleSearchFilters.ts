import type { FiltersValues } from "../_types/filters";

export const handleSearchFilters = (newFilters: FiltersValues, searchParams: URLSearchParams, pageSize: number) => {
    const params = new URLSearchParams(searchParams);

    const prevFilters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        if (["name", "address", "minPrice", "maxPrice"].includes(key)) {
            prevFilters[key] = value;
        }
    });

    const filtersChanged = Object.keys(newFilters).some((key) => {
        const currentValue = newFilters[key as keyof FiltersValues] || "";
        const previousValue = prevFilters[key] || "";
        return currentValue !== previousValue;
    });

    Object.entries(newFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
    });

    if (filtersChanged) {
        params.set("page", "1");
    }

    params.set("pageSize", pageSize.toString());

    return params;
};