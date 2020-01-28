import React, { useContext, useState, useEffect } from "react";

// IMPORTS /////////////////////////////////////////////////////////////////////////////////////

// Import contexts
import WindowSizeContext from "../../1 Control Level/1.0 Spatial Layout/WindowSizeContext";
import ThemesContext from "../../1 Control Level/1.1 Styling/ThemesContext";
import IntervalContext from "../../1 Control Level/IntervalContext";
import ModeContext from '../../2 Mode Level/ModeContext';
import GameStateContext from "../../1 Control Level/GameStateContext";


// Import static spatial layout function
import endGameScreenSSL from "./endGameScreenSSL";

// Import helper functions
import combineObjects from "../../../helper functions/combineObjectsFunction";

export default function EndGameScreen() {
  // Access global variables /////////////////////////////////////////////////////////////////////
  const { windowSize } = useContext(WindowSizeContext);
  const { globalInterval } = useContext(IntervalContext);
  const { themes } = useContext(ThemesContext);
  const theme = themes.theme0;
  const { dispatchCurrentMode, dispatchCurrentGameMode } = useContext(ModeContext);
  const { winner, resetWinner } = useContext(GameStateContext);

  // Spatial Layout ////////////////////////////////////////////////////////////////////////////

  // Access the static spatial layout
  const [SSL, setSSL] = useState(endGameScreenSSL(windowSize));

  // Size and resize based on the windowSize
  useEffect(() => {
    setSSL(endGameScreenSSL(windowSize));
  }, [windowSize]);

  // STYLING ////////////////////////////////////////////////////////////////////////////////////

  // TITLE ////////////////////////////////////////////

  // We will switch between two colors for the title using a time interval.
  const [messageColor, setMessageColor] = useState(`rgb(${theme.color1})`);
  const [intervalCount0, setIntervalCount0] = useState(0);
  // (40 / 5) = 8 times per second.
  const interval = 5;

  useEffect(() => {
    if (intervalCount0 === interval) {
      if (messageColor === `rgb(${theme.color1})`) {
        setMessageColor(`rgb(${theme.color2})`);
      } else {
        setMessageColor(`rgb(${theme.color1})`);
      }
      setIntervalCount0(0);
    } else {
      setIntervalCount0(intervalCount0 + 1);
    }
  }, [globalInterval]);

  const messageStyles = combineObjects([
    SSL.message,
    {
      textAlign: "center",
      color: messageColor
    }
  ]);


  // CLICK PLAY AGAIN BUTTON //////////////////////////////////
  function handlePlayAgainButtonClick() {
    resetWinner();
    dispatchCurrentMode({type: "SWITCH_TO_GAME_MODE"});
    dispatchCurrentGameMode({type: "SWITCH_TO_SERVE_MODE"});    
  }

  // RENDERING ////////////////////////////////////////////////////////////////////////////////////
  return (
    <div style={SSL.container}>
      <div style={messageStyles}>{ winner === "player 1" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"}</div>

      <div
        style={SSL.playAgainButton}
        onClick={handlePlayAgainButtonClick}
      >
        PLAY AGAIN?
      </div>
    </div>
  );
}
