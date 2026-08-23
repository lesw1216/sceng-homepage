import { CompanyMap } from "@/components/sections/CompanyMap";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CompanyInfo } from "@/lib/content/types";

interface ContactRow {
  label: string;
  value: string;
  href: string;
}

export function Contact({ company }: { company: CompanyInfo }) {
  const { contact } = company;

  const rows: ContactRow[] = [
    {
      label: "대표전화",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/-/g, "")}`,
    },
    { label: "이메일", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section id="contact" className="scroll-mt-16 sm:scroll-mt-20 bg-white">
      <Container>
        <div className="border-t border-ink/10 py-24 sm:py-32">
          <SectionHeading eyebrow="Contact" title="Contact" />

          {/* 프로젝트 문의 */}
          <div className="mt-14">
            <h3 className="text-2xl font-bold tracking-tight text-navy">
              프로젝트 문의
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink/80">
              프로젝트 및 시스템 구축에 관한 문의사항이 있으시면 언제든지 연락 주시기
              바랍니다.
            </p>
            <dl className="mt-7 border-y border-ink/15">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 border-b border-ink/10 py-5 last:border-b-0 sm:grid-cols-[140px_1fr]"
                >
                  <dt className="text-base font-medium uppercase tracking-wider text-steel">
                    {row.label}
                  </dt>
                  <dd className="text-lg leading-relaxed text-ink/85">
                    <a href={row.href} className="hover:text-orange">
                      {row.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 오시는 길 */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight text-navy">오시는 길</h3>
            <p className="mt-4 text-base leading-relaxed text-ink/80">
              본사: {contact.address}
            </p>
            <div className="mt-7">
              <CompanyMap address={contact.address} mapUrl={contact.mapUrl} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
