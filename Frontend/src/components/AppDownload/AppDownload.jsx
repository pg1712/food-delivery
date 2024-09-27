import React from "react";
import { assets } from "../../assets/assets";
import "./appDownload.css";
function AppDownload() {
    return (
        <div className="app-download" id="app-download">
            <p>
                for better experience <br />
                tomato app
            </p>
            <div className="app-download-platform">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    );
}

export default AppDownload;
