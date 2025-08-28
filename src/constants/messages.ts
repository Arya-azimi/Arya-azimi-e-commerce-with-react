const ERROR_MESSAGES = {
  FETCH_PRODUCTS: "خطا در دریافت محصولات.",
  FETCH_FEATURED_PRODUCTS: "خطا در دریافت محصولات ویژه.",
  PRODUCT_NOT_FOUND: "محصول مورد نظر یافت نشد.",
  LOGIN_FAILED: "ورود ناموفق بود. نام کاربری یا رمز عبور اشتباه است.",
  SIGNUP_FAILED: "ثبت‌نام ناموفق بود. نام کاربری قبلاً استفاده شده است.",
  CART_SAVE_FAILED: "خطا در ذخیره سبد خرید.",
  CURRENT_PASSWORD_REQUIRED: "رمز عبور فعلی برای تایید تغییرات الزامی است.",
  INCORRECT_CURRENT_PASSWORD: "رمز عبور فعلی شما اشتباه است.",
};
const UI_MESSAGES = {
  LOADING: "در حال بارگذاری...",
  NO_PRODUCTS: "هیچ محصولی یافت نشد.",
  CART_EMPTY: "سبد خرید شما خالی است.",
  ADD_TO_CART: "افزودن به سبد خرید",
  LOGIN_REQUIRED: "برای افزودن به سبد خرید، لطفاً وارد شوید.",
  FETCH_PRODUCTS: "محصولی با این نام وجود ندارد ",
  LOGIN_SUCCESS: "با موفقیت وارد شدید!", // <-- این خط را اضافه کنید
  SIGNUP_SUCCESS: "حساب کاربری با موفقیت ایجاد شد!", // <-- این خط را اضافه کنید
};

const PAGE_TITLES = {
  LOGIN: "ورود",
  SIGNUP: "ثبت‌نام",
  HOME: "صفحه اصلی",
  PRODUCTS: "محصولات",
  PRODUCT_DETAIL: "جزئیات محصول",
};

const BUTTON_LABELS = {
  LOGIN: "ورود",
  SIGNUP: "ایجاد حساب",
  LOGOUT: "خروج",
  ADD_TO_CART: "خرید",
  CHECKOUT: "تسویه حساب",
};

export { ERROR_MESSAGES, UI_MESSAGES, PAGE_TITLES, BUTTON_LABELS };
