// TITLE SCREEN STATIC SPATIAL LAYOUT ////////////////////////////////////////////////////////////

// Import helper functions 
import center from '../../../helper functions/centerFunction';

function titleScreenSSL(windowSize) {

  // PRIMARY VALUES ////////////////////////////////////////////////////////////////////////
  // DEFAULT SETTINGS

  // Font Sizes
  let fontSize0 = 200;
  let fontSize1 = 100;
  let fontSize2 = 30;

  // Offsets
  let offset0 = 20;
  let offset1 = 200;
  let offset2 = 100;

  // Title
  let titleWidth = 750;

  // WINDOWSIZE ADJUSTMENTS /////////////////////////////////////////////////////////////////////
  if (windowSize.width <= 750) {
    fontSize0 = Math.round(windowSize.width / 4);
    fontSize1 = Math.round(windowSize.width / 7.5);
    titleWidth = windowSize.width - 20;
  }
  else if (windowSize.height <= 600) {
    fontSize0 = Math.round(windowSize.height / 3);
    offset1 = Math.round(windowSize.height / 3);
    fontSize1 = Math.round(windowSize.height / 6);
    offset2 = Math.round(windowSize.height / 6);
  }

  if (windowSize.width >= 550 && windowSize.width <= 750) {
    fontSize2 = Math.round(windowSize.width / 25);
  }
  else if (windowSize.width < 550) {
    fontSize2 = 22;
    offset0 = 20 + Math.round((windowSize.width * 10) / windowSize.width);
    offset1 = Math.round(windowSize.width / 3);
  }

  // DEPENDENT VARIABLES ////////////////////////////////////////////////////////////////////

  // Instructions
  const instructionsWidth = titleWidth;

  // Start Button
  const startButtonWidth = fontSize1 * 3;

  // RETURN STATEMENT //////////////////////////////////////////////////////////////////////
  return {
    container: {
      width: windowSize.width,
      height: windowSize.height
    },
    title: {
      width: titleWidth,
      fontSize: fontSize0,
      left: center(windowSize.width, titleWidth),
      top: center(windowSize.height, fontSize0) - offset1
    },
    player1Instructions: {
      width: instructionsWidth,
      left: center(windowSize.width, instructionsWidth),
      top: center(windowSize.height, fontSize2) - offset0,
      fontSize: fontSize2
    },
    player2Instructions: {
      width: instructionsWidth,
      left: center(windowSize.width, instructionsWidth),
      top: center(windowSize.height, fontSize2) + offset0,
      fontSize: fontSize2
    },
    startButton: {
      width: startButtonWidth,
      top: (windowSize.height / 2) + offset2,
      left: center(windowSize.width, startButtonWidth),
      fontSize: fontSize1
    }
  }
}

export default titleScreenSSL;