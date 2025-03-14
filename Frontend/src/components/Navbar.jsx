import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div className={"w-[100%] flex justify-center items-center"}>
                <div className={"w-[90%] border"}>
                    <div className={" flex space-x-4"}>
                        <button className={"px-2 py-1 text-white bg-blue-900 rounded rounded-sm flex justify-center items-center"}>
                            <Link to={"/auth/login"}>Login here</Link>
                        </button>
                        <button className={"px-2 py-1 text-white bg-blue-900 rounded rounded-sm flex justify-center items-center"}>
                            <Link to={"/auth/register/user"}>Register as a user</Link>
                        </button>
                        <button className={"px-2 py-1 text-white bg-blue-900 rounded rounded-sm flex justify-center items-center"}>
                            <Link to={"/auth/login"}>Register as an author</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar
