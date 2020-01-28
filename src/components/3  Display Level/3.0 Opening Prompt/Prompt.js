import React, {useState} from 'react';

// Import helper functions
import combineObjects from '../../../helper functions/combineObjectsFunction';
import styleStaticComponent from '../../../helper functions/styleStaticComponent';

function Prompt(props) {

  // Button Selection //////////////////////////////////////////////////
  const [buttonSelection, setButtonSelection] = useState("none");

  function clickYesButton() {
    setButtonSelection("yes button");
  }

  function clickNoButton() {
    setButtonSelection("no button");
  }

  // Prompt Text ///////////////////////////////////////////////////////
  let prompt = "";

  if (props.promptType === "audio") {
    prompt = "Enable audio?";
  }
  else if (props.promptType === "full-screen") {
    prompt = "Enable full-screen?";
  }

  // Prompt Styling ///////////////////////////////////////////////////
  const promptStyles = (
    combineObjects([
      styleStaticComponent(props.SSL.prompt),
      {textAlign: "center"}
    ])
  )

  // Prompt Buttons /////////////////////////////////////////////////////
  const promptButtonStyles = {
    textAlign: "center",
    border: `2px solid rgb(${props.theme.color0})`,
    cursor: "pointer"
  }

  function themeChangeUponButtonClick(button) {
    if (buttonSelection === button) {
      return {
        backgroundColor: `rgb(${props.theme.color1})`,
        color: `rgb(${props.theme.color2})`
      }
    }
    else {
      return {
        backgroundColor: `rgb(${props.theme.color3})`,
        color: `rgb(${props.theme.color1})`
      }
    }
  }

  // Yes Button Styling
  const yesButtonStyles = (
    combineObjects([
      styleStaticComponent(props.SSL.yesButton),
      promptButtonStyles,
      themeChangeUponButtonClick("yes button")
    ])
  )

  // No Button Styling
  const noButtonStyles = (
    combineObjects([
      styleStaticComponent(props.SSL.noButton),
      promptButtonStyles,
      themeChangeUponButtonClick("no button")
    ])
  )

  return (
    <div
      style={styleStaticComponent(props.SSL.container)}
    >
      <div
        style={promptStyles}
      >{`${prompt}`}</div>

      <div
        style={yesButtonStyles}
        onClick={
          () => {
            clickYesButton();
            props.userSelectsEnable();
        }}
      >YES</div>

      <div
        style={noButtonStyles}
        onClick={
          () => {
            clickNoButton();
            props.userSelectsDisable();
        }}
      >NO</div>
    </div>
  )

}

export default Prompt;