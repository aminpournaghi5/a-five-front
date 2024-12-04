import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Checkbox,
  Typography,
  Box,
  FormControlLabel,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Snackbar,
  Card,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import { IExercise } from "../../Type/Type";
import { fontFamilies } from "../../../theme";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "./../../assets/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import SkeletonExerciseCard from "../../components/ExerciseCard/SkeletonExerciseCard";

import AddIcon from "@mui/icons-material/Add";
import AddTaskIcon from "@mui/icons-material/AddTask";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { add } from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";
import { debounce } from "lodash";
import OffCanvasMenu from "../../components/OffCanvasMenu/OffCanvasMenu";
import axiosInstance from "../../api/axiosInstance";

function Exercises() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(18);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [bodyFilter, setBodyFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [musclesFilter, setMusclesFilter] = useState<string>("");
  const [expandedPanels, setExpandedPanels] = useState({
    equipment: false,
    body: false,
    type: false,
    muscles: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exerciseList = useSelector(
    (state: RootState) => state.exerciseList.exerciselist
  );

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const result = await axiosInstance.get<IExercise[]>("/api/exercises"); // استفاده از /api/exercise
        setExercises(result.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login"); // هدایت به صفحه لاگین در صورت خطای 401
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 1200 ? 18 : 12); // Adjust for screen size
    };

    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage(); // Call once on mount

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const isInList = (exerciseId: string | number) =>
    exerciseList.some((ex) => ex.ID === exerciseId);

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
  // Debounced search change handler
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300), // Adjust debounce time as needed
    []
  );

  // Handle input change for search
  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsLoading(true); // Set loading state
    handleSearchChange(value); // Call the debounced function
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesEquipment = selectedFilter
      ? exercise.Abzar === selectedFilter
      : true;
    const matchesBody = bodyFilter ? exercise.Body === bodyFilter : true;
    const matchesType = typeFilter ? exercise.TypeFarsi === typeFilter : true;
    const matchesMuscles = musclesFilter
      ? exercise.TargetFarsi?.includes(musclesFilter)
      : true;
    const matchesSearchTerm = searchTerm
      ? exercise.NameFarsi.includes(searchTerm) ||
        exercise.Name?.toLocaleLowerCase().includes(searchTerm)
      : true;

    return (
      matchesEquipment &&
      matchesBody &&
      matchesType &&
      matchesSearchTerm &&
      matchesMuscles
    );
  });
  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const currentItems = filteredExercises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFilter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setIsLoading(true); // فعال کردن وضعیت بارگذاری

    try {
      const value = event.target.value;

      await new Promise((resolve) => {
        // انتظار کوتاه مدت برای شبیه‌سازی یک عملیات
        setTimeout(resolve, 0);
      });

      setFilter((prev) => (prev === value ? "" : value));
      setCurrentPage(1); // بازنشانی به صفحه اول هنگام تغییر فیلترها
    } finally {
      setIsLoading(false); // غیرفعال کردن وضعیت بارگذاری
    }
  };

  const handlePageChange = async (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setIsLoading(true); // فعال کردن وضعیت بارگذاری

    try {
      await new Promise((resolve) => {
        // شبیه‌سازی یک عملیات غیرهمزمان، اگر لازم نباشد می‌توانید این قسمت را حذف کنید
        setTimeout(resolve, 0);
      });

      setCurrentPage(value); // تنظیم صفحه فعلی به مقدار جدید
    } finally {
      setIsLoading(false); // غیرفعال کردن وضعیت بارگذاری
    }
  };

  const handleAccordionChange =
    (panel: keyof typeof expandedPanels) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanels((prev) => ({ ...prev, [panel]: isExpanded }));
    };
  const clearFilters = async () => {
    setIsLoading(true); // فعال کردن وضعیت بارگذاری

    try {
      await new Promise((resolve) => {
        // شبیه‌سازی یک عملیات غیرهمزمان، اگر نیازی به انتظار نیست، این خط را حذف کنید
        setTimeout(resolve, 0);
      });

      setSelectedFilter("");
      setBodyFilter("");
      setTypeFilter("");
      setMusclesFilter("");

      setExpandedPanels({
        equipment: false,
        body: false,
        type: false,
        muscles: false,
      });

      setCurrentPage(1); // بازنشانی به صفحه اول هنگام پاک‌سازی فیلترها
    } finally {
      setIsLoading(false); // غیرفعال کردن وضعیت بارگذاری
    }
  };

  const equipmentOptions: string[] = [
    "دستگاه بدنسازی",
    "دستگاه اسمیت",
    "دمبل",
    "هالتر",
    "سیم کش",
    "کتل بل",
    "وزن بدن",
    "کش ورزشی",
    "میله هالتر خم",
    "توپ پیلاتس",
    "بتل روپ",
    "آویزانی و معلق",
    "با وزنه",
    "مدیسن بال",
    "بوسو بال",
    "جیم استیک",
    "دستگاه سورتمه",
    "رولر ورزشی",
  ];

  const bodyOptions: string[] = [
    "سینه",
    "باسن",
    "ران",
    "عضلات پشت",
    "بازو",
    "شانه",
    "ساق پا",
    "کمر",
    "ساعد",
    "گردن",
    "پلایومتریک",
    "وزنه برداری",
  ];
  const musclesOptions: string[] = [
    "سینه ای بزرگ ناحیه متصل به جناغ",
    "سینه ای بزرگ ناحیه متصل به ترقوه",
    "دو سر بازویی",
    "سه سر بازویی",
    "بازویی قدامی",
    "بازویی زند زبرینی",
    "پشتی بزرگ",
    "گرد بزرگ",
    "گرد کوچک",
    "تحت خاری",
    "ذوزنقه فوقانی",
    "ذوزنقه تحتانی",
    "ذوزنقه میانی",
    "چهار سر ران",
    "همسترینگ",
    "سرینی بزرگ",
    "سرینی میانی",
    "سرینی کوچک",
    "دوقلو پا",
    "نعلی",
    "دلتوئید قدامی",
    "دلتویید میانی",
    "دلتوئید خلفی",
    "راست شکمی",
    "مورب شکمی",
    "راست کننده ستون مهره ها",
    "باز کننده های مچ دست",
    "خم کننده های مچ دست",
  ];

  const typeOptions: string[] = ["قدرتی", "کششی", "هوازی"];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ my: 2 }}>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
          fullWidth
          placeholder="جستجو..."
          onChange={onSearchInputChange} // Use the new input change handler
        />
      </Box>
      <Box sx={{ display: { sm: "block", lg: "none" }, my: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <OffCanvasMenu
            Options={equipmentOptions}
            ButtonText={"تمام تجهیزات"}
            setSelectedFilter={async (filter) => {
              setIsLoading(true); // فعال کردن حالت بارگذاری
              await new Promise((resolve) => setTimeout(resolve, 0)); // شبیه‌سازی عملیات غیرهمزمان
              setCurrentPage(1);
              setSelectedFilter(filter); // اعمال فیلتر
              setIsLoading(false); // غیرفعال کردن حالت بارگذاری
            }}
          />
          <OffCanvasMenu
            Options={bodyOptions}
            ButtonText={"تمام عضلات"}
            setSelectedFilter={async (filter) => {
              setIsLoading(true); // فعال کردن حالت بارگذاری
              await new Promise((resolve) => setTimeout(resolve, 0)); // شبیه‌سازی عملیات غیرهمزمان
              setCurrentPage(1);
              setBodyFilter(filter); // اعمال فیلتر
              setIsLoading(false); // غیرفعال کردن حالت بارگذاری
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={1} margin={1}>
        {/* Filters */}
        <Grid item lg={2.5} sx={{ display: { xs: "none", lg: "block" } }}>
          <Box
            sx={{
              display: "flex",
              mb: 2,
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              sx={{ marginBottom: "10px" }}
              variant="contained"
              onClick={clearFilters}
              style={{
                display:
                  selectedFilter || bodyFilter || typeFilter || musclesFilter
                    ? "block"
                    : "none",
              }}
            >
              پاک کردن فیلترها
            </Button>

            <Accordion
              expanded={expandedPanels.equipment}
              onChange={handleAccordionChange("equipment")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "16px", fontFamily: fontFamilies.bold }}
                >
                  تجهیزات
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {equipmentOptions.map((option, index) => (
                  <>
                    <FormControlLabel
                      sx={{
                        margin: "0px",
                        padding: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        direction: "ltr",
                      }}
                      key={index}
                      control={
                        <Checkbox
                          value={option}
                          checked={selectedFilter === option}
                          onChange={(e) =>
                            handleCheckboxChange(e, setSelectedFilter)
                          }
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontFamily: fontFamilies.medium,
                          }}
                        >
                          {option}
                        </Typography>
                      }
                    />
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandedPanels.body}
              onChange={handleAccordionChange("body")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "16px", fontFamily: fontFamilies.bold }}
                >
                  ناحیه بدن
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {bodyOptions.map((option, index) => (
                  <>
                    <FormControlLabel
                      sx={{
                        margin: "0px",
                        padding: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        direction: "ltr",
                      }}
                      key={index}
                      control={
                        <Checkbox
                          value={option}
                          checked={bodyFilter === option}
                          onChange={(e) =>
                            handleCheckboxChange(e, setBodyFilter)
                          }
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: "15px" }}>
                          {option}
                        </Typography>
                      }
                    />
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandedPanels.muscles}
              onChange={handleAccordionChange("muscles")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "16px", fontFamily: fontFamilies.bold }}
                >
                  عضلات
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {musclesOptions.map((option, index) => (
                  <>
                    <FormControlLabel
                      sx={{
                        margin: "0px",
                        padding: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        direction: "ltr",
                      }}
                      key={index}
                      control={
                        <Checkbox
                          value={option}
                          checked={musclesFilter === option}
                          onChange={(e) =>
                            handleCheckboxChange(e, setMusclesFilter)
                          }
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            textAlign: "right",
                            fontSize: "15px",
                            fontFamily: fontFamilies.medium,
                          }}
                        >
                          {option}
                        </Typography>
                      }
                    />
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expandedPanels.type}
              onChange={handleAccordionChange("type")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "16px", fontFamily: fontFamilies.bold }}
                >
                  نوع
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {typeOptions.map((option, index) => (
                  <>
                    <FormControlLabel
                      sx={{
                        margin: "0px",
                        padding: "0px",
                        display: "flex",
                        justifyContent: "space-between",
                        direction: "ltr",
                      }}
                      key={index}
                      control={
                        <Checkbox
                          value={option}
                          checked={typeFilter === option}
                          onChange={(e) =>
                            handleCheckboxChange(e, setTypeFilter)
                          }
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: "15px" }}>
                          {option}
                        </Typography>
                      }
                    />
                    <Divider />
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        {/* Exercise Cards */}
        <Grid item xs={12} md={12} lg={9.5}>
          <Grid container spacing={3}>
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <SkeletonExerciseCard />
                </Grid>
              ))
            ) : currentItems.length ? (
              currentItems.map((exercise) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={exercise._id}>
                  <Card
                    sx={{
                      width: "auto",
                      height: "auto",
                      margin: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "30px",
                    }}
                  >
                    <Link to={`/exercise/${exercise._id}`}>
                      <ExerciseCard exercise={exercise} />
                    </Link>
                    <Box
                      display="flex"
                      justifyContent="end"
                      alignItems="center"
                      padding={1}
                    >
                      <Tooltip title={"افزودن به لیست برنامه تمرینی"}>
                        <IconButton
                          aria-label="add to list"
                          onClick={() => handleAddExercise(exercise)}
                          color={isInList(exercise.ID) ? "success" : "default"}
                        >
                          {isInList(exercise.ID) ? (
                            <AddTaskIcon />
                          ) : (
                            <AddIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid
                item
                xs={12}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  component={"img"}
                  sx={{ height: "auto", width: "300px", margin: 4 }}
                  src="/utilImage/notfound.png"
                ></Box>
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{ fontSize: { xs: "12px" } }}
                >
                  <SearchOffIcon sx={{ marginLeft: 1 }} />
                  {"متاسفانه هیچ تمرینی با این مشخصات پیدا نشد!"}
                  <br />
                  {"دوباره تلاش کنید."}
                </Typography>
              </Grid>
            )}
          </Grid>

          {/* Snackbar for feedback */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />

          {/* Pagination */}
          {isLoading ? (
            <></>
          ) : (
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                siblingCount={1} // تعداد دکمه‌های اطراف صفحه جاری
                boundaryCount={0} // تعداد دکمه‌ها در ابتدا و انتها
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Exercises;
