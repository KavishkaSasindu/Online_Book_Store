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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/all-books"} element={<AllBooks />} />
          <Route path={"/auth/login"} element={<LogIn />} />
          <Route path={"/auth/register-about"} element={<RegisterAbout />} />
          <Route path={"/auth/register/user"} element={<RegisterUser />} />
          <Route path={"/auth/register/author"} element={<RegisterAuthor />} />
          <Route path={"/user/user-profile/:id"} element={<UserProfile />} />
          <Route
            path={"/user/update-profile/:id"}
            element={<UpdateUserProfile />}
          />

          {/* author routes */}
          <Route path="/author/add-book" element={<CreateBook />} />

          {/* admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/users" element={<AdminUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
