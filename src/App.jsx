import { Button } from "@material-tailwind/react";
import ListOfBooks from "./components/ListOfBooks";
import { Routes, Route, Outlet, NavLink, Navigate } from "react-router-dom";
import Form from "./components/Form";

const PageDefault = () => {
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center gap-[20px] ">
        <NavLink className="inline-block" to="/BookList">
          <Button>List Of Books</Button>
        </NavLink>
        <NavLink className="inline-block" to="/addBook">
          <Button>Add Book</Button>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

const app = () => {
  return (
    <div className="min-h-screen w-full py-5">
      <Routes>
        <Route path="/" element={<Navigate to="/BookList" replace />} />
        <Route path="/" element={<PageDefault />}>
          <Route path="addBook" element={<Form />} />
          <Route path="BookList" element={<ListOfBooks />} />
        </Route>
      </Routes>
    </div>
  );
};

export default app;
