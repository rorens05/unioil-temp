import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

function PageError(){
  const error = "Forbidden";
  const errorMessage = "Access to this resources on the server is denied!"
  
  return <Fragment>
      <div align="center" style={{ marginTop: "10%" }}>
          <h1 style={{ fontSize: 150, fontWeight: 'bold', margin: 0 }}>403</h1>
          <p style={{ fontSize: 30, fontWeight: 'bold', margin: 0 }}>{error}</p>
          <p>{errorMessage}</p>
          <Link to={'/locations'}>Go Back</Link>
      </div>
  </Fragment>
}

export default PageError;