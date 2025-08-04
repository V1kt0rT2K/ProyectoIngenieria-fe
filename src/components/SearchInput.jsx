const SearchInput = ({ searchTerm, handleSearchChange }) => (
  <div className="relative">
    <input
      value={searchTerm}
      onChange={handleSearchChange}
      className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md"
      type="text"
      placeholder="Filtrar..."
    />
    {searchTerm && (
      <button
        onClick={() => handleSearchChange({ target: { value: '' } })}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        aria-label="Limpiar búsqueda"
      >
        ×
      </button>
    )}
  </div>
);
export default SearchInput;
