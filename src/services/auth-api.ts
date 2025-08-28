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

function signIn(username: string, password: string): Promise<AuthResult> {
  return apiClient.post<AuthResult, AuthCredentials>("login", {
    username,
    password,
  });
}

function signUp(username: string, password: string): Promise<AuthResult> {
  return apiClient.post<AuthResult, AuthCredentials>("signup", {
    username,
    password,
  });
}

function updateUser(userId: string, data: UserUpdateData): Promise<AuthResult> {
  return apiClient.patch<AuthResult, UserUpdateData>(`users/${userId}`, data);
}

function logoutUser(): Promise<void> {
  return apiClient.post<void, object>("logout", {});
}

function verifyPassword(currentPassword: string): Promise<void> {
  return apiClient.post<void, CurrentPasswordData>("users/verify-password", {
    currentPassword,
  });
}

async function getCart(userId: string): Promise<CartItem[]> {
  const carts = await apiClient.get<Array<{ items: CartItem[] }>>(
    `carts?userId=${userId}`
  );
  return carts.length > 0 ? carts[0].items : [];
}

async function saveCart(userId: string, items: CartItem[]): Promise<void> {
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

export {
  signIn,
  signUp,
  updateUser,
  logoutUser,
  verifyPassword,
  getCart,
  saveCart,
};
