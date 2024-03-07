import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { FaMagnifyingGlass } from "react-icons/fa6"

function GetJobPage(){

    const[jobData,setJobData] = useState([]);

    const [searchData, setSearchData] = useState("");



    useEffect(()=>{
        if(searchData.length>2){
            fetch(`http://localhost:8080/posts/${searchData}`)
            .then(response=>response.json())
            .then(data=>setJobData(data))
            .then(error=>console.error(error))
        }else{
            fetch("http://localhost:8080/allPosts",{
                method:"get"
            })
            .then(response=>response.json())
            .then(data=>setJobData(data))
            .catch(error=>console.error(error))
        }
    },[searchData])
    
 
    return(
        <div style={{marginTop:"1%"}}>
        <Link to="/" className="btn btn-outline-primary" style={{marginLeft:"2%"}}>Home</Link><br/>
        <TextField label="Search" variant="outlined" sx={{width:"50%", margin:"2% 2%"}} InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaMagnifyingGlass />
            </InputAdornment>
          ),
        }} onChange={(e)=>setSearchData(e.target.value)}/>
        <div className="row" style={{marginLeft:"1%", marginRight:"1%"}}>

            {jobData.map(d=>{
                return (
                 <div className="col-sm-6 mb-3 mb-sm-0" style={{marginTop:"1%",marginBottom:"2%"}}>
                 <div class="card" >
             <div class="card-body">
                 <h5 class="card-title">{d.profile}</h5>
                 <p class="card-text">Description: {d.desc}</p>
                 <h6 class="card-subtitle mb-2 text-muted">Years of Experience: {d.exp} Year</h6>
                 <h6 class="card-subtitle mb-2">Skills: {d.techs.join(", ")}</h6>
             </div>
             
             </div>
                 </div>
                )
            })}

           
            
            
            
        </div>

            <Footer />
        </div>
    );
}

export default GetJobPage;