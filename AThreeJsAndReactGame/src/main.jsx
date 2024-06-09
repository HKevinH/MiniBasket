import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./experience";
import "./index.css";
import Interface from "./Interface";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Interface />
    <Canvas>
      <Experience />
    </Canvas>
  </React.StrictMode>
);
