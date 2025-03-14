import React, {useState} from 'react'
import axios from "axios";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

const RegisterUser = () => {

    const navigate = useNavigate();

    const [userData,setUserData] = useState({
        firstname : "",
        lastname : "",
        email : "",
        phone:"",
        password : "",
        rePassword : "",
        street:"",
        city:"",
        state:"",
        zip:"",
        country:"",
    });

    const [image,setImage] = useState(null);

    const changeState = (e)=>{
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }

    const changeImage = (e)=>{
        const image = e.target.files[0];
        setImage(image);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{

            if(userData.password !== userData.rePassword ){
                console.log("password mismatch")
            }

            const user = {
                firstname : userData.firstname,
                lastname : userData.lastname,
                email : userData.email,
                password : userData.password,
                phone : userData.phone,
                address : {
                    street:userData.street,
                    city:userData.city,
                    state:userData.state,
                    zip:userData.zip,
                    country:userData.country,
                }
            }

            console.log(user);

            const formData = new FormData();
            formData.append(
                "user",
                new Blob([JSON.stringify(user)], {type: "application/json"})
            );
            formData.append("image",image);

            const response = await axios.post("http://localhost:8080/auth/user-register",formData);
            console.log(response.data);
            if(response.status === 201){
                navigate("/auth/login")
            }

        }catch (error){
            console.log(error.message)
        }
    }

    return (
        <div className={"w-[100%]"}>
            <div className={"flex justify-center items-center h-screen"}>
                <motion.div className={"w-[50%] h-full flex justify-center items-center"}
                            initial={{ opacity: 0 }}
                            animate={{opacity:1}}
                            transition={{ type: 'spring', stiffness: 50, damping: 25 }}
                >
                    <img src="https://img.freepik.com/premium-vector/customer-support-concepts_662093-1854.jpg?semt=ais_hybrid" alt="vector-image"/>
                </motion.div>
                <motion.div
                    className={"w-[50%] h-full flex justify-center items-center"}>
                    <form className="w-full h-full mt-6 max-w-lg " onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="firtsname">
                                    First Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="firstname" onChange={changeState} name={"firstname"} type="text" placeholder="Jane"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="lastname">
                                    Last Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="lastname" onChange={changeState} name={"lastname"} type="text" placeholder="Doe"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email" onChange={changeState} name={"email"} type="email" placeholder="jane@gmail.com"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="phone" onChange={changeState} name={"phone"} type="text" placeholder="112-897-189"/>
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
                                    id="password" onChange={changeState} name={"password"} type="password" placeholder="******************"/>
                                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="rePassword">
                                    Re-Password
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="rePassword" name={"rePassword"} onChange={changeState} type="password" placeholder="******************"/>
                                <p className="text-gray-600 text-xs italic">Make it matches with above password</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="street">
                                    Street
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="street" name={"street"} onChange={changeState} type="text" placeholder="backer street"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="city">
                                    City
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="city" name={"city"} onChange={changeState} type="text" placeholder="Albuquerque"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="state">
                                    State
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="state" name={"state"} onChange={changeState} type="text" placeholder="state"/>
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="zip">
                                    Zip
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="zip" name={"zip"} onChange={changeState} type="text" placeholder="115500"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="country">
                                    Country
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="country" name={"country"} onChange={changeState} type="text" placeholder="USA"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                                       htmlFor="image">
                                    Profile Image
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="image" onChange={changeImage} name={"image"} type="file" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                                <div className={"w-full px-3"}>
                                    <input
                                        className="appearance-none block w-full bg-blue-100 hover:bg-blue-300 after:bg-blue-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="submit-button" value={"Register Me"} type="submit" />
                                </div>
                        </div>

                    </form>
                </motion.div>
            </div>
        </div>
    )
}
export default RegisterUser
