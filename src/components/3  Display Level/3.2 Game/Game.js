// IMPORTS ///////////////////////////////////////////////////////////////////////////////////
import React, {useContext, useState, useEffect} from 'react';

// Import contexts 
import WindowSizeContext from '../../1 Control Level/1.0 Spatial Layout/WindowSizeContext';
import ControlsContext from '../../1 Control Level/ControlsContext';
import IntervalContext from '../../1 Control Level/IntervalContext';
import DynamicContext from '../../1 Control Level/1.0 Spatial Layout/DynamicContext';

// Import Components
import GameCourt from './GameCourt';
import ScoreBoard from './ScoreBoard';
import Paddle from './Paddle';
import Ball from './Ball';

// Import static spatial layout function
import gameSSL from './gameSSL';

// GAME COMPONENT ////////////////////////////////////////////////////////////////////////////////////
function Game() {

  // GlOBAL INTERVAL /////////////////////////////////////////////////////////////////////////////
  const {globalInterval} = useContext(IntervalContext);

  // SPATIAL LAYOUT ////////////////////////////////////////////////////////////////////////////////
  // STATIC SPATIAL LAYOUT ////////////////////////////
  // Access window size
  const {windowSize} = useContext(WindowSizeContext);

  // Acces static spatial layout
  const [SSL, setSSL] = useState(gameSSL(windowSize));

  // Size and resize based on the windowSize
  useEffect(() => {
    setSSL(gameSSL(windowSize));
  }, [windowSize]);

  // Size the game component based on the window
  const gameComponentStyles = {
    width: `${windowSize.width}px`,
    height: `${windowSize.height}px`,
  }

  // DYNAMIC POSITIONING //////////////////
  const {updatePlayer1PaddleTopContext, updatePlayer2PaddleTopContext} = (
    useContext(DynamicContext)
  );

  // CONTROLS ///////////////////////////
  const {controls} = useContext(ControlsContext);

  // RENDER /////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div
      style={gameComponentStyles}
    >

      <GameCourt 
        containerSSL={SSL.gameCourt}
        verticalLineSSL={SSL.verticalLine}
      />

      <ScoreBoard SSL={SSL.scoreBoard} />

      <Paddle 
        SSL={SSL.paddle1}
        controls={controls.player1}
        globalInterval={globalInterval}
        dynamicContextUpdate={updatePlayer1PaddleTopContext}
      />

      <Paddle
        SSL={SSL.paddle2}
        controls={controls.player2}
        globalInterval={globalInterval}
        dynamicContextUpdate={updatePlayer2PaddleTopContext}
      />

      <Ball 
        SSL={SSL.ball}
      />
    
    </div>

    
  )
}

export default Game;