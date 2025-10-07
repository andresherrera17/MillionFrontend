import type { PropertyWithOwnerImage } from "../../_types/property";
import { convertValueToUsd } from "../../_utils";

export function PropertiesTable({
  property,
  setOpen,
}: {
  property: PropertyWithOwnerImage;
  setOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 bg-[#fcfbf8] px-4 min-h-[72px] py-2 justify-between">
      <div className="flex flex-col justify-center">
        <p className="text-[#1c170d] text-base font-medium leading-normal line-clamp-1">
          {property.name}
        </p>
        <p className="text-[#9c8349] text-sm font-normal leading-normal line-clamp-2">
          {property.address}
        </p>
        <p className="text-[#9c8349] text-sm font-normal leading-normal line-clamp-2">
          {convertValueToUsd(property.price)}
        </p>
      </div>
      <div className="shrink-0">
        <button
          onClick={() => setOpen(true)}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f4f0e7] text-[#1c170d] text-sm font-medium leading-normal w-fit"
        >
          <span className="truncate">Assign New Buyer</span>
        </button>
      </div>
    </div>
  );
}
