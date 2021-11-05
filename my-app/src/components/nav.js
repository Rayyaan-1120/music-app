import React from "react";

const Navbar = ({libraryopen,setlibraryopen}) => {

    const librarystatehandler = () => {

        setlibraryopen(!libraryopen)
    }

    return(
        <div className={`navbar ${libraryopen ? 'color' : ''}`}>
            <h1 className={`${libraryopen ? 'color' : ''}`}>Musified</h1>
            <button onClick={librarystatehandler} className={`${libraryopen ? 'color' : ''}`}>Library</button>
        </div>
    )
}

export default Navbar