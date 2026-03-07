import { getContentByRefs } from "@/lib/content";
import { ContentCard } from "@/components/cards/ContentCard";

type RelatedCardsProps = {
  /** 콘텐츠 참조 목록. "guide:slug" 또는 "guide-slug" 형식. 배열 또는 쉼표 구분 문자열 */
  items: string[] | string;
};

export async function RelatedCards({ items }: RelatedCardsProps) {
  const refs = Array.isArray(items)
    ? items
    : (items as string)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
  if (refs.length === 0) return null;

  const contents = await getContentByRefs(refs);
  if (contents.length === 0) return null;

  return (
    <aside
      className="my-10 sm:my-12 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8"
      aria-label="관련 지식 탐색"
    >
      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
        관련 지식 탐색
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {contents.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </aside>
  );
}
