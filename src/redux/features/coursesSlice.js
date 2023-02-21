import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API";

export const getFiltredCourses = createAsyncThunk(
  "courses/getFiltredCourses",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.get(`courses/search/${data.search_query}`);
      return { result: response.data.result, display: data.display };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`courses/getById/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    choices: [],
    selectedCourse: null,
    // error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getFiltredCourses.pending]: (state, action) => {
      const display = action.meta.arg.display;
      display ? (state.loading = false) : (state.loading = true);
    },
    [getFiltredCourses.fulfilled]: (state, action) => {
      const { result, display } = action.payload;
      state.loading = false;
      state.selectedCourse = null;
      display ? (state.choices = result.slice(0, 4)) : (state.courses = result);
    },
    [getFiltredCourses.rejected]: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    },
    [getCourseById.pending]: (state, action) => {
      state.loading = true;
    },
    [getCourseById.fulfilled]: (state, action) => {
      state.loading = false;
      state.selectedCourse = action.payload;
    },
    [getCourseById.rejected]: (state, action) => {
      state.selectedCourse = null;
      state.loading = false;
      // state.error = action.payload.message;
    },
  },
});

export default coursesSlice.reducer;
