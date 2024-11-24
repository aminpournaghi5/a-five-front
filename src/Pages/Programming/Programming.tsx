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

import PersonInformationFeild from "../../components/PersonInformationFeild/PersonInformationFeild";
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

  function handleRepsChange(event: any, rowIndex: number) {
    const reps = parseInt(event.target.value);
    dispatch(updateReps({ rowIndex, reps }));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{ marginTop: "20px", width: "100%", maxWidth: 1200 }}
        padding={2}
      >
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
                                width: { xs: "60px", sm: "100px" },
                                height: { xs: "60px", sm: "100px" },
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
                      <Table sx={{ width: "50%" }}>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                fontFamily: fontFamilies.bold,
                                textAlign: "center",
                                fontSize: { xs: "10px", md: "16px" },
                              }}
                            >
                              ست
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: fontFamilies.bold,
                                textAlign: "center",
                                fontSize: { xs: "10px", md: "16px" },
                              }}
                            >
                              تکرار
                            </TableCell>
                          </TableRow>

                          {/* Map over rows dynamically */}
                          {exercise.rows.map((row: any, index) => (
                            <TableRow key={row.index}>
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                  fontSize: { xs: "10px", md: "16px" },
                                }}
                              >
                                {toPersianDigits(row.set)}
                              </TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                <TextField
                                  onChange={(e) => handleRepsChange(e, index)}
                                  type="number"
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
            my={"15px"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Box
              component={"img"}
              sx={{ height: "300px", width: "auto" }}
              src="../../../public/noprogram.png"
            ></Box>
            <Typography sx={{ my: "10px" }}>
              در حال حاضر هیچ تمرینی در لیست وجود ندارد، آن‌ها را اضافه کنید!
            </Typography>
            <Link to={"/exercises"}>
              <Button
                sx={{
                  width: "500px",
                  backgroundColor: theme.palette.secondary.main,
                  color: "white",
                  fontFamily: fontFamilies.bold,
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
