
import {Home} from './pages/home/home.jsx'
import {Signup} from './pages/signup/signup'
import {Signin} from './pages/signin/signin'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, createContext } from 'react';


export const AppContext = createContext();

function App() {
  const [active, setActive] = useState({name:"aircraft carrier", id:"63ee0d30b5335ee51414c0f5"});
  const [auth, setAuth] = useState("");
  const [isPlaying,setIsPlaying] = useState(false);
  const [games, setGames] = useState([]);
  return (
    <div>
      <AppContext.Provider value={{activeValue : [active,setActive], authValue : [auth,setAuth], playingValue : [isPlaying, setIsPlaying], gamesValue : [games, setGames] }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      </AppContext.Provider>
    </div>
      
  );
}

export default App;
