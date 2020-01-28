import React, {createContext, useState, useReducer, useEffect} from 'react';

const GameStateContext = createContext();

function GameStateContextProvider(props) {

  // SCORE ////////////////////////////////////////////////////////////////////////////////////

  const initialScore = {
    player1: 0,
    player2: 0
  }

  function scoreReducer(score, action) {

    switch(action.type) {

      case 'PLAYER_1_SCORES':
        return (
          {
            player1: score.player1 + 1,
            player2: score.player2
          }
        )
      
      case 'PLAYER_2_SCORES':
        return (
          {
            player1: score.player1,
            player2: score.player2 + 1
          }
        )

      case "RESET_SCORE":
        return (
          {
            player1: 0,
            player2: 0
          }
        )

      default:
        throw new Error();
    }    
  }

  const [score, dispatchScore] = useReducer(scoreReducer, initialScore);

  // WINNER ///////////////////////////////////////////////////////////////////////////////////////
  const [winner, setWinner] = useState("undetermined");
  
  function resetWinner() {
    setWinner("undetermined");
  }

  useEffect(
    () => {
      if (score.player1 === 5) {
        setWinner("player 1");
      }
      else if (score.player2 === 5) {
        setWinner("player 2")
      }
    },
    [score]
  )

  return (
    <GameStateContext.Provider
      value={{score, dispatchScore, winner, resetWinner}}
    >
      { props.children }
    </GameStateContext.Provider>
  )
}

export default GameStateContext;
export {GameStateContextProvider};