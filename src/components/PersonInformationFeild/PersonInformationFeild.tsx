import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-jalaali";
import {
  setName,
  setPerWeek,
  setPerMonth,
  setDate,
} from "../../assets/Redux/reduxfeatures/ExerciseList/PersonalInfoSlice";
import theme, { fontFamilies } from "../../../theme";
import { RootState } from "../../assets/Redux/store";

export default function PersonInformationField() {
  const dispatch = useDispatch();

  const name = useSelector((state: RootState) => state.personalInfo.name);
  const sessionsPerWeek = useSelector(
    (state: RootState) => state.personalInfo.perweek
  );
  const programDuration = useSelector(
    (state: RootState) => state.personalInfo.permonth
  );
  const today = useSelector((state: RootState) => state.personalInfo.date);

  useEffect(() => {
    const currentDate = moment().format("jYYYY/jM/jD");
    dispatch(setDate(toPersianNumber(currentDate))); // تنظیم تاریخ به صورت فارسی
  }, [dispatch]);

  const toPersianNumber = (num: string | number) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(num)
      .split("")
      .map((digit: any) => persianNumbers[digit] || digit)
      .join("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const handleSessionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    dispatch(setPerWeek(isNaN(value) ? 0 : Math.max(0, value)));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    dispatch(setPerMonth(isNaN(value) ? 0 : Math.max(0, value)));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#ffe3a4",
        padding: "10px",
        boxShadow: theme.shadows[1],
      }}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          fontSize={"13px"}
          marginLeft={1}
          fontFamily={fontFamilies.bold}
        >
          نام و نام خانوادگی:
        </Typography>
        <TextField
          size="small"
          value={name}
          onChange={handleNameChange}
        />
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          fontSize={"13px"}
          marginLeft={1}
          fontFamily={fontFamilies.bold}
        >
          تاریخ شروع برنامه :
        </Typography>
        <Typography>{today}</Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          fontSize={"13px"}
          marginLeft={1}
          fontFamily={fontFamilies.bold}
        >
          تعداد جلسه در هفته :
        </Typography>
        <TextField
          size="small"
          type="text"
          value={toPersianNumber(sessionsPerWeek)}
          onChange={handleSessionsChange}
          sx={{ width: "70px", textAlign: "center" }}
          InputProps={{
            inputProps: { min: 0, style: { textAlign: "center" } },
          }}
        />
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          fontSize={"13px"}
          marginLeft={1}
          fontFamily={fontFamilies.bold}
        >
          مدت زمان برنامه (هفته):
        </Typography>
        <TextField
          size="small"
          type="text"
          value={toPersianNumber(programDuration)}
          onChange={handleDurationChange}
          sx={{ width: "70px", textAlign: "center" }}
          InputProps={{
            inputProps: { min: 0, style: { textAlign: "center" } },
          }}
        />
      </Box>
    </Box>
  );
}
