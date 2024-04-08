import { useState } from "react";
import axios from "axios";
import './add service.css'
import Header from "../components/Header";
import Footer from "../components/Footer";


function AddService(){
    const [order,setorder]=useState({
        date:"",
        place:"",
        dilivery_options:"",
        headcount:"",
        
       
    })

    const handleonchange=(e)=>{
        const {value,name}=e.target
        setorder((preve)=>{
               return{
                ...preve,
                [name]:value
               }
          })
       
        
    }
    
    const handlesubmit=async(e)=>{
     
       e.preventDefault()
       const data=await axios.post("http://localhost:5000/catering/create",
        order)
          console.log(data)
          alert("your details added now!")
         
     
    }


    return(
        <>
        <Header></Header>
        <div className="add-service">
    
<h2>Add Catering Service</h2>
    <form onSubmit={handlesubmit}>
    <lable>Date:</lable>
    <input type="date" id="date" name="date" onChange={handleonchange}/><br></br>
    <lable>Place:</lable>
    <input type="text" id="place" name="place" onChange={handleonchange}/><br></br>
    <lable>Dilivey Option:</lable>
    <input type="text" id="dilivery_options" name="dilivery_options" onChange={handleonchange}/><br></br> 
    <lable>Headcount:</lable>
    <input type="text" id="headcount" name="headcount" onChange={handleonchange}/><br></br>
     <br></br> <br></br> <br></br> 
  


    <button>Order Place</button>
    </form><br></br> 
   
        </div>
        <Footer></Footer>
        </>
    )
}
export default AddService;