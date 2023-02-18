import { AppContext } from '../../App';
import { useContext, useEffect, useState, useRef } from 'react';
import { Game } from '../../components/game/game'
import './games.css'

export const Games = (props) => {

    const { authValue } = useContext(AppContext)
    const [auth, setAuth] = authValue;

    const { gamesValue } = useContext(AppContext)
    const [games, setGames] = gamesValue;

    return (
    <div className='games__container'>
        {auth ? (
                <div className='games__subcontainer'>
    
                    { games && games.map((item,key) => 
                    (<Game  draw={item.name} key={item._id} id={item._id} name={item.name} timer={item.timer} score={item.score} />)
                        
                    )}
                </div>
            
      ) : (
        <div className='games__not-auth'>Login for more!</div>
      )}
        
    </div>
      ) 
            
};