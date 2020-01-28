import React, { useContext, useState, useEffect} from 'react';

// Import Providers
import {DynamicContextProvider} from '../1 Control Level/1.0 Spatial Layout/DynamicContext';

// Import contexts ////////////////////////////////////////////////////////////////////////////////
import IntervalContext from '../1 Control Level/IntervalContext';
import ModeContext from '../2 Mode Level/ModeContext';

// Import components ////////////////////////////////////////////////////////////////////////////////////////
import OpeningPrompt from '../3  Display Level/3.0 Opening Prompt/OpeningPrompt'
import TitleScreen from '../3  Display Level/3.1 Title Screen/TitleScreen'
import Game from '../3  Display Level/3.2 Game/Game';
import EndGameScreen from '../3  Display Level/3.3 End Game Screen/EndGameScreen'
import MusicPlayer from '../3  Display Level/MusicPlayer';

function Mode() {

// MODES
// 0: "opening prompt",
// 1: "title screen",
// 2: "game",
// 3: "end screen"

// GAME MODES
// 0: "n/a"
// 1: "serve",
// 2: "ball in play",
// 3: "score"

// SERVE MODES
// 0: "n/a"
// 1: "player 1"
// 2: "player 2"

// AUDIO MODES
// 0: "audio enabled"
// 1: "audio disabled"

  const {globalInterval} = useContext(IntervalContext);


  // The initial value of the state variable 'currentMode' is the string "opening prompt".
  const {
    currentMode, 
    currentGameMode, 
    dispatchCurrentGameMode,
    audioEnabled,
  } = useContext(ModeContext);

  // We time the 'serve' mode, and transistion to the 'ball in play' mode once it's done.
  const [localTimeCounter, setLocalTimeCounter] = useState(0);

  useEffect(
    () => {
      if (currentGameMode === "serve") {
        if (localTimeCounter >= 70) {
          dispatchCurrentGameMode({type: "SWITCH_TO_BALL_IN_PLAY_MODE"});
          setLocalTimeCounter(0);
        }
        else {
          setLocalTimeCounter(localTimeCounter + 1)
        }
      }
    },
    [globalInterval]
  )

  return (
    <div>
      { currentMode === "opening prompt" ? 
        <OpeningPrompt /> :
        null
      }

      { audioEnabled ?
        <MusicPlayer /> :
        null
      }

      { currentMode === "title screen" ?
        <TitleScreen /> :
        null
      }

      { currentMode === "game" ?
        <DynamicContextProvider>
          <Game />
        </DynamicContextProvider> 
        : null
      }

      { currentMode === "end screen" ?
        <EndGameScreen /> 
        : null
      }

    </div>
  )
}

export default Mode;