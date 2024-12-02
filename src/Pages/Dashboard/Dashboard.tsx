import {
  Box,
  Typography,
  Button,
  // Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Card,
} from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import { useEffect, useState } from "react";
import { logoutUser } from "../../services/loginAuth";
import { setLoggedIn } from "../../assets/Redux/reduxfeatures/ExerciseList/AuthSlice";
import { useDispatch } from "react-redux";
import { fontFamilies } from "../../../theme";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import "moment/locale/fa"; // برای پشتیبانی از تاریخ فارسی
import "moment-jalaali"; // برای پشتیبانی از تاریخ شمسی
import "moment-timezone"; // برای تنظیم ساعت منطقه زمانی
import { useNavigate } from "react-router-dom";
import moment from "moment";

const NAVIGATION = [
  { kind: "header", title: "آیتم‌های اصلی" },
  { segment: "dashboard", title: "لیست تمرین های من", icon: "" },
  { kind: "divider" },
];

export default function Dashboard() {
  const [exerciselists, setExerciselists] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toPersianDigits = (number: string) => {
    const toPersianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.replace(
      /[0-9]/g,
      (digit) => toPersianDigits[parseInt(digit)]
    );
  };
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

  useEffect(() => {
    const fetchExerciseLists = async () => {
      try {
        // درخواست برای دریافت لیست تمرینات
        const result = await axiosInstance.get(`/api/exerciselist/getall`);
        setExerciselists(result.data.exerciselists); // تنظیم داده‌های دریافتی
        console.log(result.data.exerciselists);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login"); // هدایت به صفحه لاگین در صورت خطای 401
        } else {
          console.error(error);
          ("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
        }
      } finally {
      }
    };

    fetchExerciseLists();
  }, []); // وابسته به هیچ پارامتر دیگری نیست

  const convertToShamsi = (dateString: string) => {
    // تبدیل تاریخ میلادی به تاریخ شمسی
    const dateInShamsi = moment(dateString).format("YYYY/MM/DD");
    return toPersianDigits(dateInShamsi); // تبدیل اعداد به فارسی
  };
  const convertToIranTime = (dateString: string) => {
    const timeInIran = moment(dateString).tz("Asia/Tehran").format("HH:mm"); // زمان در ساعت ایران
    return toPersianDigits(timeInIran); // تبدیل اعداد به فارسی
  };

  return (
    <Box sx={{ display: "flex", displayDirection: "row-reverse" }}>
      {/* Sidebar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 1,
          width: "25%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {NAVIGATION.map((item, index) => (
            <Box key={index} sx={{ my: "12px" }}>
              {item.kind === "header" ? (
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: fontFamilies.bold,
                    textAlign: "right",
                    fontSize: { xs: "12px", sm: "18px" },
                  }}
                >
                  {item.title}
                </Typography>
              ) : item.kind === "divider" ? (
                <Divider />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <Box>{item.icon}</Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: fontFamilies.bold,
                      textAlign: "right",
                      fontSize: { xs: "10px", sm: "16px" },
                      py: "10px",
                      px: "5px",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", padding: "20px" }}>
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

      <Box sx={{ width: "75%", padding: "20px" }}>
        <Grid container spacing={2}>
          {exerciselists.reverse().map((exercise: any) => {
            const shamsiDate = convertToShamsi(exercise.date);

            const iranTime = convertToIranTime(exercise.date);

            return (
              <Grid item xs={12} key={exercise._id}>
                <Card
                  sx={{
                    padding: "20px",
                    borderRadius: "20px",
                    margin: "10px",
                    height: "150px",
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <Typography variant="h4" textAlign={"right"}>
                      {exercise.title}
                    </Typography>
                    <Box display={"flex"} gap={4}>
                      <Typography variant="body1">{iranTime}</Typography>
                      <Typography variant="body1">{shamsiDate}</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
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
