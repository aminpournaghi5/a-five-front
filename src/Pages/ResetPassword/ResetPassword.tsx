import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // استفاده از useNavigate
import ResetPasswordForm from "../../components/AuthForm/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // دریافت توکن از URL
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  const handleFormSubmit = (status: "success" | "error", message: string) => {
    setModalType(status);
    setModalMessage(message);
    setModalOpen(true);
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
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* ارسال توکن به فرم */}
        <ResetPasswordForm onSubmit={handleFormSubmit} token={token || ""} />
      </Box>

      {/* Modal برای پیام‌های موفقیت یا خطا */}
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
            {modalType === "error" ? "خطا" : "موفقیت"}
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
  );
};

export default ResetPasswordPage;
