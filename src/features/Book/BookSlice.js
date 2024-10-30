/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "GET/fetchBooks",
  async (random = true, { dispatch }) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/book/fetchBook`,
      {
        method: "GET",
      }
    );
    const resData = await response.json();
    console.log(resData.booksFetched);
    return resData.booksFetched;
  }
);

export const deleteBook = createAsyncThunk(
  "DELETE/book",
  async (id, { dispatch }) => {
    const response = await fetch(`http://localhost:5500/api/v1/book/${id}`, {
      method: "DELETE",
    });
    const dataRes = await response.json();
    dispatch(deleteBookSYNC(id));
    return dataRes;
  }
);

export const addBook = createAsyncThunk(
  "POST/addBook",
  async (data, { dispatch }) => {
    const response = await fetch(`http://localhost:5500/api/v1/book/addBook`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRes = await response.json();
    console.log(`done`, dataRes);
    return dataRes.newBookSaved;
  }
);

export const updateBook = createAsyncThunk(
  "POST/updateBook",
  async (data, { dispatch }) => {
    const response = await fetch(`http://localhost:5500/api/v1/book/update`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRes = await response.json();
    dispatch(updateBookSYNC(data));
    console.log(`done`, dataRes);
    return dataRes.newBookSaved;
  }
);

export const BookSlice = createSlice({
  name: "BookSlice",
  initialState: {
    Books: [],
    status: "idle", // "loading" , "successfull" , "failed"
    error: null,
  },
  reducers: {
    deleteBookSYNC: (state, action) => {
      console.log(`action`, action);
      console.log(`state`, state.Books);
      state.Books = state.Books.filter((ele) => ele._id != action.payload);
    },
    updateBookSYNC: (state, action) => {
      state.Books = state.Books.map((book) =>
        book._id == action.payload._id ? action.payload : book
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "successfull";
        state.Books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(deleteBook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = "successfull";
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(addBook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = "successfull";
        state.Books = [...state.Books, action.payload];
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });

    builder
      .addCase(updateBook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.status = "successfull";
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      });
  },
});
export const { deleteBookSYNC, updateBookSYNC } = BookSlice.actions;
export default BookSlice;
