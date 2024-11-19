import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "../../../../Type/Type"; // Importing IExercise interface

interface ExerciseListState {
  exerciselist: IExercise[]; // Array of exercises
}

const initialState: ExerciseListState = {
  exerciselist: [],
};

export const exerciseListSlice = createSlice({
  name: "exerciseList",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IExercise>) => {
      // Add the exercise (can be added multiple times)
      state.exerciselist.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      // Remove the specific exercise by its index
      state.exerciselist = state.exerciselist.filter(
        (_exercise, index) => index !== action.payload
      );
    },
    reorder: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedExercise] = state.exerciselist.splice(sourceIndex, 1);
      state.exerciselist.splice(destinationIndex, 0, movedExercise);
    },
    updateSetsReps: (state, action: PayloadAction<{ index: number; value: string | number }>) => {
      const { index, value } = action.payload;
      if (state.exerciselist[index]) {
        state.exerciselist[index].setsReps = value; // Update sets and reps for the specific exercise
      }
    },
  },
});

export const { add, remove, reorder, updateSetsReps } = exerciseListSlice.actions;

export default exerciseListSlice.reducer;
