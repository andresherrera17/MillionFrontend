import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPropertyById } from "../_services/property";
import type { PropertyDetailsDto } from "../_types/property";
import { ImageCarousel } from "../_feacture/PropertyDetail/Slider";
import { TracesTable } from "../_feacture/PropertyDetail/TracesTable";
import { Loader } from "../_ui/loader";
import { convertValueToUsd } from "../_utils";
import { Title } from "../_ui/title";

export function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PropertyDetailsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    getPropertyById(id)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mx-auto flex flex-col overflow-x-hidden p-6">
      {data && !loading && (
        <div>
          <Title title={"Property detail"} />
          <div className="@container">
            <div className="@[480px]:px-4 @[480px]:py-3">
              <ImageCarousel images={data.images} name={data.property.name} />
            </div>
          </div>
          <h1 className="text-[#181611] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            {data.property.name}
          </h1>
          <p className="text-[#181611] text-base font-normal leading-normal pb-3 pt-1 px-4">
            {data.property.address}
          </p>
          <p className="text-[#181611] text-base font-normal leading-normal pb-3 pt-1 px-4">
            {convertValueToUsd(data.property.price)}
          </p>
          <div className="p-4 grid grid-cols-2">
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#e6e2db] py-4 pr-2">
              <p className="text-[#897d61] text-sm font-normal leading-normal">
                Internal Code
              </p>
              <p className="text-[#181611] text-sm font-normal leading-normal">
                {data.property.codeInternal}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#e6e2db] py-4 pl-2">
              <p className="text-[#897d61] text-sm font-normal leading-normal">
                Year
              </p>
              <p className="text-[#181611] text-sm font-normal leading-normal">
                {data.property.year}
              </p>
            </div>
          </div>
          <div className="p-4 mt-4 flex flex-col sm:grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#e6e2db] py-4 pr-2">
              <p className="text-[#181611] text-sm font-normal leading-normal flex align-center">
                <img
                  src={data.owner.photo}
                  alt={data.owner.name}
                  className="w-20 h-20 rounded-full  shrink-0 object-cover object-center mr-2"
                />
                <span className="flex items-center">{data.owner.name}</span>
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#e6e2db] py-4 pl-2">
              <p className="text-[#897d61] text-sm font-normal leading-normal">
                Birthday
              </p>
              <p className="text-[#181611] text-sm font-normal leading-normal">
                {data.owner.birthday}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#e6e2db] py-4 pl-2">
              <p className="text-[#897d61] text-sm font-normal leading-normal">
                Address
              </p>
              <p className="text-[#181611] text-sm font-normal leading-normal">
                {data.owner.address}
              </p>
            </div>
          </div>
          <TracesTable traces={data.traces} />
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader loading={loading} />
        </div>
      )}
    </div>
  );
}
