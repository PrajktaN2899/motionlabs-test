// Renders schema.org structured data. Escaping "<" keeps API-supplied text (e.g. a blog title
// containing "</script>") from breaking out of the script tag.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
