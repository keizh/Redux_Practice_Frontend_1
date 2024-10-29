/* eslint-disable no-unused-vars */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBooks } from "../features/Book/BookSlice";
import { ListItem } from "@material-tailwind/react";
import { deleteBook } from "../features/Book/BookSlice";
const ListOfBooks = () => {
  const dispatch = useDispatch();
  const { error, status, Books } = useSelector((state) => state.Book);
  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className="max-w-lg mx-auto py-[50px]">
      {Books.length == 0 && status == "loading" && <p>Loading</p>}
      {Books.length == 0 && status != "loading" && <p>NO BOOKS</p>}
      {status == "error" && <p>Error occured while fetching books</p>}
      {Books.length > 0 && (
        <div className="">
          {Books.map((book) => (
            <Card key={book._id} className="mb-[20px]">
              <CardBody>
                <ListItem>
                  <span className="font-black">Book Name :</span>{" "}
                  {book.bookName}
                </ListItem>
                <ListItem>
                  <span className="font-black">Book Author :</span>
                  {book.bookAuthor}
                </ListItem>
                <ListItem>
                  <span className="font-black">Book genre :</span>{" "}
                  {book.bookGenre}
                </ListItem>

                <Button
                  color="red"
                  onClick={() => dispatch(deleteBook(book._id))}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfBooks;
