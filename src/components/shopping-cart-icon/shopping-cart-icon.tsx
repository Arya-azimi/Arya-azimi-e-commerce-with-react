interface ShoppingCartIconProps {
  itemCount: number;
  onClick: () => void;
}

export function ShoppingCartIcon({
  itemCount,
  onClick,
}: ShoppingCartIconProps) {
  return (
    <button onClick={onClick} className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 absolute -top-4 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.942.503 2.576L11 20h2c1.1 0 2-.9 2-2v-1h4v1c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-1H7v1c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-7 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
