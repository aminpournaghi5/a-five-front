// store.ts
import { configureStore } from "@reduxjs/toolkit";
import exerciseListReducer from "./reduxfeatures/ExerciseList/ExerciseListSlice";
import authReducer from "./reduxfeatures/ExerciseList/AuthSlice";

// Create the store
const store = configureStore({
  reducer: {
    exerciseList: exerciseListReducer,
    auth: authReducer, // تعریف auth در store
  },
});

// Log changes to exerciseList, personalInfo, and auth in the console
store.subscribe(() => {
  const state = store.getState();
  console.log("exerciseList:", state.exerciseList);
});

// Define RootState type from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export the store
export default store;
