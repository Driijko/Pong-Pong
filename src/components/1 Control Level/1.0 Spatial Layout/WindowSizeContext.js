import React, { createContext, useState } from "react";

const WindowSizeContext = createContext();

function WindowSizeContextProvider(props) {

  const [windowSize, setWindowSize] = (
    useState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  );

  window.onresize = (
    () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  );

  return (
    <WindowSizeContext.Provider 
      value={{windowSize}}
    >
      {props.children}
    </WindowSizeContext.Provider>
  );
}

export default WindowSizeContext;
export {WindowSizeContextProvider}