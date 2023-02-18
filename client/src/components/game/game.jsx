
import './game.css'

export const Game = (props) => {

    return (
    <div className='game__container'>
    <div className='game__subcontainer'>
        <div className='draw__title'>{props.name}</div>
    </div>
    <div className='game__subcontainer'>
        <div className='draw__title'>SOLO</div>
    </div>
    <div className='draw__score-container'>
        <div className='draw__title'>SCORE</div>
        <div className='draw__score'> {props.score}</div>
    </div>
    <div className='draw__score-container'>
        <div className='draw__title'>TIME</div>
        <div className='draw__score'>{props.timer}''</div>
    </div>
    </div>
      ) 
            
};