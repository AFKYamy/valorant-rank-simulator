import { useState, useEffect } from 'react';

import Rank from './components/Rank';
import Match from './components/Match';

const App = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const storedMatches = localStorage.getItem('matches');

    try {
      const parsedMatches = JSON.parse(storedMatches);
      setMatches(parsedMatches || []);
    } catch (error) {
      console.error("Error parsing JSON: ", error);
      setMatches([]);
    }
  }, []);

  const deleteMatches = () => {
    setMatches([]);
  }

  useEffect(() => {
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches]);

  return (
    <div className="app container">
      <h1 className="app__title">Valorant Rank Tracker</h1>
      <span className="app__rank">
        <Rank matches={matches} setMatches={setMatches}/>
      </span>
      <div className="history container">
        <div className="info container">
          <h1 className="info__title" >Match history:</h1>
          <button type="button" className="info__btn" onClick={() => deleteMatches()}>Delete history</button>
        </div>
        <div className="history__matches">
          <Match matches={matches}/>
        </div>
      </div>
    </div>
  )
};

export default App;