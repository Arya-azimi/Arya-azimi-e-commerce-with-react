import { AuthResult, CartItem } from "../domain";
import apiClient from "./apiClient";

type AuthCredentials = {
  username: string;
  password: string;
};

type UserUpdateData = {
  username?: string;
  password?: string;
};

type CurrentPasswordData = {
  currentPassword: string;
};

type Wishlist = { id: number; userId: string; productIds: number[] };

export function signIn(
  username: string,
  password: string
): Promise<AuthResult> {
  return apiClient.post<AuthResult, AuthCredentials>("login", {
    username,
    password,
  });
}

export function signUp(
  username: string,
  password: string
): Promise<AuthResult> {
  return apiClient.post<AuthResult, AuthCredentials>("signup", {
    username,
    password,
  });
}

export function updateUser(
  userId: string,
  data: UserUpdateData
): Promise<AuthResult> {
  return apiClient.patch<AuthResult, UserUpdateData>(`users/${userId}`, data);
}

export function logoutUser(): Promise<void> {
  return apiClient.post<void, object>("logout", {});
}

export function verifyPassword(currentPassword: string): Promise<void> {
  return apiClient.post<void, CurrentPasswordData>("users/verify-password", {
    currentPassword,
  });
}

export async function getCart(userId: string): Promise<CartItem[]> {
  const carts = await apiClient.get<Array<{ items: CartItem[] }>>(
    `carts?userId=${userId}`
  );
  return carts.length > 0 ? carts[0].items : [];
}

export async function saveCart(
  userId: string,
  items: CartItem[]
): Promise<void> {
  const existingCarts = await apiClient.get<Array<{ id: number }>>(
    `carts?userId=${userId}`
  );

  if (existingCarts.length > 0) {
    const cartId = existingCarts[0].id;
    await apiClient.put<void, { userId: string; items: CartItem[] }>(
      `carts/${cartId}`,
      { userId, items }
    );
  } else {
    await apiClient.post<void, { userId: string; items: CartItem[] }>("carts", {
      userId,
      items,
    });
  }
}

export async function getWishlist(userId: string): Promise<number[]> {
  const wishlists = await apiClient.get<Wishlist[]>(
    `wishlists?userId=${userId}`
  );
  return wishlists.length > 0 ? wishlists[0].productIds : [];
}

export async function updateWishlist(
  userId: string,
  productIds: number[]
): Promise<void> {
  const existing = await apiClient.get<Wishlist[]>(
    `wishlists?userId=${userId}`
  );

  if (existing.length > 0) {
    const wishlistId = existing[0].id;
    await apiClient.put<void, { userId: string; productIds: number[] }>(
      `wishlists/${wishlistId}`,
      { userId, productIds }
    );
  } else {
    await apiClient.post<void, { userId: string; productIds: number[] }>(
      "wishlists",
      {
        userId,
        productIds,
      }
    );
  }
}
