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
import { IExercise } from "../../Type/Type";
import PersonInformationFeild from "../../components/PersonInformationFeild/PersonInformationFeild";
import { MoreVert } from "@mui/icons-material";

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

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }} padding={6}>
      {exerciselist.length ? (
        <>
          <PersonInformationFeild />
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: 1200,
            }}
          >
            {exerciselist.map((exercise, index) => (
              <>
                <Box
                  key={exercise.ID}
                  sx={{
                    display: "flex",
                    flexDirection: "column",

                    width: "100%",
                    backgroundColor: hoveredIndex === index ? "gey" : "white",
                    marginBottom: "10px",
                    padding: "10px",
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
                          fontSize: "16px",
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
                          }}
                        >
                          <CardMedia
                            sx={{
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                              borderRadius: "50%",
                              padding: "5px",
                              boxShadow:
                                "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
                              margin: "5px",
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
                              fontSize: "16px",
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
                        display: "flex",
                        alignItems: "center",
                        marginRight: "auto",
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
                              fontFamily: "bold",
                              textAlign: "center",
                            }}
                          >
                            ست
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "bold",
                              textAlign: "center",
                            }}
                          >
                            تکرار
                          </TableCell>
                        </TableRow>

                        {/* Map over rows dynamically */}
                        {exercise.rows.map((row) => (
                          <TableRow key={row.index}>
                            <TableCell sx={{ textAlign: "center" }}>
                              {row.set}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <TextField size="small" value={row.reps} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => handleAddRow(index)}
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
  );
}

export default Programing;
