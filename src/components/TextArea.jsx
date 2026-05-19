export default function TextArea({
  placeholder = "Tulis komentar...",
  value,
  onChange,
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full px-3 py-2 border rounded-md outline-none resize-none"
    />
  );
}