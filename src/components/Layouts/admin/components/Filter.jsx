function Filter({
  targets,
  selectedCategory,
  selectedPrice,
  onCategoryChange,
  onPriceChange,
  onSearchSubmit,
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <form
          className="flex-grow sm:flex-grow-0"
          role="search"
          onSubmit={onSearchSubmit}
        >
          <input
            className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            type="search"
            name="search"
            placeholder="Tìm sản phẩm..."
            aria-label="Search"
          />
        </form>
        <select
          className="w-full sm:w-auto p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Default select example"
          value={selectedPrice}
          onChange={onPriceChange}
        >
          <option value="allPrice">Giá</option>
          <option value="1">Giá thấp đến cao</option>
          <option value="2">Giá cao đến thấp</option>
        </select>
        <select
          className="capitalize w-full sm:w-auto p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Default select example"
          value={selectedCategory}
          onChange={onCategoryChange}
        >
          {targets.map((target) => (
            <option key={target} value={target}>
              {target}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
