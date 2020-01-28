// TITLE SCREEN STATIC SPATIAL LAYOUT ////////////////////////////////////////////////////////////

// Import helper functions 
import center from '../../../helper functions/centerFunction';

function titleScreenSSL(windowSize) {

  // PRIMARY VALUES ////////////////////////////////////////////////////////////////////////
  // DEFAULT SETTINGS

  // Font Sizes
  let fontSize0 = 150;
  let fontSize1 = 50;

  // Offsets
  let offset1 = 200;
  let offset2 = 0;

  // Title
  let messageWidth = 900;

  // WINDOWSIZE ADJUSTMENTS /////////////////////////////////////////////////////////////////////
  if (windowSize.width <= 900) {
    fontSize0 = Math.round(windowSize.width / 7);
    messageWidth = windowSize.width - 20;
    fontSize1 = Math.round(windowSize.width / 15);

  }
  else if (windowSize.height <= 600) {
    fontSize1 = Math.round(windowSize.height / 10);
    fontSize0 = Math.round(windowSize.height / 7);
    offset1 = Math.round(windowSize.height / 3);
    offset2 = Math.round(windowSize.height / 6);
  }

  if (windowSize.width < 550) {
    offset1 = Math.round(windowSize.width / 3);
  }

  // DEPENDENT VARIABLES ////////////////////////////////////////////////////////////////////

  // Start Button
  const playAgainButtonWidth = fontSize1 * 8;

  // RETURN STATEMENT //////////////////////////////////////////////////////////////////////
  return {
    container: {
      width: `${windowSize.width}px`,
      height: `${windowSize.height}px`
    },
    message: {
      position: "absolute",
      width: `${messageWidth}px`,
      fontSize: `${fontSize0}px`,
      left: `${center(windowSize.width, messageWidth)}px`,
      top: `${center(windowSize.height, fontSize0) - offset1}px`
    },
    playAgainButton: {
      position: "absolute",
      width: `${playAgainButtonWidth}px`,
      top: `${(windowSize.height / 2) + offset2}px`,
      left: `${center(windowSize.width, playAgainButtonWidth)}px`,
      fontSize: `${fontSize1}px`,
      border: `5px solid rgb(0, 255, 242)`,
      borderRadius: `${fontSize1}px`,
      textAlign: "center",
      color: `rgb(255, 0, 179)`,
      cursor: "pointer"
    }
  }
}

export default titleScreenSSL;