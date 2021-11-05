import React from "react";

const Navbar = ({libraryopen,setlibraryopen}) => {

    const librarystatehandler = () => {

        setlibraryopen(!libraryopen)
    }

    return(
        <div className="navbar">
            <h1>Musified</h1>
            <button onClick={librarystatehandler}>Library</button>
        </div>
    )
}

export default Navbar