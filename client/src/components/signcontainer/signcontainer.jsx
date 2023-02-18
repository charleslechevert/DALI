import './signcontainer.css'

export const SignContainer = (props) => {
        
    return (      
        <div className="signcontainer__container">
            <div className='signcontainer__title-container'>
                <h2 className='signcontainer__title'>{props.title}</h2>
                <img src="/dali_logo.png" className="navbar__logo" alt="" />

            </div>
            {props.children}
        </div>


    )
};