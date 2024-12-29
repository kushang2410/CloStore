import React from 'react';
import './style.css';

const ContactUs = () => {
    return (
        <div className="container mt-8">
            <div className="row justify-content-center">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.4170951269!2d72.73989571146552!3d21.15934029803688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1731591338541!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" className='my-5'
                ></iframe>
                <div className="col-10">
                    <h2 className="page-title my-5">GET IN TOUCH</h2>
                    <form className='lh-xxl'>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control p-3" id="name" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control p-3" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" className="form-control p-3" id="subject" placeholder="Enter the subject" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control p-3" id="message" rows="5" placeholder="Enter your message" required></textarea>
                        </div>
                        <button type="submit" className="custom-btn wdt-button-3 fs-6 px-5 rounded-2 my-5">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;