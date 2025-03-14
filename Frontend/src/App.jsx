import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LogIn from "./pages/auth/LogIn.jsx";
import Home from "./pages/Home.jsx";
import RegisterUser from "./pages/auth/RegisterUser.jsx";
import RegisterAuthor from "./pages/auth/RegisterAuthor.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/auth/login"} element={<LogIn/>}/>
                    <Route path={"/auth/register/user"} element={<RegisterUser/>}/>
                    <Route path={"/auth/register/author"} element={<RegisterAuthor/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App
