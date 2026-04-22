"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AboutMe() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get('/api/cv/public');
        setCvData(response.data.data);
      } catch (err) {
        setError('Failed to load information');
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cvData) return null;

  const { generalInfo } = cvData;

  return (
    <section id="about" className="my-5 py-5">
      <div className="container">
        <h1 className="section-title mb-4">About Me</h1>
        <div className="about-content">
          <p className="lead" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--primary-dark-grey)', marginBottom: '2rem' }}>
            {generalInfo.summary}
          </p>
          <div className="location-info" style={{ display: 'flex', alignItems: 'center', fontSize: '1.05rem', color: 'var(--primary-dark-grey)' }}>
            <i className="pi pi-map-marker" style={{ marginRight: '10px', color: 'var(--primary-orange)', fontSize: '1.2rem' }}></i>
            <span>{generalInfo.location.city}, {generalInfo.location.country}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
