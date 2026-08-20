import { Container } from "@/components/ui/Container";
import type { CompanyInfo } from "@/lib/content/types";
import { NAV_ITEMS } from "./navigation";

interface SiteFooterProps {
  company: CompanyInfo;
}

export function SiteFooter({ company }: SiteFooterProps) {
  const { contact } = company;
  return (
    <footer className="bg-navy text-white/70">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-sm bg-orange text-sm font-extrabold">
                {company.shortName}
              </span>
              <span className="text-base font-bold">{company.name}</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6">{company.tagline}</p>
            <address className="mt-4 space-y-1 text-sm not-italic leading-6">
              <p>{contact.address}</p>
              <p>
                대표전화 {contact.phone} · 이메일{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white/90 hover:text-orange"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="푸터 메뉴">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-orange">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 py-6 text-xs text-white/50">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
