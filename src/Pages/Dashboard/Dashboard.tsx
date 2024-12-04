import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Card,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { logoutUser } from "../../services/loginAuth";
import { setLoggedIn } from "../../assets/Redux/reduxfeatures/ExerciseList/AuthSlice";
import { useDispatch } from "react-redux";
import theme, { fontFamilies } from "../../../theme";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import "moment/locale/fa";
import "moment-jalaali";
import "moment-timezone";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Delete } from "@mui/icons-material";
import DashboardSkeleton from "../Dashboard/DashboardSkeleton";

const NAVIGATION = [{ segment: "dashboard", title: "برنامه های من", icon: "" }];

export default function Dashboard() {
  const [exerciselists, setExerciselists] = useState([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      await logoutUser();
      setOpenDialog(false);
      setLogoutError(null);
      dispatch(setLoggedIn(false));
    } catch (error) {
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
        setIsLoading(true);
        const result = await axiosInstance.get(`/api/exerciselist/getall`);
        const userInfo = await axiosInstance.get(`/api/profile/info`);
        setUserInfo(userInfo.data.name);
        setExerciselists(result.data.exerciselists);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExerciseLists();
  }, []);

  const convertToIranTime = (dateString: string) => {
    const timeInIran = moment(dateString).format("HH:mm");
    return toPersianDigits(timeInIran);
  };

  const handleDelete = async (exerciseId: string): Promise<void> => {
    try {
      const response = await axiosInstance.delete(
        `/api/exerciselist/delete/${exerciseId}`
      );

      if (response.status === 200) {
        setExerciselists(
          exerciselists.filter((session: any) => session._id !== exerciseId)
        );
        console.log("تمرین با موفقیت حذف شد.");
      } else {
        console.error("خطا: سرور پاسخ موفقیت‌آمیزی ارسال نکرد.");
      }
    } catch (error: any) {
      console.error("خطا در حذف تمرین:", error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <Box
        sx={{
          my: 2,
          width: "25%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: fontFamilies.bold,
            textAlign: "right",
            fontSize: { xs: "12px", sm: "16px" },
            py: "10px",
            px: "5px",
            borderBottom: "1px solid #ccc",
          }}
        >
          {userInfo} عزیز،
          <br />
          خوش آمدید!
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          {NAVIGATION.map((item, index) => (
            <Box key={index} sx={{ my: "5px", borderBottom: "1px solid #ccc" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
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
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            py: "10px",
            px: "5px",
            borderTop: "1px solid #ccc",
          }}
        >
          <Button
            sx={{ width: "80%" }}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleDialogOpen}
          >
            خروج
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "75%",
          my: 2,
          borderRight: "1px solid #ccc",
          height: "100%",
        }}
      >
        <Grid container spacing={2} padding={2}>
          {exerciselists.length === 0 ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              height={"55vh"}
              width={"100%"}
              my={"20px"}
              justifyContent={"center"}
            >
              <Typography sx={{ fontSize: { xs: "10px", md: "16px" } }}>
                هیچ برنامه تمرینی در حال حاضر ذخیره نشده است.
                <br />
                برای شروع، یک برنامه تمرینی جدید بسازید.
              </Typography>
              <Button
                component={Link}
                to={"/exercises"}
                sx={{
                  width: "content-fit",
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  fontFamily: fontFamilies.bold,
                  my: "10px",
                  fontSize: { xs: "10px", md: "16px" },
                }}
              >
                برنامه تمرینی جدید
              </Button>
            </Box>
          ) : (
            exerciselists.map((exercise: any, index: number) => {
              const iranTime = convertToIranTime(exercise.date);

              return (
                <Grid item xs={12} key={index}>
                  <Card
                    sx={{
                      padding: "20px",
                      borderRadius: "20px",
                      margin: "10px",
                      height: "150px",
                      boxShadow: "7px 6px 6px rgba(0, 0, 0, 0.4)",
                      ":hover": {
                        backgroundColor: "#e0e0e0",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: fontFamilies.bold,
                          fontSize: { xs: "14px", md: "24px" },
                        }}
                        textAlign={"right"}
                      >
                        {exercise.title}
                      </Typography>
                      <Box display={"flex"} gap={4}>
                        <Typography variant="body1">{iranTime}</Typography>
                      </Box>
                    </Box>
                    <IconButton
                      sx={{ float: "left" }}
                      onClick={() => handleDelete(exercise._id)}
                    >
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography variant="body1">
            آیا می‌خواهید از حساب خود خارج شوید؟
          </Typography>
          {logoutError && <Typography color="error">{logoutError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleDialogClose(true)}
            sx={{ mx: 2 }}
          >
            بله
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDialogClose(false)}
            color="secondary"
          >
            خیر
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
