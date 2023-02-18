import { useForm } from "react-hook-form";
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useNavigate} from 'react-router-dom';
import { AppContext } from '../../App';
import axios from '../../api/axios.js'
import { useState, useContext } from "react";
import './signform.css'

export const SignupForm = (props) => {


    const navigate = useNavigate()

    const { authValue } = useContext(AppContext)
    const [auth, setAuth] = authValue;
    const [errMsg, setErrMsg] = useState('');

    const schema = yup.object().shape({
        pseudo : yup.string().required().min(1).max(20),
        password: yup.string().required().min(1).max(20),
        confirmPassword: yup.string().oneOf([yup.ref('password')])
    })

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
 
    const onSubmit = async (data) => {
        setErrMsg("")
        try {
            
            const response = await axios.post('http://localhost:3001/auth/register', JSON.stringify(data),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials:true
            })

            /*CHANNNGE TO DO */
            const accessToken = response?.data?.token
            const pseudo = data.pseudo
            console.log(response.data)
            const id = response?.data?.savedUser?._id
            setAuth({pseudo, accessToken, id});
            console.log({pseudo, accessToken, id})

            navigate('/')

        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('User already exsits!'); 
            } else {
                setErrMsg("Internal Error")
            }
            
        }
        
        

    }

        
    return (      
        <form className='sign__form-container' onSubmit={handleSubmit(onSubmit)}>
            <div className='sign__form-subcontainer'>
                <label className='sign__form-label'>Pseudo</label>
                <input className='sign__form-input' type="text" {...register("pseudo")}/>
                {errors.pseudo && (<p className="sign__form-error">Pseudo required - Min:3 - Max20</p>)}
            </div>
            <div className='sign__form-subcontainer'>
                <label className='sign__form-label'>Password</label>
                <input className='sign__form-input' type="password"  {...register("password")}/>
                {errors.password && (<p className="sign__form-error">Password required - Min:3 - Max20</p>)}
            </div>
            <div className='sign__form-subcontainer'>
                <label className='sign__form-label'>Confirm Password</label>
                <input className='sign__form-input' type="password"  {...register("confirmPassword")}/>
                {errors.confirmPassword && (<p className="sign__form-error">Should match with password</p>)}
            </div>
            <input className='sign__form-submit' type="submit"/>
            {errMsg && (<p className="sign__form-error">{errMsg}</p>)}
        </form>


    )
};