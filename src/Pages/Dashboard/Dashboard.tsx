import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { logoutUser } from "../../services/loginAuth";
import { setLoggedIn } from "../../assets/Redux/reduxfeatures/ExerciseList/AuthSlice";
import { useDispatch } from "react-redux";

const NAVIGATION = [
  { kind: "header", title: "آیتم‌های اصلی" },
  { segment: "dashboard", title: "داشبورد", icon: <DashboardIcon /> },
  { kind: "divider" },
];

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      // فراخوانی متد لاگ‌اوت
      await logoutUser();
      setOpenDialog(false);
      setLogoutError(null); // پاک کردن خطا در صورت موفقیت
      dispatch(setLoggedIn(false));
    } catch (error) {
      // ثبت خطا در صورت بروز مشکل
      if (error instanceof Error) {
        setLogoutError(error.message);
      } else {
        setLogoutError("خطای ناشناخته رخ داده است.");
      }
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);

  const handleDialogClose = (confirmed: boolean) => {
    if (confirmed) {
      handleLogout();
    } else {
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          padding: "20px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {NAVIGATION.map((item, index) => (
          <Box key={index} sx={{ marginBottom: "10px" }}>
            {item.kind === "header" ? (
              <Typography
                variant="body1"
                sx={{ textAlign: "right", fontWeight: "bold" }}
              >
                {item.title}
              </Typography>
            ) : item.kind === "divider" ? (
              <hr />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "5px",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <Box sx={{ marginRight: "10px" }}>{item.icon}</Box>
                <Typography variant="body2" sx={{ textAlign: "right" }}>
                  {item.title}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
        <Box sx={{ marginTop: "auto", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleDialogOpen}
          >
            خروج
          </Button>
        </Box>
      </Box>

      {/* Dashboard Content */}
      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "right", marginBottom: "20px" }}
        >
          داشبورد
        </Typography>
        <Grid container spacing={2}></Grid>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>آیا مطمئن هستید؟</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            آیا می‌خواهید از حساب خود خارج شوید؟
          </Typography>
          {logoutError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginTop: "10px" }}
            >
              {logoutError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            لغو
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="secondary">
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
