import React, { useState, useRef ,useEffect} from "react";
import "./styles/app.scss";
import Song from "./components/song";
import Player from "./components/player";
import Data from "./components/source";
import Libraryui from "./components/library";
import Navbar from "./components/nav";

function App() {

  useEffect(() => {
    document.body.style.opacity = "100"
  },[])


  const audioRef = useRef(null);

  const nextsongplayevent = async () => {
    let currentindex = songs.findIndex(song => song.id === currentsong.id)
        currentindex++
        if(currentindex > songs.length - 1){
            currentindex = songs.length - 1
        await setcurrentsong(songs[currentindex])
    }
  }

  const [libraryopen,setlibraryopen] = useState(false)
  const [songs, setsongs] = useState(Data());
  const [currentsong, setcurrentsong] = useState(songs[0]);
  const [playingsong, setplayingsong] = useState(false);

  const [updatetime, setupdatetime] = useState({
    currentTime: 0,
    duration: 0,
    animatepercentage:0
  });

  const updatetimeevent = (e) => {
    const currenttime = e.target.currentTime;
    const songduration = e.target.duration;
    //calculating animation percentage
    const roundedtime = Math.round(currenttime)
    const roundedduration = Math.round(songduration)
    const totalpercentage = Math.round((roundedtime / roundedduration) * 100)
    console.log(totalpercentage)
    setupdatetime({
      ...updatetime,
      currentTime: currenttime,
      duration: songduration,
      animatepercentage:totalpercentage
    });
  };

  

  return (
    <div className={`App ${libraryopen ? "darktheme" : ''} `}>
      <Navbar libraryopen={libraryopen} setlibraryopen={setlibraryopen}/>
      <Song currentsong={currentsong} />
      <Player
        currentsong={currentsong}
        setcurrentsong={setcurrentsong}
        playingsong={playingsong}
        setplayingsong={setplayingsong}
        audioRef={audioRef}
        updatetime={updatetime}
        setupdatetime={setupdatetime}
        songs={songs}
        setsongs={setsongs}
      />
      <Libraryui
        songs={songs}
        setcurrentsong={setcurrentsong}
        audioRef={audioRef}
        playingsong={playingsong}
        setsongs={setsongs}
        libraryopen={libraryopen}
      />
      <audio
        ref={audioRef}
        src={currentsong.audio}
        onTimeUpdate={updatetimeevent}
        onLoadedMetadata={updatetimeevent}
        onEnded={nextsongplayevent}
      ></audio>
    </div>
  );
}

export default App;
