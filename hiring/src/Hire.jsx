import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HirePage(){

    const navigate = useNavigate();

    const [selectedValues, setSelectedValues] = useState([]);

    const [error, setErrors] = useState({});

    const [postData, setPostData] = useState({

    
        profile:"",
        exp:"",
        desc:"",
        techs:selectedValues
    }

    )

    const handleChange = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
        setPostData(prevData => ({
            ...prevData,
            techs: selectedValues,
        }));
    };
    function submitData() {
        if (postData.profile.length === 0 || postData.desc.length === 0) {
            setErrors({
                profile: postData.profile.length === 0,
                desc: postData.desc.length === 0
            });
            return;
        }
        fetch("http://localhost:8080/addPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(data => {
                if (data["status"] === "success") {
                    alert("Success");
                    navigate("/");
                } else {
                    alert("Error Occured");
                    window.location.reload();
                }
            })
            .catch(error => console.error(error));
    }

   
        
    

    const skills = [
        "JavaScript",
        "Python",
        "Java",
        "Django",
        "Rust"
    ];
    return (
        <Box sx={{textAlign:"center"}}>
            <h1>Create New Post</h1><br/>
            <TextField type="string" label="Job Profile" variant="outlined" sx={{width:"50%",margin:"2% auto"}} error={error.profile} required onChange={(e)=>setPostData({...postData,profile:e.target.value})}/><br/>
            <TextField min="0" type="number" label="Experience" variant="outlined" sx={{width:"50%",margin:"2% auto"}} required onChange={(e)=>setPostData({...postData,exp:e.target.value})}/><br/>
            <TextField type="string" rows={4} label="Job Description" variant="outlined" sx={{width:"50%",margin:"2% auto"}} error={error.desc} multiline required onChange={(e)=>setPostData({...postData,desc:e.target.value})}/>
           
            <div style={{content:"justify"}}>
                {skills.map(s=>{
                    return (
                        <p><input type="checkbox" name={s} id={s} value={s} onChange={(e)=>handleChange(e.target.value)}/> {s}</p>
                    );
                })}
            </div>
            <button type="button" className="btn btn-success" onClick={() => submitData()}>Submit</button>

            
            </Box>
        
    )
}

export default HirePage;