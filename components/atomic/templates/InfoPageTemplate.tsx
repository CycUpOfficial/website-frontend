import Container from "../organisms/Container";

export interface InfoFaqItem {
  question: string;
  answer: string;
}

export interface InfoSection {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  faqs?: InfoFaqItem[];
}

interface InfoPageTemplateProps {
  title: string;
  subtitle?: string;
  sections: InfoSection[];
}

const InfoPageTemplate = ({
  title,
  subtitle,
  sections,
}: InfoPageTemplateProps) => {
  return (
    <Container className="py-8">
      <section className="mx-auto w-full max-w-4xl rounded-[20px] bg-white p-8 shadow-sm">
        <header className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          ) : null}
        </header>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <article
              key={`${section.title ?? "section"}-${index}`}
              className="space-y-3"
            >
              {section.title ? (
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h2>
              ) : null}

              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={`${paragraph}-${paragraphIndex}`}
                  className="text-sm leading-7 text-gray-700"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets?.length ? (
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
              ) : null}

              {section.faqs?.length ? (
                <div className="space-y-4">
                  {section.faqs.map((faq, faqIndex) => (
                    <div
                      key={`${faq.question}-${faqIndex}`}
                      className="rounded-xl bg-gray-50 p-4"
                    >
                      <h3 className="text-sm font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-gray-700">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default InfoPageTemplate;
