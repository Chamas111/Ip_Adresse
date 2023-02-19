import "./App.css";

import leaflet from "leaflet/dist/leaflet.css";
import axios from "axios";
import MarkerPosition from "./MarkerPosition";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useState, useEffect } from "react";

function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");

  const checkIp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`
      )
      .then((res) => {
        setAddress(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function enteredAddress() {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${
          process.env.REACT_APP_IPIFY_API_KEY
        }&${checkIp.test(ipAddress) ? `ipAddress=${ipAddress}` : ""}`
      )
      .then((res) => {
        setAddress(res);
      });
  }

  function handelSubmit(e) {
    e.preventDefault();
    enteredAddress();
    setIpAddress("");
  }

  return (
    <>
      <div className="App">
        <form
          onSubmit={handelSubmit}
          autoComplete="off"
          className="field flex justify-center"
        >
          <input
            className="py-2 px-4 rounded-lg"
            type="text"
            id="searchterm"
            placeholder="Input your IP...."
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button type="button" id="search">
            Go!
          </button>
        </form>

        {address && (
          <>
            <div className="container text-center">
              <div className="row">
                <div className="col">
                  <MapContainer
                    center={[
                      address.data.location.lat,
                      address.data.location.lng,
                    ]}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ width: "600px", height: "600px" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MarkerPosition address={address} />
                  </MapContainer>
                </div>
                <div className="col">
                  <ul className="list-group ">
                    <li className="list-group-item d-flex justify-content-between ">
                      <div className="fw-bold ">IP</div>
                      {address.data.ip}
                    </li>
                    <li className="list-group-item d-flex justify-content-between ">
                      <div className="fw-bold ">Country</div>

                      {address.data.location.country}
                    </li>
                    <li className="list-group-item d-flex justify-content-between ">
                      <div className="fw-bold ">Region</div>

                      {address.data.location.region}
                    </li>
                    <li className="list-group-item d-flex justify-content-between ">
                      <div className="fw-bold ">City</div>
                      {address.data.location.city}
                    </li>
                    <li className="list-group-item d-flex justify-content-between ">
                      <div className="fw-bold">Timezone</div>
                      {address.data.location.timezone}
                    </li>
                    <li className="list-group-item d-flex justify-content-between ">
                      <div className="fw-bold">ISP</div>
                      {address.data.isp}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
