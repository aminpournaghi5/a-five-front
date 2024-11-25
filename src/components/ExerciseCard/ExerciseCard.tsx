import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IExercise } from "../../Type/Type";

interface Props {
  exercise: IExercise;
}

const ExerciseCard: React.FC<Props> = ({ exercise }) => {
  const imagePath = `/Workouts/${exercise.ID}.gif`;

  return (
    <Card
      sx={{
        boxShadow: "none",
        backgroundColor: "white",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: grey[900], // رنگ خاکستری تیره
          opacity: 0, // شفافیت اولیه صفر
          transition: "opacity 0.2s ease", // اضافه کردن ترنزیشن به شفافیت
          zIndex: 1, // قرار دادن این لایه بالاتر از محتوای کارت
        },
        "&:hover::before": {
          opacity: 0.1, // شفافیت هنگام هاور
        },
      }}
    >
      <CardMedia
        sx={{
          width: "100%",
          height: "180px",
          margin: "0 auto",
          py: 1,
          objectFit: "contain",
          zIndex: 0,
        }}
        component="img"
        image={imagePath}
        alt={exercise.NameFarsi}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null; // جلوگیری از حلقه بی‌نهایت
          e.currentTarget.src = "../../../public/noimage.jpg";
        }}
      />

      <CardContent sx={{ py: 1, margin: 0, zIndex: 0 }}>
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "right",
            fontSize: "12px",
          }}
        >
          {exercise.NameFarsi}
        </Typography>

        {/* Display Abzar and Body */}
        <Box display="flex" justifyContent="start" alignItems="center">
          <Typography
            sx={{
              backgroundColor: grey[300],
              borderRadius: "5px",
              fontSize: "10px",
              padding: "5px",
              margin: "5px",
            }}
          >
            {exercise.Abzar}
          </Typography>
          <Typography
            sx={{
              backgroundColor: grey[300],
              borderRadius: "5px",
              fontSize: "10px",
              padding: "5px",
              margin: "5px",
            }}
          >
            {exercise.Body}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
