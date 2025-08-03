const CategorySelector = ({ categories, category, onChange }) => (
  <select
    className="py-1 px-3 bg-orange-200 rounded text-leading text-orange-700 border border-orange-700 hover:cursor-pointer"
    onChange={onChange}
    value={category}
  >
    <option value="">Escoja una categoria</option>
    {categories.map((cat, idx) => (
      <option key={idx} value={cat}>
        {cat}
      </option>
    ))}
  </select>
);
export default CategorySelector;