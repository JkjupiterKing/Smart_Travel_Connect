import React, { useState } from "react";
import NavbarComponent from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [travelType, setTravelType] = useState("bus");
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  const mockData = [
    {
      id: 1,
      type: "bus",
      name: "KSRTC Airavat",
      price: 450,
      time: "9:00 AM → 1:30 PM",
      seats: 12,
    },
    {
      id: 2,
      type: "train",
      name: "Shatabdi Express",
      price: 820,
      time: "6:00 AM → 10:15 AM",
      seats: 45,
    },
    {
      id: 3,
      type: "flight",
      name: "IndiGo",
      price: 3200,
      time: "7:30 AM → 8:30 AM",
      seats: 8,
    },
  ];

  const handleSearch = () => {
    const filtered = mockData.filter((item) => item.type === travelType);
    setResults(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <NavbarComponent onLogout={handleLogout} />

      {/* Page Content */}
      <div className="container py-4" style={{ marginTop: "90px" }}>
        {/* Search Card */}
        <div
          className="card p-4 shadow-lg mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <div className="d-flex justify-content-center gap-3 mb-4">
            <button
              className={`btn d-flex align-items-center gap-2 ${
                travelType === "bus" ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setTravelType("bus")}
            >
              <i className="bx bx-bus"></i> Bus
            </button>

            <button
              className={`btn d-flex align-items-center gap-2 ${
                travelType === "train" ? "btn-primary" : "btn-outline-secondary"
              }`}
              onClick={() => setTravelType("train")}
            >
              <i className="bx bx-train"></i> Train
            </button>

            <button
              className={`btn d-flex align-items-center gap-2 ${
                travelType === "flight"
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setTravelType("flight")}
            >
              <i className="bx bx-plane-alt"></i> Flight
            </button>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="From"
                className="form-control"
                value={searchData.from}
                onChange={(e) =>
                  setSearchData({ ...searchData, from: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                placeholder="To"
                className="form-control"
                value={searchData.to}
                onChange={(e) =>
                  setSearchData({ ...searchData, to: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                value={searchData.date}
                onChange={(e) =>
                  setSearchData({ ...searchData, date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-primary d-flex align-items-center gap-2 mx-auto"
              onClick={handleSearch}
            >
              <i className="bx bx-search"></i> Search
            </button>
          </div>
        </div>

        <div className="mt-5" style={{ maxWidth: "900px" }}>
          {results.length > 0 && (
            <h4 className="fw-semibold mb-3">Available Options</h4>
          )}

          <div className="d-flex flex-column gap-3">
            {results.map((item) => (
              <div key={item.id} className="card p-3 shadow-sm">
                <h5 className="fw-bold">{item.name}</h5>
                <p className="text-muted">{item.time}</p>
                <p className="fw-semibold">₹ {item.price}</p>
                <p className="text-success">Seats Available: {item.seats}</p>

                <button className="btn btn-primary mt-2 w-25">Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
