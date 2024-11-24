import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "../../../../Type/Type"; // Importing IExercise interface

// Define the structure of rows within exercises
interface ExerciseRow {
  index: number;
  set: number;
  reps: number;
}

// Define the structure of exercises including rows
interface Exercise extends IExercise {
  rows: ExerciseRow[];
}

// State structure
interface ExerciseListState {
  exerciselist: Exercise[]; // Array of exercises with rows
}

// Initial state
const initialState: ExerciseListState = {
  exerciselist: [],
};

// Slice definition
export const exerciseListSlice = createSlice({
  name: "exerciseList",
  initialState,
  reducers: {
    // Add a new exercise with an initial row
    add: (state, action: PayloadAction<IExercise>) => {
      const newExercise: Exercise = {
        ...action.payload,
        rows: [
          {
            index: 1,
            set: 1, // Default set value
            reps: 0, // Default reps value
          },
        ],
      };
      state.exerciselist.push(newExercise);
    },

    // Remove an exercise by its index
    remove: (state, action: PayloadAction<number>) => {
      state.exerciselist = state.exerciselist.filter(
        (_exercise, index) => index !== action.payload
      );
    },

    // Reorder exercises
    reorder: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedExercise] = state.exerciselist.splice(sourceIndex, 1);
      state.exerciselist.splice(destinationIndex, 0, movedExercise);
    },

    // Add a new row to an exercise by its index
    addRow: (state, action: PayloadAction<number>) => {
      const exercise = state.exerciselist[action.payload];
      if (exercise) {
        const newRow: ExerciseRow = {
          index: exercise.rows.length + 1, // Next row index
          set: exercise.rows.length + 1, // Default set value
          reps: 0, // Default reps value
        };
        exercise.rows.push(newRow);
      }
    },

    // Update the reps of a specific row in a specific exercise
    updateReps: (
      state,
      action: PayloadAction<{
        exerciseId: string;
        rowIndex: number;
        reps: number;
      }>
    ) => {
      const { exerciseId, rowIndex, reps } = action.payload;
      const exercise = state.exerciselist.find((ex) => ex._id === exerciseId);

      if (exercise && exercise.rows[rowIndex]) {
        exercise.rows[rowIndex].reps = reps;
      } else {
        console.warn("Exercise or row not found", { exerciseId, rowIndex });
      }
    },
  },
});

// Exporting actions and reducer
export const { add, remove, reorder, addRow, updateReps } =
  exerciseListSlice.actions;

export default exerciseListSlice.reducer;
