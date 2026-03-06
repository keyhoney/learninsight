"use client";

export type SortOption = "latest" | "readingTime";

type FiltersBarProps = {
  type: "guides" | "blog" | "toolkit";
  searchPlaceholder?: string;
  categories: string[];
  tags: string[];
  search: string;
  category: string;
  tag: string;
  onSearchChange: (q: string) => void;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onSortChange: (sort: SortOption) => void;
  sortValue: SortOption;
};

export function FiltersBar({
  type,
  searchPlaceholder = "주제, 개념, 글 제목으로 검색해보세요",
  categories,
  tags,
  search,
  category,
  tag,
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onSortChange,
  sortValue,
}: FiltersBarProps) {
  return (
    <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-3 sm:mb-8 sm:px-4 sm:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0 sm:gap-4">
        <div className="min-w-0 flex-1 sm:mr-4 sm:border-r sm:border-[var(--border)] sm:pr-4">
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="min-w-0 w-full min-h-[44px] rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-base text-foreground placeholder:text-[var(--muted)] focus:border-[var(--brand-500)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-500)] sm:min-h-0 sm:min-w-[200px] sm:py-2 sm:text-sm"
            aria-label="검색"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        {categories.length > 0 && (
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="min-w-[120px] min-h-[44px] rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-base text-foreground focus:border-[var(--brand-500)] focus:outline-none sm:min-h-0 sm:text-sm"
            aria-label="카테고리"
          >
            <option value="">전체 카테고리</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
        {tags.length > 0 && (
          <select
            value={tag}
            onChange={(e) => onTagChange(e.target.value)}
            className="min-w-[120px] min-h-[44px] rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-base text-foreground focus:border-[var(--brand-500)] focus:outline-none sm:min-h-0 sm:text-sm"
            aria-label="태그"
          >
            <option value="">전체 태그</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                #{t}
              </option>
            ))}
          </select>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onSortChange("latest")}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition sm:min-h-0 ${
              sortValue === "latest"
                ? "border-[var(--brand-500)] bg-[var(--brand-500)]/10 text-[var(--brand-500)]"
                : "border-[var(--border)] bg-[var(--background)] text-foreground hover:border-[var(--brand-500)]/50"
            }`}
          >
            최신순
          </button>
          <button
            type="button"
            onClick={() => onSortChange("readingTime")}
            className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition sm:min-h-0 ${
              sortValue === "readingTime"
                ? "border-[var(--brand-500)] bg-[var(--brand-500)]/10 text-[var(--brand-500)]"
                : "border-[var(--border)] bg-[var(--background)] text-foreground hover:border-[var(--brand-500)]/50"
            }`}
          >
            읽는 시간
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
