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
} from "@mui/material";
import theme, { fontFamilies } from "../../../theme";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ReorderIcon from "@mui/icons-material/Reorder";
import {
  addRow,
  remove,
  reorder,
  updateReps,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";

// import PersonInformationFeild from "../../components/PersonInformationFeild/PersonInformationFeild";
import { MoreVert } from "@mui/icons-material";

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

  function handleRepsChange(
    exerciseId: string,
    rowIndex: number,
    reps: number
  ) {
    dispatch(updateReps({ exerciseId, rowIndex, reps }));
  }

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
                <>
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
                                boxShadow:
                                  "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
                              }}
                              component="img"
                              image={`/public/Workouts/${exercise.ID}.gif`}
                              alt={exercise.NameFarsi}
                              onError={(
                                e: React.SyntheticEvent<HTMLImageElement>
                              ) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                  "/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
                              }}
                            />
                            <Typography
                              sx={{
                                fontFamily: fontFamilies.bold,
                                fontSize: { xs: "10px", md: "18px" },
                                textAlign: "center",
                                marginRight: "15px",
                              }}
                            >
                              {exercise.NameFarsi}
                            </Typography>
                          </Card>
                        </Link>
                      </Box>

                      <Box
                        sx={{
                          alignItems: "center",
                          marginRight: "auto",
                          display: { xs: "none", sm: "flex" },
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
                          marginRight: "10px",
                          marginBottom: "20px",
                          width: "50%",

                          borderCollapse: "collapse",
                        }}
                      >
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                fontFamily: fontFamilies.bold,
                                textAlign: "center",
                                fontSize: { xs: "10px", md: "16px" },
                                padding: "4px",
                                border: "none",
                              }}
                            >
                              ست
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: fontFamilies.bold,
                                textAlign: "center",
                                fontSize: { xs: "10px", md: "16px" },
                                padding: "4px",
                                border: "none",
                              }}
                            >
                              <Select size="small">
                                <MenuItem value="single">تکرار</MenuItem>
                                <MenuItem value="range">محدوده</MenuItem>
                              </Select>
                            </TableCell>
                          </TableRow>

                          {/* Map over rows dynamically */}
                          {exercise.rows.map((row: any, index) => (
                            <TableRow key={row.index}>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: { xs: "9px", md: "16px" },
                                  padding: "2px",
                                  border: "none",
                                }}
                              >
                                {toPersianDigits(row.set)}
                              </TableCell>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  padding: "2px",
                                  border: "none",
                                }}
                              >
                                <TextField
                                  size="small"
                                  variant="outlined"
                                  onChange={(e) => {
                                    const value = Math.abs(
                                      Math.floor(Number(e.target.value))
                                    ); // فقط اعداد صحیح و مثبت
                                    handleRepsChange(
                                      exercise._id,
                                      index,
                                      value
                                    );
                                  }}
                                  type="number"
                                  sx={{
                                    width: "50px",
                                    "& input": {
                                      padding: "4px",
                                      textAlign: "center",
                                    },
                                  }}
                                  value={row.reps}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                    <Button
                      onClick={() => handleAddRow(index)}
                      sx={{ fontSize: { xs: "12px", md: "16px" } }}
                    >
                      اضافه کردن ست جدید
                    </Button>
                  </Box>
                </>
              ))}
            </Box>

            <Box
              display={"flex"}
              justifyContent={"center"}
              my={"15px"}
              alignItems={"center"}
            >
              <Link to={"/exercises"}>
                <Button
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: "white",
                    fontFamily: fontFamilies.bold,
                    mx: "5px",
                    fontSize: { xs: "10px", md: "16px" },
                  }}
                >
                  افزودن تمرین جدید
                </Button>
              </Link>
              <Button
                variant="outlined"
                sx={{ mx: "5px", fontSize: { xs: "10px", md: "16px" } }}
              >
                چاپ
              </Button>
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
              src="../../../public/noprogram.png"
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
                افزودن تمرین جدید
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Programing;
