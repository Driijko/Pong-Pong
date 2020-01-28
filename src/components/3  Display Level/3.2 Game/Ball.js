// IMPORTS ////////////////////////////////////////////////////////////////////////////////
import React, { useContext, useState, useEffect } from "react";

// Import contexts
import ThemesContext from "../../1 Control Level/1.1 Styling/ThemesContext";
import ModesContext from "../../2 Mode Level/ModeContext";
import IntervalContext from "../../1 Control Level/IntervalContext";
import DynamicContext from "../../1 Control Level/1.0 Spatial Layout/DynamicContext";
import GameStateContext from '../../1 Control Level/GameStateContext';

// Import helper functions
import combineObjects from "../../../helper functions/combineObjectsFunction";
import {willRectsOverlapHsp} from "../../../helper functions/collisionDetection";

// Import sound-effects
import ballImpactSound from '../../../assets/audio/sound effects/ballImpacts.mp3';
import ballSpeedsUpSound from '../../../assets/audio/sound effects/ballSpeedsUp.wav';
import whistleSound from '../../../assets/audio/sound effects/sports-whistle.mp3';
import audienceCheer from '../../../assets/audio/sound effects/Cheering.mp3';
import finalScoreMusic from '../../../assets/audio/music/final score music.wav';


// BALL COMPONENT //////////////////////////////////////////////////////////////////////
function Ball(props) {
  // Access contexts ////////////////////
  const { dispatchCurrentMode, currentGameMode, dispatchCurrentGameMode, currentServeMode, 
          updateCurrentServeMode, audioEnabled } = useContext(ModesContext);
  const { globalInterval } = useContext(IntervalContext);
  const { player1PaddleTop, player2PaddleTop } = useContext(DynamicContext);
  const { dispatchScore, winner } = useContext(GameStateContext);

  // Sound Effects ///////////////////////////////////////////////////////////////////
  const audioElementRef1 = React.createRef();
  const audioElementRef2 = React.createRef();
  const audioElementRef3 = React.createRef();
  const [audioPlayer3CurrentSound, setAudioPlayer3CurrentSound] = useState(whistleSound);
  const audioPlayer1 = (
    <audio
      type="audio/mpeg" autoPlay={true} src={ballImpactSound} ref={audioElementRef1}
    ></audio>
  )

  const audioPlayer2 = (
   <audio 
      type="audio/mpeg" autoPlay={true} src={ballSpeedsUpSound} ref={audioElementRef2}
    ></audio>
  )

  const audioPlayer3 = (
    <audio 
      type="audio/mpeg" autoPlay={true} src={audioPlayer3CurrentSound} ref={audioElementRef3} loop={false}
    ></audio>    
  )

  // Black Blocks //////////////////////////////////////////////////
  const [blockColor, setBlockColor] = useState("0, 0, 0");
  const [colorChangeCounter, setColorChangeCounter] = useState(0);

  const block1Style = (
    combineObjects([
      props.SSL.blackBlocks.block1,
      {
        backgroundColor: `rgb(${blockColor})`,
      }
    ])
  )

  const block2Style = (
    combineObjects([
      props.SSL.blackBlocks.block2,
      {backgroundColor: `rgb(${blockColor})`}
    ])
  )

  const block3Style = (
    combineObjects([
      props.SSL.blackBlocks.block3,
      {backgroundColor: `rgb(${blockColor})`}
    ])
  )

  const block4Style = (
    combineObjects([
      props.SSL.blackBlocks.block4,
      {backgroundColor: `rgb(${blockColor})`}
    ])
  )

  // Dynamic Positioning ////////////////////////////////////////////////////////

  // Dynamic Variables /////////////////////////////
  const {
    initialLeft,
    initialTop,
    serveTop,
    player1ServeLeft,
    player2ServeLeft,
    topBoundary,
    bottomBoundary,
    leftBoundary,
    rightBoundary,
    ballSize,
    player1Hpos,
    player2Hpos,
    paddleHeight,
    paddleAreaHeight,
    angleSets,
  } = props.SSL.dynamic;

  // Paddles //////////////////////////////////////
  function player1PaddlePos() {
    return [
      player1Hpos,
      [player1PaddleTop, player1PaddleTop + (paddleHeight - 1)]
    ];
  }

  function player2PaddlePos() {
    return [
      player2Hpos,
      [player2PaddleTop, player2PaddleTop + (paddleHeight - 1)]
    ];
  }

  // Ball //////////////////////////////////////////////////////////////////////////////////////////
  // Position //////////////////////////////////////
  const [left, setLeft] = useState(initialLeft);
  const [top, setTop] = useState(initialTop);

  function hpos() {
    return [left, left + ballSize - 1];
  }

  function vpos() {
    return [top, top + ballSize - 1];
  }

  function pos() {
    return [hpos(), vpos()];
  }

  function centerPoint() {
    return top + (ballSize / 2);
  }

  // The state variables 'currentAngleSet' and 'currentAngle' keeps track of what index the current angle the ball is
  // moving along is, relative to the set of angles given above in the array 'angleSets'.
  const [currentAngleSet, setCurrentAngleSet] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(2);
  const [impactCounter, setImpactCounter] = useState(0);

  const [hsp, setHsp] = useState(angleSets[currentAngleSet][currentAngle][0]);
  const [vsp, setVsp] = useState(angleSets[currentAngleSet][currentAngle][1]);

  // SERVE MODE ///////////////////////////////////////////////////////////////////////

  // The ball follows the paddle during the 'serve game mode'.
  useEffect(() => {
    if (currentGameMode === "serve") {
      if (currentServeMode === "player 1") {
        setTop(player1PaddleTop + serveTop);
      } else if (currentServeMode === "player 2") {
        setTop(player2PaddleTop + serveTop);
      }
    }
  });

  // We adjust the balls left according to which player is serving.
  useEffect(() => {
    if (currentGameMode === "serve") {
      if (currentServeMode === "player 1") {
        setLeft(player1ServeLeft);
      } else if (currentServeMode === "player 2") {
        setLeft(player2ServeLeft);
      }
    }
  }, [currentGameMode]);

  // BALL IN PLAY MODE //////////////////////////////////////////////////////////////////////////////
  // We adjust the ball's position based on it's speed, and whether it collides with certain objects
  // We have four functions for adjusting the ball's movement based on collisions: 
  // The function 'ballImpacts' applies every time there is a collision, and uses the other three functions.
  // The function 'ballSpeedsUp' checks whether to speed up the ball or not, and returns true or false,
  // which the functions 'bounceOffPaddle' and 'bounceOffBoundary' need to know in order to select the right
  // angle for the ball to move along.

  // After a certain number of impacts, the ball increases in speed, up to a max speed.
  const numOfImpactsToChangeSpeed = 5;
  const maxSpeed = 5;

  function ballSpeedsUp() {
    if (
      currentAngleSet < maxSpeed
      && (impactCounter + 1) % numOfImpactsToChangeSpeed === 0 
    ) {
      setCurrentAngleSet(currentAngleSet + 1);
      setBlockColor(theme.color2);
      return true;
    }
    else return false;
  }

  function bounceOffPaddle(paddle, relVposToPaddle, newSpeed) {
    let newAngleIndex = Math.floor(relVposToPaddle/paddleAreaHeight);
    if (newAngleIndex > 4) newAngleIndex = 4;
    else if (newAngleIndex < 0) newAngleIndex = 0;
    setCurrentAngle(newAngleIndex);
    const newAngle = newSpeed ? angleSets[currentAngleSet + 1][newAngleIndex]: angleSets[currentAngleSet][newAngleIndex];
    setHsp(paddle === "player 1" ? newAngle[0] : -newAngle[0]);
    setVsp(newAngle[1]);
  }

  function bounceOffBoundary(newSpeed) { 
    let newAngle = 2;
    if (currentAngle === 0) newAngle = 4; 
    else if (currentAngle === 4) newAngle = 0;
    else if (currentAngle === 1) newAngle = 3;
    else if (currentAngle === 3) newAngle = 1;
    setCurrentAngle(newAngle);

    if (newSpeed) {
      setHsp(angleSets[currentAngleSet + 1][newAngle][0] * Math.sign(hsp));
      setVsp(angleSets[currentAngleSet + 1][newAngle][1]);
    }
    else {
      setVsp(angleSets[currentAngleSet][newAngle][1]);
    }

    setLeft(left + hsp);
    setTop(top - vsp);
  }

  function ballImpacts(collidesWith) {
    setImpactCounter(impactCounter + 1);
    const newSpeed = ballSpeedsUp();
    if(collidesWith === "player 1") {
      bounceOffPaddle("player 1", centerPoint() - player1PaddleTop, newSpeed);
    }
    else if (collidesWith === "player 2") {
      bounceOffPaddle("player 2", centerPoint() - player2PaddleTop, newSpeed);
    }
    else {
      bounceOffBoundary(newSpeed);
    }

    if (newSpeed) {
      audioElementRef2.current.play();
    }
    audioElementRef1.current.currentTime = 0;
    audioElementRef1.current.play();

  }

  // Here we apply all these functions at the rate set by the global interval. We also keep
  // track of the score mode here.
  const [scoreModeClock, setScoreModeClock] = useState(0);

  useEffect(() => {
    if (currentGameMode === "ball in play") {
      // Move past right or left boundaries.
      if (left >= rightBoundary || left <= leftBoundary) {
        dispatchCurrentGameMode({type: "SWITCH_TO_SCORE_MODE"})
      } 
      // Bounce off paddle 1.
      if (willRectsOverlapHsp(hsp, pos(), player1PaddlePos()) && left >= player1Hpos[1]) {
        ballImpacts("player 1");
      }
      // Bounce off paddle 2.
      else if (willRectsOverlapHsp(hsp, pos(), player2PaddlePos()) && left + ballSize <= player2Hpos[0]) {
        ballImpacts("player 2");
      }
      // Bounce off top or bottom boundaries.
      else if (top <= topBoundary || top >= bottomBoundary) {
        ballImpacts("boundary");
      }
      // Move freely.
      else{
        setLeft(left + hsp);
        setTop(top + vsp);
      }

      if (blockColor === theme.color2) {
        setColorChangeCounter(colorChangeCounter + 1);
        if (colorChangeCounter === 10) {
          setBlockColor("0, 0, 0");
          setColorChangeCounter(0);
        }
      }
    }
    if (currentGameMode === "score") {
      setScoreModeClock(scoreModeClock + 1);
      let newAngleSet = 0;
      if (currentAngleSet > 0) {
        newAngleSet = currentAngleSet - 1;
      }
      if (scoreModeClock === 0) {
        setHsp(0);
        setVsp(0);
        setImpactCounter(0);
        audioElementRef3.current.play();
      }
      else if (scoreModeClock === 40) {
        setAudioPlayer3CurrentSound(audienceCheer);
        if (left <= rightBoundary) {
          dispatchScore({type: "PLAYER_2_SCORES"});
        } 
        else {
          dispatchScore({type: "PLAYER_1_SCORES"})
        }
      }
      else if (scoreModeClock === 80) {
        if (winner === "undetermined") {
          if(currentServeMode === "player 1") {
            updateCurrentServeMode("player 2");
            setHsp(-angleSets[newAngleSet][2][0]);
          }
          else {
            updateCurrentServeMode("player 1");
            setHsp(angleSets[newAngleSet][2][0]);
          }
          setCurrentAngleSet(newAngleSet);
          setCurrentAngle(2);
          setVsp(angleSets[newAngleSet][2][1]);
          setScoreModeClock(0);
          dispatchCurrentGameMode({type: "SWITCH_TO_SERVE_MODE"});
        }
      }
      else if (scoreModeClock === 200) {
        setAudioPlayer3CurrentSound(finalScoreMusic);
      }
      else if (scoreModeClock === 300) {
        dispatchCurrentMode({type: "SWITCH_TO_END_SCREEN_MODE"});
        dispatchScore({type: "RESET_SCORE"})
      }
    }
  }, [globalInterval]);

  // Styling ////////////////////////////////
  const { themes } = useContext(ThemesContext);
  const theme = themes.theme0;

  const styles = combineObjects([
    props.SSL.static,
    {
      backgroundColor: `rgb(${theme.color2})`,
      left: `${left}px`,
      top: `${top}px`
    }
  ]);


  return (
    <div>
      {audioEnabled ? audioPlayer1 : null}
      {audioEnabled ? audioPlayer2: null}
      {audioEnabled ? audioPlayer3: null}
      <div style={block1Style}>FASTER!</div>
      <div style={block2Style}>{`SPEED LEVEL: ${currentAngleSet}`}</div>
      <div style={block3Style}>FASTER!</div>
      <div style={block4Style}></div>
      <div style={styles}></div>
    </div>
  );
}

export default Ball;
