import { useState } from "react";

type SortBy = "name" | "created_at";
type SortDirection = "asc" | "desc";

type Props = {
  sortBy: SortBy;
  sortDirection: SortDirection;
  onSortByChange: (sortBy: SortBy) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
};

export function SortDropdown({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">

      {/* Sort Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Sort agents"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="text-xl leading-none">
          ⇅
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">

          {/* Sort By */}
          <div>
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Sort by
            </p>

            {/* Name */}
            <button
              type="button"
              onClick={() => onSortByChange("name")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <span>Name</span>

              {sortBy === "name" && (
                <span className="text-blue-500">
                  ✓
                </span>
              )}
            </button>

            {/* Date Added */}
            <button
              type="button"
              onClick={() => onSortByChange("created_at")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <span>Date added</span>

              {sortBy === "created_at" && (
                <span className="text-blue-500">
                  ✓
                </span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-gray-100" />

          {/* Order */}
          <div>
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Order
            </p>

            {/* Ascending */}
            <button
              type="button"
              onClick={() => onSortDirectionChange("asc")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">
                  ↑
                </span>

                <span>
                  Ascending
                </span>
              </div>

              {sortDirection === "asc" && (
                <span className="text-blue-500">
                  ✓
                </span>
              )}
            </button>

            {/* Descending */}
            <button
              type="button"
              onClick={() => onSortDirectionChange("desc")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">
                  ↓
                </span>

                <span>
                  Descending
                </span>
              </div>

              {sortDirection === "desc" && (
                <span className="text-blue-500">
                  ✓
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}