import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExercise } from "../../../../Type/Type"; // Importing IExercise interface
function getRandomHexColor() {
  // تولید مقادیر تصادفی برای هر کانال رنگ که کمتر از 200 باشند
  const r = Math.floor(Math.random() * 200)
    .toString(16)
    .padStart(2, "0"); // قرمز
  const g = Math.floor(Math.random() * 200)
    .toString(16)
    .padStart(2, "0"); // سبز
  const b = Math.floor(Math.random() * 200)
    .toString(16)
    .padStart(2, "0"); // آبی

  // بازگرداندن رشته به فرمت هگزادسیمال
  return `#${r}${g}${b}`;
}

// Define the structure of rows within exercises
interface ExerciseRow {
  index: number;
  set: number | string;
  reps?: number;
  minReps?: number;
  maxReps?: number;
}

// Define the structure of exercises including rows
interface Exercise extends IExercise {
  index: number;
  rows: ExerciseRow[];
  repType: "single" | "range";
  superSetId: string | null;
}

// State structure
interface ExerciseListState {
  title: string;
  date: string;
  exerciselist: Exercise[]; // Array of exercises with rows
}

// Initial state
const initialState: ExerciseListState = {
  exerciselist: [],
  title: "تمرین جدید",
  date: new Date().toISOString(), // تبدیل تاریخ به رشته ISO
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
        index: state.exerciselist.length + 1,
        repType: "single",
        superSetId: null,
        rows: [
          {
            index: 1,
            set: 1, // Default set value
            reps: 0,
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
    setRepType: (
      state,
      action: PayloadAction<{ exerciseId: number; type: "single" | "range" }>
    ) => {
      const { exerciseId, type } = action.payload;
      const exercise = state.exerciselist.find((ex) => ex.index === exerciseId);

      if (exercise) {
        exercise.repType = type;
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

    setSetType: (
      state,
      action: PayloadAction<{
        exerciseId: number;
        rowIndex: number;
        setType: "number" | "دراپ ست" | "گرم کردن" | "تا واماندگی";
      }>
    ) => {
      const { exerciseId, rowIndex, setType } = action.payload; // استخراج مقادیر اکشن
      const exercise = state.exerciselist.find((ex) => ex.index === exerciseId);

      if (exercise && exercise.rows[rowIndex]) {
        // بررسی وجود تمرین و ردیف مورد نظر
        if (setType === "number") {
          // اگر setType برابر "number" بود
          exercise.rows[rowIndex].set = rowIndex + 1;
        } else {
          // در غیر این صورت مقدار خود setType تنظیم شود
          exercise.rows[rowIndex].set = setType;
        }
      }
    },

    // Add a new row to an exercise by its index
    addRow: (state, action: PayloadAction<number>) => {
      const exercise = state.exerciselist[action.payload];
      if (exercise) {
        const newRow: ExerciseRow = {
          index: exercise.rows.length + 1, // Next row index
          set: exercise.rows.length + 1,
        };

        // Based on the exercise type, add specific fields for reps or range
        if (exercise.repType === "range") {
          newRow.minReps = 0; // Default minReps value
          newRow.maxReps = 0; // Default maxReps value
        } else {
          newRow.reps = 0; // Default reps value
        }

        exercise.rows.push(newRow);
      }
    },
    removeRow: (
      state,
      action: PayloadAction<{ exerciseId: number; rowIndex: number }>
    ) => {
      const { exerciseId, rowIndex } = action.payload;
      const exercise = state.exerciselist.find((ex) => ex.index === exerciseId);

      if (exercise && exercise.rows[rowIndex]) {
        // حذف ردیف از آرایه rows با استفاده از slice
        exercise.rows = [
          ...exercise.rows.slice(0, rowIndex), // تمام آیتم‌ها قبل از rowIndex
          ...exercise.rows.slice(rowIndex + 1), // تمام آیتم‌ها بعد از rowIndex
        ];
      }
    },

    // Update the reps of a specific row in a specific exercise
    updateReps: (
      state,
      action: PayloadAction<{
        exerciseId: number;
        rowIndex: number;
        reps: number;
      }>
    ) => {
      const { exerciseId, rowIndex, reps } = action.payload;
      const exercise = state.exerciselist.find((ex) => ex.index === exerciseId);

      if (
        exercise &&
        exercise.repType === "single" &&
        exercise.rows[rowIndex]
      ) {
        exercise.rows[rowIndex].reps = reps;
      }
    },

    // Update the range values (minReps, maxReps) for a specific row in a specific exercise (for "range" type)
    updateRange: (
      state,
      action: PayloadAction<{
        exerciseId: number;
        rowIndex: number;
        minReps: number;
        maxReps: number;
      }>
    ) => {
      const { exerciseId, rowIndex, minReps, maxReps } = action.payload;
      const exercise = state.exerciselist.find((ex) => ex.index === exerciseId);

      if (exercise && exercise.repType === "range" && exercise.rows[rowIndex]) {
        exercise.rows[rowIndex].minReps = minReps;
        exercise.rows[rowIndex].maxReps = maxReps;
      }
      ``;
    },
    addSuperSet: (
      state,
      action: PayloadAction<{
        firstExerciseId: number;
        secondExerciseId: number;
      }>
    ) => {
      const { firstExerciseId, secondExerciseId } = action.payload;
      const superSetId = getRandomHexColor();

      state.exerciselist = state.exerciselist.map((exercise) => {
        if (
          exercise.index === firstExerciseId ||
          exercise.index === secondExerciseId
        ) {
          return { ...exercise, superSetId }; // اختصاص سوپرست به تمرین‌ها
        }
        return exercise;
      });
    },
    removeSuperSet: (state, action: PayloadAction<string | null>) => {
      const superSetId = action.payload;

      state.exerciselist = state.exerciselist.map((exercise) => {
        if (exercise.superSetId === superSetId) {
          return { ...exercise, superSetId: null }; // حذف ارتباط سوپرست
        }
        return exercise;
      });
    },
    // Set the title of the exercise list
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const {
  add,
  remove,
  reorder,
  addRow,
  removeRow,
  setSetType,
  setRepType,
  updateReps,
  updateRange,
  addSuperSet,
  removeSuperSet,
  setTitle,
} = exerciseListSlice.actions;

export default exerciseListSlice.reducer;
