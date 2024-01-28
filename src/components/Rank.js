import './styles/Rank.css';
import './styles/Btn.css';

import { useState, useEffect } from "react";

import ranks from '../database/Ranks';

let currRank = 1;

const Rank = ({ matches, setMatches }) => {
    const [rr, setRr] = useState(0); // with useState hook we can set values and render the changes
    const [imgSrc, setImgsrc] = useState('');
    const [rankName, setRank] = useState('');
    const [tierStyle, setTierstyle] = useState('');

    // useEffect hook can perform side effects, it will run once when the component mounts
    useEffect(() => {
        const storedRr = localStorage.getItem('rr');
        const storedCurr = localStorage.getItem('currRank');

        if (storedRr) {
            setRr(parseInt(storedRr, 10));
        }
        
        if (storedCurr) {
            currRank = parseInt(storedCurr, 10);
        } 

        
        update();
      }, []); // empty dependency array ensures this will run once, if the dependencies change between renders the effect will re-run

    const win = () => {
        let rand = Math.floor(Math.random() * (28 - 18 + 1)) + 18;
        if ((rr + rand) >= 100 && currRank < 25) {
            setRr(10);
            currRank = currRank + 1;
            update();
        } else {
            setRr(rr + rand);
        }
        setMatches(currMatches => {
            return [
                ...currMatches, { id: crypto.randomUUID(), rank: currRank-1, gain: +rand, result: "win", color1: "#6dbeb7", color2: "#4a837e" }
            ]
        });
    };

    const lose = () => {
        let rand = Math.floor(Math.random() * (23 - 16 + 1)) + 16;
        if ((rr - rand) > 0) {
            setRr(rr - rand);
        } else if (currRank === 1){
            setRr(0);
        } else {
            setRr(75);
            currRank = currRank - 1;
            update();
        }
        setMatches(currMatches => {
            return [
                ...currMatches, { id: crypto.randomUUID(), rank: currRank-1, gain: -rand, result: "loss", color1: "#d66970", color2: "#93474c" }
            ]
        });
    }

    //update local storage whenever rr or currRank changes
    useEffect(() => {
        localStorage.setItem('rr', rr.toString());
        localStorage.setItem('currRank', currRank.toString());
    }, [rr, currRank]);

    const update = () => {
        for (let i = 0; i < ranks.length; i++) {
            if (currRank === ranks[i].id) {
                setImgsrc(ranks[i].image);
                setRank(ranks[i].name);
                setTierstyle(ranks[i].color);
            }
        }
        return;
    }

    return (
        <div className="rank container">
            <h1 className="rank__name" style={{color: tierStyle}}>{rankName}</h1>
            <img className="rank__img" src={imgSrc} alt="rankImg"/>
            <span>
                <progress className="rank__progress" value={rr} max="100"></progress>
            </span>
            <p className="rank__rr">RR: {rr}</p>
            <div className="buttons container">
                <button type="button" className="btn btn--win" onClick={win}>WIN</button>
                <button type="button" className="btn btn--lose" onClick={lose}>LOSS</button>
            </div>
        </div>
    )
};



export default Rank;