import React from 'react'
import {motion} from "framer-motion";

const LogIn = () => {
    return (
        <div className={"w-[100%]"}>
            <div className={"flex justify-center items-center mt-10"}>
                {/*form section*/}
                <div className={"w-[50%] h-full flex justify-center items-center"}>
                    <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email" type="email" placeholder="jane@gmail.com"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="password" type="password" placeholder="******************"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className={"w-full px-3"}>
                                <input
                                    className="appearance-none block w-full bg-blue-100 hover:bg-blue-300 after:bg-blue-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="submit-button" value={"Sign in"} type="submit" />
                            </div>
                        </div>
                    </form>
                </div>

                {/*image section*/}

                    <motion.div className={"w-[50%] h-full flex justify-center items-center"}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{type: 'spring', stiffness: 50, damping: 25}}
                    >
                        <img src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg"
                             alt="vector-image"/>
                    </motion.div>

            </div>
        </div>
    )
}
export default LogIn
