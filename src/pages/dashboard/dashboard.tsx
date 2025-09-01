import { UserProfile, UserCart, UserFavorites } from "../../components";

function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <UserProfile />
        <UserCart />
        <UserFavorites />
      </div>
    </div>
  );
}

export { Dashboard };
