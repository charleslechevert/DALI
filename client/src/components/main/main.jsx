import './main.css'
import axios from 'axios'
import { Explanation } from '../explanation/explanation';
import { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../../App';
import { Drawing } from '../drawing/drawing'

import * as mobilenet from "@tensorflow-models/mobilenet"



export const Main = (props) => {

    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)

    const imageRef = useRef()

   


 
    const { activeValue } = useContext(AppContext)
    const active = activeValue;

    const { playingValue } = useContext(AppContext)
    const [isPlaying, setIsPlaying]= playingValue;

    const [img, setImg] = useState('')



useEffect(() => {

    setImg(`${active[0].name}.gif`)
}, [active]);


    const handleisPlaying = () => {
        setIsPlaying(true)

    }



    return (
        <section className="main__container">            
            {!isPlaying ? (
            <div className="main__subcontainer">
                <div>
                    <Explanation number="1" color="var(--main)" explanation="Select the item you want to draw"/>
                    <Explanation number="2" color="var(--main2)" explanation="Click on start and draw! "/>
                    <Explanation number="3" color="var(--main3)" explanation="DALI will give you a score!"/>
                </div>
                <div className="main__start-container">
                    <p className="main__start-button" onClick={handleisPlaying} >Start your drawing ! </p>
                    <p className="main__start-details">Item selected : {active.name} ! </p>
                </div>  
                {img && <img className="main__img" id="img"  src={img} ref={imageRef}></img>}
            </div>
      ) : (
        <Drawing />
      )}
            
    </section>
    )
};