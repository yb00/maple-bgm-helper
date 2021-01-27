import React, { useEffect, useState } from "react";

import MusicSelectTable from "../components/MusicSelectTable";

import "./HomePage.css";

const HomePage = () => {
  const [bgm, setBgm] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/maplestory-music/maplebgm-db/prod/bgm.min.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setBgm(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <p>Please select from below:</p>
      <MusicSelectTable src={bgm} />
    </div>
  );
};

export default HomePage;
