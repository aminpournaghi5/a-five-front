import axios, { AxiosError } from "axios";
import axiosInstance from "../api/axiosInstance";



// تغییرات در نوع AuthData برای اضافه کردن فیلد name
interface AuthData {
  email: string;
  password: string;
  name: string; // فیلد نام اضافه شد
}

interface SignupResponse {
  success: boolean;
  message: string;
}

export const signupUser = async (data: AuthData): Promise<SignupResponse> => {
  try {
    // ارسال درخواست ثبت‌نام
    const response = await axiosInstance.post<{ message: string }>(
      `api/auth/signup`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return {
      success: true,
      message: response.data.message || "ثبت‌نام موفقیت‌آمیز بود!",
    };
  } catch (error) {
    let message = "خطایی رخ داد.";

    // بررسی نوع خطای سرور و دریافت پیام دقیق
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        // بررسی خطای 400 که معمولاً نشان‌دهنده خطای ورودی نامعتبر است
        if (axiosError.response.status === 400) {
          message =
            axiosError.response.data?.message || "اطلاعات ورودی نامعتبر است.";
        } else if (axiosError.response.status === 409) {
          // خطای 409 برای وجود تکراری ایمیل
          message =
            axiosError.response.data?.message || "این ایمیل قبلاً ثبت شده است.";
        } else {
          message = axiosError.response.data?.message || message;
        }
      } else if (axiosError.request) {
        message = "سرور پاسخ نداد. لطفاً دوباره تلاش کنید.";
      }
    } else {
      // خطاهای غیر از Axios
      message = (error as Error).message;
    }

    return { success: false, message };
  }
};
