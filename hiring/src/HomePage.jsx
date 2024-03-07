import React from "react";
import { Link } from "react-router-dom";

function HomePage(){

    return(

        <div style={{margin:"2%"}}>
            <h1>Get Hired or Hire Prople for free!</h1>

            <Link to="/feed" className="btn btn-outline-primary" style={{margin:"1%", textAlign:"center"}}><p style={{fontSize:"20px",textAlign:"center"}}>Show Jobs</p></Link><br/>
            <Link to="/create" className="btn btn-outline-primary" style={{margin:"1%"}}><p style={{fontSize:"20px",textAlign:"center"}}>Hire Talent</p></Link>
        </div>
    )

}

export default HomePage;