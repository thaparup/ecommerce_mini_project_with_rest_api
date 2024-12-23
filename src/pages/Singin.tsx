import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { login } from "../states/store/slices/AuthSlice";
import { app } from "../../firebase-config";
import { FirebaseError } from "firebase/app";
import { useIsTokenExpired } from "../hooks/useIsTokenExpired";

const Signin: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isTokenExpired = useIsTokenExpired();
    const nav = useNavigate();

    useEffect(() => {
        if (!isTokenExpired && !email) {
            nav("/");
        }
    }, [isTokenExpired, email, nav]);
    const auth = getAuth(app);
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const dispatch = useDispatch();

    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email is missing");
            return;
        }
        if (!password) {
            setPasswordError("Password is missing");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            const token = await user.getIdToken();
            dispatch(
                login({ token, email: user.email || "", name: user.displayName || "" })
            );

            if (token) {
                toast("Signed in successfully", {
                    style: { color: "#06b6d4" },
                    duration: 2000,
                    position: "top-right",
                });
                setTimeout(() => {
                    nav("/");
                }, 3000);
            }
        } catch (error) {
            console.error("Error signing in user:", error);

            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/invalid-credential":
                        toast.warning(`Password or Email doesn't match`, {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                    case "auth/user-not-found":
                        toast.warning("No user found with this email", {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                    case "auth/wrong-password":
                        toast.warning("Incorrect password", {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                    case "auth/invalid-email":
                        toast.warning("Invalid email format", {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                    case "auth/too-many-requests":
                        toast.warning("Too many failed attempts. Please try again later.", {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                    default:
                        toast.warning("Failed to sign in. Please try again.", {
                            style: { color: "red" },
                            duration: 2000,
                            position: "top-right",
                        });
                        break;
                }
            }
        }
    };

    return (
        <div className={`h-screen flex justify-center items-center`}>
            <Toaster />
            <div
                className={`bg-white px-14 py-8 rounded-md shadow-md mb-10 xl:min-w-[35%] lg:min-w-[45%] md:min-w-[50%] sm:min-w-[70%] xs:min-w-[85%]`}
            >
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className="block font-medium">
                        Email
                    </label>
                    <input
                        className="bg-gray-100 w-full 6 p-2 rounded-md block mt-2 focus:outline-primaryColor shadow-sm shadow-inputBoxShadowColor"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <div className="text-red-400 font-medium">{emailError}</div>
                    )}

                    <label htmlFor="" className="block font-medium mt-4">
                        Password
                    </label>
                    <input
                        type="password"
                        className="bg-gray-100 w-full p-2 rounded-md block mt-2 focus:outline-primaryColor shadow-sm shadow-inputBoxShadowColor"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <div className="text-red-400 font-medium">{passwordError}</div>
                    )}

                    <div className="w-full flex justify-center mt-5">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-primaryColor to-purple-400 py-2 px-8 text-white rounded-md font-medium"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
