import React from "react";
import { BrowserRouter, Route, Routes,HashRouter } from 'react-router-dom';
import HomePage from "./HomePage";
import GetJobPage from "./GetJob";
import HirePage from "./Hire";


function AllRoutes(){

    return(

        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/feed" element={<GetJobPage/>}/>
            <Route path="/create" element={<HirePage/>}/>
        </Routes>

        </BrowserRouter>
    )
}

export default AllRoutes;