import type { PropertyTraceDto } from "../../_types/property";
import { convertValueToUsd } from "../../_utils";

export function TracesTable({ traces }: { traces: PropertyTraceDto[] }) {
  return (
    <>
      <h2 className="text-[#181611] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Transaction History
      </h2>
      {traces.map((transaction) => (
        <div className="p-4" key={transaction.idPropertyTrace}>
          <div className="flex justify-between gap-x-6 py-2">
            <p className="text-[#897d61] text-sm font-normal leading-normal">
              Date
            </p>
            <p className="text-[#181611] text-sm font-normal leading-normal text-right">
              {transaction.dateSale}
            </p>
          </div>
          <div className="flex justify-between gap-x-6 py-2">
            <p className="text-[#897d61] text-sm font-normal leading-normal">
              Buyer
            </p>
            <p className="text-[#181611] text-sm font-normal leading-normal text-right">
              {transaction.name}
            </p>
          </div>
          <div className="flex justify-between gap-x-6 py-2">
            <p className="text-[#897d61] text-sm font-normal leading-normal">
              Value
            </p>
            <p className="text-[#181611] text-sm font-normal leading-normal text-right">
              {convertValueToUsd(transaction.value)}
            </p>
          </div>
          <div className="flex justify-between gap-x-6 py-2">
            <p className="text-[#897d61] text-sm font-normal leading-normal">
              Tax
            </p>
            <p className="text-[#181611] text-sm font-normal leading-normal text-right">
              {convertValueToUsd(transaction.tax)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
