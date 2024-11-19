import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../utilities/validation/validation";
import axiosInstance from "../../api/axiosInstance";

interface ResetPasswordFormProps {
  onSubmit: (status: "success" | "error", message: string) => void;
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  token,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const handleFormSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    try {
      // ارسال درخواست به سرور برای تغییر رمز عبور
      // فرض کنید axiosInstance برای ارسال درخواست‌ها استفاده می‌شود
      const response = await axiosInstance.put(
        `/api/auth/reset-password/${token}`,
        {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }
      );
      onSubmit("success", response.data.message); // ارسال پیام موفقیت
    } catch (err: any) {
      onSubmit("error", err.response?.data?.message || "مشکلی پیش آمده است.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ width: "100%" }}
    >
      <Typography variant="h6" mb={2}>
        تغییر رمز عبور
      </Typography>
      <Typography variant="body2" mb={3}>
        لطفاً رمز عبور جدید را وارد کرده و تأیید کنید.
      </Typography>

      <Typography
        sx={{ textAlign: "right", paddingRight: "5px", paddingBottom: "5px" }}
      >
        رمز عبور جدید
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        type="password"
        {...register("newPassword")}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        sx={{ mb: 2, direction: "ltr" }}
      />

      <Typography
        sx={{ textAlign: "right", paddingRight: "5px", paddingBottom: "5px" }}
      >
        تأیید رمز عبور
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        type="password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        sx={{ mb: 2, direction: "ltr" }}
      />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "تغییر رمز عبور"}
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
