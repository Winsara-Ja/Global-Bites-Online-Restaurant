import "./AddOffers.css"
import React, { useState } from 'react'
import { ImUpload } from "react-icons/im"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const AddOffers = () => {

    const [image,setImage] = useState("") 
    const navigate = useNavigate()
  
    const handleUploadImage = async (e) => {
      const image = e.target.files[0];
      setImage(image); // Set the file object to the img state directly
    };

    const [formData,setFormData] = useState({
        offerId: "",
        offerName: "",
        promoCode: "",
        image : ""
    })

    const handleOnChange = (e) => {
        const {value,name} = e.target
        setFormData((preve)=>{
          return{
            ...preve,
            [name] : value
          }
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('offerId', formData.offerId);
        form.append('offerName', formData.offerName);
        form.append('promoCode', formData.promoCode);
        form.append('discount', formData.discount);
        form.append('image', image); // Append the image file
        
        try {
            const response = await axios.post("http://localhost:5000/createOffer", form, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Ensure proper content type for file uploads
                }
            })
            if (response.data.success) {
                alert(response.data.message)
                navigate('/displayOffers')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
  return (
    <div className="add-offer-ontainer">
        <form onSubmit={handleSubmit}>

            <h2>Add Offers</h2>

            <label htmlFor="offerId">Offer Id : </label>
            <input type="number" id="offerId" name="offerId"  onChange={handleOnChange} required/>

            <label htmlFor="offerName">Offer Name : </label>
            <input type="text" id="offerName" name="offerName"  onChange={handleOnChange} required/>

            <label htmlFor="promoCode">Promo Code : </label>
            <input type="text" id="promoCode" name="promoCode"  onChange={handleOnChange} required/>

            <label htmlFor="discount">Discount : </label>
            <input type="text" id="discount" name="discount"  onChange={handleOnChange} required/>

            <label htmlFor="image">
              <div className="uploadBox">
                <input type="file" id="image" onChange={handleUploadImage} required/>
                {image ? <img src={URL.createObjectURL(image)} alt="Uploaded Image" /> : <ImUpload />}
              </div> 
            </label>
            <div className="offer-image-label-container">
              <label className="offer-image-label">Offer image</label>
            </div> 
            <div className="btn2-container">
              <button className="btn2">Submit</button>
            </div> 

            

        </form>
    </div>
  )
}

export default AddOffers