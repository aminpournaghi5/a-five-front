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
import axiosInstance from "../../api/axiosInstance";
import { forgotPasswordSchema } from "../../utilities/validation/validation";

interface ForgotPasswordFormProps {
  onSubmit: (status: "success" | "error", message: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleFormSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/forgot-password", {
        email: data.email,
      });
      onSubmit("success", response.data.message); // پیام موفقیت
    } catch (err: any) {
      onSubmit(
        "error",
        err.response?.data?.message ||
          "مشکلی پیش آمده است. لطفاً دوباره تلاش کنید."
      ); // پیام خطا
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
        بازیابی رمز عبور
      </Typography>
      <Typography variant="body2" mb={3}>
        لطفاً ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور ارسال شود.
      </Typography>
      <Typography
        sx={{
          textAlign: "right",
          paddingRight: "5px",
          paddingBottom: "5px",
        }}
      >
        ایمیل
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        {...register("email", {
          onChange: (e) => {
            e.target.value = e.target.value.toLowerCase();
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2, direction: "ltr" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "بازیابی رمز عبور"}
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
