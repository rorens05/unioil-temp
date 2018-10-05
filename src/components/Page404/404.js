import React, { Fragment } from 'react';
import { withRouter} from 'react-router-dom'

function Page404(){
    const error = "Page not found";
    const errorMessage = "Sorry, but the page you are looking for doesn't exist";
    
    return <Fragment>
        <div align="center" style={{ marginTop: "10%" }}>
            <h1 style={{ fontSize: 150, fontWeight: 'bold', margin: 0 }}>404</h1>
            <p style={{ fontSize: 30, fontWeight: 'bold', margin: 0 }}>{error}</p>
            <p>{errorMessage}</p>
        </div>
    </Fragment>
}

export default withRouter(Page404);