"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** 홈 히어로와 동일한 "떠오르듯 나타나는" 진입 효과 — 모든 페이지에 동일 적용 */
const RISE_PX = 18;
const DURATION_MS = 500;
const DELAY_MS = 60;
const EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)";

type PageEnterAnimationProps = {
  children: React.ReactNode;
  /** 아래에서 올라오는 거리(px). 기본 18 (홈과 동일한 느낌) */
  rise?: number;
  /** 전환 시간(ms). 기본 500 */
  duration?: number;
  /** 첫 등장 지연(ms). 기본 60 */
  delay?: number;
};

export function PageEnterAnimation({
  children,
  rise = RISE_PX,
  duration = DURATION_MS,
  delay = DELAY_MS,
}: PageEnterAnimationProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const id = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(id);
  }, [pathname, delay]);

  return (
    <div
      className="min-h-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${rise}px)`,
        transition: `opacity ${duration}ms ${EASING}, transform ${duration}ms ${EASING}`,
      }}
    >
      {children}
    </div>
  );
}
