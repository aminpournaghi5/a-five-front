// ExerciseCardButtons.tsx
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { IExercise } from "../../Type/Type";

interface Props {
  exercise: IExercise;
  isInList: boolean;
  onAdd: (exercise: IExercise) => void;
}

const ExerciseCardButtons: React.FC<Props> = ({ exercise, isInList, onAdd }) => {
  return (
    <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
      {/* Favorite Button (This is a placeholder) */}
      <Tooltip title={"افزودن به علاقه‌مندی‌ها"}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </Tooltip>

      {/* Add to List Button */}
      <Tooltip title={"افزودن به لیست برنامه تمرینی"}>
        <IconButton
          aria-label="add to list"
          onClick={() => onAdd(exercise)}
          color={isInList ? "secondary" : "default"} // Change color if already in the list
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ExerciseCardButtons;
