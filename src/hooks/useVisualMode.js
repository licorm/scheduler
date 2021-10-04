import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(next, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(next);
    history.push(next);
  }
  
  function back() {
    if (history.length === 1) {
      setMode(history[0])
      history.pop();
    }
    if (history.length > 1) {
      let lastIndex = history.length - 2;
      
      let last = history[lastIndex];
      setMode(last);
      history.pop();
    }
  }

  return { 
    mode, 
    transition,
    back,
    history
  };

};