import { useState } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState<string>('');

  const getWeather = async (city: string) => {
    try {
      const response = await fetch(`/.netlify/functions/weather?city=${city}`);
      const responseData = await response.text();
      console.log('Response from server:', responseData);

      const { weatherInfo } = JSON.parse(responseData);
      setWeather(weatherInfo);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className="App">
      <h1>World Weather</h1>
      <p>
        <button onClick={() => getWeather('Helsinki')}>Helsinki</button>
      </p>
      <p>
        <button onClick={() => getWeather('New York')}>New York</button>
      </p>
      <p>
        <button onClick={() => getWeather('London')}>London</button>
      </p>
      <p>
        <button onClick={() => getWeather('Tokyo')}>Tokyo</button>
      </p>
      <p>
        <button onClick={() => getWeather('Sydney')}>Sydney</button>
      </p>
      <p>{weather}</p>
    </div>
  );
}

export default App;
