import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import ForgotPasswordForm from "../../components/AuthForm/ForgotPasswordForm";
import { Helmet } from "react-helmet";

const ForgotPasswordPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const handleFormSubmit = (status: "success" | "error", message: string) => {
    setModalType(status);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Helmet>
        <title>فراموشی رمز عبور</title>
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
          <ForgotPasswordForm onSubmit={handleFormSubmit} />
        </Box>

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
              onClick={closeModal}
              fullWidth
            >
              بستن
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
