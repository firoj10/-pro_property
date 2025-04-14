// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import { RouterProvider } from 'react-router-dom'
// import { router } from "./Routes/Route";


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//      <RouterProvider router={router} /> 
//   </React.StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux"; // ✅ Import from react-redux
import store from "./redux/store"; // ✅ Correct store import
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
