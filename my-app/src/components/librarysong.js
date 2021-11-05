import React from "react";

const LibrarySong = ({son,setcurrentsong,audioRef,playingsong,id,setsongs,songs}) => {

    const selectedsongs = async () => {
       await setcurrentsong(son)

        //checking activated state 
            const checked = songs.map(song => {
                if(song.id === id){
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
        

        //checking if the song is playing
        if(playingsong) audioRef.current.play() 
    }

    return(
        <div className={`librarysongs ${son.active ? 'selected' : ""}`} onClick={selectedsongs}>
            <div>
            <img src={son.image} alt={son.image} />
            </div>
            <div>
            <h2>{son.name}</h2>
            <h3>{son.artist}</h3>
            </div>
        </div>
    )
}

export default LibrarySong