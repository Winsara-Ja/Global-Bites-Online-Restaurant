import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './updateservice.css'

function UpdateService(){
    const { id } = useParams();
    const [updatediscount,setupdatediscount]=useState({
        date:"",
        place:"",
        dilivery_options:"",
        headcount:"",
        
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/catering/user/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdatediscount(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdatediscount({
          ...updatediscount,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:5000/catering/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updatediscount._id,
              ...updatediscount,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log('service updated successfully');
           alert("updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='service-update'>


<lable>Date:</lable>
    <input type="date" id="date" name="date" onChange={handleInputChange} value={updatediscount?.date }/><br></br>
    <lable>Place:</lable>
    <input type="text" id="place" name="place" onChange={handleInputChange} value={updatediscount?.place }/><br></br>
    <lable>Dilivey Option:</lable>
    <input type="text" id="dilivery_options" name="dilivery_options" onChange={handleInputChange} value={updatediscount?.dilivery_options }/><br></br>
    <lable>Headcount:</lable>
    <input type="text" id="headcount" name="headcount" onChange={handleInputChange} value={updatediscount?.headcount }/><br></br>

  



  
    <button onClick={handleUpdate}>Update Serice</button><br></br> <br></br> 

 
        </div>
    )
}
export default UpdateService;