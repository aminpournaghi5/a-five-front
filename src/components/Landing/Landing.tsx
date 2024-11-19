import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "../../../theme";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../assets/Redux/store";

function Landing() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      <Box
        sx={{
          padding: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography
              variant="h2"
              sx={{
                width: "100%",
                textAlign: "center",
                color: theme.palette.primary.contrastText,
                fontSize: { xs: "35px", sm: "65px" },
              }}
            >
              اینجا
              <br />
              <span
                style={{
                  color: theme.palette.secondary.contrastText, // رنگ متن
                  backgroundImage:
                    "linear-gradient(transparent 82%, rgb(203, 96, 64) 0%)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              >
                {" "}
                روتین{" "}
              </span>
              ورزشی
              <br />
              <Box>بساز!</Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                color: theme.palette.primary.contrastText,
                fontSize: { xs: "12px", sm: "15px" },
                textAlign: "center",
              }}
            >
              این سایت با هدف آموزش تمرینات ورزشی و طراحی برنامه‌های تمرینی
              اختصاصی برای ورزشکاران راه‌اندازی شده است. شما می‌توانید با
              استفاده از منابع تخصصی به پیشرفت مستمر و اهداف خود دست یابید. با
              ما همراه شوید و روتین ورزشی خود را بسازید!
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginTop: 5,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/exercises"
              sx={{ textAlign: "center", fontSize: { xs: "10px", sm: "16px" } }}
            >
              جستجوی تمرینات
            </Button>
            <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
              <Button
                variant="outlined"
                sx={{
                  border: (theme) =>
                    ` 1px ${theme.palette.secondary.contrastText} solid`,
                  color: (theme) => theme.palette.secondary.contrastText,
                  textAlign: "center",
                  fontSize: { xs: "10px", sm: "16px" },
                }}
              >
                {isLoggedIn ? "حساب کاربری" : "عضویت"}
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
