import { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ReactComponent as EraseBtn } from './erasebutton.svg';
import { ReactComponent as SendBtn } from './sendbutton.svg';
import { ReactComponent as CloseBtn } from './closebutton.svg';
import { AppContext } from '../../App';
import './drawing.css'


export const Drawing = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const { playingValue } = useContext(AppContext)
    const [isPlaying, setIsPlaying]= playingValue;

    const { activeValue } = useContext(AppContext)
    const active = activeValue;

    
    const { gamesValue } = useContext(AppContext)
    const [games, setGames] = gamesValue;

    const { authValue } = useContext(AppContext)
    const auth = authValue;

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [erase, setErase] = useState(false)

    const [timer, setTimer] = useState(0);

    let doodleClassifier;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const parent = canvas.parentNode;
        const widthSelected = Math.min(parent.clientWidth,500);
        canvas.width = widthSelected // Set the width of the canvas to match the parent
        canvas.height = widthSelected // Set the height of the canvas to match the parent 
        // Draw on the canvas here
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 13/300*widthSelected;
        contextRef.current = context;



    }, [])

    useEffect(() => {
        const timerIter = setTimeout(() => {
          setTimer((prevCount) => prevCount + 1);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [timer]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
      };



      const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
          return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
      };

    const finishDrawing = () => {
        handleClassification()
        contextRef.current.closePath();
        setIsDrawing(false);
      };


    const handleCloseButton = () => {
        setIsPlaying(false)
    }

    const handleEraser = () => {
        setErase(!erase)
        if(!erase) {
            contextRef.current.strokeStyle = "white"
        } else {
            contextRef.current.strokeStyle = "black"
        }

    }

    const [result,setResult] = useState('')

    const handleClassification = () => {
        
        const modelReady = () => {
            console.log("model loaded")
            const canvas = document.getElementById('canvas')
            console.log(canvas)
            doodleClassifier.classify(canvas, gotResults)
        }

        const  gotResults = (error,results) => {
            if(error) {
                console.log(error);
                return; 
            }
            console.log(results)
            setResult(results)
         }

        let doodleClassifier = window.ml5.imageClassifier('DoodleNet', modelReady)
        console.log(doodleClassifier)

    }

    const sendGame = async () => {

        const score = getScore()
        console.log(active)
        const data = {user_id : auth[0].id, draw_id : active[0].id, score: score, timer: timer, name : active[0].name}
        setIsPlaying(false)
        if(auth[0].id) {

            try {         
                const response = await axios.post('http://localhost:3001/games/insert', JSON.stringify(data),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials:true
                })

                
                
            } catch(err) {
                console.log(err)    
            }
             getGames()

        }
    }

    const getGames = async () => {
        try {
            console.log(auth[0].id)
            const response = await axiosPrivate.get(`/games/${auth[0].id}`)
            response.data = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setGames(response.data)
            console.log(response.data)

        } catch (err) {
            console.error(err);
        }
    }

    const getScore =  () => {
        const score = result.filter(item => item.label == active[0].name)
        
        if(score.length) {
            return Math.ceil((score[0].confidence)*100);
        } else {
            return 0;
        }
        
        
    }



    return (
        <div className="drawing__canvas-container">
            <div className="drawing__canvas-options">
            <div className='drawing__timer'>{timer}</div>
            <div className='drawing__close-container' onClick={handleEraser} style={{ backgroundColor: erase ? 'var(--main)' : ''}}>
                <EraseBtn className="drawing__close"  />
            </div>
            <SendBtn className="drawing__close" onClick={sendGame} />
            <CloseBtn className="drawing__close" onClick={handleCloseButton} />
        </div>
        <canvas id="canvas"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}      
        />
        <div>
            
        </div>
        <div className="drawing__guess">{result && result[0].label}?</div>


        </div>

    )
};