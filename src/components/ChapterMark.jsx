export default function ChapterMark({ numeral, children, tone = 'light' }) {
  return (
    <p className={`chapter chapter--${tone}`}>
      <span className="chapter__num" aria-hidden="true">{numeral}</span>
      <span>{children}</span>
    </p>
  );
}
