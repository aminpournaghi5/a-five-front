import React, { useState } from "react";
import SignupAuthForm from "../../components/AuthForm/SignUpForm";
import { signupUser } from "../../services/signupAuth";
import { Box, Modal, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AuthData {
  email: string;
  password: string;
  name: string; // اضافه کردن فیلد name
}

const Signup: React.FC = () => {
  const [modalType, setModalType] = useState<"success" | "error">("success"); // نوع پیام
  const [modalMessage, setModalMessage] = useState<string>(""); // پیام سرور
  const [modalOpen, setModalOpen] = useState(false); // وضعیت نمایش Modal
  const navigate = useNavigate();
  const handleFormSubmit = (status: "success" | "error", message: string) => {
    setModalType(status); // تنظیم نوع پیام
    setModalMessage(message); // ذخیره پیام سرور
    setModalOpen(true); // نمایش Modal
  };

  const handleSignup = async (data: AuthData) => {
    try {
      const response = await signupUser(data);

      if (response.success) {
        handleFormSubmit(
          "success",
          response.message || "ثبت‌نام با موفقیت انجام شد!"
        );
      } else {
        handleFormSubmit(
          "error",
          response.message || "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید."
        );
      }
    } catch (error) {
      handleFormSubmit("error", "خطای غیرمنتظره‌ای رخ داده است.");
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
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400, padding: 2 }}>
        <SignupAuthForm onSubmit={handleSignup} />
        {/* Modal برای نمایش پیام سرور */}
        <Modal open={modalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              bgcolor: "background.paper",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              mb={2}
              sx={{
                color: modalType === "success" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {modalType === "success" ? "موفقیت" : "خطا"}
            </Typography>
            <Typography variant="body1" mb={2}>
              {modalMessage}
            </Typography>
            <Button
              variant="contained"
              color={modalType === "error" ? "error" : "primary"}
              onClick={
                modalType === "error" ? closeModal : () => navigate("/login")
              } // در صورت موفقیت، هدایت به صفحه ورود
              fullWidth
            >
              {modalType === "error" ? "بستن" : "صفحه ورود"}
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Signup;
