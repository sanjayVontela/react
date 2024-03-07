import React from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Hero({movies}) {

    const navigate = useNavigate();

    function reviews(id){
        navigate(`/Reviews/${id}`);
    }

  return (
    <div className='movie-carousel-container'>
        <Carousel>
            {
                movies.map((movie)=>{
                    return(
                        <Paper>
                            <div className='movie-card-container'>
                                <div className='movie-card' style={{"--img":`url(${movie.backdrops[Math.floor(Math.random(0)*movie.backdrops.length)]})`}}>
                                    <div className='movie-detail'>
                                        <div className='movie-poster'>
                                            <img src={movie.poster} alt="" />
                                        </div>
                                        <div className='movie-title'>
                                            <h4>{movie.title}</h4>
                                        </div>
                                        <div className='movie-buttons-container'>
                                            <Link to={`/Trailer/${movie.trailerLink.split("=")[1]}`}>
                                            <div className='play-button-icon-container'>
                                                <FontAwesomeIcon className='play-button-icon' 
                                                    icon={faCirclePlay}/>
                                            </div>
                                            </Link>

                                            <div className='movie-review-button-container'>
                                                <Button variant='info' onClick={()=>reviews(movie.imdbId)}>Reviews</Button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )
                })
            }
        </Carousel>
    </div>
  )
}

export default Hero