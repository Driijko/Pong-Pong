import React, {createContext, useState} from 'react';

const IntervalContext = createContext();

function IntervalContextProvider(props) {

  const [globalInterval, setGlobalInterval] = useState(0);

  // Interval, in milliseconds (1000 milliseconds = 1 second).
  // const interval = 40;
  const interval = 20;

  function timeoutFunction() {
    setGlobalInterval(globalInterval + 1);
    clearTimeout(timeout);
  }

  const timeout = setTimeout(timeoutFunction, interval);

  return (
    <IntervalContext.Provider
      value={{globalInterval}}
    >
      { props.children }
    </IntervalContext.Provider>
  )
}

export default IntervalContext;
export {IntervalContextProvider};