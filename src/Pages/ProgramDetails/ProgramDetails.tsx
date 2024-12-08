import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  Box,
  Card,
  CardMedia,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import theme, { fontFamilies } from "../../../theme";
import {
  ExerciseListState,
  ExerciseRow,
  Exercise,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";

const ExerciseDetails = () => {
  const params = useParams<{ id: string }>();
  const [program, setProgram] = useState<ExerciseListState>({
    title: "",
    description: "",
    exerciselist: [],
  });

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/exerciselist/get/${params.id}`
        );
        setProgram(response.data.exercise);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات تمرین:", error);
      } finally {
      }
    };

    fetchExercise();
  }, [params.id]); // اضافه کردن id به آرایه وابستگی‌ها

  const toPersianDigits = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .replace(/\d/g, (d: string) => persianDigits[parseInt(d)]);
  };

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
              <Box sx={{ textAlign: "center", width: "50px" }}>
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

            <Box my={1} sx={{ display: exercise.note ? "block" : "none" }}>
              <Divider />
              <Typography
                sx={{
                  display: "inline-block",
                  fontFamily: fontFamilies.extraBold,
                  fontSize: { xs: "10px", md: "16px" },
                  marginRight: "50px",
                  marginLeft: "5px",
                  padding: 1,
                }}
              >
                یادداشت:
              </Typography>
              <Typography
                sx={{
                  display: "inline",
                  fontSize: { xs: "10px", md: "16px" },
                  padding: 1,
                }}
              >
                {exercise.note}
              </Typography>
              <Divider />
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
                  width: "25%",
                  borderCollapse: "collapse",
                }}
              >
                <TableBody>
                  <TableRow>
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
                        width: "100%",
                      }}
                    >
                      {exercise.repType === "single" ? "تکرار" : "محدوده"}
                    </TableCell>
                  </TableRow>

                  {exercise.rows.map((row: ExerciseRow, index: number) => (
                    <TableRow key={index}>
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
                          <Typography>
                            {`${toPersianDigits(
                              row.minReps
                            )} تا ${toPersianDigits(row.maxReps)}`}
                          </Typography>
                        ) : (
                          <Typography>{toPersianDigits(row.reps)} </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
          }}
        >
          <Typography
            sx={{
              display: "inline-block",
              fontFamily: fontFamilies.extraBold,
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            توضیحات:
          </Typography>
          <Typography
            sx={{
              display: "block",
              width: "100%",
              fontSize: { xs: "10px", md: "16px" },
            }}
          >
            {program.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ExerciseDetails;
