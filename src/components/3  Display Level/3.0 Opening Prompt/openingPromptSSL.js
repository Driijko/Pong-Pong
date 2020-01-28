// OPENING PROMPT STATIC SPATIAL LAYOUT/////////////////////////////////////////////////////

// Import helper functions 
import center from '../../../helper functions/centerFunction';

function openingPromptSSL(windowSize) {

  // PRIMARY VALUES ////////////////////////////////////////////////////////////////////////
  // DEFAULT SETTINGS

  // Container
  let containerSize = 500;

  // FontSizes
  let fontSize0 = 35;
  let fontSize1 = 40;

  // Offsets
  let offset0 = 30;
  let offset1= 60;
  let offset2 = 5;

  // Prompt Buttons
  let promptButtonWidth = 100;

  // Begin Button
  let beginButtonHeight = 50;
  let beginButtonWidth = 200;

  // WINDOWSIZE ADJUSTMENTS //////////////////////////////////////////////////////////////////
  if (windowSize.width <= 320) {
    containerSize = 270;
  }
  else if (windowSize.width <= 550 ) {
    containerSize = windowSize.width - 50
  }

  if (windowSize.width <= 400 ) {
    fontSize0 = 30;
    fontSize1 = 35;
    offset0 = 20;
    offset1 = 40;
    promptButtonWidth = 70;
    beginButtonHeight = 35;
  }

  // DEPENDENT VARIABLES ///////////////////////////////////////////////////////////////////////

  // Container 
  const container = {
    width: containerSize,
    height: containerSize,
    top: Math.round(center(windowSize.height, containerSize)),
    left: Math.round(center(windowSize.width, containerSize)) - offset2
  }

  // Sub-Containers
  const subContainers = [];
  const subContainerHeight = Math.round(containerSize / 3);
  const subContainerWidth = containerSize;
  const subContainerFontSizes = [fontSize0, fontSize0, fontSize1];

  for ( let i = 0 ; i < 3 ; i++ ) {
    subContainers[i] = {
      width: subContainerWidth,
      height: subContainerHeight,
      top: subContainerHeight * i,
      fontSize: subContainerFontSizes[i]
    }
  }

  // Prompts
  const prompt = {
    top: Math.round(subContainerHeight / 2) - offset0,
    width: subContainerWidth,
  }

  // Prompt Buttons
  const promptButtonTop = Math.round(subContainerHeight / 2) + offset0;

  const yesButton = {
    top: promptButtonTop,
    width: promptButtonWidth,
    left: Math.round(center(subContainerWidth, promptButtonWidth)) - offset1,
  }

  const noButton = {
    top: promptButtonTop,
    width: promptButtonWidth,
    left: Math.round(center(subContainerWidth, promptButtonWidth)) + offset1
  }

  // Begin Button
  const beginButton = {
    width: beginButtonWidth,
    height: beginButtonHeight, 
    top: Math.round(center(subContainerHeight, beginButtonHeight)),
    left: Math.round(center(subContainerWidth, beginButtonWidth))
  }

  return {
    container: container,
    audioPrompt: {
      container: subContainers[0],
      prompt: prompt,
      yesButton: yesButton,
      noButton: noButton
    },
    fullScreenPrompt: {
      container: subContainers[1],
      prompt: prompt,
      yesButton: yesButton,
      noButton: noButton
    },
    beginButton: {
      container: subContainers[2],
      beginButton: beginButton
    }
  }
}

export default openingPromptSSL;