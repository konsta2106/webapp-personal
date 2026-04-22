"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Badge, Row, Col } from 'react-bootstrap';

export default function Skills() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get('/api/cv/public');
        setCvData(response.data.data);
      } catch (err) {
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!cvData) return null;

  // Group skills by category
  const skillsByCategory = cvData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Map proficiency to badge variant
  const getProficiencyVariant = (level) => {
    const map = {
      'advanced': 'warning',        // Orange/yellow for advanced
      'proficient': 'success',      // Green
      'working_knowledge': 'info',  // Light blue
      'basic_familiarity': 'secondary' // Gray
    };
    return map[level] || 'secondary';
  };

  return (
    <section id="skills" className="my-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <h1 className="section-title mb-5">Skills</h1>
        <Row className="mt-4 g-4">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <Col key={category} xs={12} md={6} lg={4}>
              <Card className="h-100 skill-card" style={{ border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <Card.Body>
                  <Card.Title style={{ color: 'var(--primary-orange)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.2rem' }}>
                    {category}
                  </Card.Title>
                  <div className="d-flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        bg={getProficiencyVariant(skill.proficiencyLevel)}
                        className="skill-badge"
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: '500' }}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
