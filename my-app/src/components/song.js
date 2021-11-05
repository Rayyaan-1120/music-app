import React from "react";

const song = ({currentsong}) => {
    return(
        <div className='songdiv'>
            <img src={currentsong.image} alt={currentsong.image} />
            <h2>{currentsong.name}</h2>
            <h3>{currentsong.artist}</h3>
        </div>
    )
}

export default song