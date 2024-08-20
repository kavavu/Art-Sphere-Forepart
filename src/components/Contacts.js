import React, { useState } from 'react';
import './Contacts.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
            setFormData({ name: '', email: '', message: '' }); // Clear form data
        }, 3000); // Hide popup after 3 seconds
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Us</h1>
            </div>
            <div className="contact-content">
                <div className="contact-info">
                    <h2>Our Office</h2>
                    <p>Nairobi CBD, ART 12345</p>
                    <p>Email: contact@artgallery.com</p>
                    <p>Phone: +254 (723) 456-7890</p>
                </div>
                <div className="contact-form">
                    <h2>Get in Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
            {showPopup && <div className="popup">Message sent successfully!</div>}
        </div>
    );
};

export default Contact;