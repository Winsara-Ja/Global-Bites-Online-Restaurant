import React, { useState, useEffect } from 'react';
import "./EditOffer.css"
import  axios  from 'axios';
import { useParams, useNavigate } from 'react-router-dom'

const EditOffers = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState({
    offerId: "",
    offerName: "",
    promoCode: "",
    discount: "",
    image: "", 
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setOfferData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/offers/' + id)
        setOfferData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching item data:', error)
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:5000/updateOffer/' + id, offerData)
      if(response.data.success){
        navigate('/displayOffers')
        alert(response.data.message);  
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item. Please try again.');
    }
  };

  return (
    <div className="edit-offer-container">
        <form onSubmit={handleUpdate}>

            <h2>Edit Offer Details</h2>

            <label htmlFor="offerId">Offer Id : </label>
            <input type="number" id="offerId" name="offerId"  onChange={handleOnChange} required value={offerData.offerId}/>

            <label htmlFor="offerName">Offer Name : </label>
            <input type="text" id="offerName" name="offerName"  onChange={handleOnChange} required value={offerData.offerName}/>

            <label htmlFor="promoCode">Promo Code : </label>
            <input type="text" id="promoCode" name="promoCode"  onChange={handleOnChange} required value={offerData.promoCode}/>

            <label htmlFor="discount">Discount : </label>
            <input type="text" id="discount" name="discount"  onChange={handleOnChange} required value={offerData.discount}/>

            <label htmlFor="image">
              <div className="uploadBox">
                <img src={'http://localhost:5000/' + offerData.image} alt={offerData.itemName}/>
              </div>
              <div className="offer-image-label-container">
                <label className="offer-image-label">Offer image</label>
              </div> 
            </label>
            <div className="btn3-container">
              <button className="btn3">Update</button>
            </div>    

        </form>
    </div>
  )
}

export default EditOffers