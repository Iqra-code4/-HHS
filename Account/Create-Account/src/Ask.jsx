import React from "react";
import "./Ask.css"
import { Link } from "react-router-dom";

function Ask() {
  
  return (
    <div className="hire-container">
      <div className="hire-box">

        <h1 className="title">Welcome</h1>
        <p className="subtitle">
          How will you start this journey? 
        </p>

        <div className="buttons">
          <Link to={'/hire'}>
            <button 
              className="hire-btn"
            >
              I Want to Hire
            </button>
          </Link>
          
          <Link to={'/get_hired'}>
            <button 
              className="work-btn"
            >
              I Want to Get Hired
            </button>
          </Link>
          

        </div>

      </div>
    </div>
  );
}

export default Ask;