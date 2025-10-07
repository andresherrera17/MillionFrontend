import { useSearchParams } from "react-router";

interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
}

export function Pagination({ page, total, pageSize }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(page, totalPages);
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages && p !== page) {
      handlePageChange(p);
    }
  };

  return (
    <div className="mt-8 flex justify-center items-center space-x-2">
      {/* Botón anterior */}
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
          chevron_left
        </span>
      </button>

      {visiblePages.map((p, index) =>
        p === "..." ? (
          <span
            key={index}
            className="text-text-muted-light dark:text-text-muted-dark"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p as number)}
            className={`w-8 h-8 rounded-full font-bold ${
              p === page
                ? "bg-primary text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-text-light dark:text-text-dark"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Botón siguiente */}
      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">
          chevron_right
        </span>
      </button>
    </div>
  );
}

function getVisiblePages(
  current: number,
  totalPages: number
): (number | "...")[] {
  const delta = 2;
  const range: (number | "...")[] = [];

  const start = Math.max(2, current - delta);
  const end = Math.min(totalPages - 1, current + delta);

  range.push(1);

  if (start > 2) range.push("...");

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < totalPages - 1) range.push("...");

  if (totalPages > 1) range.push(totalPages);

  return range;
}
