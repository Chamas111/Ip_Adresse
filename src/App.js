import "./App.css";

import axios from "axios";

import { useState, useEffect } from "react";

function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    console.log("ddddddddd", process.env.REACT_APP_IPIFY_API_KEY);
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <h1>hello World</h1>
    </div>
  );
}

export default App;
