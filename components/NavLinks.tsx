"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const sectionPaths = ["/domains", "/guides", "/blog", "/concepts", "/toolkit", "/books"];

const primaryLinks = [
  { href: "/", label: "홈" },
  { href: "/domains", label: "주제별" },
  { href: "/guides", label: "가이드" },
  { href: "/blog", label: "블로그" },
  { href: "/concepts", label: "개념" },
  { href: "/toolkit", label: "툴킷" },
  { href: "/books", label: "전자책" },
];

const secondaryLinks = [
  { href: "/search", label: "검색" },
  { href: "/about", label: "About" },
];

function NavItem({
  href,
  label,
  active,
  secondary,
  asButton,
  mobile,
}: {
  href: string;
  label: string;
  active: boolean;
  secondary?: boolean;
  asButton?: boolean;
  mobile?: boolean;
}) {
  const base = "relative block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)] focus:ring-offset-2 focus:ring-offset-[var(--background)] rounded";
  const mobileClass = mobile
    ? "py-3 px-4 text-base font-medium min-h-[44px] flex items-center rounded-lg"
    : "";
  const buttonClass = asButton
    ? "rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm font-medium text-foreground no-underline hover:border-[var(--border-strong)] hover:bg-[var(--surface)] min-h-[44px] sm:min-h-0 flex items-center justify-center"
    : "";
  const secondaryClass = secondary && !mobile
    ? "pb-1 text-xs font-medium text-[var(--muted)] hover:opacity-100 hover:text-foreground opacity-90"
    : "";
  const primaryClass = !asButton && !secondary
    ? `pb-1 text-sm font-medium ${active ? "text-foreground" : "text-[var(--muted)] hover:text-foreground"}`
    : "";
  const activeClass = active && !secondary && !asButton ? "bg-[var(--brand-500)]/5 px-2 py-1 -mx-2 -my-1 rounded sm:px-2 sm:py-1" : "";

  return (
    <li>
      <Link
        href={href}
        className={`${base} ${mobileClass} ${buttonClass} ${secondaryClass} ${primaryClass} ${activeClass} ${mobile && active ? "bg-[var(--brand-500)]/10 text-foreground" : ""}`}
      >
        {label}
        {active && !secondary && !asButton && !mobile && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand-500)]" aria-hidden />
        )}
      </Link>
    </li>
  );
}

export function NavLinks() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return sectionPaths.includes(href) && pathname.startsWith(href);
  };

  return (
    <>
      {/* 데스크톱: 가로 링크 */}
      <ul className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6">
        {primaryLinks.map(({ href, label }) => (
          <NavItem key={href} href={href} label={label} active={isActive(href)} />
        ))}
        <li className="h-4 w-px bg-[var(--border)]" aria-hidden />
        <NavItem href="/search" label="검색" active={isActive("/search")} asButton />
        {secondaryLinks.filter((l) => l.href !== "/search").map(({ href, label }) => (
          <NavItem key={href} href={href} label={label} active={isActive(href)} secondary />
        ))}
      </ul>

      {/* 모바일: 햄버거 + 드로어 */}
      <div className="flex items-center md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-foreground transition hover:bg-[var(--surface)]"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {menuOpen ? (
            <span className="text-lg font-medium" aria-hidden>×</span>
          ) : (
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-0.5 w-5 bg-current rounded" />
              <span className="block h-0.5 w-5 bg-current rounded" />
              <span className="block h-0.5 w-4 bg-current rounded" />
            </span>
          )}
        </button>
      </div>

      {menuOpen && typeof document !== "undefined" && createPortal(
        <>
          {/* 배경 딤: 클릭 시 메뉴 닫기 (상단 헤더 위까지 덮음) */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] md:hidden"
            style={{ zIndex: 9998 }}
            aria-hidden
            onClick={() => setMenuOpen(false)}
          />
          {/* 세로 패널: 화면 전체 높이, 헤더 위에 표시 */}
          <div
            id="mobile-nav"
            className="fixed top-0 right-0 bottom-0 w-[min(280px,85vw)] md:hidden flex flex-col border-l border-[var(--border)] bg-[var(--background)] overflow-y-auto"
            style={{ zIndex: 9999, boxShadow: "-4px 0 20px rgba(0,0,0,0.08)" }}
            role="dialog"
            aria-label="메뉴"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 shrink-0">
              <span className="text-sm font-semibold text-foreground">메뉴</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-foreground"
                aria-label="메뉴 닫기"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>
            <nav className="flex-1 px-3 py-4">
              <ul className="flex flex-col gap-0.5">
                {primaryLinks.map(({ href, label }) => (
                  <NavItem key={href} href={href} label={label} active={isActive(href)} mobile />
                ))}
                <li className="my-2 border-t border-[var(--border)]" />
                <NavItem href="/search" label="검색" active={isActive("/search")} mobile />
                <NavItem href="/about" label="About" active={isActive("/about")} mobile />
              </ul>
            </nav>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
