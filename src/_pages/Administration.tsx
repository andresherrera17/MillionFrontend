import { useEffect, useState } from "react";
import { loginAdmin } from "../_services/auth";
import { AdminLoginForm } from "../_feacture/Admin/AdminLoginForm";
import { Filters } from "../_feacture/Home/Filters";
import type { PropertyWithOwnerImage } from "../_types/property";
import { useSearchParams } from "react-router";
import type { FiltersValues } from "../_types/filters";
import { Pagination } from "../_feacture/Home/Pagination";
import {
  addProperty,
  addPropertyTrace,
  getProperties,
} from "../_services/property";
import { handleSearchFilters } from "../_utils";
import { PropertiesTable } from "../_feacture/Admin/PropertiesTable";
import { Title } from "../_ui/title";
import { PropertyAddModal } from "../_feacture/Admin/PropertyAddModal";
import { Loader } from "../_ui/loader";
import { PropertyTraceModal } from "../_feacture/Admin/PropertyTraceModal";
import type { PropertyTraceModel } from "../_models/PropertyTraceSchema";

export function Administration() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [properties, setProperties] = useState<PropertyWithOwnerImage[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTrace, setIsOpenTrace] = useState(false);
  const [loading, setLoading] = useState(true);

  const filters: FiltersValues = {
    name: searchParams.get("name") || "",
    address: searchParams.get("address") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "12");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(password);
      setAuthorized(true);
    } catch {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (authorized) {
      setLoading(true);
      const queryParams = new URLSearchParams(searchParams);
      getProperties(queryParams).then((res) => {
        setProperties(res.items);
        setTotal(res.total);
        setLoading(false);
      });
    }
  }, [searchParams, authorized]);

  if (!authorized) {
    return (
      <AdminLoginForm
        password={password}
        error={error}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    );
  }

  const handleAddProperty = async (formData: FormData) => {
    try {
      await addProperty(formData);
      alert("Property added successfully");
    } catch (error) {
      alert("Error adding property");
      console.error("Error adding property:", error);
    }
  };

  const handleAddPropertyTrace = async (data: PropertyTraceModel) => {
    try {
      data.idProperty = searchParams.get("idProperty") || "";
      await addPropertyTrace(data);
      alert("Property added successfully");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleSearch = (newFilterss: FiltersValues) => {
    const params = handleSearchFilters(newFilterss, searchParams, pageSize);
    setSearchParams(params);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#fcfbf8] justify-between group/design-root overflow-x-hidden p-6">
      <PropertyAddModal
        isOpen={isOpen}
        setOpen={setIsOpen}
        onSubmit={handleAddProperty}
      />
      <PropertyTraceModal
        isOpen={isOpenTrace}
        setOpen={setIsOpenTrace}
        onSubmit={handleAddPropertyTrace}
      />
      <div>
        <Title title="Property Management"></Title>
        <div className="flex px-4 py-3 justify-end">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f2ad0d] text-[#1c170d] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={() => setIsOpen(true)}
          >
            <span className="truncate">Add New Property</span>
          </button>
        </div>
        <h2 className="text-[#1c170d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Properties
        </h2>
        <Filters onSearch={handleSearch} initialValues={filters} />
        {properties.map((property) => (
          <PropertiesTable
            key={property.idProperty}
            property={property}
            setOpen={setIsOpenTrace}
          />
        ))}
      </div>
      <Pagination page={page} total={total} pageSize={pageSize} />
      <Loader loading={loading} />
    </div>
  );
}
