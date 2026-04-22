"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get('/api/cv/public');
        setCvData(response.data.data);
      } catch (err) {
        setError('Failed to load contact information');
        console.error('Footer CV fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, []);

  if (loading) {
    return (
      <footer className="footer bg-dark text-white mt-auto py-4">
        <Container>
          <div className="text-center">
            <small className="text-light">Loading...</small>
          </div>
        </Container>
      </footer>
    );
  }

  if (error || !cvData) {
    return (
      <footer className="footer bg-dark text-white mt-auto py-4">
        <Container>
          <div className="text-center">
            <small className="text-light">© 2026 konsuu.net</small>
          </div>
        </Container>
      </footer>
    );
  }

  const { generalInfo } = cvData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark text-white mt-auto py-4">
      <Container>
        <Row className="g-3 mb-3 justify-content-center">
          <Col xs={12} md={6} lg={3} className="text-center">
            <div className="footer-item d-flex align-items-center justify-content-center">
              <i className="pi pi-linkedin footer-icon" style={{ fontSize: '1.2rem' }}></i>
              <a 
                href={generalInfo.linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="text-center">
            <div className="footer-item d-flex align-items-center justify-content-center">
              <i className="pi pi-github footer-icon" style={{ fontSize: '1.2rem' }}></i>
              <a 
                href={generalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <small className="text-light">© {currentYear} konsuu.net</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
