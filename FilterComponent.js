// src/components/FilterComponent.js

import React, { useState } from 'react';
import axios from 'axios';

const FilterComponent = () => {
  const [filter, setFilter] = useState('Numbers');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchFilteredData = async () => {
    try {
      const response = await axios.post('https://your-deployed-backend-url/bfhl', {
        data: ["a", "b", "1", "c", "2"]
      });
      setData(response.data);
      filterData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = (data) => {
    if (filter === 'Numbers') {
      setFilteredData(data.numbers);
    } else if (filter === 'Alphabets') {
      setFilteredData(data.alphabets);
    } else if (filter === 'Highest Alphabet') {
      setFilteredData(data.highest_alphabet);
    }
  };

  return (
    <div>
      <h1>Data Filter</h1>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest Alphabet">Highest Alphabet</option>
      </select>
      <button onClick={fetchFilteredData}>Fetch Data</button>
      <h2>Filtered Response</h2>
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterComponent;
