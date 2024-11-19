import {
  Box,
  Typography,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Switch,
  Tooltip,
  IconButton,
  Snackbar,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";

import { IExercise } from "../../Type/Type";
import { fontFamilies } from "../../../theme";
import { styled } from "@mui/system";
import ExerciseSkeleton from "./ExerciseSkeleton";
import { useParams, useNavigate } from "react-router-dom";
import { add } from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../assets/Redux/store";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";

function Exercise() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<IExercise | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnglish, setIsEnglish] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();
  const exerciseList = useSelector(
    (state: RootState) => state.exerciseList.exerciselist
  );

  useEffect(() => {
    const fetchExercise = async () => {
      setIsLoading(true);
      try {
        const result = await axiosInstance.get<IExercise>(
          `/api/exercises/${params.id}`
        );
        setExercise(result.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login"); // هدایت به صفحه لاگین در صورت خطای 401
        } else {
          console.error(error);
          setError("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercise();
  }, [params.id]);

  const handleToggleLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnglish(event.target.checked);
  };

  const handleAddExercise = (exercise: IExercise) => {
    dispatch(add(exercise));
    setSnackbarMessage(`${exercise.NameFarsi}  اضافه شد!`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const isInList = (exerciseId: string | number) =>
    exerciseList.some((ex) => ex._id === exerciseId);

  const TableCellStyled = styled(TableCell)(({}) => ({
    transition: "all 0.3s ease",
    direction: isEnglish ? "ltr" : "rtl",
    textAlign: "center",
    whiteSpace: "normal",
  }));

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (isLoading) {
    return <ExerciseSkeleton />;
  }

  if (!exercise) {
    return (
      <Typography color="error" align="center">
        Exercise data not found.
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: 3,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            width: "85%",
            maxWidth: 700,
            direction: isEnglish ? "ltr" : "rtl",
            overflow: "hidden",
          }}
        >
          {/* Back Button */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            sx={{
              width: "20%",
              float: "left",
              mb: 2,
              display: { xs: "none", sm: "none", md: "block" },
            }}
            onClick={() => navigate("/exercises")}
          >
            بازگشت
          </Button>

          <Table size="medium">
            <TableBody>
              <TableRow>
                <TableCellStyled colSpan={2}>
                  <CardMedia
                    sx={{
                      width: "100%",
                      height: "180px",
                      objectFit: "contain",
                      margin: "0 auto",
                    }}
                    component="img"
                    image={`/public/Workouts/${exercise.ID}.gif`}
                    alt={isEnglish ? exercise.Name : exercise.NameFarsi}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = "../../../public/noimage.jpg";
                    }}
                  />
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Tooltip title={"افزودن به لیست برنامه تمرینی"}>
                      <IconButton
                        sx={{
                          display: {
                            lg: "block",
                            xs: "none",
                            sm: "none",
                            md: "block",
                          },
                        }}
                        aria-label="add to list"
                        onClick={() => handleAddExercise(exercise)}
                        color={isInList(exercise._id) ? "secondary" : "default"}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCellStyled>
              </TableRow>
              <TableRow>
                <TableCellStyled
                  sx={{
                    fontFamily: fontFamilies.bold,
                    fontSize: { sm: "20px", xs: "12px" },
                    py: 2,
                  }}
                  colSpan={2}
                >
                  {isEnglish ? exercise.Name : exercise.NameFarsi}
                </TableCellStyled>
              </TableRow>
              {exercise.Abzar && (
                <TableRow>
                  <TableCellStyled
                    sx={{
                      fontFamily: fontFamilies.extraBold,
                      fontSize: { sm: "20px", xs: "12px" },
                    }}
                  >
                    {isEnglish ? "Equipment" : "ابزار"}
                  </TableCellStyled>
                  <TableCellStyled
                    sx={{ fontSize: { sm: "20px", xs: "12px" } }}
                  >
                    {isEnglish ? exercise.Equipment : exercise.Abzar}
                  </TableCellStyled>
                </TableRow>
              )}
              {exercise.TargetFarsi && (
                <TableRow>
                  <TableCellStyled
                    sx={{
                      fontFamily: fontFamilies.extraBold,
                      fontSize: { sm: "20px", xs: "12px" },
                    }}
                  >
                    {isEnglish ? "Target" : "عضله هدف"}
                  </TableCellStyled>
                  <TableCellStyled
                    sx={{ fontSize: { sm: "20px", xs: "12px" } }}
                  >
                    {isEnglish ? exercise.Target : exercise.TargetFarsi}
                  </TableCellStyled>
                </TableRow>
              )}
              {exercise.SynergistFarsi && (
                <TableRow>
                  <TableCellStyled
                    sx={{
                      fontFamily: fontFamilies.extraBold,
                      fontSize: { sm: "20px", xs: "12px" },
                    }}
                  >
                    {isEnglish ? "Synergist" : "عضلات کمکی"}
                  </TableCellStyled>
                  <TableCellStyled
                    sx={{ fontSize: { sm: "20px", xs: "12px" } }}
                  >
                    {isEnglish ? exercise.Synergist : exercise.SynergistFarsi}
                  </TableCellStyled>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Tooltip
          title={isEnglish ? "Switch to Persian" : "Switch to English"}
          placement="bottom"
        >
          <Switch
            sx={{ marginTop: "20px" }}
            checked={isEnglish}
            onChange={handleToggleLanguage}
            color="primary"
          />
        </Tooltip>
        <Typography
          sx={{ fontSize: { sm: "20px", xs: "12px" } }}
          variant="subtitle2"
        >
          تغییر زبان
        </Typography>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
    </>
  );
}

export default Exercise;
