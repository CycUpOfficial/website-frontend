"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
}

type PaginationEntry = number | "ellipsis-left" | "ellipsis-right";

function buildPaginationEntries(
  currentPage: number,
  totalPages: number,
): PaginationEntry[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-right", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis-left",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-left",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-right",
    totalPages,
  ];
}

const CatalogPagination = ({
  currentPage,
  totalPages,
}: CatalogPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const pages = buildPaginationEntries(safeCurrentPage, safeTotalPages);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        type="button"
        className="rounded-md border border-textSecondary/30 px-3 py-1 text-sm text-textPrimary disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(1)}
        disabled={safeCurrentPage <= 1}
        aria-label="Go to first page"
      >
        «
      </button>

      <button
        type="button"
        className="rounded-md border border-textSecondary/30 px-3 py-1 text-sm text-textPrimary disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(safeCurrentPage - 1)}
        disabled={safeCurrentPage <= 1}
      >
        Prev
      </button>

      {pages.map((page, index) => {
        if (typeof page !== "number") {
          return (
            <span key={`${page}-${index}`} className="px-1 text-textSecondary">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            type="button"
            className={`rounded-md px-3 py-1 text-sm ${
              page === safeCurrentPage
                ? "bg-primary text-white"
                : "border border-textSecondary/30 text-textPrimary"
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className="rounded-md border border-textSecondary/30 px-3 py-1 text-sm text-textPrimary disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(safeCurrentPage + 1)}
        disabled={safeCurrentPage >= safeTotalPages}
      >
        Next
      </button>

      <button
        type="button"
        className="rounded-md border border-textSecondary/30 px-3 py-1 text-sm text-textPrimary disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(safeTotalPages)}
        disabled={safeCurrentPage >= safeTotalPages}
        aria-label="Go to last page"
      >
        »
      </button>
    </div>
  );
};

export default CatalogPagination;
