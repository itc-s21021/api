import React from "react";


const Movie = ({ movie }) => {
    return (
        <div className="movie">
            <h2>{movie.address1}</h2>
            <h2>{movie.address2}</h2>
        </div>
    );
};


export default Movie;