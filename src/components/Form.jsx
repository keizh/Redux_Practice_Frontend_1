import { z } from "zod";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addBook } from "../features/Book/BookSlice";
import React from "react";

const bookDATA = z.object({
  bookName: z.string(),
  bookAuthor: z.string(),
  bookGenre: z.string(),
});

export default function Form() {
  const dispatch = useDispatch();
  const initialData = {
    bookName: "",
    bookAuthor: "",
    bookGenre: "",
  };
  const [book, setBook] = React.useState(initialData);
  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addBook(book));
    const zod = bookDATA.safeParse(book);
    if (zod.success === true) {
      console.log(book);
      setBook(initialData);
    }
  };

  const change = (e) => {
    const { value, name } = e.target;
    setBook((book) => ({ ...book, [name]: value }));
  };

  return (
    <Card className="p-5 w-fit mt-5 mx-auto" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Book Details
      </Typography>
      <form
        onSubmit={SubmitHandler}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Input
            value={book.bookName}
            onChange={change}
            name="bookName"
            required
            variant="outlined"
            size="lg"
            label="Book Name"
          />
          <Input
            value={book.bookAuthor}
            onChange={change}
            name="bookAuthor"
            required
            variant="outlined"
            size="lg"
            label="Book Author"
          />
          <Input
            value={book.bookGenre}
            onChange={change}
            name="bookGenre"
            required
            variant="outlined"
            size="lg"
            label="Book Genre"
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Add Book
        </Button>
      </form>
    </Card>
  );
}
