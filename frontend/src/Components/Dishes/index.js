import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./index.css";
import Navbar from "../Navbar/navbar";
import DishInstructionsModal from "../DishInstructionsModal/index";
import Carousel from "../Carousal/index"; // Fixed import

const Dishes = () => {
  const [data, setData] = useState([]);
  const [dish_name, setDishName] = useState({ dish_name: ""});
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    console.log("runing for dish");
    Axios.get("http://localhost:3006/getData")
      .then((response) => {
        if (response.status === 200 && response.data.getData) {
          setData(response.data.getData); 
          console.log(data);// Ensure proper response handling
        } else {
          console.error("Error: Unexpected response format:", response);
        }
      })
      .catch((err) => {
        console.error("API Error:", err.message);
        if (err.response) {
          console.error("Response Data:", err.response.data);
          console.error("Response Status:", err.response.status);
        }
      });
  }, []);

  const convertDriveLink = (url) => {
    if (url.includes("drive.google.com")) {
      const fileId = url.split("/d/")[1]?.split("/")[0]; // Extract FILE_ID
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return url; // Return normal URLs unchanged
  };
  
  const handleDishClick=(dish)=>{
    setDishName({ dish_name: dish.dish_name });
    setIsChatOpen(true); 
  }

  const handleDishInputChange=(e,setDishName,key)=>{
    setDishName(() => ({[key]: e.target.value }));
  }
  return (
    <div className="dish" style={{ backgroundColor: "#28282B" }}>
      <Navbar />
      <div className="dishes_page" style={{ marginTop: "80px" }}>
        <Carousel />
        <h1 className="dish_heading">Dishes</h1>
        <input
                type="text"
                id="dish_name"
                placeholder ="Enter your Dish name....."
                className="dish-input"
                value={dish_name.dish_name || ""}
                onChange={(e) => handleDishInputChange(e, setDishName,"dish_name")}
              />
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="button">Search</button>

        {isChatOpen && <DishInstructionsModal  dishName={dish_name.dish_name} onClose={() => setDishName("")}/>}
        {data.length > 0 ? (
  <ul className="dishes_Con">
    {data.map((dish) => (
      <li key={dish.id} className="dish-card dish-list" onClick={() => handleDishClick(dish)}>
        <img src={convertDriveLink(dish.dish_image_url)} alt={dish.dish_name} className="dish_image" />
        <h2 className="dish_name">{dish.dish_name}</h2>
      </li>
    ))}
  </ul>
) : (
  <p>Loading dishes...</p>
)}
      </div>
    </div>
  );
};

export default Dishes;
