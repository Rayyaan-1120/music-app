import React, { useState ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {Slider} from 'antd'

const Player = ({
  playingsong,
  setplayingsong,
  audioRef,
  updatetime,
  setupdatetime,
  songs,
  currentsong,
  setcurrentsong,
  setsongs
}) => {

  const [audio,setaudio] = useState(1)
  // console.log(audioRef.current.volume)

  const activesonghandler = (nextprev) => {
    const checked = songs.map(song => {
      if(song.id === nextprev.id){
          return{
              ...song,
              active:true
          }
      }else{
          return{
              ...song,
              active:false
          }
      }
  })

  setsongs(checked)
  }


  const playbtnhandler = () => {
    if (playingsong) {
      audioRef.current.pause();
      setplayingsong(!playingsong);
    } else {
      audioRef.current.play();
      setplayingsong(!playingsong);
    }
  };

  const timeformat = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      )
  };

  const draghandler = (value) => {
    audioRef.current.currentTime = value;
    setupdatetime({ ...updatetime, currentTime: value });
  };

  const goingtosongs = async (direction) => {

      let currentindex = songs.findIndex(song => song.id === currentsong.id)

      if(direction == 'skipright'){
          currentindex++
          if(currentindex > songs.length - 1){
              currentindex = songs.length - 1
          }
          await setcurrentsong(songs[currentindex])
          activesonghandler(songs[currentindex])
      }
      if(direction == 'skipleft'){
          currentindex-- 
          if(currentindex < 0){
              currentindex = 0
          }
         await setcurrentsong(songs[currentindex])
         activesonghandler(songs[currentindex])

      }

     if(playingsong) audioRef.current.play()

  }

  // const trackanim = {
  //   transform:`translateX(${updatetime.animatepercentage}%)`
  // }
  // console.log(trackanim)

  return (
    <div className="playerdiv">
      <div className="inputbar">
        <h2>{timeformat(updatetime.currentTime)}</h2>
        {/* <div className="track" style={{backgroundImage:`linear-gradient(to right,${currentsong.color[0]},${currentsong.color[1]})`}}> */}
        <div className="rangediv">
        <Slider
          // type="range"
          trackStyle={{backgroundImage:`linear-gradient(to right,${currentsong.color[0]},${currentsong.color[1]})`}}
          min={0}
          max={updatetime.duration || 0}
          value={updatetime.currentTime}
          onChange={draghandler}
          // range={{ draggableTrack: true }}
          // className="rangeinput"
        />
        {/* <div className="animatetrack" style={trackanim}></div> */}
        </div>
        <h2>{timeformat(updatetime.duration)}</h2>
      </div>
      <div className="playercontrols">
        <FontAwesomeIcon icon={faAngleLeft} size="2x" onClick={() => goingtosongs('skipleft')}/>
        <FontAwesomeIcon
          icon={!playingsong ? faPlay : faPause}
          size="2x"
          onClick={playbtnhandler}
        />
        <FontAwesomeIcon icon={faAngleRight} size="2x" onClick={() => goingtosongs('skipright')}/>
      </div>
      <div className="rangediv2">
        <h3>Volume</h3>
        <Slider
          // type="range"
          trackStyle={{backgroundColor:"crimson"}}
          min={0}
          max={1}
          step={0.1}
          value={audio}
          onChange={(value) => {
           audioRef.current.volume = value
           setaudio(value)
          }}
          // className="rangeinput"
        />
        </div>
    </div>
  );
};

export default Player;
