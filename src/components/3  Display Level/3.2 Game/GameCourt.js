// IMPORTS /////////////////////////////////////////////////////////////////////////////////////////
import React, {useContext} from 'react'

// Import contexts
import ThemesContext from '../../1 Control Level/1.1 Styling/ThemesContext';

// Import helper functions
import combineObjects from '../../../helper functions/combineObjectsFunction';

// GAMECOURT COMPONENT ////////////////////////////////////////////////////////////////////////////
export default function GameCourt(props) {

  // Styles //////////////////////////////////////////////////
  
  // Theme
  const {themes} = useContext(ThemesContext);
  const theme = themes.theme0;

  // Container
  const containerStyles = (
    combineObjects([
      props.containerSSL,
      {
        border: `2px solid rgb(${theme.color1})`
      }
    ])
  )

  const verticalLineStyles = (
    combineObjects([
      props.verticalLineSSL,
      {
        borderRight: `5px dashed rgb(${theme.color0})`
      }
    ])
  )

  return (
    <div style={containerStyles}>
      <div style={verticalLineStyles}></div>
    </div>
  )
}