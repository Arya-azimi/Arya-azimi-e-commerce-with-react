import { useSearchParams } from "react-router-dom";

export function useProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (prev) => {
        prev.set("search", e.target.value);
        return prev;
      },
      { replace: true }
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      (prev) => {
        prev.set("sort", e.target.value);
        return prev;
      },
      { replace: true }
    );
  };

  return {
    searchTerm,
    sortOption,
    handleSearchChange,
    handleSortChange,
  };
}
