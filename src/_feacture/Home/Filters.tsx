import { useEffect, useState } from "react";
import type { FiltersValues } from "../../_types/filters";

export function Filters({
  onSearch,
  initialValues,
}: {
  onSearch: (filters: FiltersValues) => void;
  initialValues: FiltersValues;
}) {
  const [filters, setFilters] = useState(initialValues);

  useEffect(() => {
    setFilters(initialValues);
  }, [initialValues]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(filters);
    }, 600);

    return () => clearTimeout(timeout);
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-card-light dark:bg-card-dark p-4 sm:p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="E.g. Villa del Sol"
            type="text"
            className="w-full rounded-md border-gray-300 bg-background-light focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            value={filters.address}
            onChange={handleChange}
            placeholder="E.g. Av. Libertador"
            type="text"
            className="w-full rounded-md border-gray-300 bg-background-light focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium mb-1">
            Min. Price
          </label>
          <input
            id="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="USD 1,000,000"
            type="number"
            className="w-full rounded-md border-gray-300 bg-background-light focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium mb-1">
            Max. Price
          </label>
          <input
            id="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="USD 5,000,000"
            type="number"
            className="w-full rounded-md border-gray-300 bg-background-light focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
