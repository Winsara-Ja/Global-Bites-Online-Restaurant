import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Menu.css";
//import ExploreMenu from "../components/ExploreMenu.jsx";
import Header from "../components/Header";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/items')
      .then((response) => {
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
        // Set all items initially
        setFilteredItems(response.data);
        setAllItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleCategoryClick = (cat) => {
    // Check if the clicked category is the same as the currently selected category
    if (selectedCategory === cat) {
        // Reset the selected category to null (or any other default value)
        setSelectedCategory(null);
        // Reset filtered items to all items
        setFilteredItems(allItems);
        console.log('Displaying all items.');
    } else {
        // Set the selected category
        setSelectedCategory(cat);
        console.log('Selected category:', cat);
        // Filter items based on the selected category from all items
        const itemsInSelectedCategory = allItems.filter(item => item.category === cat);
        setFilteredItems(itemsInSelectedCategory);
    }
};

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchQuery(searchValue);
  
    // Check if search query is empty
    if (searchValue === "") {
        // If search query is empty, display all items
        setFilteredItems(allItems);
    } else {
        // Filter items based on the search query
        const filteredItemsBySearch = allItems.filter(item =>
          item.itemName.toLowerCase().includes(searchValue)
        );
        setFilteredItems(filteredItemsBySearch);
    }
  };

  return (
    <>
    <Header />
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and
        elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="search-bar-container">
        <input 
          type="text" 
          placeholder="Search food items..." 
          value={searchQuery} 
          onChange={handleSearchInputChange}
          className="search-bar"
      />
      </div>
      
      <div className='explore-menu-list'>
        {Array.isArray(categories) && categories.map((cat, index) => (
          <div
            onClick={() => handleCategoryClick(cat)}
            key={index}
            className={`explore-menu-list-item ${selectedCategory === cat ? 'selected' : ''}`}>
            <p>{cat}</p>
          </div>
        ))}
      </div>
      <hr />
      <div className="menuItems">MENU ITEMS</div>
      <div className='filtered-items'>
        {filteredItems.map((item, index) => (
          <div key={index} className='item'>
            <div className="wrapper">
                    <div className="product-info">
                      <div className="product-text">
                        <h1>{item.itemName}</h1>
                        <h2>{item.itemId}</h2>
                      </div>
                      <div className="img">
                        <img src={'http://localhost:5000/' + item.image} alt={item.itemName}/>
                      </div>
                      <div className="product-text2">
                        <p>{item.Description}</p>
                      </div>
                      <div className="price">Rs.{item.Price}</div>
                      <div className="product-price-btn">
                        <button type="button" >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
          </div>
        ))}
      </div>
    </div>
    </> 
  );
}

export default Menu;    