import './draws.css'
import Axios from 'axios'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Draw } from '../draw/draw'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
 
 

export const Draws = (props) => {

    const axiosPrivate = useAxiosPrivate()
    
    const { activeValue } = useContext(AppContext)
    const [active, setActive] = activeValue;

    const { gamesValue } = useContext(AppContext)
    const [games, setGames] = gamesValue;

    const { authValue } = useContext(AppContext)
    const [auth, setAuth] = authValue;
    
    const [draws, setDraws] = useState("")
    const [error, setError] = useState("") 

    useEffect(() => {

    Axios.get('http://localhost:3001/draws', {
  }).then((res) => {
    setDraws(res.data)
    console.log(res.data)})
    
    .catch(err => {
        setError(err);
        console.log(error)
    });
    
    if(auth) {
        console.log('yo')
        getGames();
    }

    }, []);

   
        const getGames = async () => {
            
            try {
                console.log(auth)
                const response = await axiosPrivate.get(`/games/${auth.id}`)


                response.data = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setGames(response.data)


            } catch (err) {
                console.error(err);
            }
        
        }


    


    /*const [active, setActive] = useState(null)*/

    const handleActive = (name, id) => {

        console.log(draws)
        setActive({name
                  ,id})
    }
   
    return (      
        <div className='draws__container'>
    
            {draws && games && draws.map((item,key) => 
            (<Draw onClick={() => handleActive(item.name, item._id)} draw={item.name} key={item._id} score={games.filter(game => game.draw_id == item._id).reduce((max, obj) => obj.score > max ? obj.score : max, 0)}  activeColor={ item.name === active.name ? "var(--main)"  : "" } id={item._id} />)
                
            )}
        </div>
        

    )
};