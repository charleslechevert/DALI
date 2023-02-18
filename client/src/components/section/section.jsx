import './section.css'


export function Section (props) {
        
    return (
        <section className="section__container" style={{width: props.width}}>
            <h2 className="section__title">{props.title}</h2>
            {props.children}
        </section>
    )
};