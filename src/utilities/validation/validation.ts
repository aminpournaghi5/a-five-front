import * as yup from "yup";

// الگوی Regex برای ایمیل
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("ایمیل معتبر وارد کنید")
      .matches(emailRegex, "ایمیل معتبر نیست") // تست regex برای ایمیل
      .required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();

export const signupSchema = yup
  .object({
    name: yup
      .string()
      .min(2, "نام باید حداقل ۲ کاراکتر باشد") // حداقل 2 کاراکتر برای نام
      .required("نام الزامی است"), // نام الزامی است
    email: yup
      .string()
      .email("ایمیل معتبر وارد کنید")
      .matches(emailRegex, "ایمیل معتبر نیست")
      .required("ایمیل الزامی است"),
    password: yup
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .required("رمز عبور الزامی است"),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email("ایمیل معتبر وارد کنید")
      .matches(emailRegex, "ایمیل معتبر نیست") // تست regex برای ایمیل
      .required("ایمیل الزامی است"),
  })
  .required();

// طرح اعتبارسنجی برای رمز عبور
export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("لطفاً رمز عبور جدید را وارد کنید.")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),

  confirmPassword: yup
    .string()
    .required("لطفاً تأیید رمز عبور را وارد کنید.")
    .oneOf([yup.ref("newPassword")], "رمز عبور و تأیید آن یکسان نیستند."),
});
