import React, {useContext} from 'react';

// Import default stylings /////////////////////////////////////////////////////////////////////////////
import './App.css'

// Import providers /////////////////////////////////////////////////////////////////////////////////////
import {WindowSizeContextProvider} from '../1 Control Level/1.0 Spatial Layout/WindowSizeContext';
import {IntervalContextProvider} from '../1 Control Level/IntervalContext';
import {FontsContextProvider} from '../1 Control Level/1.1 Styling/FontsContext';
import {ThemesContextProvider} from '../1 Control Level/1.1 Styling/ThemesContext';
import {GameStateContextProvider} from '../1 Control Level/GameStateContext';
import {ModeContextProvider} from '../2 Mode Level/ModeContext';
import {ControlsContextProvider} from '../1 Control Level/ControlsContext';


// Import components ///////////////////////////////////////////////////////////////////////////////
import Mode from '../2 Mode Level/Mode'

export default function App() {

  return (
    <div>
      <WindowSizeContextProvider>
        <IntervalContextProvider>
          <ThemesContextProvider>
            <FontsContextProvider>
              <GameStateContextProvider>
                <ModeContextProvider>
                  <ControlsContextProvider>
                    <Mode />
                  </ControlsContextProvider>                  
                </ModeContextProvider>               
              </GameStateContextProvider>              
            </FontsContextProvider>
          </ThemesContextProvider>
        </IntervalContextProvider>
      </WindowSizeContextProvider>
    </div>
  );

}