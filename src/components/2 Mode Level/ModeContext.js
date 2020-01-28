import React, {createContext, useState, useReducer} from 'react';

// Import mode reducer function ///////////////////////////////////////////////////////////////////////////
import modeReducer from './modeContextReducer';
import gameModeReducer from './gameModeContextReducer';

// Create context ////////////////////////////////////////////////////////////////////////////////////////
const ModeContext = createContext();

function ModeContextProvider(props) {

  // MODES ////////////////////////////////////////////////////////////////////////////////////
  // 0: "opening prompt",
  // 1: "title screen",
  // 2: "game",
  // 3: "end screen"

  const initialMode = "opening prompt";
  // const initialMode = "end screen";

  // The mode reducer function is imported from a seperate file.
  const [currentMode, dispatchCurrentMode] = useReducer(modeReducer, initialMode);

  // GAME MODES ////////////////////////////////////////////////////////////////////////////////////
  // 0: "serve",
  // 1: "ball in play",
  // 2: "score"

  const initialGameMode = "serve";

  // The game mode reducer function is imported from a seperate file.
  const [currentGameMode, dispatchCurrentGameMode] = useReducer(gameModeReducer, initialGameMode);

  // SERVE MODES /////////////////////////////////////////////////////////////////////////////////////
  // 0: "player 1"
  // 1: "player 2"

  const initialServeMode = "player 1";

  const [currentServeMode, setCurrentServeMode] = useState(initialServeMode);

  function updateCurrentServeMode(newServeMode) {
    setCurrentServeMode(newServeMode);
  }

  // AUDIO MODES //////////////////////////////////////////////////////////////////////////////////////
  // 0: "audio enabled"
  // 1: "audio disabled"

  // We also have an "audio mode" which determines whether we render audio components.
  const [audioEnabled, setAudioEnabled] = useState(true);

  function enableAudio() {
    setAudioEnabled(true);
  }

  // PROVIDER /////////////////////////////////////////////////////////////////////////////////

  return (
    <ModeContext.Provider
      value={{
        currentMode, 
        dispatchCurrentMode, 
        currentGameMode, 
        dispatchCurrentGameMode,
        currentServeMode,
        updateCurrentServeMode,
        audioEnabled, 
        enableAudio,
      }}
    >
      { props.children}
    </ModeContext.Provider>
  )
}

export default ModeContext;
export {ModeContextProvider};