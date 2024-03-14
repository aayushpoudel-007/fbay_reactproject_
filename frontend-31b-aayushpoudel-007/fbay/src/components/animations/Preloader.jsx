import React, { useEffect } from "react";
import "../animations/preloader.css";
import { preLoaderAnim } from "./PreloaderAnimations";

const Preloader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  return (
    <div className="preloader">
      <div className="texts-container">
        <span>WELCOME TO FBAY</span>
      </div>
    </div>
  );
};

export default Preloader;
