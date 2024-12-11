import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import theme, { fontFamilies } from "../../../theme";
import {
  ExerciseListState,
  ExerciseRow,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";
import axios from "axios";
import ProgramDetailsSkeleton from "./ProgramDetailsSkeleton";

const ExerciseDetails = () => {
  const params = useParams<{ id: string }>();
  const [program, setProgram] = useState<ExerciseListState>({
    title: "",
    description: "",
    exerciselist: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/api/exerciselist/get/${params.id}`
        );
        setProgram(response.data.exercise);
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

    fetchExercise();
  }, [params.id]); // اضافه کردن id به آرایه وابستگی‌ها

  const toPersianDigits = (num: any) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .replace(/\d/g, (d: string) => persianDigits[parseInt(d)]);
  };
  const navigate = useNavigate();
  if (isLoading) {
    return;
    <>
      <ProgramDetailsSkeleton />;
    </>;
  }

  return (
    <>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            my: 2,
            backgroundColor: theme.palette.background.paper,
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
          }}
        >
          <Box>
            <Typography
              sx={{
                width: "content-fit",
                display: "inline-block",
                fontSize: { xs: "10px", md: "20px" },
                mx: 1,
              }}
              fontFamily={fontFamilies.extraBold}
            >
              عنوان:
            </Typography>
            <Typography
              sx={{
                display: "inline-block",
                width: "content-fit",
                fontSize: { xs: "10px", md: "18px" },
              }}
              fontFamily={fontFamilies.bold}
            >
              {program.title}
            </Typography>
          </Box>

          <Button
            sx={{
              fontSize: { xs: "10px", md: "16px" },
              color: "black",
            }}
            startIcon={<ArrowBackIcon sx={{ mx: 1 }} />}
            onClick={() => navigate(-1)}
          >
            بازگشت
          </Button>
        </Box>

        {program.exerciselist.map((exercise, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              borderRadius: "8px",
              boxShadow: "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
              margin: "5px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box display={"flex"} alignItems={"center"} flexGrow={1}>
              <Box sx={{ textAlign: "center", width: "10%" }}>
                <Typography
                  sx={{
                    fontFamily: fontFamilies.bold,
                    fontSize: { xs: "12px", sm: "16px" },
                  }}
                >
                  {toPersianDigits(index + 1)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    margin: 2,
                  }}
                >
                  <Link to={`/exercise/${exercise._id}`}>
                    <CardMedia
                      sx={{
                        width: { xs: "80px", sm: "160px" },
                        height: { xs: "80px", sm: "160px" },
                        objectFit: "contain",
                        borderRadius: "50%",
                        padding: "5px",
                        margin: "5px",
                        boxShadow: "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
                      }}
                      component="img"
                      image={`/Workouts/${exercise.ID}.gif`}
                      alt={exercise.NameFarsi}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/utilImage/noimage.jpg";
                      }}
                    />
                  </Link>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: fontFamilies.bold,
                        fontSize: { xs: "10px", md: "18px" },
                        textAlign: "right",
                        marginRight: "15px",
                      }}
                    >
                      {exercise.NameFarsi}
                    </Typography>

                    {exercise.superSetId && (
                      <Box
                        sx={{
                          fontFamily: fontFamilies.light,
                          fontSize: { xs: "7px", md: "16px" },
                          backgroundColor: exercise.superSetId,
                          width: "fit-content",
                          padding: "4px",
                          borderRadius: "20px",
                          color: theme.palette.primary.contrastText,
                          marginTop: "5px",
                          textAlign: "right",
                          marginRight: "15px",
                        }}
                      >
                        سوپرست
                      </Box>
                    )}
                  </Box>
                </Card>
              </Box>
            </Box>

            <Box
              sx={{
                alignItems: "center",
                direction: "rtl",
              }}
            >
              <Table
                sx={{
                  marginRight: "10%",
                  my: 2,
                  width: "45%",
                  borderCollapse: "collapse",
                }}
              >
                <TableBody>
                  <TableRow sx={{ borderBottom: "1px solid #ccc" }}>
                    <TableCell
                      sx={{
                        fontFamily: fontFamilies.extraBold,
                        textAlign: "right",
                        fontSize: { xs: "10px", md: "16px" },
                        py: "2px",
                        border: "none",
                        width: "50%",
                      }}
                    >
                      ست
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: fontFamilies.extraBold,
                        textAlign: "center",
                        fontSize: { xs: "10px", md: "16px" },
                        py: "2px",
                        border: "none",
                        width: "50%",
                      }}
                    >
                      {exercise.repType === "single" ? "تکرار" : "محدوده"}
                    </TableCell>
                  </TableRow>

                  {exercise.rows.map((row: ExerciseRow, index: number) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      <TableCell
                        sx={{
                          textAlign: "right",
                          fontSize: { xs: "10px", md: "16px" },
                          py: "4px",
                          border: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "10px", md: "16px" },
                            color: (() => {
                              switch (row.set) {
                                case "گرم کردن":
                                  return "orange";
                                case "تا واماندگی":
                                  return "red";
                                case "دراپ ست":
                                  return "blue";
                                default:
                                  return "inherit"; // رنگ پیش‌فرض
                              }
                            })(),
                          }}
                        >
                          {typeof row.set === "number"
                            ? toPersianDigits(row.set)
                            : row.set}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          py: "4px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        {exercise.repType === "range" ? (
                          <Typography
                            sx={{ fontSize: { xs: "10px", md: "16px" } }}
                          >
                            {`${toPersianDigits(
                              row.minReps
                            )} تا ${toPersianDigits(row.maxReps)}`}
                          </Typography>
                        ) : (
                          <Typography
                            sx={{ fontSize: { xs: "10px", md: "16px" } }}
                          >
                            {toPersianDigits(row.reps)}{" "}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Divider sx={{ display: exercise.note ? "block" : "none" }} />
              <Box my={1} sx={{ display: exercise.note ? "block" : "none" }}>
                <Typography
                  sx={{
                    display: "inline-block",
                    fontFamily: fontFamilies.extraBold,
                    fontSize: { xs: "10px", md: "16px" },
                    mx: "10%",
                    marginLeft: "5px",
                    padding: 1,
                  }}
                >
                  یادداشت:
                </Typography>
                <Typography
                  sx={{
                    display: "block",
                    fontSize: { xs: "10px", md: "16px" },
                    mx: "10%",
                    padding: 1,
                    textAlign: "justify",
                  }}
                >
                  {exercise.note}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}

        <Box
          my={3}
          sx={{
            backgroundColor: theme.palette.primary.contrastText,
            display: program.description ? "block" : "none",
            padding: "20px",
            width: "100%",
            boxShadow: theme.shadows[5],
          }}
        >
          <Typography
            sx={{
              display: "inline-block",
              fontFamily: fontFamilies.extraBold,
              fontSize: { xs: "10px", md: "20px" },
              marginBottom: 2,
            }}
          >
            توضیحات:
          </Typography>
          <Typography
            sx={{
              display: "block",
              width: "100%",
              fontSize: { xs: "10px", md: "16px" },
              textAlign: "justify",
              p: 1,
            }}
            dangerouslySetInnerHTML={{ __html: program.description }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ExerciseDetails;
