"use client";

import { useEffect } from "react";

/** 전역 요구사항(00-global): 마우스로 이미지·링크를 드래그할 수 없게 막는다(Firefox 등 CSS user-drag 미지원 브라우저 대응). */
export function PreventDrag() {
  useEffect(() => {
    const preventDrag = (event: DragEvent) => event.preventDefault();
    document.addEventListener("dragstart", preventDrag);
    return () => document.removeEventListener("dragstart", preventDrag);
  }, []);

  return null;
}
