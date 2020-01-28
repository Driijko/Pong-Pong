// IMPORTS ////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useContext, useState } from 'react'

// Import contexts 
import WindowSizeContext from '../../1 Control Level/1.0 Spatial Layout/WindowSizeContext';
import ThemesContext from '../../1 Control Level/1.1 Styling/ThemesContext';
import FontsContext from '../../1 Control Level/1.1 Styling/FontsContext';

// Import components 
import Prompt from './Prompt';
import BeginButton from './BeginButton';

// Import static spatial layout function 
import openingPromptSSL from './openingPromptSSL';

// Import helper functions 
import styleStaticComponent from '../../../helper functions/styleStaticComponent';
import combineObjects from '../../../helper functions/combineObjectsFunction';

export default function OpeningPrompt(props) {

  // Access global variables /////////////////////////////////////////////////////////////////////
  const {windowSize} = useContext(WindowSizeContext);
  const {themes} = useContext(ThemesContext);
  const theme = themes.theme0
  const {fonts} = useContext(FontsContext);

  // User Selections as regards enabling audio and/or fullscreen-view. ////////////////////////////
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);
  const [optionDecisions, setOptionDecisions] = useState({
    audioOptionSelected: false,
    fullScreenOptionSelected: false
  })

  function userSelectsAudioEnable() {
    setAudioEnabled(true);
    setOptionDecisions({
      ...optionDecisions,
      audioOptionSelected: true
    })
  }

  function userSelectsAudioDisable() {
    setAudioEnabled(false);
    setOptionDecisions({
      ...optionDecisions,
      audioOptionSelected: true
    })
  }

  function userSelectsFullScreenEnable() {
    setFullScreenEnabled(true);
    setOptionDecisions({
      ...optionDecisions,
      fullScreenOptionSelected: true
    })
  }

  function userSelectsFullScreenDisable() {
    setFullScreenEnabled(false);
    setOptionDecisions({
      ...optionDecisions,
      fullScreenOptionSelected: true
    })
  }

  // Spatial Layout /////////////////////////////////////////////////////////////////////////////

  // Access the static spatial layout
  const [ SSL, setSSL ] = useState(openingPromptSSL(windowSize));

  // Size and resize based on the windowSize
  useEffect(
    () => {
      setSSL(openingPromptSSL(windowSize))
    },
    [windowSize]
  )

  // Style the main container //////////////////////////////////////////////////////////////////
  const containerStyles = (
    combineObjects([
      styleStaticComponent(SSL.container),
      {
        border: `5px solid rgb(${theme.color0})`,
        fontFamily: `${fonts.font0}`,
        color: `rgb(${theme.color1})`
      }
    ])
  )

  // Render /////////////////////////////////////////////////////////////////////////////////
  
  return (
    <div
     style={containerStyles}>
      <Prompt 
        promptType="audio"
        SSL={SSL.audioPrompt}
        theme={theme}
        userSelectsEnable={userSelectsAudioEnable}
        userSelectsDisable={userSelectsAudioDisable}
      />
      <Prompt
        promptType="full-screen"
        SSL={SSL.fullScreenPrompt}
        theme={theme}
        userSelectsEnable={userSelectsFullScreenEnable}
        userSelectsDisable={userSelectsFullScreenDisable}
      />
      <BeginButton
        SSL={SSL.beginButton}
        theme={theme}
        audioEnabled={audioEnabled}
        fullScreenEnabled={fullScreenEnabled}
        optionDecisions={optionDecisions}
      />
     </div>
  )

}