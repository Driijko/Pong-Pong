import React, {useContext} from 'react'

// Import contexts
import GameStateContext from '../../1 Control Level/GameStateContext';
import ThemesContext from '../../1 Control Level/1.1 Styling/ThemesContext';

// Import helper functions
import combineObjects from '../../../helper functions/combineObjectsFunction';

export default function ScoreBoard(props) {

  // Access the global score variable
  const {score} = useContext(GameStateContext);

  // Styles ///////////////////////////////////////////////////////////////////////

  // Theme
  const {themes} = useContext(ThemesContext);
  const theme = themes.theme0;

  // Container
  const containerStyles = (
    combineObjects([
      props.SSL.container,
      {
        border: `2px solid rgb(${theme.color1})`
      }
    ])
  )

  // Score Board
  const textColor = {color: `rgb(${theme.color2})`};

  const player1ScoreStyles = (
    combineObjects([
      props.SSL.player1Score,
      textColor
    ])
  )

  const player2ScoreStyles = (
    combineObjects([
      props.SSL.player2Score,
      textColor
    ])
  )

  return (
    <div
      style={containerStyles}
    >
      <div 
        style={player1ScoreStyles}
      >
        {`${score.player1}`}
      </div>

      <div
        style={player2ScoreStyles}
      >
        {`${score.player2}`}
      </div>
    </div>
  )

}