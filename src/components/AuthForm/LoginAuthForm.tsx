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
import { loginSchema } from "../../utilities/validation/validation"; // فقط loginSchema را ایمپورت کنید
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import theme from "../../../theme";

interface AuthFormProps {
  onSubmit: (data: any) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // مدیریت وضعیت لودینگ

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupNavigate = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
              src="../../../public/whitepng.png"
              style={{ width: "100px", objectFit: "contain" }}
              alt="logo"
            />
          </a>
        </Box>

        <Typography
          variant="body2"
          color={theme.palette.primary.contrastText}
          textAlign="right"
          mt={1}
        >
          سلام. خوش آمدید!
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.primary.contrastText}
          textAlign="right"
          mb={2}
        >
          لطفا ایمیل و رمز عبور خود را وارد کنید.
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
            ایمیل
          </Typography>
          <TextField
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            name="email"
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
            name="password"
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
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "ورود"
            )}
          </Button>
          <Button
            variant="outlined"
            sx={{
              border: `1px ${theme.palette.secondary.contrastText} solid`,
              color: theme.palette.secondary.contrastText,
              textAlign: "center",
            }}
            fullWidth
            onClick={handleSignupNavigate}
          >
            حساب کاربری ندارید؟ عضویت
          </Button>
          <Typography
            variant="body2"
            color={theme.palette.primary.contrastText}
            textAlign="right"
            sx={{ mb: 2 }}
          >
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/forgot-password")}
              sx={{
                textTransform: "none",
                fontSize: "0.875rem",
                marginTop: "10px",
                color: theme.palette.secondary.contrastText,
              }}
            >
              فراموشی رمز عبور؟
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
