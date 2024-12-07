import { Box, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice"; // فرض بر این است که اکشن setTitle در slice شما وجود دارد
import theme, { fontFamilies } from "../../../theme";

const ExerciseHeader = () => {
  const dispatch = useDispatch();

  // استفاده از useSelector برای گرفتن اطلاعات از Redux
  const title = useSelector((state: any) => state.exerciseList.title);

  // تابع برای تغییر title
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        marginTop: "10px",
        py: "10px",
        alignItems: "center",
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        width: "100%",
      }}
    >
      {/* عنوان */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mx={2}
      >
        <Typography
          sx={{ fontSize: { xs: "10px", md: "14px" } }}
          fontFamily={fontFamilies.bold}
        >
          عنوان:
        </Typography>
        <TextField
          placeholder="عنوان"
          variant="standard"
          sx={{
            fontSize: { xs: "10px", md: "16px" },
            mx: 1.5,
            "& .MuiInputBase-root": {
              fontSize: { xs: "10px", md: "14px" }, // تغییر سایز متن value
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: "10px", md: "14px" }, // تغییر سایز placeholder
            },
          }}
          value={title} // مقدار از Redux گرفته شده
          onChange={handleNameChange}
        />
      </Box>
    </Paper>
  );
};

export default ExerciseHeader;
