import { notFound } from "next/navigation";
import { Container, Section } from "@packages/ui";
import { getPage } from "@/lib/api-client";

type DynamicPageProps = {
  params: { slug: string };
};

export default async function DynamicPage({ params }: DynamicPageProps) {
  const data = await getPage(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{data.description}</p>

        <div className="mt-10 space-y-8">
          {data.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <p className="mt-2 text-[var(--color-muted)]">{section.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
