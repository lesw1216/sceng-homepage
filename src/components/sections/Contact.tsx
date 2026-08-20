import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { CompanyInfo } from "@/lib/content/types";

interface ContactRow {
  label: string;
  value: string;
  href?: string;
}

export function Contact({ company }: { company: CompanyInfo }) {
  const { contact } = company;

  const rows: ContactRow[] = [
    { label: "주소", value: contact.address },
    {
      label: "대표전화",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/-/g, "")}`,
    },
    {
      label: "휴대전화",
      value: contact.mobile,
      href: `tel:${contact.mobile.replace(/-/g, "")}`,
    },
    { label: "이메일", value: contact.email, href: `mailto:${contact.email}` },
    {
      label: "홈페이지",
      value: contact.website,
      href: `https://${contact.website}`,
    },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="오시는 길"
      description="문의 사항이 있으시면 언제든지 연락 주시기 바랍니다."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <dl className="overflow-hidden rounded-2xl border border-steel/15">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex gap-4 border-b border-steel/15 px-6 py-4 last:border-b-0"
            >
              <dt className="w-20 shrink-0 text-sm font-semibold text-navy">
                {row.label}
              </dt>
              <dd className="text-sm leading-6 text-ink/80">
                {row.href ? (
                  <a href={row.href} className="hover:text-orange">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col justify-between rounded-2xl bg-navy p-8 text-white">
          <div>
            <h3 className="text-xl font-bold">{company.name}</h3>
            <p className="mt-3 text-sm leading-7 text-white/75">
              {contact.address}
            </p>
          </div>
          <div className="mt-8">
            <ButtonLink href={contact.mapUrl} variant="primary" external>
              네이버 지도에서 보기
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11 3a1 1 0 1 0 0 2h2.6l-6.3 6.3a1 1 0 1 0 1.4 1.4L15 6.4V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5Z" />
                <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5Z" />
              </svg>
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
