"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { CompanyInfo } from "@/lib/content/types";
import { heroSlides } from "@/lib/images";

interface HeroCarouselProps {
  company: CompanyInfo;
}

export function HeroCarousel({ company }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(media.matches);
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(
      () => setCurrent((previous) => (previous + 1) % heroSlides.length),
      3000,
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  return (
    <section
      id="top"
      className="relative min-h-[680px] scroll-mt-24 overflow-hidden bg-navy sm:min-h-[760px]"
      aria-roledescription="carousel"
      aria-label="에스씨엔지니어링 주요 사업"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
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

      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent" />

      <Container className="relative z-10 flex min-h-[680px] items-center py-24 sm:min-h-[760px]">
        <div className="max-w-4xl pt-12 text-white">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber">
              Systems and Controls
            </span>
            <span className="h-px w-12 bg-orange" aria-hidden="true" />
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {company.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {company.tagline}. 분석과 설계부터 제작, 설치와 시운전까지 하나의 흐름으로 완성합니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#business" variant="primary">
              사업영역 보기 <span aria-hidden="true">↘</span>
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              프로젝트 문의
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-7 z-20">
        <Container className="flex items-end justify-between gap-6">
          <div className="hidden gap-8 text-white/80 md:flex">
            {company.mainBusiness.map((business, index) => (
              <div key={business} className="flex items-center gap-3">
                <span className="text-sm text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold">{business}</span>
              </div>
            ))}
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
                  index === current ? "w-12 bg-orange" : "w-6 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              className="ml-2 grid h-9 w-9 place-items-center border border-white/50 text-sm text-white hover:bg-white/10"
              aria-label={isPaused ? "자동 전환 재생" : "자동 전환 일시정지"}
            >
              {isPaused ? "▶" : "Ⅱ"}
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
