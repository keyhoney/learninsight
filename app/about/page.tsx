import { SectionHeader } from "@/components/SectionHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "저자 소개",
  description: "학습 과학 지식 브랜드와 5가지 영역(인지·뇌·교육·발달·동기·정서)을 소개합니다.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <SectionHeader
        title="저자 소개"
        description="학습과학 지식 브랜드 소개"
        badge="소개"
      />
      <div className="space-y-10 text-base leading-relaxed text-foreground md:text-lg">
        <p>
          이 사이트는 <strong>학습 과학</strong>을 대주제로, 학부모와 교육자를 위해
          인지심리학·신경과학(뇌과학)·교육심리학·발달심리학·동기·정서심리학을 바탕으로 한
          글, 가이드, 개념 사전, 툴킷을 제공합니다.
        </p>
        <p>
          연구 기반 콘텐츠를 바탕으로 가정과 현장에서 적용할 수 있는 구체적인 방법과
          마음가짐을 나누고자 합니다.
        </p>

        <section className="space-y-3 border-t border-[var(--border)] pt-8">
          <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-noto-serif-kr), ui-serif, serif" }}>
            연구·전문성
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
            <li>학습과학·인지심리 기반 설명</li>
            <li>전자책 2권 출간 (학부모·교육자 대상)</li>
            <li>참고 문헌·출처를 가이드에 명시</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-[var(--border)] pt-8">
          <h2 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-noto-serif-kr), ui-serif, serif" }}>
            출간 전자책
          </h2>
          <p className="text-[var(--muted)]">
            <a href="/books" className="text-[var(--brand-500)] underline hover:no-underline">전자책 목록</a>에서 확인할 수 있습니다.
          </p>
        </section>

        <p className="border-t border-[var(--border)] pt-8 text-[var(--muted)]">
          문의나 제안이 있으시면 <a href="/contact" className="text-[var(--brand-500)] underline hover:no-underline">연락처</a>로 연락해 주세요.
        </p>
      </div>
    </main>
  );
}
