import './explanation.css'

export const Explanation = (props) => {

    return (      
            <div className="explanation__container">
                <div className="explanation__number" style={{backgroundColor: props.color}}>{props.number}</div>
                <div>{props.explanation}</div>
                 
            </div>

    )
};