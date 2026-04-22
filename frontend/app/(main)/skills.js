"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Badge, Row, Col, Button, ButtonGroup } from 'react-bootstrap';

export default function Skills() {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState('level');

  const proficiencyMeta = {
    advanced: { variant: 'warning', label: 'Advanced' },
    proficient: { variant: 'success', label: 'Proficient' },
    working_knowledge: { variant: 'info', label: 'Working Knowledge' },
    basic_familiarity: { variant: 'secondary', label: 'Basic Familiarity' }
  };

  const proficiencyOrder = ['advanced', 'proficient', 'working_knowledge', 'basic_familiarity'];

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

  const skillsByLevel = cvData.skills.reduce((acc, skill) => {
    if (!acc[skill.proficiencyLevel]) {
      acc[skill.proficiencyLevel] = [];
    }
    acc[skill.proficiencyLevel].push(skill);
    return acc;
  }, {});

  proficiencyOrder.forEach((level) => {
    if (!skillsByLevel[level]) {
      skillsByLevel[level] = [];
    }
  });

  const skillsByCategory = cvData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const sortedCategories = Object.keys(skillsByCategory).sort((a, b) => a.localeCompare(b));

  return (
    <section id="skills" className="my-5 py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <h1 className="section-title mb-5">Skills</h1>
        <div className="d-flex justify-content-center mb-4 skills-toggle">
          <ButtonGroup aria-label="Skills grouping options">
            <Button
              variant={groupBy === 'level' ? 'warning' : 'outline-warning'}
              onClick={() => setGroupBy('level')}
            >
              Group by Level
            </Button>
            <Button
              variant={groupBy === 'category' ? 'warning' : 'outline-warning'}
              onClick={() => setGroupBy('category')}
            >
              Group by Category
            </Button>
          </ButtonGroup>
        </div>
        {groupBy === 'category' && (
          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4" aria-label="Proficiency color legend">
            {proficiencyOrder.map((levelKey) => {
              const levelMeta = proficiencyMeta[levelKey];
              return (
                <Badge
                  key={levelKey}
                  bg={levelMeta.variant}
                  style={{ padding: '0.5rem 0.75rem', fontWeight: '500' }}
                >
                  {levelMeta.label}
                </Badge>
              );
            })}
          </div>
        )}
        <Row className="mt-4 g-4">
          {groupBy === 'level' && proficiencyOrder.map((levelKey) => {
            const levelMeta = proficiencyMeta[levelKey];
            const skills = skillsByLevel[levelKey]
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name));

            return (
              <Col key={levelKey} xs={12} md={6} lg={3}>
                <Card className="h-100 skill-card" style={{ border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                  <Card.Body>
                    <Card.Title style={{ color: 'var(--primary-orange)', fontWeight: '600', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                      {levelMeta.label}
                    </Card.Title>
                    <div className="d-flex flex-wrap gap-2">
                      {skills.length === 0 && (
                        <span style={{ color: 'var(--primary-dark-grey)', fontSize: '0.9rem' }}>No skills listed.</span>
                      )}
                      {skills.map((skill) => (
                        <Badge
                          key={skill.id}
                          bg={levelMeta.variant}
                          className="skill-badge"
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: '500' }}
                          title={`Category: ${skill.category}`}
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
          {groupBy === 'category' && sortedCategories.map((category) => {
            const skills = skillsByCategory[category]
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name));

            return (
              <Col key={category} xs={12} md={6} lg={4}>
                <Card className="h-100 skill-card" style={{ border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                  <Card.Body>
                    <Card.Title style={{ color: 'var(--primary-orange)', fontWeight: '600', marginBottom: '1rem', fontSize: '1.2rem' }}>
                      {category}
                    </Card.Title>
                    <div className="d-flex flex-wrap gap-2">
                      {skills.map((skill) => {
                        const levelMeta = proficiencyMeta[skill.proficiencyLevel] || proficiencyMeta.basic_familiarity;
                        return (
                          <Badge
                            key={skill.id}
                            bg={levelMeta.variant}
                          className="skill-badge"
                          style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: '500' }}
                          title={`Proficiency: ${levelMeta.label}`}
                        >
                            {skill.name}
                        </Badge>
                      );
                    })}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
}
