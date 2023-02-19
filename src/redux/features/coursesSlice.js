import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../API";

export const getFiltredCourses = createAsyncThunk(
  "courses/getFiltredCourses",
  async (search_query, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `courses/search/${search_query}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `courses/getById/${id}`
      );
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
    selectedCourse: {},
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getFiltredCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [getFiltredCourses.fulfilled]: (state, action) => {
      state.loading = false;
      state.courses = action.payload.result;
    },
    [getFiltredCourses.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCourseById.pending]: (state, action) => {
      state.loading = true;
    },
    [getCourseById.fulfilled]: (state, action) => {
      state.loading = false;
      state.selectedCourse = action.payload;
    },
    [getCourseById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});


export default coursesSlice.reducer;
