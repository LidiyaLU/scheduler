import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(anotherMode, replace = false) {

    if (replace) {
      setMode(anotherMode); 
      setHistory(history => [...history.slice(0,-1),anotherMode])
    } else {
      setMode(anotherMode); 
      setHistory(prev => [...prev,anotherMode])
    }
    
  }

  function back() { 
    
    setMode(history[history.length-2]);
    setHistory(history => history.slice(0, -1))
  }

  return { mode, transition, back };
}