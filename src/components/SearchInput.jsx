const SearchInput = ({ searchTerm, handleSearchChange, centered = false }) => (
  <div
    className={`relative flex items-center ${
      centered ? "justify-center" : "w-full"
    }`}
  >
    <input
      value={searchTerm}
      onChange={handleSearchChange}
      className="focus:outline-none w-full border border-orange-700 rounded-md py-1 px-3 text-sm shadow-sm focus:ring-1 focus:ring-orange-500 transition"
      type="text"
      placeholder="Filtrar..."
    />
    {searchTerm && (
      <button
        onClick={() => handleSearchChange({ target: { value: '' } })}
        className="absolute right-3 text-gray-500 hover:text-gray-700"
        aria-label="Limpiar búsqueda"
      >
        ×
      </button>
    )}
  </div>
);
export default SearchInput;