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
import AddTaskIcon from "@mui/icons-material/AddTask";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";

import { IExercise } from "../../Type/Type";
import theme, { fontFamilies } from "../../../theme";
import { styled } from "@mui/system";
import ExerciseSkeleton from "./ExerciseSkeleton";
import { useParams, useNavigate } from "react-router-dom";
import { add } from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../assets/Redux/store";
import { axiosInstanceWithoutAuth } from "../../api/axiosInstance";
import { Helmet } from "react-helmet";

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
        const result = await axiosInstanceWithoutAuth.get<IExercise>(
          `/api/exercises/${params.id}`
        );
        setExercise(result.data);
      } catch (error) {
        console.error(error);
        setError("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
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
      <Helmet>
        <title>{isEnglish ? exercise.Name : exercise.NameFarsi}</title>
        <meta
          name="keywords"
          content={`${exercise.Name}, ${exercise.NameFarsi}, ${exercise.Equipment}, ${exercise.Abzar}, ${exercise.Synergist}, ${exercise.SynergistFarsi}, ${exercise.Target}, ${exercise.TargetFarsi}, ${exercise.Type}`}
        />
        <meta
          property="og:title"
          content={isEnglish ? exercise.Name : exercise.NameFarsi}
        />
        <meta
          property="og:url"
          content={`https://a-five.ir/exercise/${exercise._id}`}
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href={`https://a-five.ir/exercise/${exercise._id}`}
        />
      </Helmet>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
          width: "100%",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "20px",
            width: "100%",
            direction: isEnglish ? "ltr" : "rtl",
            overflow: "hidden",
            py: 4,
          }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon sx={{ marginLeft: 1 }} />}
            sx={{
              color: theme.palette.text.primary,
              width: "fit-content",
              px: 3,
              ":hover": {
                backgroundColor: "transparent",
              },
              ":active": {
                backgroundColor: theme.palette.primary.light,
              },
              fontSize: { xs: "10px", sm: "16px" },
              direction: "rtl !important",
              textTransform: "none", // جلوگیری از تبدیل متن به حروف بزرگ
            }}
            onClick={() => navigate(-1)}
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
                      height: "330px",
                      objectFit: "contain",
                      margin: "0 auto",
                    }}
                    component="img"
                    image={`/Workouts/${exercise.ID}.gif`}
                    alt={isEnglish ? exercise.Name : exercise.NameFarsi}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = "/utilImage/noimage.jpg";
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
                        aria-label="add to list"
                        onClick={() => handleAddExercise(exercise)}
                        color={isInList(exercise._id) ? "success" : "default"}
                      >
                        {isInList(exercise._id) ? <AddTaskIcon /> : <AddIcon />}
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
        <Box
          sx={{
            my: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            display={"inline-block"}
            sx={{ fontSize: { md: "16px", xs: "12px" } }}
          >
            انگلیسی
          </Typography>
          <Tooltip
            title={isEnglish ? "Switch to Persian" : "Switch to English"}
            placement="bottom"
          >
            <Switch
              checked={isEnglish}
              onChange={handleToggleLanguage}
              color="primary"
            />
          </Tooltip>
          <Typography
            display={"inline-block"}
            sx={{ fontSize: { md: "16px", xs: "12px" } }}
          >
            فارسی
          </Typography>
        </Box>

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
