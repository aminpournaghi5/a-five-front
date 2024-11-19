import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../../assets/Redux/store";
import {
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import theme, { fontFamilies } from "../../../theme";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ReorderIcon from "@mui/icons-material/Reorder";
import {
  remove,
  reorder,
  updateSetsReps,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";
import { IExercise } from "../../Type/Type";
import PersonInformationFeild from "../../components/PersonInformationFeild/PersonInformationFeild";

function Programing() {
  const exerciselist = useSelector(
    (state: RootState) => state.exerciseList.exerciselist
  ) as IExercise[];
  const dispatch = useDispatch();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Handle delete exercise
  const handleDeleteExercise = (index: number) => {
    dispatch(remove(index));
  };

  // Handle drag start
  const handleDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drop
  const handleDrop = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      dispatch(reorder({ sourceIndex: draggedIndex, destinationIndex: index }));
    }
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  // Handle sets and reps update
  const handleUpdateSetsReps = (index: number, value: string) => {
    dispatch(updateSetsReps({ index, value: toEnglishDigits(value) }));
  };

  // Convert English digits to Persian digits
  const toPersianDigits = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .replace(/\d/g, (d: string) => persianDigits[parseInt(d)]);
  };

  // Convert Persian digits to English digits
  const toEnglishDigits = (str: string) => {
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return str.replace(
      /[\u0660-\u0669]/g,
      (d: string) => englishDigits[parseInt(d)]
    );
  };

  return (
    <>
      <Box sx={{ textAlign: "center", marginTop: "20px" }} padding={6}>
        {exerciselist.length ? (
          <>
            <PersonInformationFeild />
            <TableContainer
              component={Paper}
              sx={{
                marginTop: "20px",
                width: "100%",
                maxWidth: 1200,
                textAlign: "center",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell
                      sx={{
                        fontFamily: fontFamilies.extraBold,
                        fontSize: "20px",
                        textAlign: "center",
                      }}
                    >
                      نام حرکت
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: fontFamilies.extraBold,
                        fontSize: "20px",
                        textAlign: "center",
                      }}
                    >
                      ست و تکرار
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: fontFamilies.extraBold,
                        fontSize: "20px",
                        textAlign: "center",
                      }}
                    >
                      نحوه اجرا حرکت
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>

                  {exerciselist.map((exercise, index) => (
                    <TableRow
                      key={exercise.ID}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnter={() => setHoveredIndex(index)}
                      onDragLeave={() => setHoveredIndex(null)}
                      sx={{
                        transition: "background-color 0.3s ease",
                        backgroundColor:
                          hoveredIndex === index ? "#f0f0f0" : "transparent",
                      }}
                    >
                      <TableCell
                        sx={{
                          textAlign: "center",
                          fontFamily: fontFamilies.bold,
                          fontSize: "16px",
                        }}
                      >
                        {toPersianDigits(index + 1)}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: fontFamilies.bold,
                          fontSize: "16px",
                          textAlign: "center",
                        }}
                      >
                        {exercise.NameFarsi}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: fontFamilies.bold,
                          fontSize: "8px",
                          textAlign: "center",
                        }}
                      >
                        <TextField
                          placeholder="ست و تکرار"
                          value={
                            exercise.setsReps
                              ? toPersianDigits(exercise.setsReps)
                              : ""
                          }
                          onChange={(e) =>
                            handleUpdateSetsReps(index, e.target.value)
                          }
                          onBlur={(e) =>
                            handleUpdateSetsReps(index, e.target.value)
                          }
                          sx={{
                            textAlign: "center",
                            fontFamily: fontFamilies.bold,
                            fontSize: "8px",
                            "& .MuiInputBase-input": {
                              textAlign: "center",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/exercise/${exercise._id}`}>
                          <CardMedia
                            sx={{
                              width: "100%",
                              height: "100px",
                              objectFit: "contain",
                              margin: "0 auto",
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
                        </Link>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="reorder" onClick={() => {}}>
                          <ReorderIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteExercise(index)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                  }}
                >
                  افزودن تمرین جدید
                </Button>
              </Link>
              <Button variant="outlined" sx={{ mx: "5px" }}>
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
            <Box component={"img"} sx={{height:"300px", width:"auto"}} src="../../../public/noprogram.png"></Box>
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
    </>
  );
}

export default Programing;
