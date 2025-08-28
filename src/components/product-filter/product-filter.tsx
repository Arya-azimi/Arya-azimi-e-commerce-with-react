import { useProductFilter } from "../../hooks";

export function ProductFilter() {
  const { searchTerm, sortOption, handleSearchChange, handleSortChange } =
    useProductFilter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
      <input
        type="text"
        placeholder="جستجو در محصولات..."
        className="w-full md:w-1/2 p-2 border rounded-md"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        className="mt-4 md:mt-0 md:ml-4 p-2 border rounded-md"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="newest">جدیدترین</option>
        <option value="oldest">قدیمی‌ترین</option>
        <option value="price-asc">ارزان‌ترین</option>
        <option value="price-desc">گران‌ترین</option>
      </select>
    </div>
  );
}
