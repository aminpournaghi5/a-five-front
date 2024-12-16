import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import theme, { fontFamilies } from "../../../theme";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import noExerciseList from "/utilImage/noexerciselist.gif";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import moment from "moment";
import { format } from "date-fns-jalali";
import {
  setInitialState,
  unsetInitialState,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";

function MyExerciseList() {
  const [exerciselists, setExerciselists] = useState([]);
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

  const toPersianDigits = (num: string | number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
  };

  useEffect(() => {
    const fetchExerciseLists = async () => {
      try {
        setIsLoading(true);
        const result = await axiosInstance.get(`/api/exerciselist/getall`);
        await setExerciselists(result.data.exerciselists);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login");
        }
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate("/404");
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
  const convertToShamsiDate = (dateString: string) => {
    const shamsiDate = format(new Date(dateString), "d MMMM yyyy");
    return toPersianDigits(shamsiDate); // تبدیل اعداد به فارسی
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
        dispatch(unsetInitialState());
      } else {
        console.error("خطایی در حذف برنامه تمرینی رخ داده است.");
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };
  const handleEditIcon = async (exerciseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/exerciselist/get/${exerciseId}`
      );
      const title = response.data.exercise.title;
      const description = response.data.exercise.description;
      const exerciselist = response.data.exercise.exerciselist;
      const exId = response.data.exercise._id;

      if (response.status === 200) {
        dispatch(unsetInitialState());
        dispatch(
          setInitialState({
            title,
            description,
            exerciselist,
            exerciseId: exId,
          })
        );
        navigate("/programming");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "75%",
          my: 2,
          borderRight: "1px solid #ccc",
          minHeight: "65vh",
        }}
      >
        <Grid container spacing={2} padding={2}>
          {exerciselists.length === 0 ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              justifyContent={"center"}
              minHeight={"65vh"}
              width={"100%"}
              my={"20px"}
            >
              <Box
                component="img"
                src={noExerciseList}
                sx={{
                  width: "180px", // مقدار عددی برای px نیازی به علامت " نیست
                  height: "auto",
                  mb: 1, // از مقادیر عددی مقیاس Theme استفاده کنید
                }}
              />

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
                    <Link to={`/programming/${exercise._id}`}>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        gap={2}
                        height={"85%"}
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
                      </Box>
                    </Link>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      height={"15%"}
                    >
                      <Box display={"flex"} flexDirection={"row"} gap={2}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "10px", md: "16px" },
                            textAlign: "left",
                            fontFamily: fontFamilies.bold,
                          }}
                        >
                          {iranTime}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "10px", md: "16px" },
                            textAlign: "left",
                            fontFamily: fontFamilies.bold,
                          }}
                        >
                          {convertToShamsiDate(exercise.date)}
                        </Typography>
                      </Box>
                      <Box>
                        <Tooltip title={"ویرایش برنامه تمرینی"}>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditIcon(exercise._id)}
                          >
                            <Edit
                              color="primary"
                              sx={{ mx: 1 }}
                              fontSize="small"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"حذف برنامه تمرینی"}>
                          <IconButton
                            aria-label="delete"
                            onClick={() => openModal(exercise._id)}
                          >
                            <Delete color="error" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
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
              color="error"
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
    </>
  );
}

export default MyExerciseList;
