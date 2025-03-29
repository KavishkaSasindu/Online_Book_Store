import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/auth/LogIn.jsx";
import Home from "./pages/Home.jsx";
import RegisterUser from "./pages/auth/RegisterUser.jsx";
import RegisterAuthor from "./pages/auth/RegisterAuthor.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import RegisterAbout from "./pages/RegisterAbout.jsx";
import AllBooks from "./pages/AllBooks.jsx";
import CreateBook from "./pages/author/CreateBook.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";
import UpdateUserProfile from "./pages/user/UpdateUserProfile.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import About from "./pages/About.jsx";
import Authors from "./pages/user/Authors.jsx";
import Wishlist from "./pages/user/Wishlist.jsx";
import AuthorViewBooks from "./pages/user/AuthorViewBooks.jsx";
import ManageBooks from "./pages/author/ManageBooks.jsx";
import BookUpdate from "./pages/author/BookUpdate.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* public routes */}
          <Route path={"/"} element={<Home />} />
          <Route path={"/all-books"} element={<AllBooks />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/authors"} element={<Authors />} />
          <Route
            path={"/authors/view-book/:id"}
            element={<AuthorViewBooks />}
          />

          {/* authentication routes */}
          <Route path={"/auth/login"} element={<LogIn />} />
          <Route path={"/auth/register-about"} element={<RegisterAbout />} />
          <Route path={"/auth/register/user"} element={<RegisterUser />} />
          <Route path={"/auth/register/author"} element={<RegisterAuthor />} />

          {/* user routes */}
          <Route path={"/user/user-profile/:id"} element={<UserProfile />} />
          <Route path={"/user/user-wishlist/:id"} element={<Wishlist />} />
          <Route
            path={"/user/update-profile/:id"}
            element={<UpdateUserProfile />}
          />

          {/* author routes */}
          <Route path="/author/add-book/:id" element={<CreateBook />} />
          <Route path="/author/my-books/:id" element={<ManageBooks />} />
          <Route path="/author/update-book/:id" element={<BookUpdate />} />

          {/* admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/users" element={<AdminUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
