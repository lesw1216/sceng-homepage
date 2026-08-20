import Image from "next/image";
import Link from "next/link";
import { BrandLine } from "@/components/ui/BrandLine";
import { Container } from "@/components/ui/Container";
import type { CompanyInfo } from "@/lib/content/types";
import { NAV_ITEMS } from "./navigation";

interface SiteFooterProps {
  company: CompanyInfo;
}

export function SiteFooter({ company }: SiteFooterProps) {
  const { contact } = company;
  return (
    <footer className="bg-white text-ink/70">
      {/* 본문과 푸터의 경계 */}
      <BrandLine />
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative h-12 w-44">
              <Image
                src="/images/logo-sce.jpg"
                alt="에스씨엔지니어링 로고"
                fill
                sizes="176px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 max-w-md text-sm leading-6">{company.tagline}</p>
            <address className="mt-4 space-y-1 text-sm not-italic leading-6 text-ink/70">
              <p>{contact.address}</p>
              <p>
                대표전화 {contact.phone} · 이메일{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-navy hover:text-orange"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="푸터 메뉴">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-medium text-navy">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-orange">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-ink/10 py-6 text-xs text-ink/50">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
