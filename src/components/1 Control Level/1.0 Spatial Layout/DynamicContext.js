import React, {createContext, useState} from 'react'

const DynamicContext = createContext();

function DynamicContextProvider(props) {

  // Paddles
  const [player1PaddleTop, setPlayer1PaddleTop] = useState(0);
  const [player2PaddleTop, setPlayer2PaddleTop] = useState(0);

  function updatePlayer1PaddleTopContext(newValue) {
    setPlayer1PaddleTop(newValue);
  }

  function updatePlayer2PaddleTopContext(newValue) {
    setPlayer2PaddleTop(newValue);
  }

  // Provider
  return (
    <DynamicContext.Provider
      value={{player1PaddleTop, updatePlayer1PaddleTopContext, player2PaddleTop, updatePlayer2PaddleTopContext}}
    >
      {props.children}
    </DynamicContext.Provider>
  )
}

export default DynamicContext;
export {DynamicContextProvider};

