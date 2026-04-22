"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactTyped } from 'react-typed';

const Header = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get('/api/cv/public');
        setCvData(response.data.data);
      } catch (err) {
        console.error('Failed to fetch CV:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, []);

  if (loading) {
    return (
      <header>
        <div id="home" className="header-wraper" style={{ background: "url(header.png) no-repeat", position: "relative", backgroundSize: "cover", backgroundPosition: "center", height: "60vh"}}>
          <div className="main-info">
            <h1>Loading...</h1>
          </div>
        </div>
      </header>
    );
  }

  if (!cvData) return null;

  const { generalInfo, skills } = cvData;
  
  // Build animated strings from title + highlighted skills
  const animatedStrings = [
    generalInfo.title,
    ...skills
      .filter(s => s.isHighlighted)
      .slice(0, 5)
      .map(s => s.name)
  ];

  return (
    <header>
      <div id="home" className="header-wraper" style={{ background: "url(header.png) no-repeat", position: "relative", backgroundSize: "cover", backgroundPosition: "center", height: "60vh"}}>
        <div className="main-info">
          {generalInfo.profileImage && (
            <img 
              src={generalInfo.profileImage} 
              alt={`${generalInfo.firstName} ${generalInfo.lastName}`}
              className="profile-image"
            />
          )}
          <h1 style={{ marginBottom: "1rem", fontSize: "3rem", fontWeight: "700", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            {generalInfo.firstName} {generalInfo.lastName}
          </h1>
          <div className="typed-wrapper">
            <ReactTyped
              className="typed-text"
              strings={animatedStrings}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
