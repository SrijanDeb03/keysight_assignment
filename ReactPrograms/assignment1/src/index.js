import React from "react";
import ReactDOM from "react-dom/client";
import Counter from "./count";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  React.createElement(Counter)
);
