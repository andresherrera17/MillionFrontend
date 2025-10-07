import { useEffect, useState } from "react";
import { getProperties } from "../_services/property";
import type { PropertyWithOwnerImage } from "../_types/property";

import { Card, CardButton, CardDescription, CardImage } from "../_ui/card";
import type { FiltersValues } from "../_types/filters";
import { useSearchParams } from "react-router";
import { Pagination } from "../_feacture/Home/Pagination";
import { Filters } from "../_feacture/Home/Filters";
import { Loader } from "../_ui/loader/loader";
import { handleSearchFilters } from "../_utils";

export function Home() {
  const [properties, setProperties] = useState<PropertyWithOwnerImage[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters: FiltersValues = {
    name: searchParams.get("name") || "",
    address: searchParams.get("address") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "12");

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams(searchParams);
    getProperties(queryParams).then((res) => {
      setProperties(res.items);
      setTotal(res.total);
      setLoading(false);
    });
  }, [searchParams]);

  const handleSearch = (newFilterss: FiltersValues) => {
    const params = handleSearchFilters(newFilterss, searchParams, pageSize);
    setSearchParams(params);
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
            Exclusive Properties
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark mt-2 text-base md:text-lg">
            Discover unparalleled luxury residences.
          </p>
        </div>
        <Filters onSearch={handleSearch} initialValues={filters} />
        {properties && !loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {properties.map((property) => (
                <Card key={property.idProperty}>
                  <CardImage image={property.firstImage} name={property.name} />
                  <CardDescription
                    name={property.name}
                    owner={property.ownerName || "without owner"}
                  />
                  <CardButton idProperty={property.idProperty} />
                </Card>
              ))}
            </div>
            <Pagination page={page} total={total} pageSize={pageSize} />
          </>
        ) : (
          <div>No properties available.</div>
        )}
      </div>
      <Loader loading={loading} />
    </main>
  );
}
