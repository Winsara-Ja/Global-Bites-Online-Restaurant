import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DisplayOffers.css";
import ManagerHeader from "../Managers/ManagerHeader";

const DisplayOffers = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/offers")
      .then((offers) => setOffers(offers.data))
      .catch((err) => console.log(err));
  });

  const handleDelete = async (id) => {
    const data = await axios.delete("http://localhost:5000/deleteOffer/" + id);

    if (data.data.success) {
      alert(data.data.message);
    }
  };

  const handleAddOffer = () => {
    navigate("/addOffers");
  };

  const HandleEdit = async (id) => {
    navigate(`/updateOffers/${id}`);
  };

  return (
    <>
      <ManagerHeader />
      <div className="offers2">MANAGE Offers</div>
      <div className="add-button-container">
        <h3>Add Offers Here</h3>
        <button type="button" onClick={handleAddOffer}>
          Add
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Offer Id</th>
              <th>Offer Name</th>
              <th>Promo Code</th>
              <th>Offer Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td>{offer.offerId}</td>
                <td>{offer.offerName}</td>
                <td>{offer.promoCode}</td>
                <td>
                  <img
                    src={"http://localhost:5000/" + offer.image}
                    alt={offer.offerName}
                  />
                </td>
                <td>
                  <button type="button" onClick={() => HandleEdit(offer._id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(offer._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayOffers;
