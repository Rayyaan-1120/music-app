import React from "react";
import LibrarySong from "./librarysong";

const Libraryui = ({
  songs,
  setcurrentsong,
  audioRef,
  playingsong,
  setsongs,
  libraryopen

}) => {
  return (
    <div className={`library ${libraryopen ? 'expand' : ''}`}>
      <h1>Library</h1>
      {songs.map((son) => {
        return (
          <LibrarySong
            son={son}
            playingsong={playingsong}
            setcurrentsong={setcurrentsong}
            key={son.id}
            id={son.id}
            songs={songs}
            audioRef={audioRef}
            setsongs={setsongs}

          />
        );
      })}
    </div>
  );
};

export default Libraryui;
