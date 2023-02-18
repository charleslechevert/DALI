import './navbar.css'
import { LogButton } from '../logbutton/logbutton';
import { useEffect, useContext } from 'react';
import { AppContext } from '../../App';


export const Navbar = (props) => {

    const { authValue } = useContext(AppContext)
    const auth = authValue;
    console.log(auth)


    return (
        <section className="navbar__container">
            <p className="navbar__title">DALI</p>
            <img src="/dali_logo.png" className="navbar__logo" alt="" />
            
            {auth[0].pseudo ? (
        <p className="navbar__pseudo">{auth[0].pseudo}</p>
      ) : (
        <div className="navbar__log-container">
            <LogButton type="Login" log="signin"/>
            <LogButton type="Register" log="signup"/>
        </div>
      )}
            
        </section>
    )
};