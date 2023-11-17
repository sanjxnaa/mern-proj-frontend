import { React, useState, useEffect, useRef } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Howl, Howler } from 'howler';
import './css/player-ui.css';
import PlayerSongInstace from './PlayerSongInstace';

function PlayerUI({ playButtonIcon, isPlaying, updateCurrentDuration, updateTotalDuration, handlePlayButton, sliderChange, progress, sound }) {
  var [volume, setVolume] = useState(50);
  var [playerDisplay, setPlayerDisplay] = useState('shown');

  useEffect(() => {
    updateCurrentDuration();
    updateTotalDuration();
  }, [isPlaying])

  useEffect(() => {
    console.log(isPlaying);
    isPlaying ? sound.play() : sound.pause();
    // console.log(`sound playing state is ${sound.playing()}`);
  }, [isPlaying]);

  useEffect(() => {
    sound.volume(volume / 100);
  }, [volume])

  function handleVolumeBarChange() {
    const volumeBar = document.getElementById('volumeBar');
    const volumeIcon = document.getElementById('musicVolumeIcon');
    var volumeVal = volumeBar.value;
    setVolume(volumeVal);
    volumeBar.style.background = 'linear-gradient(to right, #1877F2 0%, #1877F2 ' + volumeVal + '%, #fff ' + volumeVal + '%, white 100%)'

    if (volumeVal > 50) {
      volumeIcon.innerHTML = "volume_up";
    }
    else if (volumeVal <= 50 && volumeVal > 0) {
      volumeIcon.innerHTML = "volume_down";
    }
    else {
      volumeIcon.innerHTML = "volume_off";
    }
  }

  function handleFavButtonClick() {
    var favButton = document.getElementById('musicFavHeartIcon');
    favButton.classList.toggle('symbol-filled');
  }

  function handlePlayerUIDisplay() {
    var displayButton = document.getElementById('displayButton');
    var playerUI = document.getElementById('playerUI')
    displayButton.classList.toggle('rotate-icon');

    if (playerDisplay === 'shown') {
      playerUI.style.bottom = '-130px';
      setPlayerDisplay('hidden');
      return;
    }
    playerUI.style.bottom = '0';
    setPlayerDisplay('shown');
    return;
  }

 

  return (
    <Container fluid='true' className='player-container text-white ps-5 pe-5 pt-4 pb-4' id='playerUI'>
      <Row>
        <div className='col-md-4 col-6'>
          <PlayerSongInstace playerSongImg={''} playerSongTitle={'Placeholder Title'} playerSongSubtitle={'By subtitle'} />
        </div>
        <div className='col-md-4 d-none d-md-block text-center music-control-container'>
          <div>
            <Button className='music-control-btn me-4'><span className='material-symbols-outlined symbol-filled d-flex align-self-center music-control-icon' id='prevMusicIcon'>skip_previous</span></Button>
            <Button className='music-control-btn me-4' onClick={() => handlePlayButton()}><span className='material-symbols-outlined symbol-filled d-flex align-self-center music-control-icon' id='playMusicIcon'>{playButtonIcon}</span></Button>
            <Button className='music-control-btn'><span className='material-symbols-outlined symbol-filled d-flex align-self-center music-control-icon' id='nextMusicIcon'>skip_next</span></Button>
          </div>
          <div className='mt-3 d-flex flex-row align-items-center gap-2'>
            <div className='float-start song-timer' id='songDurationCurrent'>0:00</div>
            <input type='range' onChange={sliderChange} id='seeker-bar' value={progress}></input>
            <div className='float-end song-timer' id='songDurationTotal'>5:00</div>
            <div className='seeker-bar-container'>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-6 d-flex align-items-center justify-content-end text-center music-utility-container'>
          <Button className='music-favorite-button me-md-4 me-2' onClick={() => handleFavButtonClick()}><span className='material-symbols-outlined d-flex align-self-center music-utility-icon mt-0' id='musicFavHeartIcon'>favorite</span></Button>
          <span className="material-symbols-outlined symbol-filled me-2 mt-0" id='musicVolumeIcon'>volume_up</span>
          <input type='range' id='volumeBar' onChange={() => handleVolumeBarChange()} min={0} max={100} value={volume} />
          <Button className='expand-player-ui-btn' id='displayButton' onClick={() => handlePlayerUIDisplay()}><span className='material-symbols-outlined p-0 m-0'>expand_more</span></Button>
        </div>
      </Row>
      {/* <Button onClick={() => fetchAndPlayNewSong()}>Load New Song</Button> */}
    </Container>
  )
}

export default PlayerUI