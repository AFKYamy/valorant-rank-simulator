import './styles/Match.css';

import ranks from '../database/Ranks';

const Match = ({matches}) => {
    return (
        <>
            {
                matches.map( (match) => {
                    return <div className="match container" key={match.id} style={{background: `linear-gradient(90deg, ${match.color1} 0%, ${match.color2} 100%)`}}>
                            <img className="match__img" src={ranks[match.rank].image} alt="rankImg" />
                            <h1 className="match__result">{match.result.toUpperCase()}</h1>
                            <h1 className="match__gain">RR: {match.gain}</h1>
                    </div>
                    
                })
            }
        </>
    )
};

export default Match;