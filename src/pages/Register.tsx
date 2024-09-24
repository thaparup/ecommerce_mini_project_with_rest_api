import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { db } from './../../firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { toast } from "sonner"
import { Toaster } from "../components/ui/sonner"





const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')
    const [emailValidationError, setEmailValidationError] = useState<string>('')


    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    const data = collection(db, "users")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) {
            setEmailError('Email is required*')
        }

        if (!password) {
            setPasswordError("Password is required*")
        }
        if (!emailRegex.test(email)) {

            if (email) {

                setEmailValidationError("The email address is not valid!")
            }
        }

        // if (!email || !password || !emailValidationError) {

        //     return;
        // }

        else {

            try {


                await addDoc(data, { email: email, password: password })
                toast("Users registered successfully")

            } catch (error) {
                console.error("Error adding document:", error);
                toast('Failed to register user')
            }
        }

    }
    return (
        <div>
            <Toaster />
            <section className='h-screen overflow-hidden flex flex-col '>
                <Navbar />
                <div className=' my-auto w-fit mx-auto bg-white p-8 rounded-md'>

                    <form action="" onSubmit={handleSubmit}>
                        <label htmlFor="" className='block font-medium'>Email</label>
                        <input className='bg-gray-100 w-96 p-2 rounded-md block mt-2 focus:outline-primaryColor shadow-md shadow-inputBoxShadowColor                                                                    ' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailValidationError && (<div className='text-red-400 font-medium'>{emailValidationError}</div>)}
                        {emailError && (<div className='text-red-400 font-medium'>{emailError}</div>)}
                        <label htmlFor="" className="block font-medium mt-4">Password</label>
                        <input type="password" className='bg-gray-100 w-96 p-2 rounded-md block mt-2  focus:outline-primaryColor shadow-md shadow-inputBoxShadowColor' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && (<div className='text-red-400 font-medium'>{passwordError}</div>)}

                        <div className='w-full flex justify-center mt-5'>
                            <button type='submit' className=' bg-gradient-to-r from-primaryColor to-purple-400 py-2 px-8 text-white rounded-md font-medium' >Register</button>
                        </div>
                    </form>
                </div >
            </section >
        </div>
    )
}

export default Register