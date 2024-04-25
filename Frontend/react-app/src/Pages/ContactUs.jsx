import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import './ContactUs.css'


export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_9oaccei', 'template_5ra3pug', form.current, {
        publicKey: 'aRJqOCAhheNC2s_l7',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          Swal.fire({
            title: "Good job!",
            text: "You Email sent sucessfully !",
            icon: "success"
          });
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
    <Header/>
    <div className="back">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="Conbox">
        
        <div class="ContactUs">
            <h1>Contact Us</h1><br></br></div>
            
        <div className="Contact">
          <label htmlFor="name" className="Cname">
            Name
          </label>
          <div className="flex">
            <span className="icon">
              <svg
                className="svgIcon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 
                5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 
                3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              id="name"
              name="from_name"
              className="CboxDesign"
              placeholder="Bonnie Green"
            />
          </div>
        </div>
        <div className="Contact">
          <label htmlFor="email" className="Cemail">
            Email
          </label>
          <div className="flex">
            <span className="icon">
              <svg
                className="svgIcon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 
                0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 
                0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0
                 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </span>
            <input
              type="text"
              id="email"
              name="from_email"
              className="CboxDesign"
              placeholder="name@flowbite.com"
            />
          </div>
        </div>
        <div className="Contact">
          <label htmlFor="message" className="Cmessage">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="CboxDesign1"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <div className="flex items-start Contact">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="checkbox"
            required
          />
          <label htmlFor="terms" className="Cterms">
            I agree with the{' '}
            <a href="#" className="Ctrems2">
              terms and conditions
            </a>
          </label>
        </div>
        <input
          type="submit"
          value="Send"
          className="Conbutton"
        />
      </form>
    </div>
    </>
  );
};

export default ContactUs;
