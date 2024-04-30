import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Item from "./Item";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router";
import "../Inventory.css";

const Items = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/inventory");
      setItems(response.data.items);
      setAllItems(response.data.items);
    } catch (error) {}
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/deleteInventory/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId));
      setAllItems(allItems.filter((item) => item._id !== itemId));
      window.alert("Item deleted successfully!");
    } catch (error) {}
  };

  const handleSearch = () => {
    const filtered = allItems.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setItems(filtered);
    setNoResults(filtered.length === 0);
  };

  const resetSearch = () => {
    setSearchQuery("");
    setItems(allItems);
    setNoResults(false);
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="fullbox_dash">
        <div className="control_item">
          <button
            onClick={() => navigate("/addInventory")}
            className="update_admin"
          >
            Add New Item
          </button>
          <div className="serchbox">
            <input
              type="text"
              className="input_item_add"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <button onClick={handleSearch} className="update_admin">
              Search
            </button>
          </div>
          <button onClick={handlePrint} className="update_admin">
            Generate Report
          </button>
        </div>
        <div ref={ComponentsRef}>
          <h1 className="item_topic">
            Items<span className="item_topic_sub"> Details</span>
          </h1>

          {noResults && <div>No results found.</div>}
          <div className="item_list">
            {items.map((item) => (
              <Item
                key={item._id}
                item={item}
                onDelete={() => handleDeleteItem(item._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
