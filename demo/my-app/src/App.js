import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [highscores, setHighscores] = useState([]) 

  // use effect to load data
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/highscores')
      .then(response => {
        console.log('highscores loaded - a promise fulfilled')
        console.log(response.data)
        setHighscores(response.data)
      }).catch(err => {
        // Handle error
        console.log(err);
    });
  }, []) // load once, use => []

  // create li-elements from highscreo data
  const highscoreItems = highscores.map((highscore,index) =>
    <li key={index}>{highscore.name} : {highscore.score}</li>
  );

  // render loaded json data 
  return (
    <div className="App">
      <ul>
        {highscoreItems}
      </ul>
    </div>
  );
}

export default App;
