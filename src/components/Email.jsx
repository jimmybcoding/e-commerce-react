import emailjs from 'emailjs-com';
import { useRef } from 'react';
  
const Email = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2zwbc7b', 'template_yh9r14i', form.current, 'TRW6b4IexpjJSyK4A')
      .then((result) => {
          console.log(result.text);
          alert('Email Sent!');
          window.location.reload();
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="email-form">
      <h1>Contact Us</h1>
      <p>Fill out the form below to shoot us a message!</p>
      <label>{`Name: `}</label>
      <input type="text" name="to_name" />
      <br></br>
      <label>{`Email:  `}</label>
      <input type="email" name="reply_to" />
      <br></br>
      <label>{`Message: `}</label>
      <textarea typeof='text' name='message' defaultValue={"I want to hire you!"} rows={5} cols={20}></textarea>
      <br></br>
      <input type="submit" value="Send" className='primary-btn'/>
    </form>
  );
};

export default Email
