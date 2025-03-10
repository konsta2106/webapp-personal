import express from 'express';
import NodeCache from 'node-cache';
import cron from 'node-cron';
import { getFuelPricesTampere, getFuelPriceHistoryTampere } from '../controllers/fuelControllers.js';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 36000 }); // Cache for 10 hours

// Schedule a job to clear the cache every day at 17:00 Finnish time
cron.schedule('0 17 * * *', () => {
  console.log('Clearing cache at 17:00 Finnish time');
  cache.flushAll();
}, {
  scheduled: true,
  timezone: "Europe/Helsinki"
});

// Cache middleware
const cacheMiddleware = (key, fetchFunction) => async (req, res, next) => {
  const cachedData = cache.get(key);
  if (cachedData) {
    console.log('Serving cached data');
    return res.json(cachedData);
  }
  try {
    const data = await fetchFunction(req);
    cache.set(key, data);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// Routes
router.get('/tampere', getFuelPricesTampere);

router.get('/tampere-history', cacheMiddleware('fuelPriceHistoryTampere', async (req) => {
  const data = await getFuelPriceHistoryTampere(req);
  return data;
}));

export default router;