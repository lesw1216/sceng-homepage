"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HERO_SECTION_ID } from "@/components/layout/navigation";
import type { CompanyInfo } from "@/lib/content/types";
import { heroSlides } from "@/lib/images";

interface HeroCarouselProps {
  company: CompanyInfo;
}

const SLIDE_INTERVAL_MS = 3000;

export function HeroCarousel({ company }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  // 사용자 조작 없이 무한 반복 자동 순환 (마지막 → 첫 이미지)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(
      () => setCurrent((previous) => (previous + 1) % heroSlides.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section
      id={HERO_SECTION_ID}
      /* 헤더와 2px 간격 */
      className="relative mt-0.5 min-h-[680px] scroll-mt-16 sm:scroll-mt-20 overflow-hidden bg-white sm:min-h-[760px]"
      aria-roledescription="carousel"
      aria-label="에스씨엔지니어링 주요 사업"
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={index !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <Container className="relative z-10 flex min-h-[680px] items-center py-24 sm:min-h-[760px]">
        <div className="pt-12 text-white text-on-photo">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Systems and Controls
            </span>
            <span className="h-px w-12 bg-orange" aria-hidden="true" />
          </div>
          {/* 줄바꿈 위치가 요구사항이라 폭에 맡기지 않고 데이터의 줄 단위로 끊는다.
              각 줄 내부는 break-keep으로 어절 중간 분리를 막는다. */}
          <h1 className="mt-7 max-w-4xl break-keep text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {company.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          {/* 태그라인과 뒷문장은 데스크톱에서 한 줄로 이어 보이도록 폭을 제한하지 않는다. */}
          <p className="mt-7 break-keep text-lg leading-relaxed text-white sm:text-xl">
            {company.tagline}. 분석과 설계부터 제작, 설치와 시운전까지 하나의 흐름으로 완성합니다.
          </p>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-7 z-20">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#business" variant="primary">
              사업영역 보기 <span aria-hidden="true">↘</span>
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              프로젝트 문의
            </ButtonLink>
          </div>

          <div className="ml-auto flex items-center gap-3" aria-label="슬라이드 선택">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`${index + 1}번 이미지 보기`}
                aria-current={index === current}
                className={`h-1.5 transition-all ${
                  index === current ? "w-12 bg-orange" : "w-6 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
