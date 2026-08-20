"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/images";

/** #top: 사업분야 대표 사진만 3초 간격으로 자동 순환 (텍스트 오버레이 없음) */
export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative h-[56vh] min-h-[360px] w-full overflow-hidden sm:h-[72vh]"
      aria-label="사업분야 소개 이미지"
    >
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`${index + 1}번 이미지 보기`}
            aria-current={index === current}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-7 bg-orange" : "w-2 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
