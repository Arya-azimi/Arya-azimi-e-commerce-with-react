import { AuthResult, CartItem } from "../domain";
import { API_URL } from "../constants";

const fetchOptions = {
  credentials: "include" as RequestCredentials,
};

export async function signIn(
  username: string,
  password: string
): Promise<AuthResult> {
  const response = await fetch(`${API_URL}/login`, {
    ...fetchOptions,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "نام کاربری یا رمز عبور اشتباه است.");
  }
  return data;
}

export async function signUp(
  username: string,
  password: string
): Promise<AuthResult> {
  const response = await fetch(`${API_URL}/signup`, {
    ...fetchOptions,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "خطا در ایجاد حساب کاربری.");
  }
  return data;
}

export async function updateUser(
  userId: string,
  data: { username?: string; password?: string }
): Promise<AuthResult> {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    ...fetchOptions,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "خطا در به‌روزرسانی اطلاعات.");
  }
  return responseData;
}

export async function logoutUser(): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    ...fetchOptions,
    method: "POST",
  });
}

export async function getCart(userId: string): Promise<CartItem[] | null> {
  const response = await fetch(
    `${API_URL}/carts?userId=${userId}`,
    fetchOptions
  );
  if (!response.ok) {
    return null;
  }
  const carts = await response.json();
  return carts.length > 0 ? carts[0].items : [];
}

export async function saveCart(
  userId: string,
  items: CartItem[]
): Promise<void> {
  const checkCartResponse = await fetch(
    `${API_URL}/carts?userId=${userId}`,
    fetchOptions
  );
  const existingCarts = await checkCartResponse.json();

  if (existingCarts.length > 0) {
    const cartId = existingCarts[0].id;
    await fetch(`${API_URL}/carts/${cartId}`, {
      ...fetchOptions,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items }),
    });
  } else {
    await fetch(`${API_URL}/carts`, {
      ...fetchOptions,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items }),
    });
  }
}

export async function verifyPassword(currentPassword: string): Promise<void> {
  const response = await fetch(`${API_URL}/users/verify-password`, {
    ...fetchOptions,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "خطا در تایید رمز عبور.");
  }
}
