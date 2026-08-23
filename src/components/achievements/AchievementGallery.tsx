"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface AchievementGalleryProps {
  /** 실적 사진 전체 (첫 장이 대표 사진) */
  images: string[];
  /** alt 문구 구성을 위한 프로젝트 제목 */
  title: string;
}

const SLIDE_INTERVAL_MS = 3000;

/** 실적 상세 사진 캐로셀 — 자동 순환 + 하단 필름 스트립 */
export function AchievementGallery({ images, title }: AchievementGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(media.matches);
    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  // 마지막 사진 다음에는 첫 사진으로 돌아오는 무한 순환
  useEffect(() => {
    if (!hasMultiple || prefersReducedMotion) return;
    const timer = window.setInterval(
      () => setCurrent((previous) => (previous + 1) % images.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [hasMultiple, images.length, prefersReducedMotion]);

  const move = (step: number) =>
    setCurrent((previous) => (previous + step + images.length) % images.length);

  /** 캐로셀 양끝 꺽쇠 — 배경·테두리 없이 기호만 노출한다. */
  const arrowClass =
    "absolute top-1/2 z-10 grid -translate-y-1/2 place-items-center text-white drop-shadow-lg transition-opacity hover:opacity-80";

  return (
    <div aria-roledescription="carousel" aria-label={`${title} 사진`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-concrete">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={index !== current}
          >
            <Image
              src={src}
              alt={`${title} 현장 사진 ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="이전 사진"
              className={`${arrowClass} left-3 sm:left-5`}
            >
              <svg
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="다음 사진"
              className={`${arrowClass} right-3 sm:right-5`}
            >
              <svg
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="사진 목록">
          {images.map((src, index) => {
            const on = index === current;
            return (
              <li key={`thumb-${src}-${index}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`${index + 1}번 사진 보기`}
                  aria-current={on}
                  className={`relative block aspect-[4/3] w-24 overflow-hidden border-2 transition-colors ${
                    on ? "border-navy" : "border-transparent hover:border-steel"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className={`object-cover transition-opacity ${
                      on ? "opacity-100" : "opacity-60"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
