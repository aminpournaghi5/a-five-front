import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../../utilities/validation/validation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import theme from "../../../theme";
import logo from "../../assets/Logo/whitepng.png";

interface AuthFormProps {
  onSubmit: (data: any) => Promise<void>;
}

const SignupAuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // مدیریت حالت بارگذاری
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true); // شروع بارگذاری
    try {
      await onSubmit(data); // فراخوانی تابع ارسال
    } finally {
      setIsLoading(false); // توقف بارگذاری
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: theme.palette.primary.light,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <a href="/">
            <img
              src={logo}
              style={{ width: "100px", objectFit: "contain" }}
              alt="logo"
            />
          </a>
        </Box>
        <Typography
          variant="h5"
          color={theme.palette.primary.contrastText}
          mb={2}
        >
          ثبت‌نام
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.primary.contrastText}
          textAlign="center"
          mt={1}
        >
          سلام. خوش آمدید!
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.primary.contrastText}
          textAlign="center"
          mb={2}
        >
          لطفا نام، ایمیل و رمز عبور خود را برای ثبت‌نام وارد کنید.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ width: "100%" }}
        >
          <Typography
            sx={{
              textAlign: "right",
              paddingRight: "5px",
              paddingBottom: "5px",
              color: theme.palette.primary.contrastText,
            }}
          >
            نام
          </Typography>
          <TextField
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            sx={{ mb: 2, direction: "ltr" }}
          />

          <Typography
            sx={{
              textAlign: "right",
              paddingRight: "5px",
              paddingBottom: "5px",
              color: theme.palette.primary.contrastText,
            }}
          >
            ایمیل
          </Typography>
          <TextField
            variant="outlined"
            {...register("email", {
              onChange: (e) => {
                e.target.value = e.target.value.toLowerCase();
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            sx={{ mb: 2, direction: "ltr" }}
          />

          <Typography
            sx={{
              textAlign: "right",
              paddingRight: "5px",
              paddingBottom: "5px",
              color: theme.palette.primary.contrastText,
            }}
          >
            رمز عبور
          </Typography>
          <TextField
            variant="outlined"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            sx={{ mb: 2, direction: "ltr" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{
                      padding: 0,
                      marginRight: "-8px",
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mb: 2 }}
            disabled={isLoading} // غیرفعال کردن دکمه هنگام بارگذاری
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "ثبت‌نام"
            )}
          </Button>
          <Button
            variant="outlined"
            sx={{
              border: (theme) =>
                `1px ${theme.palette.secondary.contrastText} solid`,
              color: (theme) => theme.palette.secondary.contrastText,
              textAlign: "center",
            }}
            fullWidth
            onClick={() => navigate("/login")}
          >
            آیا حساب کاربری دارید؟ ورود
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupAuthForm;
