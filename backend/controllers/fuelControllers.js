import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const host = process.env.HOST;
const fuelApiCode = process.env.FUEL_API_CODE;

export const getFuelPricesTampere = async (req, res) => {
    try {
        console.log('Fetching latest fuel prices...');
        const response = await axios.get(`${host}/api/httpTriggerGetLatestFuelPrices?code=${fuelApiCode}`);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response)
        throw error;
    }
};

export const getFuelPriceHistoryTampere = async (req, res) => {
    try {
      console.log('Fetching fuel history prices...');
      const response = await axios.get(`${host}/api/httpTriggerGetFuelPrices?code=${fuelApiCode}`);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error.response)
      throw error;
    }
  };