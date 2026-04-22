"use client";

import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await axios.post('/api/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setCharCount(0);
    } catch (err) {
      setError(err.response?.data?.error || 'Sorry, something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="my-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <h1 className="section-title mb-5">Contact Me</h1>
        
        <div className="contact-form-wrapper" style={{ maxWidth: '700px', margin: '0 auto' }}>
          {success && (
            <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
              <i className="pi pi-check-circle" style={{ marginRight: '8px' }}></i>
              Thank you! Your message has been sent successfully.
            </Alert>
          )}

          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              <i className="pi pi-exclamation-circle" style={{ marginRight: '8px' }}></i>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                minLength={2}
                maxLength={100}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
                minLength={5}
                maxLength={200}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                minLength={10}
                maxLength={2000}
                disabled={loading}
              />
              <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#6c757d', marginTop: '0.5rem' }}>
                {charCount}/2000
              </div>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="contact-submit-btn"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: '8px' }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <i className="pi pi-send" style={{ marginRight: '8px' }}></i>
                  Send Message
                </>
              )}
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
