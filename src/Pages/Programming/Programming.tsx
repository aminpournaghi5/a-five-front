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
  Menu,
  Snackbar,
} from "@mui/material";
import theme, { fontFamilies } from "../../../theme";
import { Link, redirect } from "react-router-dom";
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
  addSuperSet,
  removeSuperSet,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";
import { Clear, MoreVert } from "@mui/icons-material";
import ExerciseInformation from "../../components/ExerciseInformation/ExerciseInformation";
import axiosInstance from "../../api/axiosInstance";

function Programing() {
  const exerciselist = useSelector(
    (state: RootState) => state.exerciseList.exerciselist
  );

  const dispatch = useDispatch();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [firstExerciseId, setFirstExerciseId] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // لیستی از رنگ‌ها که می‌خواهید به طور تصادفی انتخاب شوند

  /// handle menu monvert
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    exerciseId: number
  ) => {
    setAnchorEl(event.currentTarget); // باز کردن منو
    setFirstExerciseId(exerciseId); // ذخیره آیدی تمرین اول
  };
  const handleSelectSecondExercise = (secondExerciseId: number) => {
    if (firstExerciseId !== null) {
      dispatch(
        addSuperSet({
          firstExerciseId,
          secondExerciseId,
        })
      );
    }
    handleClose(); // بستن منو
  };
  /// handle menu movert

  const handleClose = () => {
    setAnchorEl(null);
    setFirstExerciseId(null);
  };

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

  const title = useSelector((state: any) => state.exerciseList.title);
  const date = useSelector((state: any) => state.exerciseList.date);
  const exerciseList = useSelector(
    (state: any) => state.exerciseList.exerciselist
  );
  const addExerciseList = async () => {
    try {
      const payload = {
        title: title,
        date: date,
        exerciselist: exerciseList,
      };

      const response = await axiosInstance.post(
        "/api/exerciselist/add",
        payload
      );
      if (response.status === 201) {
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      console.error(
        "Error occurred:",
        error.response?.data?.message || error.message
      );
    }
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
            <ExerciseInformation />
            <Box
              sx={{
                marginTop: "10px",
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
                              e.currentTarget.src =
                                "../../../utilImage/noimage.jpg";
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
                                textAlign: "right", // برای راست‌چین شدن
                                marginRight: "15px",
                              }}
                            >
                              سوپرست
                            </Box>
                          )}
                        </Card>
                      </Link>
                    </Box>

                    <Box
                      sx={{
                        marginRight: "auto",
                        display: "flex",
                        alignItems: "center",
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
                        sx={{ display: { xs: "none", md: "inline" } }}
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
                      {exercise.superSetId === null ? (
                        <IconButton
                          aria-label="more"
                          size="small"
                          color="inherit"
                          onClick={(e) => handleClick(e, exercise.index)} // باز کردن منو یا اجرای رویداد مربوطه
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      ) : (
                        <Button
                          variant="text"
                          onClick={() =>
                            dispatch(removeSuperSet(exercise.superSetId))
                          } // حذف سوپرست
                          sx={{
                            fontFamily: fontFamilies.bold,
                            fontSize: { xs: "6px", md: "10px" },
                            backgroundColor: exercise.superSetId,
                            color: theme.palette.primary.contrastText,
                            padding: "4px",
                            width: "fit-content",
                            borderRadius: "15px",
                            mx: 2,
                          }}
                        >
                          حذف سوپرست
                        </Button>
                      )}
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        {exerciselist.map((ex) => (
                          <MenuItem
                            key={ex.index}
                            onClick={() => handleSelectSecondExercise(ex.index)}
                            disabled={
                              ex.index === firstExerciseId ||
                              ex.superSetId !== null
                            }
                            sx={{
                              py: 0,
                              fontFamily: fontFamilies.bold,
                              fontSize: { xs: "10px", md: "16px" },
                              color:
                                ex.index === firstExerciseId ||
                                ex.superSetId !== null
                                  ? "gray"
                                  : "inherit", // تغییر رنگ برای حالت غیرفعال
                            }}
                          >
                            {ex.NameFarsi}
                          </MenuItem>
                        ))}
                      </Menu>
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
                              fontFamily: fontFamilies.bold,
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                exercise.repType === "range"
                                  ? "center"
                                  : "right",
                              fontSize: { xs: "10px", md: "16px" },
                              py: "2px",
                              border: "none",
                              width: "100%",
                            }}
                          >
                            <Select
                              size="small"
                              variant="standard"
                              value={exercise.repType}
                              sx={{
                                "& .MuiSelect-icon": {
                                  display: "none",
                                },
                                "& .MuiSelect-select": {
                                  fontFamily: fontFamilies.bold,
                                  padding: "0 !important",
                                  margin: 0,
                                  fontSize: { xs: "10px", md: "16px" },
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
                              <MenuItem
                                sx={{
                                  py: 0,
                                  fontFamily: fontFamilies.bold,
                                  fontSize: { xs: "10px", md: "16px" },
                                }}
                                value="single"
                              >
                                تکرار
                              </MenuItem>
                              <MenuItem
                                sx={{
                                  py: 0,
                                  fontFamily: fontFamilies.bold,
                                  fontSize: { xs: "10px", md: "16px" },
                                }}
                                value="range"
                              >
                                محدوده
                              </MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>

                        {/* Map over rows dynamically */}
                        {exercise.rows.map((row: any, index: number) => (
                          <TableRow key={row.index}>
                            <TableCell
                              sx={{
                                textAlign: "right",
                                fontSize: { xs: "10px", md: "16px" },
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
                                    fontSize: { xs: "10px", md: "16px" },

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
                                    fontSize: { xs: "10px", md: "16px" },
                                  },
                                  "& .Muiselectinpur": {
                                    padding: 0,
                                  },
                                }}
                                value={
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
                                <MenuItem
                                  sx={{
                                    py: 0,
                                    fontFamily: fontFamilies.bold,
                                    fontSize: { xs: "10px", md: "16px" },
                                  }}
                                  value="number"
                                >
                                  {toPersianDigits(index + 1)}
                                </MenuItem>
                                <MenuItem
                                  sx={{
                                    py: 0,
                                    fontFamily: fontFamilies.bold,
                                    fontSize: { xs: "10px", md: "16px" },
                                  }}
                                  value="گرم کردن"
                                >
                                  گرم کردن
                                </MenuItem>
                                <MenuItem
                                  sx={{
                                    py: 0,
                                    fontFamily: fontFamilies.bold,
                                    fontSize: { xs: "10px", md: "16px" },
                                  }}
                                  value="دراپ ست"
                                >
                                  دراپ ست
                                </MenuItem>
                                <MenuItem
                                  sx={{
                                    py: 0,
                                    fontFamily: fontFamilies.bold,
                                    fontSize: { xs: "10px", md: "16px" },
                                  }}
                                  value="تا واماندگی"
                                >
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
                                    value={row.minReps === 0 ? "" : row.minReps}
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
                                        fontSize: { xs: "10px", md: "16px" },
                                      },
                                    }}
                                  />
                                  <Typography
                                    display="inline"
                                    mx="5px"
                                    fontSize={{ xs: "10px", md: "16px" }}
                                  >
                                    تا
                                  </Typography>
                                  <TextField
                                    size="small"
                                    variant="standard"
                                    type="number"
                                    value={row.maxReps === 0 ? "" : row.maxReps}
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
                                        fontSize: { xs: "10px", md: "16px" },
                                      },
                                    }}
                                  />
                                </>
                              ) : (
                                <TextField
                                  size="small"
                                  variant="standard"
                                  type="number"
                                  value={row.reps === 0 ? "" : row.reps}
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
                                      fontSize: { xs: "10px", md: "16px" },
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
                  width: "50%",
                }}
              >
                اضافه کردن تمرین جدید
              </Button>
              <Button
                onClick={addExerciseList}
                variant="outlined"
                sx={{
                  mx: "5px",
                  fontSize: { xs: "10px", md: "16px", width: "50%" },
                }}
              >
                ذخیره
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
              src="/utilImage/noprogram.png"
            ></Box>
            <Typography sx={{ fontSize: { xs: "12px", md: "16px" } }}>
              در حال حاضر هیچ تمرینی در لیست وجود ندارد، آن‌ها را اضافه کنید!
            </Typography>
            <Button
              component={Link}
              to={"/exercises"}
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
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Programing;
