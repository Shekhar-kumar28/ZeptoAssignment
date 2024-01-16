import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const items = ["Sachin", "Nikhil", "Vikash", "Kailash", "Rahul","Kunal","Vivek"];

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchText(inputValue);

    if (!inputValue) {
      setFilteredItems(items.filter(item => !chips.find(chip => chip.text === item.toLowerCase())));
    } else {
     
      setFilteredItems(
        items.filter(
          (item) =>
            item.toLowerCase().includes(inputValue) &&
            !chips.find((chip) => chip.text === item.toLowerCase())
        )
      );
    }
  };

  const handleItemClick = (item) => {
    setChips([...chips, { id: Date.now(), text: item }]);
    setSearchText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChipRemove = (id) => {
    const updatedChips = chips.filter(chip => chip.id !== id);
    setChips(updatedChips);
  };

  return (
    <div className="container">
      <div className="chips">
        {chips.map(chip => (
          <div key={chip.id} className="chip" onClick={() => handleChipRemove(chip.id)}>
            <span className="chip-text">{chip.text}</span>
            <span className="chip-close">X</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Type to search"
        ref={inputRef}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
