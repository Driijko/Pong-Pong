import React, { useContext, useState, useEffect } from "react";

// IMPORTS /////////////////////////////////////////////////////////////////////////////////////

// Import contexts
import WindowSizeContext from "../../1 Control Level/1.0 Spatial Layout/WindowSizeContext";
import ThemesContext from "../../1 Control Level/1.1 Styling/ThemesContext";
import FontsContext from "../../1 Control Level/1.1 Styling/FontsContext";
import IntervalContext from "../../1 Control Level/IntervalContext";
import ModeContext from '../../2 Mode Level/ModeContext';

// Import static spatial layout function
import titleScreenSSL from "./titleScreenSSL";

// Import helper functions
import combineObjects from "../../../helper functions/combineObjectsFunction";
import styleStaticComponent from "../../../helper functions/styleStaticComponent";

export default function TitleScreen() {
  // Access global variables /////////////////////////////////////////////////////////////////////
  const { windowSize } = useContext(WindowSizeContext);
  const { globalInterval } = useContext(IntervalContext);
  const { themes } = useContext(ThemesContext);
  const theme = themes.theme0;
  const { dispatchCurrentMode, dispatchCurrentGameMode } = useContext(ModeContext);

  // Spatial Layout ////////////////////////////////////////////////////////////////////////////

  // Access the static spatial layout
  const [SSL, setSSL] = useState(titleScreenSSL(windowSize));

  // Size and resize based on the windowSize
  useEffect(() => {
    setSSL(titleScreenSSL(windowSize));
  }, [windowSize]);

  // STYLING ////////////////////////////////////////////////////////////////////////////////////

  // TITLE ////////////////////////////////////////////

  // We will switch between two colors for the title using a time interval.
  const [titleColor, setTitleColor] = useState(`rgb(${theme.color1})`);
  const [intervalCount0, setIntervalCount0] = useState(0);
  // (40 / 5) = 8 times per second.
  const interval = 5;

  useEffect(() => {
    if (intervalCount0 === interval) {
      if (titleColor === `rgb(${theme.color1})`) {
        setTitleColor(`rgb(${theme.color2})`);
      } else {
        setTitleColor(`rgb(${theme.color1})`);
      }
      setIntervalCount0(0);
    } else {
      setIntervalCount0(intervalCount0 + 1);
    }
  }, [globalInterval]);

  const titleStyles = combineObjects([
    styleStaticComponent(SSL.title),
    {
      textAlign: "center",
      color: titleColor
    }
  ]);

  // INSTRUCTIONS //////////////////////////////////////////
  const player1InstructionsStyles = combineObjects([
    styleStaticComponent(SSL.player1Instructions),
    {
      textAlign: "center",
      color: `rgb(${theme.color1})`,
    }
  ]);

  const player1SpanStyles = {
    color: `rgb(${theme.color2})`
  }

  const player2InstructionsStyles = combineObjects([
    styleStaticComponent(SSL.player2Instructions),
    {
      textAlign: "center",
      color: `rgb(${theme.color2})`
    }
  ]);

  const player2SpanStyles = {
    color: `rgb(${theme.color1})`
  }

  // START BUTTON ///////////////////////////////////////
  const startButtonStyles = (
    combineObjects([
      styleStaticComponent(SSL.startButton),
      {
        border: `5px solid rgb(${theme.color1})`,
        borderRadius: `${SSL.startButton.fontSize}px`,
        textAlign: "center",
        color: `rgb(${theme.color2})`,
        cursor: "pointer"
      }
    ])
  )

  // CLICK START BUTTON //////////////////////////////////
  function handleStartButtonClick() {
    dispatchCurrentMode({type: "SWITCH_TO_GAME_MODE"});
    dispatchCurrentGameMode({type: "SWITCH_TO_SERVE_MODE"})
  }

  // RENDERING ////////////////////////////////////////////////////////////////////////////////////
  return (
    <div style={styleStaticComponent(SSL.container)}>
      <div style={titleStyles}>PONG PONG</div>

      <div style={player1InstructionsStyles}>
        Player 1, use the <span style={player1SpanStyles}>W</span> and <span style={player1SpanStyles}>S</span> keys to move your paddle.
      </div>

      <div
        style={player2InstructionsStyles}
      >
        Player 2, use the <span style={player2SpanStyles}>P</span> and <span style={player2SpanStyles}>L</span> keys to move your paddle.
      </div>

      <div
        style={startButtonStyles}
        onClick={handleStartButtonClick}
      >
        START!
      </div>
    </div>
  );
}
