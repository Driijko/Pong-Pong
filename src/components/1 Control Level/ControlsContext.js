import React, {createContext, useState, useEffect} from 'react';

const ControlsContext = createContext();

function ControlsContextProvider(props) {
  
  const [eventListenersGenerated, setEventListenersGenerated] = useState(false);
  const [w_keyDown, set_w_keyDown] = useState(false);
  const [s_keyDown, set_s_keyDown] = useState(false);
  const [p_keyDown, set_p_keyDown] = useState(false);
  const [l_keyDown, set_l_keyDown] = useState(false);

  const controls = {
    player1: {
      upButtonDown: w_keyDown,
      downButtonDown: s_keyDown
    },
    player2: {
      upButtonDown: p_keyDown,
      downButtonDown: l_keyDown
    }
  }

  function w_keyDownCheck(event) {
    if (event.keyCode === 87) {
      set_w_keyDown(true);
    }
  }

  function w_keyUpCheck(event) {
    if (event.keyCode === 87) {
      set_w_keyDown(false);
    }
  }

  function s_keyDownCheck(event) {
    if (event.keyCode === 83 ) {
      set_s_keyDown(true);
    }
  }

  function s_keyUpCheck(event) {
    if (event.keyCode === 83) {
      set_s_keyDown(false);
    }
  }

  function p_keyDownCheck(event) {
    if (event.keyCode === 80) {
      set_p_keyDown(true);
    }
  }

  function p_keyUpCheck(event) {
    if (event.keyCode === 80) {
      set_p_keyDown(false);
    }
  }

  function l_keyDownCheck(event) {
    if (event.keyCode === 76 ) {
      set_l_keyDown(true);
    }
  }

  function l_keyUpCheck(event) {
    if (event.keyCode === 76) {
      set_l_keyDown(false);
    }
  }

  useEffect(
    () => {
      if ( ! (eventListenersGenerated) ) {
        document.addEventListener("keydown", w_keyDownCheck);
        document.addEventListener("keyup", w_keyUpCheck);
        document.addEventListener("keydown", s_keyDownCheck);
        document.addEventListener("keyup", s_keyUpCheck);
        document.addEventListener("keydown", p_keyDownCheck);
        document.addEventListener("keyup", p_keyUpCheck);
        document.addEventListener("keydown", l_keyDownCheck);
        document.addEventListener("keyup", l_keyUpCheck);
        setEventListenersGenerated(true);
      }
    }
  )

  return (
    <ControlsContext.Provider value={{controls}} >
      { props.children }
    </ControlsContext.Provider>
  )
}

export default ControlsContext;
export {ControlsContextProvider};

