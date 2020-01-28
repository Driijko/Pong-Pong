import React, {useContext} from 'react';

// Import contexts
import ModeContext from '../../2 Mode Level/ModeContext';

// Import helper functions
import styleStaticComponent from '../../../helper functions/styleStaticComponent';
import combineObjects from '../../../helper functions/combineObjectsFunction';

function BeginButton(props) {

  // Style Begin Button ///////////////////////////////////////////////////////
  const beginButtonStyles = (
    combineObjects([
      styleStaticComponent(props.SSL.beginButton),
      {
        textAlign: "center",
        verticalAlignt: "middle",
        lineHeight: `${props.SSL.beginButton.height}px`,
        border: `4px solid rgb(${props.theme.color0})`,
        borderRadius: `${props.SSL.beginButton.width}px`,
        cursor: "pointer"
      }
    ])
  )

  // When the user clicks the begin button, if they have made all the relevant decisions, 
  // we determine if we should enable audio in the modes following the 'opening prompt mode',
  // and whether we should transistion to fullscreen. 
  // Finally, we update the current mode to 'title screen mode'.
  const {enableAudio, dispatchCurrentMode} = useContext(ModeContext);

  function handleClick() {

    if (props.optionDecisions.audioOptionSelected
        && props.optionDecisions.fullScreenOptionSelected) {

      if (props.fullScreenEnabled) {
        const rootElement = document.getElementById("root");
        rootElement.requestFullscreen();
      }
  
      if (props.audioEnabled) {
        enableAudio();
      }

      dispatchCurrentMode({type: "SWITCH_TO_TITLE_SCREEN_MODE"});

    }
  }


  return (
    <div
      style={styleStaticComponent(props.SSL.container)}
    >
      <div
        style={beginButtonStyles}
        onClick={handleClick}
      >
        Begin
      </div>

    </div>
  )
}

export default BeginButton