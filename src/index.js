import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store, { history } from "./store";

import "./default.css";

// Add these lines:
if (process.env.NODE_ENV !== "production") {
  localStorage.setItem("debug", "awesome-react-app:*");
}

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter hitstory={history}>
        <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
