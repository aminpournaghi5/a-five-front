import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// ساخت نمونه axios
const axiosInstance: AxiosInstance = axios.create({
  // baseURL: "https://api.a-five.ir/",
  baseURL: "http://localhost:8000/",
});

// افزودن توکن به هدر درخواست‌ها
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // دریافت توکن از localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// مدیریت خطاهای پاسخ
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
