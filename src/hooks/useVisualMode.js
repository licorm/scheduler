import { useState } from "react";

//creates a history state to keep track of states
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //use this function to transition to a certain mode and therefor see the given page
  function transition(next, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(next);
    history.push(next);
  }

  //use this function to transition back one in the history state
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