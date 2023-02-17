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
      <div class="field" id="searchform">
        <input type="text" id="searchterm" placeholder="Input your IP...." />
        <button type="button" id="search">
          Go!
        </button>
      </div>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <img
              src="https://img.freepik.com/free-vector/modern-world-map-background_1035-7605.jpg?w=2000"
              style={{ width: "600px", height: "600px" }}
            />
          </div>
          <div class="col">
            <ol class="list-group list-group-numbered">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Subheading</div>
                  Content for list item
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Subheading</div>
                  Content for list item
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">Subheading</div>
                  Content for list item
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
