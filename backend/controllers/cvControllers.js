import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const cvHost = process.env.CV_API_HOST;
const cvApiKey = process.env.CV_API_KEY;

export const getCVPublic = async (req, res) => {
  try {
    console.log('Fetching public CV data...');
    const response = await axios.get(`${cvHost}/cv-public`, {
      headers: {
        'Ocp-Apim-Subscription-Key': cvApiKey
      }
    });
    if (response.data) {
      console.log('CV data fetched successfully');
      return response.data;
    }
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};
