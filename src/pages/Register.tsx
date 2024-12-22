import React, { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { app } from "./../../firebase-config"

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [emailValidationError, setEmailValidationError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    // const userRef = collection(db, "users");
    const auth = getAuth(app);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");
        setEmailValidationError("");
        setNameError("");

        if (!name) {
            setNameError("Name is required*");
        }

        if (!email) {
            setEmailError("Email is required*");
        }

        if (!password) {
            setPasswordError("Password is required*");
        }
        if (!email || !password) {
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailValidationError("Invalid Email Address");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: name,
            });

            setEmail("");
            setPassword("");
            setName("");

            toast("User registered successfully");
            setTimeout(() => {
                navigate("/auth/signin");
            }, 2000);
        } catch (error) {
            console.error("Error signing up user:", error);


            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        toast.warning("Email is already in use. Please try another one.", {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                    case "auth/weak-password":
                        toast.warning("Password too weak ", {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                    default:
                        toast("Failed to sign in. Please try again.");
                        break;
                }
            } else {
                toast("An unknown error occurred. Please try again.");
            }
        }
    };
    return (
        <div>
            <Toaster position="top-right" theme="light" />
            <section className="h-screen overflow-hidden flex items-center justify-center flex-col mb-20 ">
                <div className="bg-white p-8 rounded-md lg:min-w-[35%]  md:min-w-[50%] sm:min-w-[70%] xs:min-w-[90%]">
                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="" className="block font-medium">
                            Name
                        </label>
                        <input
                            className="bg-gray-100  w-full p-2 rounded-md block mt-2 focus:outline-primaryColor shadow-sm shadow-inputBoxShadowColor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && (
                            <div className="text-red-400 font-medium">{nameError}</div>
                        )}
                        <label htmlFor="" className="block font-medium pt-4">
                            Email
                        </label>
                        <input
                            className="bg-gray-100 w-full p-2 rounded-md block mt-2 focus:outline-primaryColor shadow-sm shadow-inputBoxShadowColor"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && (
                            <div className="text-red-400 font-medium">{emailError}</div>
                        )}
                        {emailValidationError && (
                            <div className="text-red-400 font-medium">
                                {emailValidationError}
                            </div>
                        )}

                        <label htmlFor="" className="block font-medium mt-4">
                            Password
                        </label>
                        <input
                            type="password"
                            className="bg-gray-100 w-full  p-2 rounded-md block mt-2  focus:outline-primaryColor shadow-sm shadow-inputBoxShadowColor"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <div className="text-red-400 font-medium">{passwordError}</div>
                        )}

                        <div className="w-full flex justify-center mt-5">
                            <button
                                type="submit"
                                className=" bg-gradient-to-r from-primaryColor to-purple-400 py-2 px-8 text-white rounded-md font-medium"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Register;
