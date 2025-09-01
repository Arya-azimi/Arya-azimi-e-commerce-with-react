import { useUserFavorites } from "../../hooks/useUserFavorites";
import { ItemsList } from "../items-list";
import { Loading, Error } from "..";

function UserFavorites() {
  const { favoriteProducts, loading, error } = useUserFavorites();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <ItemsList
      title="لیست علاقه‌مندی‌ها"
      products={favoriteProducts}
      emptyMessage="لیست علاقه‌مندی‌های شما خالی است."
    />
  );
}

export { UserFavorites };
