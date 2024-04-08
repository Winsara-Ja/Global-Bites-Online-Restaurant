import React, { useEffect, useState } from 'react';
import './ExploreMenu.css';
import axios from 'axios';

const ExploreMenu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5050/items')
      .then((response) => {
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
        // Set all items initially
        setFilteredItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    console.log('Selected category:', cat);
    // Filter items based on the selected category
    const itemsInSelectedCategory = filteredItems.filter(item => item.category === cat);
    setFilteredItems(itemsInSelectedCategory);
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and
        elevate your dining experience, one delicious meal at a time.
      </p>
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
      <div className='filtered-items'>
        {filteredItems.map((item, index) => (
          <div key={index} className='item'>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;





