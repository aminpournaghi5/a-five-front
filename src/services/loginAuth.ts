import axiosInstance from "../api/axiosInstance";

// نوع داده برای درخواست ورود
interface LoginRequest {
  email: string;
  password: string;
}

// نوع داده برای پاسخ ورود
interface LoginResponse {
  message: string;
  token: string;
}

/**
 * مدیریت خطاهای Axios
 * @param error خطای دریافتی از Axios
 * @throws خطای مناسب بر اساس نوع خطا
 */
const handleAxiosError = (error: any): void => {
  if (error.response?.data?.message) {
    // خطاهای پاسخ سرور با پیام اختصاصی
    throw new Error(error.response.data.message);
  } else if (error.request) {
    // خطای شبکه بدون پاسخ از سرور
    throw new Error(
      "مشکلی در ارتباط با سرور وجود دارد. لطفاً دوباره تلاش کنید."
    );
  } else {
    // خطاهای ناشناخته
    throw new Error("خطای ناشناخته‌ای رخ داده است.");
  }
};

/**
 * ارسال درخواست ورود کاربر
 * @param email ایمیل کاربر
 * @param password رمز عبور کاربر
 * @throws خطای سرور یا ارتباط
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {
  const loginRequest: LoginRequest = { email, password };

  try {
    const response = await axiosInstance.post<LoginResponse>(
      `api/auth/login`,
      loginRequest
    );

    if (response.status === 200) {
      const { token } = response.data;

      // ذخیره توکن در localStorage
      localStorage.setItem("token", token);
    } else {
      throw new Error("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  } catch (error: any) {
    handleAxiosError(error);
  }
};

/**
 * ارسال درخواست خروج کاربر
 * @throws خطای سرور یا ارتباط
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await axiosInstance.post(
      `api/auth/logout`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // حذف توکن از localStorage
    localStorage.removeItem("token");

    // انتقال به صفحه ورود
    window.location.href = "/";
  } catch (error: any) {
    handleAxiosError(error);
  }
};
