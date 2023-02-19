import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./features/coursesSlice";

export default configureStore({
  reducer: {
    courses: coursesSlice,
  },
});
