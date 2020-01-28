// GAME MODES
// 0: "n/a"
// 1: "serve",
// 2: "ball in play",
// 3: "score"

function gameModeReducer(currentGameMode, action) {

  switch(action.type) {

    case "SWITCH_TO_N/A_MODE":
      return (
        "n/a"
      )

    case "SWITCH_TO_SERVE_MODE":
      return (
        "serve"
      )

    case "SWITCH_TO_BALL_IN_PLAY_MODE":
      return (
        "ball in play"
      )

    case "SWITCH_TO_SCORE_MODE":
      return (
        "score"
      )

    default:
      throw new Error();
  }  
}

export default gameModeReducer;