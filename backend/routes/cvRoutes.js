import express from 'express';
import NodeCache from 'node-cache';
import { getCVPublic } from '../controllers/cvControllers.js';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 86400 }); // Cache for 24 hours

// Route: GET /api/cv/public
router.get('/public', async (req, res) => {
  try {
    // Check cache first
    const cachedData = cache.get('cvPublic');
    if (cachedData) {
      console.log('Serving cached CV data');
      return res.json(cachedData);
    }

    // Fetch fresh data
    const data = await getCVPublic(req);
    cache.set('cvPublic', data);
    console.log('Fetched fresh CV data');
    res.json(data);
  } catch (error) {
    console.error('Error fetching CV data:', error);
    res.status(500).json({ error: 'Failed to fetch CV data' });
  }
});

export default router;
