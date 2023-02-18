import './draw.css'

export const Draw = (props) => {
    return (
        <div className="draw__container" onClick={props.onClick} style={{ background: props.activeColor }}>
            <h2 className="draw__title">{props.draw}</h2>
            <div className="draw__score-container">
                <p>Best score</p>
                <p className="draw__score">{props.score}%</p>
            </div>
        </div>
    )
};