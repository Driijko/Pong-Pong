// MODES
// 0: "opening prompt",
// 1: "title screen",
// 2: "game",
// 3: "end screen"

function modeReducer(currentMode, action) {

  switch(action.type) {

    case "SWITCH_TO_TITLE_SCREEN_MODE":
      return (
        "title screen"
      )

    case "SWITCH_TO_GAME_MODE":
      return (
        "game"
      )

    case "SWITCH_TO_END_SCREEN_MODE":
      return (
        "end screen"
      )

    default:
      throw new Error();
  }  
}

export default modeReducer;