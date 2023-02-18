import {SignContainer} from '../../components/signcontainer/signcontainer'
import { SigninForm } from '../../components/signinform/signinform';
import '../signup/sign.css'



export  const Signin = () => {
    return (  
        <div>
            <SignContainer title="Sign in!">
                <SigninForm />
            </SignContainer>
        </div>
    )
};