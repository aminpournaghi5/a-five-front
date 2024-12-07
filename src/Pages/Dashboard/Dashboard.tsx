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
  Modal,
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

// const NAVIGATION = [{ segment: "dashboard", title: "برنامه های من", icon: "" }];

export default function Dashboard() {
  const [exerciselists, setExerciselists] = useState([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<string | null>(null);
  const closeModal = () => {
    setModalOpen(false); // بستن مودال
    setExerciseToDelete(null); // پاک کردن وضعیت تمرین انتخابی
  };
  const openModal = (exerciseId: string) => {
    setExerciseToDelete(exerciseId); // ذخیره تمرین برای حذف
    setModalOpen(true); // باز کردن مودال
  };

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
      } else {
        console.error("خطایی در حذف برنامه تمرینی رخ داده است.");
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
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
      }}
    >
      <Box
        sx={{
          my: 2,
          width: "25%",
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh",
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
          }}
        >
          {userInfo} عزیز،
          <br />
          خوش آمدید!
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          {/* {NAVIGATION.map((item, index) => (
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
          ))} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            py: "10px",
            px: "5px",
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
          minHeight: "70vh",
        }}
      >
        <Grid container spacing={2} padding={2}>
          {exerciselists.length === 0 ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              justifyContent={"center"}
              minHeight={"55vh"}
              width={"100%"}
              my={"20px"}
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
                      onClick={() => openModal(exercise._id)}
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
          <Typography
            variant="body1"
            sx={{
              fontFamily: fontFamilies.bold,
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            آیا می‌خواهید از حساب خود خارج شوید؟
          </Typography>
          {logoutError && <Typography color="error">{logoutError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleDialogClose(true)}
            sx={{
              mx: 2,
              fontFamily: fontFamilies.bold,
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            بله
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDialogClose(false)}
            color="secondary"
            sx={{
              mx: 2,
              fontFamily: fontFamilies.bold,
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            خیر
          </Button>
        </DialogActions>
      </Dialog>
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            mb={2}
            sx={{
              fontFamily: fontFamilies.bold,
              fontSize: { xs: "12px", md: "16px" },
            }}
          >
            آیا از حذف این برنامه تمرینی مطمئن هستید؟
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                if (exerciseToDelete) {
                  handleDelete(exerciseToDelete); // حذف تمرین
                }
                closeModal(); // بستن مودال پس از انجام عملیات
              }}
              sx={{
                width: "45%",
                fontFamily: fontFamilies.bold,
                fontSize: { xs: "12px", md: "16px" },
              }}
            >
              بله
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={closeModal}
              sx={{
                width: "45%",
                fontFamily: fontFamilies.bold,
                fontSize: { xs: "12px", md: "16px" },
              }}
            >
              خیر
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
