import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';

const PaymentSuccess = () => {
    // const sendEmail = async () => {
    //     console.log("Function called");

    //     const templateParams = {
    //         to_email: 'rupeshthapa3965@gmail.com',
    //         subject: 'Your Order Confirmation',
    //         message: 'Thank you for shopping with us!',
    //     };

    //     try {
    //         const response = await emailjs.send(
    //             'service_uzsk1re',
    //             'contact_form',
    //             templateParams,
    //             'YQ72x7L7RItfWMoq5'
    //         );
    //         console.log('Email sent successfully:', response.status, response.text);
    //     } catch (error) {
    //         console.error('Failed to send email:', error);
    //     }
    // };

    // // Run sendEmail only once when the component mounts
    // useEffect(() => {
    //     sendEmail();
    // }, []); 

    return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;
