type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  slug: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
};

type User = {
  username: string;
  userId: string;
};

type AuthResult = {
  user: {
    id: string;
    username: string;
  };
};

type CartItem = Product & {
  quantity: number;
};

export type { Product, User, AuthResult, CartItem };
