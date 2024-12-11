import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  Link,
  CircularProgress,
  Paper,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import theme, { fontFamilies } from "../../../theme";

// Yup schema validation
const schema = yup.object({
  email: yup
    .string()
    .email("لطفاً یک آدرس ایمیل معتبر وارد کنید.")
    .required("وارد کردن ایمیل الزامی است."),
  subject: yup
    .string()
    .min(3, "عنوان پیام باید حداقل ۳ کاراکتر باشد.")
    .required("وارد کردن عنوان پیام الزامی است."),
  message: yup
    .string()
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد.")
    .max(2000, "متن پیام باید حداکثر ۲۰۰۰ کاراکتر باشد.")
    .required("وارد کردن متن پیام الزامی است."),
});

interface FormData {
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    type: string;
    message: string;
  }>({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/contact/send-email",
        data
      );

      if (response.status === 200) {
        setModalContent({
          type: "success",
          message: "پیام شما با موفقیت ارسال شد.",
        });
        reset();
      } else {
        setModalContent({
          type: "error",
          message: "خطایی رخ داده است. لطفاً دوباره تلاش کنید.",
        });
      }
    } catch (error) {
      console.error(error);
      setModalContent({
        type: "error",
        message: "خطایی رخ داده است. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setModalOpen(true);
      setIsLoading(false);
    }
  };
  const toPersianDigits = (num: string | number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: fontFamilies.bold,
            fontSize: { xs: "20px", sm: "26px" },
            textAlign: "center",
          }}
          gutterBottom
        >
          تماس با ما
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontFamily: fontFamilies.medium,
            fontSize: { xs: "10px", sm: "16px" },
          }}
          gutterBottom
          my={2}
        >
          هرگونه نظر، پیشنهاد، انتقاد یا مشکلات مشاهده‌شده در سامانه را از طریق
          این فرم با تیم پشتیبانی در میان بگذارید.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
          <TextField
            placeholder="ایمیل شما*"
            sx={{
              fontFamily: fontFamilies.medium,
              fontSize: { xs: "10px", sm: "16px" },
              "& .MuiInputBase-input::placeholder": {
                fontSize: { xs: "10px", sm: "16px" }, // سایز متن placeholder
                color: "grey", // رنگ placeholder
              },
            }}
            {...register("email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            placeholder="عنوان پیام*"
            {...register("subject")}
            sx={{
              fontFamily: fontFamilies.medium,
              fontSize: { xs: "10px", sm: "16px" },
              "& .MuiInputBase-input::placeholder": {
                fontSize: { xs: "10px", sm: "16px" }, // سایز متن placeholder
                color: "grey", // رنگ placeholder
              },
            }}
            fullWidth
            error={!!errors.subject}
            helperText={errors.subject?.message}
            margin="normal"
          />
          <TextField
            placeholder="متن پیام*"
            {...register("message")}
            fullWidth
            error={!!errors.message}
            helperText={errors.message?.message}
            multiline
            rows={4}
            margin="normal"
            sx={{
              fontFamily: fontFamilies.medium,
              fontSize: { xs: "10px", sm: "16px" },
              "& .MuiInputBase-input::placeholder": {
                fontSize: { xs: "10px", sm: "16px" }, // سایز متن placeholder
                color: "grey", // رنگ placeholder
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              fontFamily: fontFamilies.medium,
              fontSize: { xs: "10px", sm: "16px" },
              my: 2,
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "ارسال"}
          </Button>
        </Box>
      </Paper>
      <Box
        sx={{
          my: 3,
          backgroundColor: theme.palette.primary.contrastText,
          boxShadow: theme.shadows[5],
          padding: 2,
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            my: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
            <Link
              href="tel:+989034939660"
              underline="none"
              color="inherit"
              sx={{ fontSize: { xs: "12px", sm: "16px" } }}
            >
              {toPersianDigits("09034939660")}
            </Link>
            <PhoneIcon sx={{ mr: 1 }} color="primary" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
            <Link
              href="mailto:afive.website@gmail.com"
              underline="none"
              color="inherit"
              sx={{ fontSize: { xs: "12px", sm: "16px" } }}
            >
              afive.website@gmail.com
            </Link>
            <EmailIcon sx={{ mr: 1 }} color="primary" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
            <Link
              href="https://t.me/afive_website"
              target="_blank"
              underline="none"
              color="inherit"
              sx={{ fontSize: { xs: "12px", sm: "16px" } }}
            >
              afive_website@
            </Link>
            <TelegramIcon sx={{ mr: 1 }} color="primary" />
          </Box>
        </Box>
      </Box>

      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: fontFamilies.bold,
              fontSize: { xs: "20px", sm: "26px" },
              mb: 2,
            }}
            color={modalContent.type === "success" ? "success" : "error"}
          >
            {modalContent.type === "success" ? "موفقیت‌آمیز" : "خطا"}
          </Typography>
          <Typography
            sx={{
              fontFamily: fontFamilies.medium,
              fontSize: { xs: "12px", sm: "16px" },
              mb: 1,
            }}
          >
            {modalContent.message}
          </Typography>
          <Button
            variant={"contained"}
            onClick={handleClose}
            sx={{
              mt: 2,
              fontFamily: fontFamilies.medium,
              fontSize: { xs: "12px", sm: "16px" },
            }}
            color={modalContent.type === "success" ? "success" : "error"}
          >
            بستن
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Contact;
