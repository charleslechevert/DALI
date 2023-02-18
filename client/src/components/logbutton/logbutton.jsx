import './logbutton.css'


export const LogButton = (props) => {
    return (
        <a className="log__container" href={props.log}>
            {props.type}
        </a>
    )
};