import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    return (
        <section className='h-screen overflow-hidden flex flex-col '>
            <Navbar />
            <div className=' my-auto w-fit mx-auto bg-white p-8 rounded-md'>

                <label htmlFor="" className='block font-medium'>Email</label>
                <input className='bg-gray-100 w-96 p-2 rounded-md focus:outline-primaryColor' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="" className="block font-medium mt-2">Password</label>
                <input type="password" className='bg-gray-100 w-96 p-2 rounded-md block  focus:outline-primaryColor' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='w-full flex justify-center mt-3'>
                    <button className='bg-primaryColor py-2 px-8 text-white rounded-md font-medium'>Register</button>
                </div>
            </div>
        </section>
    )
}

export default Register