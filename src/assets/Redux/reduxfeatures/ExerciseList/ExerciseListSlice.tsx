import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "../../../../Type/Type"; // Importing IExercise interface

// Define the structure of rows within exercises
interface ExerciseRow {
  index: number;
  set: number;
  reps?: number;
  minReps?: number;
  maxReps?: number;
  type: "number" | "dropSet" | "warmUp" | "failure"; // Type for the set
}

// Define the structure of exercises including rows
interface Exercise extends IExercise {
  rows: ExerciseRow[];
  type: "single" | "range";
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
        type: "single",
        rows: [
          {
            index: 1,
            set: 1, // Default set value
            reps: 0,
            type: "number"
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
    // Set the type of exercise (single or range)
    setType: (
      state,
      action: PayloadAction<{ exerciseId: string; type: "single" | "range" }>
    ) => {
      const { exerciseId, type } = action.payload;
      const exercise = state.exerciselist.find((ex) => ex._id === exerciseId);

      if (exercise) {
        exercise.type = type;
        // Update all rows based on the new type
        exercise.rows.forEach((row) => {
          if (type === "range") {
            row.minReps = 0;
            row.maxReps = 0;
            delete row.reps; // Remove reps for "range"
          } else {
            row.reps = 0;
            delete row.minReps; // Remove range values for "single"
            delete row.maxReps;
          }
        });
      }
    },

    // Add a new row to an exercise by its index
    addRow: (state, action: PayloadAction<number>) => {
      const exercise = state.exerciselist[action.payload];
      if (exercise) {
        const newRow: ExerciseRow = {
          index: exercise.rows.length + 1, // Next row index
          set: exercise.rows.length + 1,
          type: "number"
        };

        // Based on the exercise type, add specific fields for reps or range
        if (exercise.type === "range") {
          newRow.minReps = 0; // Default minReps value
          newRow.maxReps = 0; // Default maxReps value
        } else {
          newRow.reps = 0; // Default reps value
        }

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

      if (exercise && exercise.type === "single" && exercise.rows[rowIndex]) {
        exercise.rows[rowIndex].reps = reps;
      }
    },

    // Update the range values (minReps, maxReps) for a specific row in a specific exercise (for "range" type)
    updateRange: (
      state,
      action: PayloadAction<{
        exerciseId: string;
        rowIndex: number;
        minReps: number;
        maxReps: number;
      }>
    ) => {
      const { exerciseId, rowIndex, minReps, maxReps } = action.payload;
      const exercise = state.exerciselist.find((ex) => ex._id === exerciseId);

      if (exercise && exercise.type === "range" && exercise.rows[rowIndex]) {
        exercise.rows[rowIndex].minReps = minReps;
        exercise.rows[rowIndex].maxReps = maxReps;
      }
    },
  },
});

export const {
  add,
  remove,
  reorder,
  addRow,
  setType,
  updateReps,
  updateRange,
} = exerciseListSlice.actions;

export default exerciseListSlice.reducer;
