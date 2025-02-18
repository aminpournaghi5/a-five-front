import React, { useState } from "react";
import AuthForm from "../../components/AuthForm/LoginAuthForm";
import { loginUser } from "../../services/loginAuth";
import { Box, Modal, Typography, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../../assets/Redux/reduxfeatures/ExerciseList/AuthSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { Helmet } from "react-helmet";

interface AuthData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>(""); // پیام خطا یا موفقیت
  const [modalType, setModalType] = useState<"success" | "error">("error"); // نوع پیام
  const [snackbarOpen, setSnackbarOpen] = useState(false); // وضعیت باز بودن اسنکبار

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data: AuthData) => {
    try {
      await loginUser(data.email, data.password); // درخواست ورود
      await dispatch(setLoggedIn(true));

      // گرفتن اطلاعات کاربر
      const info = await axiosInstance.get(`/api/profile/info`);

      // پس از دریافت اطلاعات کاربر، پیام موفقیت را تنظیم می‌کنیم
      setSnackbarOpen(true);
      setModalMessage(`${info.data.name} عزیز با موفقیت وارد شدید!`);

      // نقل مکان به صفحه اصلی پس از ۱.۵ ثانیه
      setTimeout(() => {
        navigate("/exercises");
      }, 1250);
    } catch (error) {
      // تغییر نوع پیام به خطا
      setModalType("error");
      setModalMessage(
        error instanceof Error
          ? error.message
          : "خطایی رخ داد. لطفاً دوباره تلاش کنید."
      );
      setModalOpen(true); // نمایش مودال خطا
    }
  };

  const closeModal = () => setModalOpen(false);
  const closeSnackbar = () => setSnackbarOpen(false);

  return (
    <>
      <Helmet>
        <title>ورود</title>
        <meta name="description" content="صفحه ورود به حساب کاربری" />
        <meta
          name="keywords"
          content="ورود, حساب کاربری, ورود به حساب کاربری"
        />
        <meta property="og:title" content="ورود" />
        <meta property="og:description" content="صفحه ورود به حساب کاربری" />
        <meta property="og:url" content="https://a-five.ir/login" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://a-five.ir/login" />
      </Helmet>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, padding: 2 }}>
          <AuthForm onSubmit={handleLogin} />

          {/* اسنکبار برای پیام موفقیت */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={closeSnackbar}
          >
            <Box
              sx={{
                bgcolor: "success.main", // رنگ پس‌زمینه موفقیت
                color: "white", // رنگ متن سفید
                padding: "8px 16px", // فاصله داخلی
                borderRadius: "4px", // حاشیه گرد
                textAlign: "center", // تنظیم متن در وسط
              }}
            >
              {modalMessage}
            </Box>
          </Snackbar>

          {/* مودال برای خطا */}
          <Modal open={modalOpen} onClose={closeModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                mb={2}
                color={modalType === "error" ? "error" : "success"}
              >
                {modalType === "success" ? "موفقیت" : "خطا"}
              </Typography>
              <Typography variant="body1" mb={2}>
                {modalMessage}
              </Typography>

              <Button
                variant="contained"
                color={modalType === "success" ? "success" : "error"}
                onClick={closeModal}
                fullWidth
              >
                بستن
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default Login;
