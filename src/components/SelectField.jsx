export default function SelectField({
  options = [],
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-md px-3 py-2 border rounded-md outline-none"
    >
      <option value="">Pilih Filter</option>

      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}