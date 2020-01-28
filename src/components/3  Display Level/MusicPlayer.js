import React, {useState, useContext, useEffect} from 'react';

// Import contexts //////////////////////////////////////////////////////////////////
import ModeContext from '../2 Mode Level/ModeContext';

// Import music files ///////////////////////////////////////////////////////////////////
import titleScreenMusic from '../../assets/audio/music/title screen music.mp3';
import ballInPlayMusic from '../../assets/audio/music/ball in play music.mp3';
import victoryMusic from '../../assets/audio/music/victory music2.mp3';

function MusicPlayer() {

  const {currentMode, currentGameMode} = useContext(ModeContext);

  const [currentTrack, setCurrentTrack] = useState('./title screen music.mp3');

  const audioElementRef = React.createRef();

  const audioElement = <audio src={currentTrack} ref={audioElementRef} type="audio/mpeg" autoPlay={true}></audio>

  useEffect(
    () => {
      if (currentMode === "title screen") {
        setCurrentTrack(titleScreenMusic);
        audioElementRef.current.loop = true;
      }
      else if (currentMode === "game") {
        setCurrentTrack(ballInPlayMusic);
        audioElementRef.current.loop = true;
        audioElementRef.current.volume = 0.7;           
      }
      else if (currentMode === "end screen") {
        setCurrentTrack(victoryMusic);
        audioElementRef.current.loop = true;
        audioElementRef.current.volume = 1;
      }
    },
    [currentMode, currentGameMode]
  )

  return (
    <div>
      {audioElement}
    </div>
    
  )
}

export default MusicPlayer;