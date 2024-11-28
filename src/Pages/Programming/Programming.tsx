import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../../assets/Redux/store";
import {
  Box,
  IconButton,
  Button,
  Typography,
  Card,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import theme, { fontFamilies } from "../../../theme";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ReorderIcon from "@mui/icons-material/Reorder";
import {
  setSetType,
  addRow,
  remove,
  reorder,
  setRepType,
  updateRange,
  updateReps,
  removeRow,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";

// import PersonInformationFeild from "../../components/PersonInformationFeild/PersonInformationFeild";
import { Clear, MoreVert } from "@mui/icons-material";

function Programing() {
  const exerciselist = useSelector(
    (state: RootState) => state.exerciseList.exerciselist
  );
  const dispatch = useDispatch();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Handle delete exercise
  const handleDeleteExercise = (index: number) => {
    dispatch(remove(index));
  };

  // Handle drag start
  const handleDragStart = (e: any, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drop
  const handleDrop = (e: any, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      dispatch(reorder({ sourceIndex: draggedIndex, destinationIndex: index }));
    }
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  // Convert English digits to Persian digits
  const toPersianDigits = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .replace(/\d/g, (d: string) => persianDigits[parseInt(d)]);
  };
  const handleAddRow = (exerciseIndex: number) => {
    dispatch(addRow(exerciseIndex)); // Assuming addRow action is available
  };

  // Handle reps change for "single" type
  const handleRepsChange = (
    exerciseId: number,
    index: number,
    value: number
  ) => {
    dispatch(updateReps({ exerciseId, rowIndex: index, reps: value }));
  };
  // Handle range values change for "range" type
  const handleRangeChange = (
    exerciseId: number,
    index: number,
    minReps: number,
    maxReps: number
  ) => {
    dispatch(updateRange({ exerciseId, rowIndex: index, minReps, maxReps }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: 1,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        {exerciselist.length ? (
          <>
            {/* <PersonInformationFeild /> */}
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {exerciselist.map((exercise, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    backgroundColor: hoveredIndex === index ? "gey" : "white",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    boxShadow: "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
                    margin: "5px",
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
                      <Link to={`/exercise/${exercise._id}`}>
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
                          <CardMedia
                            sx={{
                              width: { xs: "60px", sm: "160px" },
                              height: { xs: "60px", sm: "160px" },
                              objectFit: "contain",
                              borderRadius: "50%",
                              padding: "5px",
                              margin: "5px",
                              boxShadow:
                                "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
                            }}
                            component="img"
                            image={`/Workouts/${exercise.ID}.gif`}
                            alt={exercise.NameFarsi}
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement>
                            ) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/utilImage/noImage.png";
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: fontFamilies.bold,
                              fontSize: { xs: "10px", md: "18px" },
                              textAlign: "right",
                              marginRight: "15px",
                            }}
                          >
                            {exercise.NameFarsi}
                            {/* <br />
                              <Typography
                                sx={{
                                  fontFamily: fontFamilies.light,
                                  fontSize: { xs: "8px", md: "16px" },
                                  backgroundColor: theme.palette.secondary.main,
                                  width: "fit-content",
                                  padding: "4px",
                                  borderRadius: "20px",
                                  color: theme.palette.primary.contrastText,
                                  marginTop: "5px",
                                }}
                              >
                                سوپرست
                              </Typography> */}
                          </Typography>
                        </Card>
                      </Link>
                    </Box>

                    <Box
                      sx={{
                        marginRight: "auto",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <IconButton
                        component="div"
                        aria-label="reorder"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnter={() => setHoveredIndex(index)}
                        onDragLeave={() => setHoveredIndex(null)}
                      >
                        <ReorderIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteExercise(index)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="more">
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      alignItems: "center",
                      direction: "rtl", // افزودن راست چین بودن برای جهت کلی
                    }}
                  >
                    <Table
                      sx={{
                        marginRight: "10%",
                        marginBottom: "20px",
                        width: "25%",
                        borderCollapse: "collapse",
                      }}
                    >
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: fontFamilies.bold,
                              textAlign: "right",
                              fontSize: { xs: "12px", md: "16px" },
                              py: "2px",
                              border: "none",
                              width: "50%",
                            }}
                          >
                            ست
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: fontFamilies.bold,
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                exercise.repType === "range"
                                  ? "center"
                                  : "right",
                              fontSize: { xs: "12px", md: "16px" },
                              py: "2px",
                              border: "none",
                              width: "100%",
                            }}
                          >
                            <Select
                              size="small"
                              variant="standard"
                              defaultValue={exercise.repType}
                              sx={{
                                "& .MuiSelect-icon": {
                                  display: "none",
                                },
                                "& .MuiSelect-select": {
                                  fontFamily: fontFamilies.bold,
                                  padding: "0 !important",
                                  margin: 0,
                                  fontSize: { xs: "12px", md: "16px" },
                                },
                                "& .MuiSelect-selectMenu": {
                                  fontFamily: fontFamilies.bold,
                                  padding: 0,
                                  margin: 0,
                                  fontSize: { xs: "12px", md: "16px" },
                                },
                              }}
                              onChange={(e) =>
                                dispatch(
                                  setRepType({
                                    exerciseId: exercise.index,
                                    type: e.target.value as "single" | "range",
                                  })
                                )
                              }
                            >
                              <MenuItem value="single">تکرار</MenuItem>
                              <MenuItem value="range">محدوده</MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>

                        {/* Map over rows dynamically */}
                        {exercise.rows.map((row: any, index: number) => (
                          <TableRow key={row.index}>
                            <TableCell
                              sx={{
                                textAlign: "right",
                                fontSize: { xs: "9px", md: "16px" },
                                py: "4px",
                                border: "none",
                              }}
                            >
                              <Select
                                size="small"
                                variant="standard"
                                sx={{
                                  "& .MuiSelect-icon": {
                                    display: "none", // مخفی کردن آیکون فلش
                                  },
                                  "& .MuiSelect-select": {
                                    fontFamily: fontFamilies.bold,
                                    padding: "0 !important",
                                    margin: 0,
                                    fontSize: { xs: "12px", md: "16px" },

                                    color: (theme) =>
                                      // رنگ فونت بر اساس مقدار انتخابی
                                      row.set === "گرم کردن"
                                        ? "orange"
                                        : row.set === "تا واماندگی"
                                        ? "red"
                                        : row.set === "دراپ ست"
                                        ? "blue"
                                        : theme.palette.text.primary, // رنگ پیش‌فرض
                                  },
                                  "& .MuiSelect-selectMenu": {
                                    fontFamily: fontFamilies.bold,
                                    fontSize: { xs: "12px", md: "16px" },
                                  },
                                  "& .Muiselectinpur": {
                                    padding: 0,
                                  },
                                }}
                                defaultValue={
                                  row.set === index + 1 ? "number" : row.set
                                }
                                onChange={(e) =>
                                  dispatch(
                                    setSetType({
                                      exerciseId: exercise.index,
                                      rowIndex: index,
                                      setType: e.target.value as
                                        | "number"
                                        | "دراپ ست"
                                        | "گرم کردن"
                                        | "تا واماندگی",
                                    })
                                  )
                                }
                              >
                                <MenuItem value="number">
                                  {toPersianDigits(index + 1)}
                                </MenuItem>
                                <MenuItem value="گرم کردن">گرم کردن</MenuItem>
                                <MenuItem value="دراپ ست">دراپ ست</MenuItem>
                                <MenuItem value="تا واماندگی">
                                  تا واماندگی
                                </MenuItem>
                              </Select>
                            </TableCell>
                            <TableCell
                              sx={{
                                py: "4px",
                                border: "none",
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-start",
                              }}
                            >
                              {/* Render reps or range inputs based on the exercise type */}
                              {exercise.repType === "range" ? (
                                <>
                                  <TextField
                                    size="small"
                                    variant="standard"
                                    type="number"
                                    value={row.minReps || 0}
                                    onChange={(e) =>
                                      handleRangeChange(
                                        exercise.index,
                                        index,
                                        Math.max(
                                          0,
                                          Math.floor(Number(e.target.value))
                                        ),
                                        row.maxReps || 0
                                      )
                                    }
                                    sx={{
                                      width: "50px",
                                      "& .MuiInput-underline:after": {
                                        border: "none", // حذف خط زیر هنگام فوکوس
                                      },
                                      "& input": {
                                        padding: "4px",
                                        textAlign: "center",
                                      },
                                    }}
                                  />
                                  <Typography display="inline" mx="5px">
                                    تا
                                  </Typography>
                                  <TextField
                                    size="small"
                                    variant="standard"
                                    type="number"
                                    value={row.maxReps || 0}
                                    onChange={(e) =>
                                      handleRangeChange(
                                        exercise.index,
                                        index,
                                        row.minReps || 0,
                                        Math.max(
                                          0,
                                          Math.floor(Number(e.target.value))
                                        )
                                      )
                                    }
                                    sx={{
                                      width: "50px",
                                      "& .MuiInput-underline:after": {
                                        border: "none", // حذف خط زیر هنگام فوکوس
                                      },
                                      "& input": {
                                        padding: "4px",
                                        textAlign: "center",
                                      },
                                    }}
                                  />
                                </>
                              ) : (
                                <TextField
                                  size="small"
                                  variant="standard"
                                  type="number"
                                  value={row.reps || 0}
                                  onChange={(e) =>
                                    handleRepsChange(
                                      exercise.index,
                                      index,
                                      Math.max(
                                        0,
                                        Math.floor(Number(e.target.value))
                                      )
                                    )
                                  }
                                  sx={{
                                    width: "50px",
                                    "& .MuiInput-underline:after": {
                                      border: "none", // حذف خط زیر هنگام فوکوس
                                    },
                                    "& input": {
                                      padding: "4px",
                                      textAlign: "center",
                                    },
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell
                              sx={{ border: "none", padding: 0, margin: 0 }}
                            >
                              <Clear
                                color="error"
                                sx={{
                                  display:
                                    index === exercise.rows.length - 1
                                      ? "block"
                                      : "none",
                                }}
                                onClick={() =>
                                  dispatch(
                                    removeRow({
                                      exerciseId: exercise.index,
                                      rowIndex: index,
                                    })
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                  <Divider />
                  <Button
                    onClick={() => handleAddRow(index)}
                    sx={{
                      fontSize: { xs: "12px", md: "16px" },
                      padding: "16px",
                    }}
                  >
                    اضافه کردن ست جدید
                  </Button>
                </Box>
              ))}
            </Box>

            <Box
              display={"flex"}
              justifyContent={"center"}
              my={"15px"}
              alignItems={"center"}
              width="100%"
            >
              <Button
                component={Link} // استفاده از Link به عنوان پایه دکمه
                to={"/exercises"}
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                  color: "white",
                  fontFamily: fontFamilies.bold,
                  mx: "5px",
                  fontSize: { xs: "10px", md: "16px" },
                  width: "100%",
                }}
              >
                اضافه کردن تمرین جدید
              </Button>

              {/* <Button
                variant="outlined"
                sx={{ mx: "5px", fontSize: { xs: "10px", md: "16px" } }}
              >
                چاپ
              </Button> */}
            </Box>
          </>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            textAlign={"center"}
            height={"70vh"} // ارتفاع کل صفحه
          >
            <Box
              component={"img"}
              sx={{ height: "150px", width: "auto", my: "10px" }}
              src="/utilImage/noprogram.png"
            ></Box>
            <Typography sx={{ fontSize: { xs: "12px", md: "16px" } }}>
              در حال حاضر هیچ تمرینی در لیست وجود ندارد، آن‌ها را اضافه کنید!
            </Typography>
            <Link to={"/exercises"}>
              <Button
                sx={{
                  width: "250px",
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  fontFamily: fontFamilies.bold,
                  my: "10px",
                  fontSize: { xs: "10px", md: "16px" },
                }}
              >
                اضافه کردن تمرین جدید
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Programing;
