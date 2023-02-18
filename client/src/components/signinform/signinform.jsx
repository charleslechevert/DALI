import { useForm } from "react-hook-form";
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useNavigate} from 'react-router-dom';
import '../signupform/signform.css'
import { AppContext } from '../../App';
import { useState, useContext } from "react";

import axios from '../../api/axios.js'
const LOGIN_URL = '/auth/login'

export const SigninForm = (props) => {

    const { authValue } = useContext(AppContext)
    const [auth, setAuth] = authValue;
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate()

    const schema = yup.object().shape({
        pseudo : yup.string().required().min(3).max(20),
        password: yup.string().required().min(3).max(20),
    })

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
 
    const onSubmit = async (data) => {
        setErrMsg("")
        try {
            
            const response = await axios.post(LOGIN_URL, JSON.stringify(data),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials:true
            })
            const accessToken = response?.data?.token
            const pseudo = data.pseudo
            const id = response?.data?.user?._id
            setAuth({pseudo, accessToken, id});
            console.log({pseudo, accessToken, id})

            navigate('/')

        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg("Username or password incorrect!")
            }
            
        }

    }
  
    return (      
        <form className='sign__form-container' onSubmit={handleSubmit(onSubmit)}>
        <div className='sign__form-subcontainer'>
            <label className='sign__form-label'>Pseudo</label>
            <input className='sign__form-input' type="text" {...register("pseudo")} />
            {errors.pseudo && (<p className="sign__form-error">Pseudo required - Min:3 - Max20</p>)}

        </div>
        <div className='sign__form-subcontainer'>
            <label className='sign__form-label'>Password</label>
            <input className='sign__form-input' type="password" {...register("password")} value="arsenal"/>
            {errors.password && (<p className="sign__form-error">Password required - Min:3 - Max20</p>)}

        </div>
        <input className='sign__form-submit' type="submit"/>
        {errMsg && (<p className="sign__form-error">{errMsg}</p>)}

    </form>


    )
};