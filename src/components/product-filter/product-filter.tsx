import { useSearchParams } from "react-router-dom";

function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      prev.set("search", e.target.value);
      return prev;
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => {
      prev.set("sort", e.target.value);
      return prev;
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
      <input
        type="text"
        placeholder={"جسنجو"}
        className="w-full md:w-1/2 p-2 border rounded-md"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        className="mt-4 md:mt-0 md:ml-4 p-2 border rounded-md"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
}

export { ProductFilter };
