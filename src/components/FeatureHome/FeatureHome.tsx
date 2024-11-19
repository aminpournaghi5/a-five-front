import { Box, Container, Grid, Typography } from "@mui/material";

import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import theme, { fontFamilies } from "../../../theme";
function FeatureHome() {
  return (
    <>
      <Box
        sx={{
          py: 6,
          px: 3,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Container>
          <Typography py={5} variant="h4" fontFamily={fontFamilies.bold}>
            پلتفرم تخصصی طراحی تمرین با مربیان حرفه‌ای
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <ArrowDropDownCircle
                  fontSize="large"
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography variant="h6" fontFamily={fontFamilies.bold}>
                  حرکات ورزشی با تصاویر متحرک
                </Typography>
                <Typography variant="body1" fontFamily={fontFamilies.medium}>
                  آموزش حرکات ورزشی با تصاویر متحرک به ورزشکاران کمک می‌کند تا
                  تکنیک‌های هر حرکت را به درستی بیاموزند و با اطمینان و بدون خطا
                  اجرا کنند.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <ArrowDropDownCircle
                  fontSize="large"
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography
                  variant="h6"
                  fontFamily={fontFamilies.bold}
                  paddingBottom={1}
                >
                  برنامه‌های تمرینی اختصاصی
                </Typography>
                <Typography variant="body1" fontFamily={fontFamilies.medium}>
                  برنامه‌های تمرینی به‌صورت کاملاً اختصاصی توسط مربیان حرفه‌ای
                  طراحی می‌شوند تا هر ورزشکار بتواند بر اساس اهداف شخصی و سطح
                  فعلی خود تمرینات موثری را دنبال کند.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <ArrowDropDownCircle
                  fontSize="large"
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography
                  variant="h6"
                  fontFamily={fontFamilies.bold}
                  paddingBottom={1}
                >
                  رابط کاربری ساده برای مربیان
                </Typography>
                <Typography variant="body1" fontFamily={fontFamilies.medium}>
                  رابط کاربری ساده سایت، طراحی و تنظیم برنامه‌های تمرینی را برای
                  مربیان آسان کرده و پیگیری شاگردان را کارآمدتر می‌سازد. این
                  ساختار به بهبود مدیریت و نظارت بر پیشرفت ورزشکاران کمک می‌کند.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default FeatureHome;
