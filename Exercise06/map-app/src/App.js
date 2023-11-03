import { useEffect, useState } from 'react';
import axios from 'axios';
import GolfMap from './Golfmap';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  return <GolfMap courses={courses} />;
}

export default App;