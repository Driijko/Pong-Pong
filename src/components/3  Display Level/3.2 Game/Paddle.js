import React, {useContext, useState, useEffect} from 'react'

// Import contexts
import ThemesContext from '../../1 Control Level/1.1 Styling/ThemesContext';

// Import helper functions
import combineObjects from '../../../helper functions/combineObjectsFunction';

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////
export default function Paddle(props) {

  // Dynamic Variables ///////////////////////
  const {initialTop, minTop, maxTop, speed} = props.SSL.dynamic;
  const [top, setTop] = useState(initialTop);

  // Styles /////////////////////////////////

  // Container
  const containerStyles = (
    combineObjects([
      props.SSL.container,
      {
        top: `${top}px`
      }
    ])
  )
  
  // Themes
  const {themes} = useContext(ThemesContext);

  // Paddle Areas
  const areaStyles = [];

  const areaColors = [
    themes.theme1[2],
    themes.theme1[1],
    themes.theme1[0],
    themes.theme1[1],
    themes.theme1[2]
  ]

  for( let i = 0 ; i < 5 ; i++ ) {
    areaStyles[i] = combineObjects([
      props.SSL.areas.universal,
      {
        top: props.SSL.areas.top[i],
        backgroundColor: `rgb(${areaColors[i]})`,
        border: `2px solid black`,
        display: "flex"
      }
    ])
  }

  // DYNAMIC POSITIONING //////////////////////////////////
  const {upButtonDown, downButtonDown} = props.controls;

  useEffect(
    () => {
      if ( ! (upButtonDown && downButtonDown) ) {
        if (upButtonDown && top > minTop) {
          setTop(top - speed);
          props.dynamicContextUpdate(top - speed);
        }
        else if (downButtonDown && top < maxTop) {
          setTop(top + speed);
          props.dynamicContextUpdate(top + speed);
        }
      }
    },
    [props.globalInterval]
  )

  useEffect(
    () => {
      props.dynamicContextUpdate(initialTop);
    }, 
    []
  )

  // RENDER //////////////////////////////////////////////////////////////////////
  return (
    <div
      style={containerStyles}
    >
      <div style={areaStyles[0]}></div>
      <div style={areaStyles[1]}></div>
      <div style={areaStyles[2]}></div>
      <div style={areaStyles[3]}></div>
      <div style={areaStyles[4]}></div>

    </div>
  )

}