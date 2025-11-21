import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BusManagement.css";

const BusManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Bus");

  const handleAddBus = () => {
    setModalTitle("Add Bus");
    setShowModal(true);
  };

  const handleEditBus = () => {
    setModalTitle("Edit Bus");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bus-management-layout">
      <Sidebar />

      <div className="bus-management-content container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold page-title">Bus Management</h2>
          <button className="btn primary-btn" onClick={handleAddBus}>
            + Add Bus
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover bg-white shadow-sm rounded">
            <thead className="table-header">
              <tr>
                <th>Bus ID</th>
                <th>Bus Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Ticket Price</th>
                <th>Seats</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>KA09F4567</td>
                <td>KSRTC Airavat</td>
                <td>Mysore</td>
                <td>Bangalore</td>
                <td>₹350</td>
                <td>40</td>
                <td>
                  <button
                    className="btn btn-sm primary-btn me-2"
                    onClick={handleEditBus}
                  >
                    Edit
                  </button>
                  <button className="btn btn-sm danger-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className="modal fade show custom-modal-backdrop"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content modal-style">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">{modalTitle}</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>

                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Bus Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter bus name"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Source</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter source"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Destination</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter destination"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Ticket Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter ticket price"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Seats</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter seat count"
                      />
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button className="btn secondary-btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="btn primary-btn">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusManagement;
