import { useState } from "react";

//creates a history state to keep track of states
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //use this function to transition to a certain mode and therefor see the given page
  function transition(next, replace = false) {
    const newHistory = [...history]
    if (replace) {
      newHistory.pop();
      setHistory(newHistory)
      setMode(next)
    }
    setMode(next);
    newHistory.push(next);
    setHistory(newHistory)
  }

  //use this function to transition back one in the history state
  function back() {
    const newHistory = [...history]
    if (history.length === 1) {
      setMode(history[0])
      newHistory.pop()
      setHistory(newHistory)
    }
    if (history.length > 1) {
      let lastIndex = history.length - 2;

      let last = history[lastIndex];
      setMode(last);
      newHistory.pop()
      setHistory(newHistory)
    }
    
  }

  return {
    mode,
    transition,
    back
  };

};