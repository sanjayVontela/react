import React,{useEffect, useRef} from 'react'
import api from "../../api/axiosConfig";
import { useParams } from 'react-router-dom';
import { Container,Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

function Reviews({getMovieData, movie, reviews, setReviews}) {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    console.log(movieId);
    useEffect(()=>{
         getMovieData(movieId);
        // console.log(movie);
    },[])


    const addReview = async (e) =>{
        e.preventDefault();
        const rev  = revText.current;
        
        try{

            fetch("http://localhost:8080/api/v1/reviews/insertReview",{
                method:"post",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({reviewBody:rev.value, ImdbId:movieId})
            })
            .then(response=>response.json())
    

            // const response = await api.post("/api/v1/reviews/insertReview",{reviewBody:rev.value, imdbId:movieId});
            const updatedReviews = [...reviews, {body:rev.value}];
            rev.value="";
            setReviews(updatedReviews);

        }catch (err){
            console.log(err);
        }
       

    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className='mt-2'>
            {console.log(movie)}
            <Col><img src={movie.poster} alt=""/></Col>
            <Col>
                {
                    <>
                    <Row>
                        <Col>
                        <ReviewForm handleSubmit={addReview} revText={revText} labelText="Fancy a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <hr/>
                        </Col>
                    </Row>
                    </>
                }
                {
    reviews.map((r, index) => (
        <React.Fragment key={index}>
            <Row>
                <Col>{r.body}</Col>
            </Row>
            <Row>
                <Col>
                    <hr/>
                </Col>
            </Row>
        </React.Fragment>
    ))
}

            </Col>
        </Row>
        <Row>
                        <Col>
                        <hr/>
                        </Col>
                    </Row>
    </Container>
  )
}

export default Reviews