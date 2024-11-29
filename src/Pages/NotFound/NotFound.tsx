import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          height: "75vh",
          padding: 4,
        }}
      >
        <Typography variant="h1" color="error" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" mt={2}>
          صفحه‌ای که به دنبال آن هستید پیدا نشد.
        </Typography>
        <Typography mt={1}>
          ممکن است آدرس را اشتباه وارد کرده باشید یا این صفحه دیگر در دسترس
          نباشد.
        </Typography>
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
          <Link to={"/"}>
            <Button
              variant="contained"
              sx={{
                textAlign: "center",
                fontSize: { xs: "10px", sm: "16px" },
              }}
            >
              صفحه اصلی
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default NotFound;
