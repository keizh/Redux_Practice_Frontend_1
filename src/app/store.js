import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "../features/Book/BookSlice";

const store = configureStore({
  reducer: {
    Book: BookSlice.reducer,
  },
});

export default store;
