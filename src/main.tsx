import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

export let nodeDepth: number = 6;
export function setNodeDepth(depth: number) {
  nodeDepth = depth;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
