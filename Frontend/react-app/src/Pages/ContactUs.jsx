import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import "./ContactUs.css"


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
    <div className='background'>
      <form
        ref={form}
        onSubmit={sendEmail}>
          
      <div className='box'>
        <div class="ContactUs">
            <h1>Contact Us</h1><br></br></div>

        <div className='ContactName'>
          <label htmlFor="name">
          First Name :
          </label>
          <div>
            <input
              type="text"
              id="name"
              name="from_name"
              
              placeholder="Bonnie Green"/>

          </div>
        </div><br></br>

        <div className='ContactEmail' >
          <label htmlFor="email" >
          Email :
          </label>
          <div>
            <input
              type="text"
              id="email"
              name="from_email"
              
              placeholder="name@flowbite.com"
            />
          </div>
          <br></br></div>


        <div className='ContactMessage' >
          <label htmlFor="message" >
            Message :
          </label>

          <div>
          <textarea
            id="message"
            name="message"
            rows="2"
            
            placeholder="Leave a comment..."
          ></textarea></div>
        </div><br></br>

        <div className='ConCheckBox'>
          <input
            id="terms"
            type="checkbox"
            value=""
            
            required
          />
          <label htmlFor="terms" >
            I agree with the{' '}
            <a href="#" >
              terms and conditions
            </a>
          </label>
        </div><br></br>

        <div className='Conbutton'>
        <input
          type="submit"
          value="Send"
        /></div><br></br>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
