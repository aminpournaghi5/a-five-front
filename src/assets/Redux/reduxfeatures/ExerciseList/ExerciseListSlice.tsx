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
      // When a new exercise is added, we initialize it with a default row
      const newExercise = {
        ...action.payload,
        rows: [
          {
            index: 1,
            set: 1, // Initial set value
            reps: 0, // Initial reps value
          },
        ],
      };
      state.exerciselist.push(newExercise); // Add the new exercise to the list
    },
    remove: (state, action: PayloadAction<number>) => {
      // Remove the specific exercise by its index
      state.exerciselist = state.exerciselist.filter(
        (_exercise, index) => index !== action.payload
      );
    },
    reorder: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedExercise] = state.exerciselist.splice(sourceIndex, 1);
      state.exerciselist.splice(destinationIndex, 0, movedExercise);
    },
    addRow: (state, action: PayloadAction<number>) => {
      // action.payload will be the index of the exercise in the list to which we want to add a new row
      const exercise = state.exerciselist[action.payload];

      if (exercise) {
        const newIndex = exercise.rows.length + 1; // Calculate the new index
        const newRow = {
          index: newIndex,
          set: newIndex, // The set value is equal to the index
          reps: 0, // Initial reps value
        };

        // Add the new row to the 'rows' array
        exercise.rows.push(newRow);
      }
    },
    updateReps: (
      state,
      action: PayloadAction<{
        rowIndex: number;
        reps: number;
      }>
    ) => {
      const { rowIndex, reps } = action.payload;

      // اطمینان حاصل کنید که ردیف مورد نظر وجود دارد
      const exercise = state.exerciselist[0]; // فرض می‌کنیم که فقط یک تمرین وجود دارد یا باید به تمرین مورد نظر دسترسی پیدا کنید

      if (exercise && exercise.rows[rowIndex]) {
        exercise.rows[rowIndex].reps = reps;
      }
    },
  },
});

export const { add, remove, reorder, addRow, updateReps } =
  exerciseListSlice.actions;

export default exerciseListSlice.reducer;
