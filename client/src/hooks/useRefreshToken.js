import axios from '../api/axios';
import { AppContext } from '../App';
import {useContext} from 'react'

const useRefreshToken = () => {
    
    const { authValue } = useContext(AppContext)
    const {setAuth} = authValue;


    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.token }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;