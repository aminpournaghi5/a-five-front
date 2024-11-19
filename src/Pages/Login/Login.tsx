import React, { useState } from "react";
import AuthForm from "../../components/AuthForm/LoginAuthForm";
import { loginUser } from "../../services/loginAuth";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../../assets/Redux/reduxfeatures/ExerciseList/AuthSlice";
import { useDispatch } from "react-redux";

interface AuthData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>(""); // پیام خطا یا موفقیت
  const [modalType, setModalType] = useState<"success" | "error">("error"); // نوع پیام
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data: AuthData) => {
    try {
      await loginUser(data.email, data.password); // درخواست ورود
      dispatch(setLoggedIn(true));

      // تغییر نوع پیام به موفقیت
      setModalType("success");
      setModalMessage("ورود با موفقیت انجام شد.");

      // نقل مکان به صفحه اصلی
      setTimeout(() => {
        navigate("/exercises");
      }, 1000);
    } catch (error) {
      // تغییر نوع پیام به خطا
      setModalType("error");
      if (error instanceof Error) {
        setModalMessage(error.message); // پیام خطای سرور
      } else {
        setModalMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید."); // پیام پیش‌فرض خطا
      }
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
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
            <Typography variant="h6" mb={2} color={modalType === "error" ? "error" : "success"}>
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
  );
};

export default Login;
