import {SignContainer} from '../../components/signcontainer/signcontainer'
import { SignupForm }  from '../../components/signupform/signupform'
import './sign.css'



export  const Signup = () => {
    return (  
        <div>
            <SignContainer title="Sign up!">
                <SignupForm />
            </SignContainer>

        </div>
    )
};