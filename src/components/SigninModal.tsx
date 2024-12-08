"use client";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "sonner";


interface SigninModalProps {
    modal: boolean
    setModal: Dispatch<SetStateAction<boolean>>;
}

const SigninModal: React.FC<SigninModalProps> = ({ modal, setModal }) => {
    const auth = getAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: HTMLFormElement) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get the JWT token
            const token = await user.getIdToken();

            console.log("JWT Token:", token);

            toast("Signed in successfully");
            // Save the token in localStorage or use it as needed
            localStorage.setItem("token", token);
        } catch (error) {
            console.error("Error signing in user:", error);
            toast("Failed to sign in");
        }

    }


    return (
        <div className={` ${modal ? 'fixed flex justify-center inset-0 bg-neutral-400/70 opacity-100 z-50 items-center' : 'opacity-0 h-0 overflow-y-hidden'}`}>
            <div className={`transition-all duration-500 ease-in-out  ${modal ? 'bg-white h-fit p-6 rounded-md shadow-md  relative ' : 'hidden'}`}
            // ref={modalRef}
            >
                <button
                    className="absolute top-2 right-3 "
                    onClick={() => setModal(false)}
                >
                    <LiaTimesSolid size={18} />
                </button>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className="block font-medium">
                        Email
                    </label>
                    <input
                        className="bg-gray-100 w-96 p-2 rounded-md block mt-2 focus:outline-primaryColor shadow-sm shadow-inputBoxShadowColor"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* {emailError && (
                        <div className="text-red-400 font-medium">{emailError}</div>
                    )}
                    {emailValidationError && (
                        <div className="text-red-400 font-medium">
                            {emailValidationError}
                        </div>
                    )} */}

                    <label htmlFor="" className="block font-medium mt-4">
                        Password
                    </label>
                    <input
                        type="password"
                        className="bg-gray-100 w-96 p-2 rounded-md block mt-2  focus:outline-primaryColor shadow-sm shadow-inputBoxShadowColor"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* {passwordError && (
                        <div className="text-red-400 font-medium">{passwordError}</div>
                    )} */}

                    <div className="w-full flex justify-center mt-5">
                        <button
                            type="submit"
                            className=" bg-gradient-to-r from-primaryColor to-purple-400 py-2 px-8 text-white rounded-md font-medium"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default SigninModal;
