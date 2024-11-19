import React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";


const SkeletonExerciseCard: React.FC = () => {
  return (
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
      <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
      <CardContent>
        <Skeleton width="60%" animation="wave" />
        <Box display="flex" justifyContent="start" alignItems="center">
          <Skeleton variant="rectangular" width={50} height={20} animation="wave" sx={{ margin: "5px" }} />
          <Skeleton variant="rectangular" width={50} height={20} animation="wave" sx={{ margin: "5px" }} />
        </Box>
        <Box display="flex" justifyContent="end" alignItems="center">
          <Skeleton width={40} height={40} animation="wave" variant="circular" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkeletonExerciseCard;
