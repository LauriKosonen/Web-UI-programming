import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const OPENWEATHER_API_KEY = 'ef8b617a78125996451a0d095d1b4907';
  const CITY_NAME = event.queryStringParameters?.city || 'Helsinki';
const OPENWEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await axios.get(OPENWEATHER_API);
    const weatherInfo = `Temperature in ${CITY_NAME}: ${response.data.main.temp}°C, ${response.data.weather[0].description}`;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weatherInfo }),
    };
} catch (error) {
    console.error('Error fetching weather from OpenWeatherMap:', error);
    throw error;
  }
};

export { handler };